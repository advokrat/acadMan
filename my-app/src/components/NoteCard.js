import React from 'react';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from 'axios';

const ReviewCard = (props) => {
    const [favFlag, setFavFlag] = useState(false);
    function handleCardClick() {
        console.log("card clicked");
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body style={{ color: "black" }}>
                Added
            </Popover.Body>
        </Popover>
    );



    async function deleteNote(event) {
        event.preventDefault();

        axios.delete(`/notes/${props.id}`)
            .then((response) => {
                axios.get(`/notes/${props.searchCourseID}`)
                    .then((response) => {
                        props.setNoteList(() => {
                            return response.data.notes;
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Card onClick={handleCardClick} style={{ cursor: "pointer", color: "black" }}>
                <Card.Body >
                    <Card.Title style={{ position: "absolute", top: "10px", left: "20px" }}>{props.noteCourseID || 'Unnamed course'}</Card.Title>
                    <br></br>
                    <Card.Text style={{ marginTop: "1rem", marginBottom: "2rem", color: "black" }}>
                        <h6 style={{ position: "absolute", left: "20px" }}>{props.title}</h6>
                        <br></br>
                        {
                            props.content || 'No content'
                        }
                    </Card.Text>

                    <OverlayTrigger trigger="click" placement="right" overlay={popover} delay={{ show: 250, hide: 400 }}>
                        <Button variant="success" style={{ position: "absolute", bottom: "10px", right: "10px" }} onClick={deleteNote}>Delete</Button>
                    </OverlayTrigger>

                </Card.Body>
            </Card>
        </div>
    );
};

export default ReviewCard;