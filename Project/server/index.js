require('dotenv').config()
const express = require('express')
const cors = require('cors')
const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const gamesRoutes = require("./routes/games")
const gameRoutes = require("./routes/game")
const favoritesRoutes = require("./routes/favorites")
const tokenVerification = require("./middleware/tokenVerification")
const app = express()

//middleware
app.use(express.json())
app.use(cors())

//routes with middleware
app.get("/api/user",tokenVerification)
app.delete("/api/user",tokenVerification)
app.use("/api/games",tokenVerification)
app.use("/api/game",tokenVerification)
app.use("/api/favorites", tokenVerification)
//routes 
app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/games",gamesRoutes)
app.use("/api/game",gameRoutes)
app.use("/api/favorites",favoritesRoutes)

const connection = require('./db')
connection()

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Nasłuchiwanie na porcie ${port}`))