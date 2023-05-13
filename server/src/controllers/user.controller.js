const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const argon2 = require("argon2")


const SIGNUP = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send({ error: 'User already exists' });
        }
        const hashedPassword = await argon2.hash(password);
        user = await User.create({ username, email, password: hashedPassword });
        const token = jwt.sign({ email, username, _id: user._id }, process.env.JWT_SECRET);
        res.status(201).send({ email, username, _id: user._id, token });
    } catch (err) {
        res.status(500).send(err.message);
    }
}


const LOGIN = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Invalid credentials');
        }
        const isMatch = await argon2.verify(user.password, password);
        if (!isMatch) {
            return res.status(401).send('Invalid credentials');
        }
        const { username, _id } = user
        const token = jwt.sign({ email, username, _id }, process.env.JWT_SECRET);
        res.status(201).send({ email, username, _id, token });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

module.exports = { SIGNUP, LOGIN }