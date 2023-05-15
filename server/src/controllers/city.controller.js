const City = require("../models/city.model")
const User = require("../models/user.model")

const ADDCITY = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user })
        let city = await City.findOne({ name: req.body.city })
        if (!city) {
            city = await City.create({ name: req.body.city })
        }
        user.city = city._id
        await user.save()
        return res.status(201).send("city added sucessfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
}

module.exports = { ADDCITY }