import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Stack from 'react-bootstrap/Stack';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import LikeButton from './LikeButton';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CommentCard from './CommentCard';

const ReviewDetail = ({ review, setReview }) => {

    const [flag, setFlag] = useState("0");
    const [myComment, setMyComment] = useState();
    const [allComments, setAllComments] = useState([]);

    // let temp;

    function handleCommentSubmission(event){
        event.preventDefault();

        // setMyComment(event.target.value);
        console.log("new comment is: ", event.target.value);

        // setAllComments([...allComments, myComment]);

        axios.post(`http://localhost:3000/course/${review.reviewID}/addComment`, {
            comment: myComment
        })
        .then((res) => {
            console.log("comment added");
            setFlag(flag === "1" ? "2" : "1");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCommentChange(event){
        setMyComment(event.target.value);
    }

    useEffect(()=>{
     
        axios.get(`http://localhost:3000/course/${review.reviewID}/getReviewDetails`)
        .then((res)=>{
            // setMyComment(res.)
            console.log("getting review details: ", res.data.review.comments);
            setAllComments(res.data.review.comments);
        })
        .catch((err)=>{
            console.log(err);
        })
    }, [flag]);

    useEffect(() => {

    }, [allComments]);

    return (
        <div>
            <br></br>
            <Card style={{ color: "black", textAlign: "left", paddingLeft: "3%", paddingRight: "2%" }}>

                <div style={{ paddingTop: "2%" }}>
                    <h4 style={{ display: "inline" }}>{"Author username: " + review.author}</h4>
                    {/* <Stack gap={2} style={{ float: 'right'}}>
                    <img src="https://i.pravatar.cc/300" style={{ borderRadius: "50%", float: 'right', width: "25%", height: "25%" }} />
                        <span style={{ float: 'right', position: "" }}>{username}</span>
                    </Stack> */}

                   
                    {/* <span >
                        <img src="https://i.pravatar.cc/300" style={{ borderRadius: "50%", float: 'right', width: "5%", height: "5%" }} />
                        <p style={{ display: "block", float: 'right', position: "" }}>{"username"}</p>
                    </span> */}


                </div>
                <br></br>
                <div style={{ paddingRight: "5%" }}>
                    
                    <p> <b >Review:         </b>
                        {review.review}
                    </p>
                    {/* <br></br> */}
                    {/* <h6>Course tags</h6>
                    <p>
                        {
                            tagList
                        }
                    </p> */}
                    {/* <h6>Author comments:</h6>
                    <p>
                        Donec in est sed ligula molestie imperdiet. Aliquam sagittis magna id lorem congue, id elementum elit fermentum. Nulla facilisi. Donec ac metus vestibulum, vehicula augue vel, cursus ante. Sed dictum ante nec efficitur aliquet. Morbi viverra eleifend libero, at feugiat ante molestie nec. Duis eros quam, porta eget dolor sit amet, auctor bibendum tellus. Vivamus bibendum nunc a est sodales ultrices. Duis nisl ante, scelerisque in tortor eu, rutrum auctor purus
                    </p> */}
                    {/* <h6>Course Rating by Author:</h6> */}
                    {/* <span className="star-rating">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    cursor="auto"
                                    type="button"
                                    key={index}
                                    className={index <= (rating) ? "on" : "off"}
                                >
                                    <span className="star">&#9733;</span>
                                </button>
                            );
                        })}
                    </span> */}

                    {' '}
                    {/* <Badge bg="success" width="40px" height="22px" verticalAlign="super">{"rating"}</Badge> */}
                    <p style={{ textAlign: "center", opacity: "0.5" }}>
                        Posted on: {new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear() + ' ' + new Date().getHours() + ':' + new Date().getMinutes()}
                    </p>


                </div>

            </Card>
            <br />

            {/* <Row>
                <Col xs={7}>
                    <Form.Control placeholder="City" />
                </Col>

            </Row> */}
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label><strong>Add comment:</strong></Form.Label>
                    <Form.Control placeholder="Add your comment here..." as="textarea" rows={3} value={myComment} onChange={handleCommentChange}/>
                </Form.Group>
                <br />
                <Button variant="primary" type="submit" onClick={handleCommentSubmission}>
                    Submit
                </Button>
            </Form>

            <hr></hr>
            <h2>Comments:</h2>
            {allComments ? allComments.map((comment) => { return <div><CommentCard comment={comment}></CommentCard> <br></br></div> }) : "No comments"}
            {/* {flag !== "0" ? <CommentCard ></CommentCard>:<></>} */}
        </div >
    );
};

export default ReviewDetail;