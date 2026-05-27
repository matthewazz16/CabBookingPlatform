const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({

    customerId: {
        type: String,
        required: true
    },

    pickupLocation: {
        type: String,
        required: true
    },

    destinationLocation: {
        type: String,
        required: true
    },

    bookingDate: {
        type: Date,
        required: true
    },

    passengers: {
        type: Number,
        required: true
    },

    cabType: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Current"
    }

}, { timestamps: true });

module.exports = mongoose.model("Booking", BookingSchema);