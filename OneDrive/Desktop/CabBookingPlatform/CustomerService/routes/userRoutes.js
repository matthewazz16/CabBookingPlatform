const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { firstName, surname, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            surname,
            email,
            password: hashedPassword,
            notifications: []
        });

        await user.save();

        res.status(201).json({
            message: "User registered successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                surname: user.surname,
                email: user.email
            }
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET USER DETAILS
router.get("/:id", async (req, res) => {

    try {

        const user = await User.findById(req.params.id)
            .select("-password");

        res.json(user);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET NOTIFICATIONS
router.get("/:id/notifications", async (req, res) => {

    try {

        const user = await User.findById(req.params.id);

        res.json(user.notifications);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

// ADD NOTIFICATION
router.post("/:id/notifications", async (req, res) => {

    try {

        const { message } = req.body;

        const user = await User.findById(req.params.id);

        user.notifications.push({
            message
        });

        await user.save();

        res.json({
            message: "Notification added successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;