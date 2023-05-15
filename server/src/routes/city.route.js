const express = require("express")
const { ADDCITY } = require("../controllers/city.controller")
const authMiddleware = require("../middlewares/auth.middleware")
const app = express.Router()

app.post("/addcity", authMiddleware, ADDCITY)

module.exports = app