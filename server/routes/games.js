const router = require("express").Router()
const { GamesData } = require("../models/gamesData")


router.get("/", async (req, res) => {
    let page = req.query.page ? req.query.page : 1
    let date = new Date()

    let apiPage = parseInt(page / 51)
    let gamesData = await GamesData.findOne({ page: apiPage })

    if(!gamesData || gamesData.lastUpdate !== (date.getDate() + " " + date.getHours())){
        
        console.log("Downloading data")
        lastFetch = date.getDate() + " " + date.getHours()

        let games = []
        try{
            await fetch("https://steamspy.com/api.php?request=all&page=" + (apiPage))
                .then(response => response.json())
                .then(data => {
                    for(var i in data){
                        games.push({
                            appid: data[i].appid,
                            name: data[i].name,
                            price: data[i].price,
                            initialPrice: data[i].initialprice,
                            discount: data[i].discount
                        })
                    }
                })
            if(!gamesData)
                await new GamesData({page: apiPage, lastUpdate: lastFetch, data: games}).save()
            else
                await GamesData.findOneAndUpdate(
                    { page: apiPage }, 
                    {
                        lastUpdate: lastFetch, 
                        data: games
                    }
                )
        }catch(error){
            console.log(error)
            res.status(500).send({ message: "Internal Server Error" });
            return;
        }
        res.status(200)
            .send({ data: games.slice(((page - 1) * 20) - apiPage * 1000, (page * 20) - apiPage * 1000), message: "Games list"})
        return;
    }
    
    res.status(200)
        .send({ data: gamesData.data.slice(((page - 1) * 20) - apiPage * 1000, (page * 20) - apiPage * 1000), message: "Games list"})
    
})



module.exports = router