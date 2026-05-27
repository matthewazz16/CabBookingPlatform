const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookingRoutes = require("./routes/bookingRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/bookings", bookingRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Booking Service is running"
    });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Booking Service running on port ${PORT}`);
});