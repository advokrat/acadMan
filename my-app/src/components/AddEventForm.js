import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton'
import axios from 'axios';

var curr = new Date();
curr.setDate(curr.getDate() + 3);
var date = curr.toISOString().substr(0,10);

const defaultDateValue = new Date(date).toISOString().split('T')[0]
const defaultTimeValue = "00:00"

function AddEventForm() {

    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        //setInputs(values => ({ ...values, [name]: (name==="repeatWeekly" ? (value === "Yes" ? true : false) : value )}));
        setInputs(values => ({ ...values, [name]: value }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        inputs['startDate'] = (inputs['startDate'] || defaultDateValue);
        inputs['endDate'] = (inputs['endDate'] || inputs['startDate']);
        inputs['startTime'] = (inputs['startTime'] || defaultTimeValue);
        inputs['endTime'] = (inputs['endTime'] || inputs['startTime']);
        inputs['repeatWeekly'] = (inputs['repeatWeekly'] || "No");
        inputs['allDay'] = (inputs['allDay'] || "No");
        inputs['content'] = (inputs['content'] || "No Description available");

        console.log(inputs);

        axios.post('/calendar/addEvent', inputs)
            .then(function (response) {
                if(response.status === 200) {
                    alert(response.data.message);
                    window.location.reload();
                }
                else {
                    console.error("Something weird");
                }
            })
            .catch(function (error) {
                const response = error.response;
                alert(response.data.message);
                navigate('/calendar/events');
            });

    }

    return (
        <div style={{ color: "#000000" }}>
            <Button variant="primary" onClick={handleShow}>
                Add Event
            </Button>

            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton style={{ color: "#000000" }}>
                    <Modal.Title>Add Event</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ color: "#000000" }}><Form onSubmit={handleSubmit}>
                    <Row className="mb-1">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>Title</strong></Form.Label>
                            <Form.Control type="text" placeholder="Title" name="title" defaultValue={inputs.title} onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>Start Date</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="YYYY-MM-DD" name="startDate" defaultValue={defaultDateValue} value={inputs.startDate} onChange={handleChange}  /></span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>End Date</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="YYYY-MM-DD" name="endDate" defaultValue={inputs['startDate'] || defaultDateValue} value={inputs.endDate} onChange={handleChange}  /></span>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            <strong>Day Long Event:</strong>
                        </Form.Label>
                        <Col sm="5">
                            <Form.Select name="allDay" defaultValue="No" onChange={handleChange} >
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>Start Time</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="HH:MM" name="startTime" defaultValue={defaultTimeValue} value={inputs.startTime} onChange={handleChange}  /></span>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridAddress1">
                            <Form.Label><strong>End Time</strong></Form.Label>
                            <span>
                                <Form.Control type="text" placeholder="HH:MM" name="endTime" defaultValue={inputs.startTime || defaultTimeValue} value={inputs.endTime} onChange={handleChange}  /></span>
                        </Form.Group>
                    </Row>

                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                        <Form.Label column sm="5">
                            <strong>Repeat Weekly:</strong>
                        </Form.Label>
                        <Col sm="5">
                            <Form.Select name="repeatWeekly" defaultValue="No" onChange={handleChange} >
                                <option>Yes</option>
                                <option>No</option>
                            </Form.Select>
                        </Col>
                    </Form.Group>

                    <Row className='mb-1'>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label><strong>Description:</strong></Form.Label>
                            <Form.Control as="textarea" rows={3} name="content" value={inputs.content} onChange={handleChange} />
                        </Form.Group>
                    </Row>
                    <Row className='mb-1'>
                        <Col md={{offset:5}}><Button variant="primary" type="submit">
                            Submit
                        </Button>
                        </Col>

                    </Row>

                </Form></Modal.Body>
            </Modal>
        </div>
    );
}

export default AddEventForm;