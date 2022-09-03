express = require('express');

const {validateCourseID} = require('../api/validation.js');
const {authorization} = require('../api/login.js');
const {apiAddReview, apiAddToFavourites, apiGetFavoriteCourses, apiGetAllCourses, apiGetReviews, apiAddCommentToReview, apiLikeReview, apiLikeComment, apiGetCourseDetails, apiGetReviewDetails} = require('../api/courseController.js');

router = express.Router();

/****** Adding courses to the database ******/

const {addCourse} = require('../dao/courseDAO.js');
router.post('/add', (req, res) => {
    const dict = req.body;
    for(const key in dict){
        addCourse(key, dict[key]);
    }

    return res.status(200).send("Done");
})

/****** For testing purpose *******/

router.get('/:courseID/getCourseDetails', authorization, validateCourseID, apiGetCourseDetails)

router.post('/:courseID/addReview', authorization, validateCourseID, apiAddReview);

router.post('/:courseID/addToFavorite', authorization, validateCourseID, apiAddToFavourites)

// router.post('/getCourseDetails', authorization, validateCourseID, apiGetCourseDetails);

router.get('/:reviewID/getReviewDetails', authorization, apiGetReviewDetails);

router.get('/:courseID/getReviews', authorization, validateCourseID, apiGetReviews);

router.get('/getFavoriteCourses', authorization, apiGetFavoriteCourses);

//no auth for getAllCourses
router.get('/getAllCourses', apiGetAllCourses);

router.post('/:reviewID/addComment', authorization, apiAddCommentToReview);

router.post('/:reviewID/likeReview', authorization, apiLikeReview);

router.post('/:commentID/likeComment', authorization, apiLikeComment);

module.exports = router;