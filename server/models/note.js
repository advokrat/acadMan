const mongoose = require('mongoose');

let NoteSchema = new mongoose.Schema(
    {
        timestamp: {
            type: Date,
            default: Date.now
        },
        courseID: String,
        title: String,
        content: String,
    },
    {
        toJSON: { virtuals: true }
    }
);

let Note = mongoose.model('Note', NoteSchema);

module.exports = Note;
