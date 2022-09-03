const express = require('express');

const {authorization} = require('../api/login.js');
const {apiCreateEvent, apiGetAllEvents, apiDeleteEvent} = require('../api/calenderController.js');

var router = express.Router();

router.post('/addEvent', authorization, apiCreateEvent);
router.get('/getEvents', authorization, apiGetAllEvents);
router.delete('/deleteEvent/:eventID', authorization, apiDeleteEvent);

module.exports = router;