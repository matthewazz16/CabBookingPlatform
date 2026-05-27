const express = require("express");

const Booking = require("../models/Booking");

const router = express.Router();


// CREATE BOOKING
router.post("/create", async (req, res) => {

    try {

        const booking = new Booking(req.body);

        await booking.save();

        setTimeout(async () => {

    try {

        await fetch(
            `http://localhost:5000/api/users/${booking.customerId}/notifications`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: `Your cab from ${booking.pickupLocation} to ${booking.destinationLocation} is ready for pickup.`
                })
            }
        );

        console.log("Ride ready notification sent");

    }
    catch (error) {

        console.log(error);

    }

}, 180000);

        res.status(201).json({
            message: "Booking created successfully",
            booking
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET CURRENT BOOKINGS
router.get("/current/:customerId", async (req, res) => {

    try {

        const bookings = await Booking.find({
            customerId: req.params.customerId,
            status: "Current"
        });

        res.json(bookings);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET PAST BOOKINGS
router.get("/past/:customerId", async (req, res) => {

    try {

        const bookings = await Booking.find({
            customerId: req.params.customerId,
            status: "Past"
        });

        res.json(bookings);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;