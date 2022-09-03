const express = require('express');

const { apiGetNotes, apiSearchNotes, apiAddNote, apiDeleteNote } = require("../api/noteController.js")
const { authorization } = require("../api/login.js");
const { validateCourseID } = require('../api/validation.js');

let router = express.Router();

router.get('/', authorization, apiGetNotes);
router.get('/:courseID', authorization, apiSearchNotes);

// router.post('/:courseID/addNote', authorization, validateCourseID, apiAddNote);
router.post('/', authorization, apiAddNote);

router.delete('/:noteID', authorization, apiDeleteNote);

module.exports = router;
