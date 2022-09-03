const mongoose = require('mongoose');
const { CoursePlanSchema } = require('./coursePlanner');
const { NoteSchema } = require('./note');

let UserSchema = new mongoose.Schema(
    {
        username: String,
        rollNo: Number,
        name: String,
        password: String,
        department: String,
        doubleMajor: {
            type: String,
            default: undefined
        },
        dualDegree: {
            type: String,
            default: undefined
        },
        favoriteCourses: {
            type: [String],
            default: []
        },
        likedReviews: {
            type:[String],
            default:[]
        },
        likedComments:{
            type:[String],
            default:[]
        },
        // todo: option to have multiple plans
        coursePlan: {
					type: CoursePlanSchema,
					default: {}
				},
        notes: {
            type: [NoteSchema],
            default: []
        },
    },
    {
        toJSON: { virtuals: true }
    }
);

let User = mongoose.model('User', UserSchema);
module.exports = User;
