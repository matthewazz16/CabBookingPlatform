const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({

    customerId: {
        type: String,
        required: true
    },

    locationName: {
        type: String,
        required: true
    },

    weather: {
        type: String,
        default: "Sunny"
    }

}, { timestamps: true });

module.exports = mongoose.model("Location", LocationSchema);