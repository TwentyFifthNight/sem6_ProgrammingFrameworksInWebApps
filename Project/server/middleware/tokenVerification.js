const jwt = require("jsonwebtoken");
require('dotenv').config()

function tokenVerification(req, res, next) {
    //token from header
    let token = req.headers["x-access-token"];
    if (!token) {
        console.log("No token provided!")
        res.status(403).send({ message: "No token provided!" });
    }
    //if token provided, validate
    jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decodeduser) => {
        if (err) {
            console.log("Unauthorized!")
            res.status(401).send({ message: "Unauthorized!" });
        }else{
            console.log("Token verified")
            req.user = decodeduser
            next()
        }
    })
}
module.exports = tokenVerification