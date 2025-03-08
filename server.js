const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData.js");

const app = express();
const port = process.env.PORT || 3000; // Vercel uses port 3000

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Initialize Data (Handle Errors)
collegeData.initialize()
    .then(() => console.log("Data initialized successfully"))
    .catch(err => console.error(`Failed to initialize: ${err}`));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addStudent.html"));
});

app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then((students) => res.json(students))
        .catch(() => res.status(500).send("Error retrieving students"));
});

app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => res.redirect("/students"))
        .catch(err => res.status(500).send("Error adding student"));
});

// 404 Error Handler
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

// Fix for Vercel: Export the app
module.exports = app;
