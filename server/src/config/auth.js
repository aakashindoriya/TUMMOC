var GoogleStrategy = require('passport-google-oauth20').Strategy;
let passport = require("passport")
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.GOOGLESEC,
    callbackURL: "http://localhost:8080/user/auth/google/callback"
},
    function (accessToken, refreshToken, profile, cb) {
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return cb(err, user);
        // });
        console.log(profile)
    }
));

module.exports = passport