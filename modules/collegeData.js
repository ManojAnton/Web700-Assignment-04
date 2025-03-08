const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize Data
module.exports.initialize = function () {
    return new Promise((resolve, reject) => {
        fs.readFile("./data/courses.json", "utf8", (err, courseData) => {
            if (err) reject("Unable to load courses");
            fs.readFile("./data/students.json", "utf8", (err, studentData) => {
                if (err) reject("Unable to load students");
                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve();
            });
        });
    });
};

// Get All Students
module.exports.getAllStudents = function () {
    return new Promise((resolve, reject) => {
        if (!dataCollection.students.length) reject("No students found");
        resolve(dataCollection.students);
    });
};

// Add Student (Fixes studentNum issue)
module.exports.addStudent = function (studentData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA === "true";
        studentData.studentNum = dataCollection.students.length + 1; // Ensure unique ID
        dataCollection.students.push(studentData);
        fs.writeFile("./data/students.json", JSON.stringify(dataCollection.students, null, 4), (err) => {
            if (err) reject("Unable to add student");
            resolve();
        });
    });
};
