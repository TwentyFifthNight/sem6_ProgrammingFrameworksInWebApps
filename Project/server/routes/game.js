const router = require("express").Router()
const { User } = require("../models/user")

router.get("/", async (req, res) => {
    try{
        await fetch("https://store.steampowered.com/api/appdetails?l=en&cc=us&appids=" + req.query.appid)
            .then(response => response.json())
            .then(async data => {
                let game = data[Object.keys(data)[0]]
                if(game.success === true){
                    console.log("Successful game data fetch")
                    
                    const user = await User.findOne({ _id: req.user._id , "favorites.game": game.data.steam_appid})
                    let favorite = true
                    if(!user)
                        favorite = false

                    var details = {
                        appid: game.data.steam_appid,
                        name: game.data.name,
                        price: game.data.is_free ? 0 : game.data.price_overview ? game.data.price_overview.final : "Unavailable",
                        initialPrice: game.data.is_free ? 0 : game.data.price_overview ? game.data.price_overview.initial : "Unavailable",
                        discount: game.data.price_overview ? game.data.price_overview.discount_percent : 0,
                        description: game.data.short_description,
                        header_image: game.data.header_image,
                        isFavorite: favorite
                    }
                    res.status(200).send({ data: details, message: "Game details"})
                }else{
                    return res.status(404).send({ message: "Data not found" })
                }
            })
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.patch("/", async (req, res) => {
    try{
        if(!req.body.appid){
            res.status(400).send({ message: "No appid provided" })
            return
        }

        const gameIsLiked = await User.findOne({ _id: req.user._id , "favorites.game": req.body.appid})
        
        let isLiked = true 
        if(!gameIsLiked){
            await User.findOneAndUpdate(
                { _id: req.user._id }, 
                {
                    $push: {
                        favorites: {
                            $each:[ { game: req.body.appid, name: req.body.name }],
                            $position: 0
                        }
                    }
                }
            )
        }else{
            isLiked = false
            await User.findOneAndUpdate(
                { _id: req.user._id },
                {
                    $pull: {
                        favorites: {game: req.body.appid}
                    }
                }
            )
        }
        res.status(200).send({ data: isLiked})
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" })
    }
})

module.exports = router