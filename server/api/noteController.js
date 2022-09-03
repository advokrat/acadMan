const { getNotes, searchNotes, addNote, deleteNote } = require('../dao/NotesDAO.js');

async function apiGetNotes(req, res) {
    const username = req.username;
    getNotes(username)
        .then(result => {
            res.status(result.status).json({
                message: result.message,
                notes: result.notes,
            });
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        });
}

async function apiSearchNotes(req, res) {
    const username = req.username;
    const { courseID } = req.params
    searchNotes(username, courseID)
        .then(result => {
            res.status(result.status).json({
                message: result.message,
                notes: result.notes,
            });
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        });
}

async function apiAddNote(req, res) {
    const username = req.username;
    const { courseID, title, content } = req.body

    if (!title)
        res.status(422).json("A required field is empty");
    else {
        addNote(username, courseID, title, content)
            .then(result => {
                res.status(result.status).json(result.message);
            })
            .catch(error => {
                res.status(error.status).json(error.message);
            });
    }
}

async function apiDeleteNote(req, res) {
    const username = req.username
    const { noteID } = req.params
    deleteNote(username, noteID)
        .then(result => {
            res.status(result.status).json(result.message);
        })
        .catch(error => {
            res.status(error.status).json(error.message);
        });
}

module.exports = { apiGetNotes, apiSearchNotes, apiAddNote, apiDeleteNote };
