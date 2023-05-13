const express = require("express")
const { SIGNUP, LOGIN } = require("../controllers/user.controller")
const app = express.Router()

app.post("/signup", SIGNUP)
app.post("/login", LOGIN)



module.exports = app