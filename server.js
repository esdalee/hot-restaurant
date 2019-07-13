// Dependencies
var express = require("express");

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
    res.sendFile(path.join(__dirname, "waitlist.html"));
});

// Displays all characters
app.get("/api/reservations", function(req, res) {
  return res.json(reservations);
});


// Create New Characters - takes in JSON input
app.post("/api/reservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newreservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreservation);

  characters.push(newreservation);

  res.json(newreservation);
});

// Check for Unique IDs
app.get("/api/reservations/:ID", function(req, res) {
    var inputID = req.params.ID;
    console.log(inputID);
  
    for (var i = 0; i < characters.length; i++) {
      if (inputID === characters[i].uniqueID) {
        console.log ("Existing ID, use another one!");
        return false;
      }
    }
    return res.json(true);
});

// Check for Waitlist
app.get("/api/reservations/:ID", function(req, res) {
    var inputID = req.params.ID;
    console.log(inputID);
  
    for (var i = 0; i < characters.length; i++) {
      if (inputID === characters[i].uniqueID) {
        console.log ("Existing ID, use another one!");
        return false;
      }
    }
    return res.json(true);
});


// Starts the server to begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});