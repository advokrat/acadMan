import React from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';

const Profile = () => {
    const [uname, setUname] = useState(null);
    const [dept, setDept] = useState(null);
    const [rno, setRno] = useState(null);
    const [semnum, setSemnum] = useState(null);
    const [name, setName] = useState(null);
    useEffect(() => {
        axios.get('http://localhost:3000/getUserDetails')
            .then(res => {
                console.log(res.message);
                const user = res.data.user;
                setUname(user.username);
                setName(user.name);
                setDept(user.department);
                setRno(user.rollNo);
                setSemnum(user.coursePlan.sems.length);
            })
            .catch(err => {
                alert(err.message);
            });
    }, []);
    return (
        // {dept && rno && semnum && name &&
        <div>
            <Card style={{ width: '40rem', margin: "auto", padding: "10px", marginTop: "100px", color: "black" }}>
                <Card.Img src="https://i.pravatar.cc/300" style={{ borderRadius: "50%", float: "centre", marginLeft: "210px", width: "35%", height: "35%" }} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        <ul>
                            <li><b>Username: </b>{uname}</li>
                            <li><b>Roll Number: </b>{rno}</li>
                            {/* <li><b>Program: </b>BTech</li> */}
                            <li><b>Department: </b>{dept}</li>
                            <li><b>Semesters completed: </b>{semnum}</li>
                        </ul>
                    </Card.Text>
                    {/* <Button variant="primary">Progress Dashboard</Button> */}
                </Card.Body>
            </Card>
        </div>
        // }
    );
};

export default Profile;