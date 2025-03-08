const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData.js");

const app = express();
const port = process.env.PORT || 3000; // Vercel uses port 3000

//  Serve static files like CSS and images
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

//  Ensure __dirname is used for routing HTML pages
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "views", "home.html")));
app.get("/about", (req, res) => res.sendFile(path.join(__dirname, "views", "about.html")));
app.get("/htmlDemo", (req, res) => res.sendFile(path.join(__dirname, "views", "htmlDemo.html")));
app.get("/students/add", (req, res) => res.sendFile(path.join(__dirname, "views", "addStudent.html")));

//  Ensure students page works correctly
app.get("/students", (req, res) => {
    collegeData.getAllStudents()
        .then((students) => res.json(students))
        .catch(() => res.status(500).send("Error retrieving students"));
});

//  Handle "Add Student" form submission
app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => res.redirect("/students"))
        .catch(err => res.status(500).send("Error adding student"));
});

//  Fix: Handle 404 errors properly
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});

//  Fix for Vercel: Export the app instead of using `app.listen()`
module.exports = app;
