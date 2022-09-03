const { Semester } = require('../models/coursePlanner');
const { Course } = require('../models/course');
const User = require('../models/user');

const SERVER_ERROR_MSG = "Internal Server Error";
const USER_NOT_FOUND_ERROR_MSG = "User not found in the database";
const SEM_NOT_FOUND_ERROR_MSG = semNumber => `Semester ${semNumber} does not exist`;

async function addCourse(courseID, semNumber, username) {
    return new Promise((resolve, reject) => {
        Course.findOne({ courseID: courseID.toLowerCase() }, (err, course) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!course) return reject({ status: 400, message: `Course ${courseID} not found` });
            else User.findOne({ username: username }, (err, user) => {
                if (err) {
                    return reject({ status: 500, message: SERVER_ERROR_MSG });
                }
                else if (!user) {
                    return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
                }
                else if (!user.coursePlan.sems[semNumber - 1]) {
                    return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
                }
                else {
                    let semester = user.coursePlan.sems[semNumber - 1];
                    const alreadyPresentCourse = semester.courses.find(elem => elem.courseID === course.courseID);
                    if (!alreadyPresentCourse) {
                        semester.courses.push(course);
                        user.save();
                        return resolve({ status: 200, message: `Course ${courseID} added to semester ${semNumber} courses` });
                    }
                    else {
                        return reject({ status: 405, message: `Course ${courseID} already exists in semester ${semNumber}` });
                    }
                }
            });
        });

    });
}

async function deleteCourse(courseID, semNumber, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            let semester = user.coursePlan.sems[semNumber - 1];
            if (!semester) {
                return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
            }
            let courseIndex = semester.courses.findIndex(elem => elem.courseID === courseID);
            if (courseIndex == -1) {
                return reject({ status: 400, message: "Course not found" });
            }
            else {
                semester.courses.splice(courseIndex, 1);
                user.save();
                return resolve({ status: 200, message: "Course deleted successfully" });
            }
        });
    });
}

// add a new sem after semNumber
async function addSemester(semNumber, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            else if (+semNumber && !user.coursePlan.sems[semNumber - 1]) {
                return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
            }
            else {
                const semester = new Semester();
                semester.save();
                user.coursePlan.sems.splice(semNumber, 0, semester);
                user.save();
                return resolve({ status: 200, message: "New semester added" });
            }
        });
    });
}

async function addSemesterAtEnd(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return reject({ status: 500, message: SERVER_ERROR_MSG });
            }
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            else {
                const semester = new Semester();
                semester.save();
                user.coursePlan.sems.push(semester);
                user.save();
                return resolve({ status: 200, message: "New empty semester added!" });
            }
        });
    });
}

async function deleteSemester(semNumber, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            else if (!user.coursePlan.sems[semNumber - 1]) {
                return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
            }
            else {
                user.coursePlan.sems.splice(semNumber - 1, 1); // removes semester
                user.save();
                return resolve({ status: 200, message: `Deleted semester ${semNumber} successfully!` });
            }
        });
    });
}

// async function deleteSemesterFromEnd(username) {
//     return new Promise((resolve, reject) => {
//         User.findOne({ username: username }, (err, user) => {
//             if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
//             else if (!user) {
//                 return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
//             }
//             else if() {
//                 return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
//             }
//             else {
//                 user.coursePlan.sems.splice(semNumber - 1, 1); // removes semester
//                 user.save();
//                 return resolve({ status: 200, message: `Deleted semester ${semNumber} successfully!` });
//             }
//         });
//     });
// }

async function getNumberOfSemesters(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            else {
                const numSem = user.coursePlan.sems.length;
                return resolve({
                    status: 200,
                    message: "Found number of semesters",
                    numSem: numSem,
                });
            }
        });
    });
}

async function getAllSemesters(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            else return resolve({
                status: 200,
                message: "Found all semesters successfully!",
                semesters: user.coursePlan.sems,
            });
        });
    });
}

async function getSemester(semNumber, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            else if (!user.coursePlan.sems[semNumber - 1]) {
                return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) })
            }
            else {
                return resolve({
                    status: 200,
                    message: `Found semester ${semNumber} successfully!`,
                    semester: user.coursePlan.sems[semNumber - 1],
                });
            }
        });
    });
}

async function getCourse(courseID, semNumber, username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return reject({ status: 500, message: SERVER_ERROR_MSG });
            else if (!user) {
                return reject({ status: 400, message: USER_NOT_FOUND_ERROR_MSG });
            }
            const semester = user.coursePlan.sems[semNumber - 1];
            if (!semester) {
                return reject({ status: 400, message: SEM_NOT_FOUND_ERROR_MSG(semNumber) });
            }
            courseFound = semester.courses.find(elem => elem.courseID === courseID);
            if (!courseFound) {
                return reject({ status: 400, message: `Course ${courseID} not found in semester ${semNumber}` });
            }
            return resolve({
                status: 200,
                message: `Course ${courseID} in semester ${semNumber} found successfully`,
                course: courseFound,
            });
        });
    });
}

module.exports = {
    addCourse,
    deleteCourse,
    addSemester,
    addSemesterAtEnd,
    deleteSemester,
    getNumberOfSemesters,
    getAllSemesters,
    getSemester,
    getCourse,
};
