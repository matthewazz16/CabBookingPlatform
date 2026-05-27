const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },

    surname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    notifications: [NotificationSchema]

}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);