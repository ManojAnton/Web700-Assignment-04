const fs = require("fs");

class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize Data (Only Read Files, No Writing)
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
        if (!dataCollection || !dataCollection.students.length) reject("No students found");
        resolve(dataCollection.students);
    });
};

// Add Student (Without Writing to File)
module.exports.addStudent = function (studentData) {
    return new Promise((resolve) => {
        studentData.TA = studentData.TA === "true";
        studentData.studentNum = dataCollection.students.length + 1;
        dataCollection.students.push(studentData);
        resolve(); // No file writing (Vercel fix)
    });
};
