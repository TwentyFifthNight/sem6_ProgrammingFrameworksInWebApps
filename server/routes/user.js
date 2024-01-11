const router = require("express").Router()
const { User, validate } = require("../models/user")
const bcrypt = require("bcrypt")

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message })
        
        const user = await User.findOne({ email: req.body.email })
        if (user)
            return res.status(409)
                .send({ message: "User with given email already Exist!" })

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({ ...req.body, password: hashPassword }).save()
        res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.get("/", async (req, res) => {
    try{
        const user = await User.findOne({ _id: req.user._id })
        user.password = undefined
        res.status(200).send({ data: user, message: "Account details" });
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})

router.delete("/", async (req, res) => {
    try{
        await User.findOneAndDelete({_id: req.user._id})
        console.log("User deleted")
        res.status(204).send();
    }catch(error){
        res.status(500).send({ message: "Internal Server Error" });
    }
})
   
module.exports = router