const mongoose = require('mongoose');
const { CourseSchema } = require('../models/course');

// const CPCourseSchema = new mongoose.Schema(
//     {
//         courseID: String,
//         name: String,
//     },
//     {
//         toJSON: { virtuals: true }
//     }
// );

const SemSchema = new mongoose.Schema(
    {
        courses: {
            type: [CourseSchema],
            default: []
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

const CoursePlanSchema = new mongoose.Schema(
    {
        sems: {
            type: [SemSchema],
            default: []
        }
    },
    {
        toJSON: { virtuals: true }
    }
);

// let CPCourse = mongoose.model('CPCourse', CPCourseSchema);
let Semester = mongoose.model('Semester', SemSchema)
let CoursePlan = mongoose.model('CoursePlan', CoursePlanSchema);

module.exports = {
	Semester,
	CoursePlan,
	CoursePlanSchema,
};
