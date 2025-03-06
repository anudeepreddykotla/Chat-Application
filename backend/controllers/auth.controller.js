import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import generateAccessToken from '../utils/generateToken.js';

export const signup = async (req, res) => {
    try {
        const {username, password, confirmPassword, email, fullName} = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const userExists = await User.findOne({ username });
        if (userExists) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(15);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            email
        });

        await newUser.save();

        generateAccessToken(newUser._id, res);

        res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            email: newUser.email
        });

    } catch (error) {
        console.log('Error in signup controller:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        generateAccessToken(user._id, res);

        res.status(200).json({
            id: user._id,
            fullName: user.fullName,
            username: user.username
        });

    } catch (error) {
        console.error('Error in login controller:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwtToken", "", {
            maxAge : 0
        });
        res.status(200).json({message : "Logged out succesfully"});
    } catch (error) {
        console.error('Error in login controller:', error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
