const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")


const SIGNUP = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await argon2.hash(password);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        req.session.userId = user._id;

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });

        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



const LOGIN = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('Invalid email or password');
        }

        const isPasswordValid = await argon2.verify(user.password, password);

        if (!isPasswordValid) {
            return res.status(404).send('Invalid email or password');
        }

        req.session.userId = user._id;

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000,
        });

        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const LOGOUT = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.clearCookie('refreshToken');
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out successfully' });
    });
};
module.exports = { SIGNUP, LOGIN, LOGOUT }