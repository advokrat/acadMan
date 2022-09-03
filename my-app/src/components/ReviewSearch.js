import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ReviewCard from './ReviewCard';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// [{
//     reviewID:"cs253a",
//     likes:23,
//     review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in neque eu justo malesuada lobortis in eget mi. Pellentesque sed viverra odio. Vestibulum euismod metus ac massa pulvinar rutrum. In sagittis turpis et dolor pretium, eget bibendum tellus venenatis. Nulla at interdum metus. Ut ultricies lectus vel vestibulum eleifend"
// },{
//     reviewID:"cs253a",
//     likes:12,
//     review:" enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam consequat eleifend lorem, eu pharetra mauris rhoncus in. Duis efficitur placerat magna nec pulvinar. Vivamus porta lobortis purus in lobortis. Donec eleifend convallis ante, in iaculis arcu lacinia eu. "

// }, {
//     reviewID:"cs253a",
//     likes:33,
//     review:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in neque eu justo malesuada lobortis in eget mi. Pellentesque sed viverra odio. Vestibulum euismod metus ac massa pulvinar rutrum. In sagittis turpis et dolor pretium, eget bibendum tellus venenatis. Nulla at interdum metus. Ut ultricies lectus vel vestibulum eleifend"

// }]

const ReviewSearch = ({courseID, setCourseID}) => {

    // const [courseID, setcourseID] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseList, setCourseList] = useState();
    const [topCourses, setTopCourses] = useState();

    const navigate = useNavigate();

    async function handleCourseNameChange(event) {
        await setCourseName((lastcourseID) => {
            return event.target.value;
        });

        event.preventDefault();

        let filter = event.target.value.toLowerCase()

        let resCourses = [];
        if (courseList) {
            resCourses = courseList.filter((e) => {
                let dataFilter = e.name.toLowerCase()
                return dataFilter.indexOf(filter) !== -1
            })
        }
        
        setTopCourses(resCourses);
    }

    function handleCourseIDSubmit(event) {
    }

    function handleCourseClick(event){
        console.log(event.target.textContent);

        const targetCourse = event.target.textContent;

        let courseDetails = courseList.find(course => course.name === targetCourse);
        setCourseID(courseDetails.courseID);

        console.log(courseDetails);

        navigate(`/feedback/browse/${courseDetails.courseID}/reviews`);

        // axios.get(`http://localhost:3000/course/getAllCourses`)
        //     .then((response) => {
        //         // setReviewList(() => {
        //         //     console.log("response: ", response);
        //         //     return response.data.reviews;
        //         // });
        //         console.log("logging all courses in frontend: ", response.data.courses);
        //         setCourseList(response.data.courses);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    //this wil fetch all courseIDs available in database
    useEffect(() => {
        axios.get(`http://localhost:3000/course/getAllCourses`)
            .then((response) => {
                // setReviewList(() => {
                //     console.log("response: ", response);
                //     return response.data.reviews;
                // });
                console.log("logging all courses in frontend: ", response.data.courses);
                setCourseList(response.data.courses);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <br></br>
            <Form onSubmit={handleCourseIDSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control size='lg' value={courseName} placeholder="Search for courseIDs" onChange={handleCourseNameChange} />
                </Form.Group>
                {/* <Button variant="primary" type="submit" >
                    Submit
                </Button> */}
            </Form>

            <hr style={{ color: "white" }} />


            <ListGroup defaultActiveKey="#link1">
                {
                    topCourses && topCourses.map((curr) => <ListGroup.Item action onClick={handleCourseClick}>
                        {curr.name}
                    </ListGroup.Item>)
                }
            </ListGroup>
        </div>
    );
};

export default ReviewSearch;