

const mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    timestamp : {
        type : Date,
        default : Date.now
    },
    rollNo: Number,
    title: String,
    startTime: String,
    endTime: String,
    daysOfWeek:[Number],
    repeatWeekly: Boolean,
    addReminder: Boolean,
    reminderOffset: Number,
    content: String
},
{
    toJSON: { virtuals: true } 
});

var Event = mongoose.model('Event', EventSchema);

module.exports = Event;