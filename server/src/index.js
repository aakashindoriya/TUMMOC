require("dotenv").config()
const express = require("express")
const cors = require("cors")
const Connect = require("./config/db.connect")
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express()
const userRoute = require("./routes/user.route")
app.use(cors())
app.use(express.json())

app.use(cookieParser());
app.use(session({
    key: "Tummoc",
    secret: process.env.SESSIONSEC,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
    },
}));


app.get("/", (req, res) => res.send("welcome to TUMMOC"))
app.use("/user", userRoute)

const PORT = process.env.PORT || 8080
app.listen(PORT, async () => {
    await Connect()
    console.log(`listening on Port :${PORT}`)
})