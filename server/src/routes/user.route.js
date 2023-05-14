const express = require("express")
const { SIGNUP, LOGIN, LOGOUT } = require("../controllers/user.controller")
const passport = require("../config/auth")
const app = express.Router()

app.post("/signup", SIGNUP)
app.post("/login", LOGIN)
app.post("/logout", LOGOUT)
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', "email"] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });


module.exports = app