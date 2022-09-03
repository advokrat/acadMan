const {addReview, getReviewDetails, addToFavourites, getAllCourses, getFavoriteCourses, getReviews, addCommentToReview, likeComment, likeReview, getCourseDetails} = require('../dao/courseDAO.js');

async function apiAddReview(req, res) {
    const courseID = req.params['courseID'],
        review = req.body.review,
        semester = req.body.semester,
        year = req.body.year,
        rating = req.body.rating || 0,
        username = req.username;

    addReview(courseID, review, semester, year, rating, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiGetCourseDetails (req, res) {
    const courseID = req.params['courseID'];

    getCourseDetails(courseID)
    .then( (result) => {
        return res.status(result.status).json({message: result.message, details: result.details});
    })
    .catch( (error) => {
        return res.status(error.status).json({message: error.message});
    });
}

async function apiGetReviewDetails (req, res) {
    const reviewID = req.params['reviewID'];

    getReviewDetails(reviewID)
    .then( result => {
        res.status(result.status).json({message: result.message, review: result.details});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    })
}

async function apiGetReviews(req, res) {
    const courseID = req.params['courseID'];
    let tempList = [];

    getReviews(courseID)
        .then(result => {
            console.log("results: ", result.reviewsList);
            for(let i = 0;i < result.reviewsList.length;i++){
                if(result.reviewsList[i])
                    tempList.push(result.reviewsList[i]);

            }

            res.status(result.status).json({ message: result.message, reviews: tempList });
        })
        .catch(error => {
            res.status(error.status).json({ message: error.message });
        });
}

async function apiAddToFavourites(req, res) {
    const courseID = req.params['courseID'],
        username = req.username;

    addToFavourites(courseID, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiGetFavoriteCourses(req, res) {
    const username = req.username;

    console.log(username);

    getFavoriteCourses(username)
    .then( result => {
        res.status(result.status).json({message: result.message, favoriteCourses: result.favoriteCourses});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    });
}

async function apiGetAllCourses(req, res) {
    // const username = req.username;

    // console.log(username);

    getAllCourses()
    .then( result => {
        res.status(result.status).json({message: result.message, courses: result.courses});
    })
    .catch( error => {
        res.status(error.status).json({message: error.message});
    });
}


async function apiAddCommentToReview (req, res) {
    const reviewID = req.params['reviewID'],
        username = req.username,
        comment = req.body.comment;
        

    addCommentToReview(reviewID, username, comment)
    .then( result => {
        // console.log("message: ", result.message);
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    });
}

async function apiLikeReview (req, res) {
    const reviewID = req.params['reviewID'];
    const like = req.body.like;

    likeReview(reviewID, like)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    })
}

async function apiLikeComment (req, res) {
    const commentID = req.params['commentID'];

    likeComment(commentID)
    .then( result => {
        return res.status(result.status).json({message: result.message});
    })
    .catch( error => {
        return res.status(error.status).json({message: error.message});
    })
}

module.exports = {apiAddReview, apiGetReviewDetails, apiGetReviews, apiGetCourseDetails, apiAddToFavourites, apiGetFavoriteCourses, apiGetAllCourses, apiAddCommentToReview, apiLikeReview, apiLikeComment};
