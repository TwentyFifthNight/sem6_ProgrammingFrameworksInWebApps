const mongoose = require("mongoose")

const gamesDataSchema = new mongoose.Schema({
    page: { type: Number, required: true , unique: true},
    lastUpdate: { type: String, required: true },
    data: [
        {
            appid: {type: Number, sparse: true},
            name: {type: String, sparse: true},
            price: {type: String, sparse: true},
            initialPrice: {type: String, sparse: true},
            discount:  {type: String, sparse: true}
        }
    ]
})

const GamesData = mongoose.model("GamesData", gamesDataSchema)

module.exports = { GamesData }