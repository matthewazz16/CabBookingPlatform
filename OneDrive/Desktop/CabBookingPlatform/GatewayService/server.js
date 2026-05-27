const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CUSTOMER_SERVICE = "http://localhost:5000";
const BOOKING_SERVICE = "http://localhost:5001";
const PAYMENT_SERVICE = "http://localhost:5002";
const LOCATION_SERVICE = "http://localhost:5003";

app.get("/", (req, res) => {
    res.json({ message: "Gateway Service is running" });
});

// CUSTOMER ROUTES
app.post("/api/users/register", async (req, res) => {
    const response = await axios.post(`${CUSTOMER_SERVICE}/api/users/register`, req.body);
    res.json(response.data);
});

app.post("/api/users/login", async (req, res) => {
    const response = await axios.post(`${CUSTOMER_SERVICE}/api/users/login`, req.body);
    res.json(response.data);
});

app.get("/api/users/:id/notifications", async (req, res) => {
    const response = await axios.get(`${CUSTOMER_SERVICE}/api/users/${req.params.id}/notifications`);
    res.json(response.data);
});

// BOOKING ROUTES
app.post("/api/bookings/create", async (req, res) => {
    const response = await axios.post(`${BOOKING_SERVICE}/api/bookings/create`, req.body);
    res.json(response.data);
});

app.get("/api/bookings/current/:customerId", async (req, res) => {
    const response = await axios.get(`${BOOKING_SERVICE}/api/bookings/current/${req.params.customerId}`);
    res.json(response.data);
});

// PAYMENT ROUTES
app.post("/api/payments/create", async (req, res) => {
    const response = await axios.post(`${PAYMENT_SERVICE}/api/payments/create`, req.body);
    res.json(response.data);
});

// LOCATION ROUTES
app.post("/api/locations/add", async (req, res) => {
    const response = await axios.post(`${LOCATION_SERVICE}/api/locations/add`, req.body);
    res.json(response.data);
});

app.get("/api/locations/:customerId", async (req, res) => {
    const response = await axios.get(`${LOCATION_SERVICE}/api/locations/${req.params.customerId}`);
    res.json(response.data);
});

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
    console.log(`Gateway Service running on port ${PORT}`);
});