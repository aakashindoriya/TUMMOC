const mongoose = require("mongoose")

const Connect = async () => {
    await mongoose.connect(process.env.MONGOURL)
}

module.exports = Connect