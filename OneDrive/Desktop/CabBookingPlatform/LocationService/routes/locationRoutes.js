const express = require("express");

const Location = require("../models/Location");

const router = express.Router();


// ADD LOCATION
router.post("/add", async (req, res) => {

    try {

        const location = new Location(req.body);

        await location.save();

        res.status(201).json({
            message: "Location added successfully",
            location
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET ALL LOCATIONS
router.get("/:customerId", async (req, res) => {

    try {

        const locations = await Location.find({
            customerId: req.params.customerId
        });

        res.json(locations);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// UPDATE LOCATION
router.put("/update/:id", async (req, res) => {

    try {

        const updatedLocation = await Location.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedLocation);

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// DELETE LOCATION
router.delete("/delete/:id", async (req, res) => {

    try {

        await Location.findByIdAndDelete(req.params.id);

        res.json({
            message: "Location deleted successfully"
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


// GET WEATHER
router.get("/weather/:locationName", async (req, res) => {

    try {

        res.json({
            location: req.params.locationName,
            weather: "Sunny 25°C"
        });

    }
    catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});


module.exports = router;