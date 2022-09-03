const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    commentID: String,
    author: String,    // username of the author
    comment: String,
    likes: {
        type: Number,
        default: 0
    }
},
{
    toJSON: { virtuals: true } 
});

const ReviewSchema = new mongoose.Schema({
    reviewID: String,
    author: String,    // username of the author
    review: String,
    courseID: String,
    semester: Number,
    year: String, 
    likes: {
        type: Number,
        default: 0
    },
    comments: {
        type: [String],
        default: []
    }
},
{
    toJSON: { virtuals: true } 
});

const DaySchedule = new mongoose.Schema({
    day: String,
    start: [Number],
    end: [Number]
});

const CourseSchema = new mongoose.Schema({
    courseID: String,
    name: String,
    department: String,
    credits: Number,
    instructors: [String],
    instructor_mailID: [String],
    prerequisites: {
        type: [[String]],
        default: []
    },
    lecture_time: {
        type: [DaySchedule],
        default: []
    },
    tutorial_time: {
        type: [DaySchedule],
        default: []
    },
    practical_time: {
        type: [DaySchedule],
        default: []
    },
    stars: {
        type: Number,
        default: 0
    },
    reviews: {
        type: [String],
        default: []
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    }
},
{
    toJSON: { virtuals: true }
});

var Comment = mongoose.model('Comment', CommentSchema);
var Review = mongoose.model('Review', ReviewSchema);
var Course = mongoose.model('Course', CourseSchema);

module.exports = {CourseSchema, Course, Review, Comment};
// CourseSchema exported for courseplanner models
