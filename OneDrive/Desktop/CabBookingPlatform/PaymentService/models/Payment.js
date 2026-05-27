const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({

    bookingId: {
        type: String,
        required: true
    },

    customerId: {
        type: String,
        required: true
    },

    cabFare: {
        type: Number,
        required: true
    },

    cabMultiplier: {
        type: Number,
        required: true
    },

    daytimeMultiplier: {
        type: Number,
        required: true
    },

    passengersMultiplier: {
        type: Number,
        required: true
    },

    discountMultiplier: {
        type: Number,
        default: 1
    },

    totalPrice: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model("Payment", PaymentSchema);