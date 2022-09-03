import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import StarRating from './Start-rating';
import 'react-dropdown/style.css';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
// import Dropdown from 'react-bootstrap/Dropdown'


const buttonStyle = {
    width: "17%",
    backgroundColor: "#474948",
    color: "white",
    padding: "10px 10px",
    margin: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    justifyContent: "center"
}

const FeedbackForm = function () {
    var [feedback, setFeedback] = useState({});
    var [tag, setTag] = useState();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [courseList, setCourseList] = useState([]);

    const semOptions = [
        { semText: 'Odd', code: 0 }, { semText: 'Even', code: 1 }, { semText: 'Summer', code: 2 }
    ];
    // const defaultOption = semOptions[0];

    let currentYear = new Date().getFullYear();
    let earliestYear = 1960;
    let YearList = [];
    while (currentYear >= earliestYear) {
        YearList.push(currentYear);
        currentYear = currentYear - 1;
    }

    function handleCourseIDChange(event) {
        setFeedback(previousState => {
            return { ...previousState, courseID: event.target.value }
        });
        // console.log(feedback);
    }

    function handleSemChange(event) {
        setFeedback(previousState => {
            return { ...previousState, sem: event.target.value }
        });

        // console.log(feedback);

    }

    function handleYearChange(event) {
        setFeedback(previousState => {
            return { ...previousState, year: event.target.value }
        });

        // console.log(feedback);

    }

    function handleTagChange(event) {
        setTag(event.target.value);
        // console.log("tag = " + tag);
    }


    function handleTagSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        let tempList;

        if (feedback.tags) {
            tempList = feedback.tags;
            tempList.push(event.target.value);
        }
        else {
            tempList = [event.target.value];
        }
        // console.log(tempList);
        setFeedback(previousState => {
            return { ...previousState, tags: tempList };
        });
    }

    function handleReviewChange(event) {
        setFeedback(previousState => {
            return { ...previousState, review: event.target.value }
        });

        // console.log(feedback);

    }

    useEffect(() => {
        axios.get(`http://localhost:3000/course/getAllCourses`)
            .then((response) => {
                // setReviewList(() => {
                //     console.log("response: ", response);
                //     return response.data.reviews;
                // });
                // console.log("logging all courses in frontend: ", response.data.courses);
                setCourseList(response.data.courses);
            })
            .catch((error) => {
                console.log(error);
            });
    })

    function handleFeedbackSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        // console.log(feedback);
        // alert(feedback);

        //make sure courseID is filled
        const courseID = feedback.courseID && feedback.courseID.toLowerCase();
        console.log(feedback.year);
        axios.post(`http://localhost:3000/course/${courseID}/addReview`, {
            courseID: courseID,
            sem: feedback.sem, year: feedback.year, rating: rating,
            review: feedback.review
        })
            .then(function (response) {
                if (response.status === 200) {
                    console.log("posted successfully");
                    alert(response.data.message)
                }
                else {
                    console.log("error1: " + "oops!! there was some ERROR");
                }
            }).catch(function (error) {
                const response = error.response;
                alert(response.data.message);
                window.location.reload();
                console.log(error);
                console.log("oops!! API request failed");
            });
    }

    return (
        <div>

            <form className="notes-form" style={{ color: "black" }}>
                <div>
                    <h1>Add Review</h1>
                </div>
                <div className="input">
                    <span><label>Course ID</label></span>

                    {/* <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                    </Dropdown.Menu> */}

                    {/* <label>Course ID</label> */}
                    <select value={feedback.title} className="input-select" onChange={handleCourseIDChange} required>
                        {
                            courseList.map((curr) => {
                                return <option value={curr.courseID}>{curr.courseID}</option>
                            })
                        }
                    </select>

                    {/* <input type="text" className="input-title" value={feedback.title} onChange={handleCourseIDChange} required placeholder="MTH101A" /> */}
                </div>

                <div className="input">
                    <label>Semester</label>
                    <select value={feedback.sem} className="input-select" onChange={handleSemChange} required>
                        {
                            semOptions.map((currSem) => {
                                return <option value={currSem.code}>{currSem.semText}</option>
                            })
                        }
                    </select>
                </div>
                <div className="input">

                    <label>Year</label>
                    <select value={feedback.year} className="input-select" onChange={handleYearChange} required>
                        {
                            YearList.map((currYear) => {
                                let disp = `${currYear.toString()}-${(currYear + 1).toString().substring(2)}`;
                                return <option value={currYear} className="center-box">{disp}</option>
                            })
                        }
                    </select>
                </div>

                <div className="input">
                    <label>Feedback:</label>
                    <br />
                    <textarea type="text" className="input-textarea" value={feedback.description} onChange={handleReviewChange} placeholder="Enter your feedback here..." ></textarea>
                </div>

                <div className="input">
                    <label>Course Rating</label>
                    <div className="star-rating">
                        {[...Array(5)].map((star, index) => {
                            index += 1;
                            return (
                                <button
                                    type="button"
                                    key={index}
                                    className={index <= (hover || rating) ? "on" : "off"}
                                    onClick={() => setRating(index)}
                                    onMouseEnter={() => setHover(index)}
                                    onMouseLeave={() => setHover(rating)}
                                    required>
                                    <span className="star">&#9733;</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <Link to='/' >
                        <button style={buttonStyle}>Cancel</button>
                    </Link>
                    <button type="submit" style={buttonStyle} onClick={handleFeedbackSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default FeedbackForm;