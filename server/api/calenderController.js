const { response } = require('express');
const { insertEvent, getAllEvents, deleteEvent } = require('../dao/CalenderDAO.js');

function apiCreateEvent(req, res){
    const username = req.username,
        title = req.body.title,
        startDate = req.body.startDate,
        endDate = req.body.endDate,
        startTime = req.body.startTime,
        endTime = req.body.endTime,
        allDay = req.body.allDay,
        repeatWeekly = req.body.repeatWeekly,
        content = req.body.content;

    const eventDict = {
        username: username,
        title: title,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: endTime,
        allDay: allDay,
        repeatWeekly: repeatWeekly,
        content: content
    }

    insertEvent(eventDict)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(result.status).json({message: result.message});
    });
}

function apiGetAllEvents(req, res){
    const username = req.username;

    getAllEvents(username)
    .then( (result) => {
        return res.status(result.status).json({message: result.message, events: result.events});
    })
    .catch( (error) => {
        return res.status(error.status).json({message: error.message});
    });
}

function apiDeleteEvent (req, res) {
    const eventID = req.params['eventID'],
        username = req.username;

    deleteEvent(username, eventID)
    .then( (result) => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( (error) => {
        return res.status(error.status).json({message: error.message});
    })
}   

module.exports = {apiCreateEvent, apiGetAllEvents, apiDeleteEvent};