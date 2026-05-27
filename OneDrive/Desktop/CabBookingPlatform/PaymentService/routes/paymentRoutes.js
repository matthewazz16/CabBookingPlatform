const express = require("express");

const Payment = require("../models/Payment");

const router = express.Router();


// CREATE PAYMENT
router.post("/create", async (req, res) => {

    try {

        const {
            bookingId,
            customerId,
            cabFare,
            cabMultiplier,
            daytimeMultiplier,
            passengersMultiplier,
            discountMultiplier
        } = req.body;

        const totalPrice =
            cabFare *
            cabMultiplier *
            daytimeMultiplier *
            passengersMultiplier *
            discountMultiplier;

        const payment = new Payment({
            bookingId,
            customerId,
            cabFare,
            cabMultiplier,
            daytimeMultiplier,
            passengersMultiplier,
            discountMultiplier,
            totalPrice
        });

        await payment.save();

        res.status(201).json({
            message: "Payment processed successfully",
            payment
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET PAYMENT DETAILS
router.get("/:bookingId", async (req, res) => {

    try {

        const payment = await Payment.findOne({
            bookingId: req.params.bookingId
        });

        res.json(payment);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;