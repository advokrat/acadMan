const Note = require('../models/note.js');
const User = require('../models/user.js');

const SERVER_ERROR_MSG = "Internal Server Error";
const USER_NOT_FOUND_ERROR_MSG = "User not found";

async function getNotes(username) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({
                    status: 500,
                    message: SERVER_ERROR_MSG
                });
            }
            else if (!user) {
                reject({
                    status: 400,
                    message: USER_NOT_FOUND_ERROR_MSG
                });
            }
            else {
                resolve({
                    status: 200,
                    message: 'Notes found',
                    notes: user.notes
                });
            }
        });
    });
}

async function searchNotes(username, courseID) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({
                    status: 500,
                    message: SERVER_ERROR_MSG
                });
            }
            else if (!user) {
                reject({
                    status: 400,
                    message: USER_NOT_FOUND_ERROR_MSG
                });
            }
            else {


                courseNotes = user.notes.filter(note => note.courseID && (note.courseID.toLowerCase() == courseID.toLowerCase()))
                resolve({
                    status: 200,
                    message: 'Notes found',
                    notes: courseNotes
                });
            }
        });
    });
}

async function addNote(username, courseID, title, content) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({
                    status: 500,
                    message: SERVER_ERROR_MSG
                });
            }
            else if (!user) {
                reject({
                    status: 400,
                    message: USER_NOT_FOUND_ERROR_MSG
                });
            }
            else {
                let note = new Note({
                    courseID: courseID,
                    title: title,
                    content: content
                });
                note.save();
                user.notes.push(note);
                user.save();
                resolve({
                    status: 200,
                    message: 'Note inserted'
                });
            }
        });
    });
}

async function deleteNote(username, noteID) {
    return new Promise((resolve, reject) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                reject({
                    status: 500,
                    message: SERVER_ERROR_MSG
                });
            }
            else if (!user) {
                reject({
                    status: 400,
                    message: USER_NOT_FOUND_ERROR_MSG
                });
            }
            else {
                let noteIndex = user.notes.findIndex(note => note._id.valueOf() == noteID);
                if (noteIndex == -1) {
                    reject({ status: 400, message: "Note not found" });
                }
                else {
                    user.notes.splice(noteIndex, 1);
                    user.save();
                    return resolve({ status: 200, message: "Note deleted" });
                }
            }
        });
    });
}

module.exports = { getNotes, searchNotes, addNote, deleteNote };
