const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
    },
    password: {
        type: String,
        default: "this cant be used for login"
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User