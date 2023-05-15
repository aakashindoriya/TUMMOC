const express = require("express")
const { SIGNUP, LOGIN, LOGOUT } = require("../controllers/user.controller")
const jwt = require("jsonwebtoken")
const passport = require("../config/auth")
const app = express.Router()

app.post("/signup", SIGNUP)
app.post("/login", LOGIN)
app.delete("/logout", LOGOUT)
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', "email"] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    function (req, res) {
        const user = req.user[0]
        req.session.userId = user._id;

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        req.session.token = token;
        req.session.refreshToken = refreshToken
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });

        // Successful authentication, redirect home.
        res.redirect(`${process.env.BASEURL}/`);
    })


module.exports = app