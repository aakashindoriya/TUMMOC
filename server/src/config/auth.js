var GoogleStrategy = require('passport-google-oauth20').Strategy;
let passport = require("passport")
const User = require("../models/user.model")
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLEID,
    clientSecret: process.env.GOOGLESEC,
    callbackURL: `https://tummoc-production.up.railway.app/user/auth/google/callback`
},
    async function (accessToken, refreshToken, profile, cb) {

        try {
            let user = await User.findOne({ email: profile._json.email })
            if (!user) {
                user = await User.create({ username: profile.displayName, email: profile._json.email })
            }
            // console.log(user, "out")
            return cb(null, user)
        } catch (error) {
            return cb(error.message);
        }
        // User.create({ username: profile.displayName, email: profile._json.email }, function (err, user) {
        //     return cb(err, user);
        // });

    }
));
passport.serializeUser(function (user, done) {
    done(null, user);
});

// Deserialize the user from the session
passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport