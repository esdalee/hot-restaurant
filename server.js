// Dependencies
var express = require("express");
var path = require("path");

// Set up the Express App
var app = express();
var PORT = 3000;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations
var reservations = [
  {
    routeName: "luis",
    name: "Luis",
    phoneNum: "1234567890",
    email: "luis@email.com",
    uniqueID: 1
  },
  {
    routeName: "esther",
    name: "Esther",
    phoneNum: "0987654321",
    email: "esther@email.com",
    uniqueID: 2
  },
  {
    routeName: "cory",
    name: "Cory",
    phoneNum: "8648392716",
    email: "cory@email.com",
    uniqueID: 3
  },
  {
    routeName: "kevin",
    name: "Kevin",
    phoneNum: "2347957264",
    email: "kevin@email.com",
    uniqueID: 4
  }
];

// Waitlist
var waitlist = [];

// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

// Reservations Page
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

// Waitlist Page
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all characters
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});

// Displays all characters
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newreservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();
  console.log(newreservation);

  // If there are more than 5 reservations, put into waitlist
  if (reservations.length === 5) {
    console.log("Sorry you're on the waitlist!");
    waitlist.push(newreservation);
    res.json(newreservation);
  }

  // If there are less than 5 reservations, insert into reservations
  else {
  reservations.push(newreservation);
  res.json(newreservation);
  }
});

// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
  console.log("Server listening on: http://localhost:" + PORT);
});