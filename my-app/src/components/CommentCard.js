import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { useEffect } from 'react/cjs/react.production.min';
import { useNavigate } from 'react-router-dom';
import ReviewDetail from './ReviewDetail';

const CommentCard = ({ comment, text }) => {
    const [flag, setFlag] = useState(false);
    const [like, setLike] = useState(1);
    // const [reviewID, setReviewID] = useState();

    console.log("comment is  inside comment card:", comment);
    const navigate = useNavigate();

    // console.log("currReview inside CommentCard: ", currReview);
    // function handleCardClick() {
    //     console.log("card clicked");
    // }

    // const popover = (
    //     <Popover id="popover-basic">
    //         <Popover.Body style={{ color: "black" }}>
    //             Added
    //         </Popover.Body>
    //     </Popover>
    // );

    // // useEffect(()=>{
    // //     console.log("currReview data in CommentCard: ", currReview);
    // // }, [currReview]);


    // function handleViewDetails(event) {
    //     // setFavFlag(() => {
    //     //     return true;
    //     // });

    //     setFlag(!flag);
    //     setReview(currReview);
    //     navigate(`/feedback/browse/${courseID}/reviews/${currReview.reviewID}`);
    // }

    // function handleBadgeClick() {
    //     axios.post(`http://localhost:3000/course/${currReview.reviewID}/likeReview`, { like: like })
    //         .then((res) => {
    //             console.log(res.message);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    //     setLike(() => {
    //         return like == -1 ? 1 : -1;
    //     });
    // }

    return (
        <div>
            <Card style={{ color: "black" }}>
                <Card.Body >
                    <Card.Title style={{ position: "absolute" }}>{comment.author + " commented:"}</Card.Title>
                    {/* <h5>
                        <Badge bg="secondary" style={{ position: "absolute", top: "10px", right: "10px" }} onClick={handleBadgeClick}> likes: {currReview.likes}</Badge>
                    </h5> */}
                    <br></br>
                    {/* <Card.Text style={{ marginTop: "1rem", marginBottom: "2rem", color: "black" }}> */}
                        {/* <h6 style={{ position: "absolute", left: "20px" }}>review content</h6> */}
                        <br></br>
                        <p style={{textAlign:"left"}}>
                        {
                            comment.comment
                        }
                        </p>
                    {/* </Card.Text> */}

                    {/* <OverlayTrigger trigger="click" placement="right" overlay={popover} delay={{ show: 250, hide: 400 }}> */}
                    {/* <Button variant="success" style={{ position: "absolute", bottom: "10px", right: "10px" }} onClick={handleViewDetails} >View Details</Button> */}
                    {/* </OverlayTrigger> */}

                </Card.Body>
            </Card>
        </div>
    );
};

export default CommentCard;