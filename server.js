const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData.js");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Initialize the data
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => console.log(`Server running on http://localhost:${HTTP_PORT}`));
    })
    .catch(err => console.log(`Failed to initialize: ${err}`));

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// About Page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// HTML Demo Page
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Add Student Page
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "addStudent.html"));
});

// FIXED: Get All Students Route
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then((students) => res.json(students))
        .catch(() => res.status(404).send("No students found"));
});

// FIXED: Add Student Route
app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => res.redirect("/students"))
        .catch(err => res.status(500).send(err));
});

// 404 Error Handler
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});
