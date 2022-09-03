import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

const ReviewList = ({ courseID, review, setReview }) => {

    const [reviews, setReviews] = useState();
    const [flag, setFlag] = useState(true);

    useEffect(() => {
        setFlag(!flag);
    }, [reviews]);

    useEffect(() => {

        if(reviews){
            setFlag((last) => !last);
            return ;
        }
        // else if(localStorage.getItem('reviews')){
        //     // setReviews(localStorage.getItem('reviews'));
        //     return ;
        // }
        
        console.log("courseID in ReviewList: ", courseID);
        axios.get(`http://localhost:3000/course/${courseID}/getReviews`)
            .then((response) => {
                // setReviewList(() => {
                //     console.log("response: ", response);
                //     return response.data.reviews;
                // });
                console.log("total reviews: ", response.data.reviews.length)
                console.log("logging all courses reviews in frontend: ", response.data.reviews);

                setReviews(response.data.reviews);
                
                localStorage.setItem('reviews', response.data.reviews);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [courseID]);

    return (
        <div>
            <h2>Reviews for course {courseID.toUpperCase()}</h2>
            
            <hr></hr>
            {reviews ? reviews.map((currReview) => {return  <div><ReviewCard currReview={currReview} courseID={courseID} setReview={setReview}/> <br></br> </div> }) : "Loading..."}
        </div>
    );
};

export default ReviewList;