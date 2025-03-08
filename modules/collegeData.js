const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize Data (Handle Errors)
module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
            if (err || !courseData) {
                console.error("Error: Unable to load courses.json, using empty array.");
                courseData = "[]"; // Provide a default empty array
            }

            fs.readFile("./data/students.json", "utf8", (err, studentData) => {
                if (err || !studentData) {
                    console.error("Error: Unable to load students.json, using empty array.");
                    studentData = "[]"; // Provide a default empty array
                }

                try {
                    dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                    resolve();
                } catch (parseError) {
                    reject("JSON Parsing Error: Check courses.json and students.json");
                }
            });
        });
    });
};
