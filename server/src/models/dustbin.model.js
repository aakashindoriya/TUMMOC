const mongoose = require("mongoose")

const DustbinSchema = new mongoose.Schema({
    token: String
})

const Dustbin = mongoose.model("dustbin", DustbinSchema)

module.exports = Dustbin