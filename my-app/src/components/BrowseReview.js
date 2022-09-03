import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useEffect } from 'react/cjs/react.production.min';
import ReviewCard from './ReviewCard';
import ReviewSearch from './ReviewSearch';

const BrowseReview = ({courseID, setCourseID}) => {
    
    const navigate = useNavigate();


    // useEffect(() => {
    //     console.log("courseID in BrowseReview component: ", courseID);

    //     if (courseID)
    //         navigate(`/feedback/browse/${courseID}/reviews`)
    // }, [courseID]);

    return (
        <div>
            <ReviewSearch courseID={courseID} setCourseID={setCourseID}></ReviewSearch>
        </div>
    );
};

export default BrowseReview;