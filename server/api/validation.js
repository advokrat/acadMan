// for validating URLs and various form inputs

const  {checkCourse} = require('../dao/courseDAO.js');

const validateCourseID = async (req, res, next) => {
    const courseID = req.params['courseID'];
    checkCourse(courseID)
    .then( result => {
        return next();
    })
    .catch( error => {
        return res.status(error.status).json({"message": error.message});
    })
    // need to be updated yet
}

module.exports = {validateCourseID};