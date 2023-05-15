const jwt = require('jsonwebtoken');
const Dustbin = require('../models/dustbin.model');

const authMiddleware = async (req, res, next) => {
    try {
        // Check if the session contains a user object with a JWT
        const token = req.session.token;
        if (!token) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        const checkDustbin = await Dustbin.findOne({ token: token })
        if (checkDustbin) {
            console.log(checkDustbin)
            return res.status(401).json({ message: 'Not authenticated' });
        }

        // Verify the token and decode the payload
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded", decodedToken)
        // Check if the user with the ID in the payload exists in the database
        req.user = decodedToken.userId;
        next();
    } catch (err) {
        if (err.message === 'Token expired') {
            try {
                // Check if there is a refresh token in the session
                const refreshToken = req.session.refreshToken;
                if (!refreshToken) {
                    return res.status(401).json({ message: 'Not authenticated' });
                }

                // Verify the refresh token and decode the payload
                const decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

                // Generate a new access token and refresh token and store them in the session
                const token = jwt.sign({ userId: decodedRefreshToken.userId }, process.env.JWT_SECRET, { expiresIn: '15m' });
                res.cookie('token', token, {
                    httpOnly: true,
                    maxAge: 15 * 60 * 1000,
                });
                req.user = decodedRefreshToken.userId
                req.session.token = token;
                // Call the next middleware function
                next();
            } catch (err) {
                console.error(err);
                res.status(401).json({ message: 'Not authenticated' });
            }
        } else {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = authMiddleware;
