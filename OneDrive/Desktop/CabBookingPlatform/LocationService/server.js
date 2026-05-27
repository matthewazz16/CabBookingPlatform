const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const locationRoutes = require("./routes/locationRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/locations", locationRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Location Service is running"
    });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`Location Service running on port ${PORT}`);
});