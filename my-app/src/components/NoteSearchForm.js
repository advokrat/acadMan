import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import NoteCard from './NoteCard';

const NoteSearchFrom = () => {
    const [courseID, setCourseID] = useState('');
    const [noteList, setNoteList] = useState();

    useEffect(() => {
        axios.get(`/notes`)
            .then((response) => {
                setNoteList(() => {
                    return response.data.notes;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    async function handleCourseIDChange(event) {
        await setCourseID((lastCourseID) => {
            return event.target.value;
        });
    }

    async function handleCourseIDSubmit(event) {
        event.preventDefault();

        console.log(event)

        axios.get(`/notes/${courseID}`)
            .then((response) => {
                setNoteList(() => {
                    return response.data.notes;
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <br></br>
            <Form onSubmit={handleCourseIDSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control size='lg' value={courseID} placeholder="Search for courses" onChange={handleCourseIDChange} />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
            <hr style={{ color: "white" }} />

            {noteList && <h3 style={{ color: "white" }}>Results</h3> && <br></br> && noteList.map((note) => {
                return (
                    <div>
                        <br></br>
                        <NoteCard searchCourseID={courseID} setNoteList={setNoteList} id={note._id.valueOf()} noteCourseID={note.courseID} title={note.title} content={note.content}></NoteCard>
                    </div>
                )
            })}
        </div>
    );
};

export default NoteSearchFrom;
