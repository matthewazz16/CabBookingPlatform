const API_URL = "http://localhost:5004";

let currentUserId = "";


// REGISTER
async function registerUser() {

    const response = await fetch(`${API_URL}/api/users/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            firstName: document.getElementById("regFirstName").value,
            surname: document.getElementById("regSurname").value,
            email: document.getElementById("regEmail").value,
            password: document.getElementById("regPassword").value
        })

    });

    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}


// LOGIN
async function loginUser() {

    const response = await fetch(`${API_URL}/api/users/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: document.getElementById("loginEmail").value,
            password: document.getElementById("loginPassword").value
        })

    });

    const data = await response.json();

    currentUserId = data.user.id;

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}


// CREATE BOOKING
async function createBooking() {

    const response = await fetch(`${API_URL}/api/bookings/create`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            customerId: currentUserId,
            pickupLocation: document.getElementById("pickupLocation").value,
            destinationLocation: document.getElementById("destinationLocation").value,
            bookingDate: document.getElementById("bookingDate").value,
            passengers: document.getElementById("passengers").value,
            cabType: document.getElementById("cabType").value
        })

    });

    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}


// ADD LOCATION
async function addLocation() {

    const response = await fetch(`${API_URL}/api/locations/add`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            customerId: currentUserId,
            locationName: document.getElementById("locationName").value,
            weather: "Sunny 25°C"
        })

    });

    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}


// GET LOCATIONS
async function getLocations() {

    const response = await fetch(
        `${API_URL}/api/locations/${currentUserId}`
    );

    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}


// GET NOTIFICATIONS
async function getNotifications() {

    const response = await fetch(
        `${API_URL}/api/users/${currentUserId}/notifications`
    );

    const data = await response.json();

    document.getElementById("output").textContent =
        JSON.stringify(data, null, 2);
}