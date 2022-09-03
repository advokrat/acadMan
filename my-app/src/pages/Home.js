import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Login from '../pages/Login'
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

const popover1 = (
    <Popover id="popover-basic">
        <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item action href="#link1">
                Browse Calender
            </ListGroup.Item>
        </ListGroup>
    </Popover >
);

const popover2 = (
    <Popover id="popover-basic">
        <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item action href="#link1">
                Make Notes
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
                Browse Notes
            </ListGroup.Item>
        </ListGroup>
    </Popover >
);

const popover3 = (
    <Popover id="popover-basic">
        <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item action href="#link1">
                Add feedback
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
                Browse Feedback
            </ListGroup.Item>
            <ListGroup.Item action href="#link3">
                Browse Courses
            </ListGroup.Item>
        </ListGroup>
    </Popover >
);

const popover4 = (
    <Popover id="popover-basic">
        <ListGroup defaultActiveKey="#link1">
            <ListGroup.Item action href="#link1">
                Plan Courses
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
                Progress Dashboard
            </ListGroup.Item>
        </ListGroup>
    </Popover >
);

const Home = function ({ setToken }) {

    return (
        <div>
            <Card style={{ width: '36rem', color: "black", margin: "auto", padding: "25px", marginTop: "20px" }}>
                <h1>Welcome to AMS</h1>
                <h3>Login or Sign Up to continue</h3>
                {/* <Link to="/login" element={<Login setToken={setToken}></Login>}></Link>
                <Link to="/login" element={<Login setToken={setToken}></Login>}></Link> */}
            </Card>

            <br></br>
            <Button variant="primary" size="lg" as={Link} to='/login' style={{ margin: "20px" }} active>
                Login
            </Button>
            <Button variant="primary" size="lg" as={Link} to='/signup' style={{ margin: "20px" }} active>
                Sign Up
            </Button>
            <Card style={{ width: '60rem', color: "black", margin: "auto", padding: "25px", marginTop: "30px" }}>
                <p>
                    In the duration of the semester, we face a lot of challenges in terms of managing our academic courses, even more so in online semesters. There can be various notes, assignment/report deadlines, quizzes, projects etc. that require tracking. Besides just managing current courses, it is also important to plan  future semesters and get realistic course feed-backs during the time of registrations. All of these processes can get complicated and may lead to critical mistakes.
                    The origin of the idea of our project ‘Academic Management Software’, is from a blend of functions of Pingala, Google Calendar and Notes.
                </p><p>
                    Our product aims at including the most useful features from a student and academic viewpoint, to provide you with an exclusive platform to manage everything related to your academics in a single place. Helping you manage the afore-mentioned tasks and utilising your time for something more productive is what we are deeply passionate about.
                </p>
                {/* <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    
                    <Nav variant="flush" className="flex-column">
                        <Nav.Item>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover1}>
                                <Button style={{ width: "100%", borderRadius: "0px" }} variant="outline-secondary">Calender</Button>
                            </OverlayTrigger>
                        </Nav.Item>

                        <Nav.Item>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover2}>
                                <Button style={{ width: "100%", borderRadius: "0px" }} variant="outline-secondary">Notes</Button>
                            </OverlayTrigger>
                        </Nav.Item>
                        <Nav.Item>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover3}>
                                <Button style={{ width: "100%", borderRadius: "0px" }} variant="outline-secondary">Feedback section</Button>
                            </OverlayTrigger>
                        </Nav.Item>
                        <Nav.Item>
                            <OverlayTrigger trigger="click" placement="right" overlay={popover4}>
                                <Button style={{ width: "100%", borderRadius: "0px" }} variant="outline-secondary">Course Planner</Button>
                            </OverlayTrigger>
                        </Nav.Item>
                    </Nav>
                 
                </Tab.Container> */}
            </Card>
        </div>
    )
}

export default Home;
