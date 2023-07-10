const router = require("express").Router()
const { User } = require("../models/user")

router.get("/", async(req, res) => {
    try{
        const user = await User.findOne({ _id: req.user._id })
        user.password = undefined
        res.status(200).send({ data: user.favorites, message: "Favorites list" })
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.patch("/", async (req, res) => {
    if((req.body.index1 != 0 && !req.body.index1 ) || !req.body.index2){
        res.status(400).send({ message: "No index provided" })
        return
    }

    try{
        const user = await User.findOne({ _id: req.user._id })
        
        var rob = user.favorites[req.body.index1]
        user.favorites[req.body.index1] = user.favorites[req.body.index2]
        user.favorites[req.body.index2] = rob

        await User.findOneAndUpdate(
            { _id: req.user._id },
            {
                $set: { favorites: user.favorites }
            }
        )
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" })
    }
    
    res.status(200).send({ message: "Order changed" })
})


module.exports = router