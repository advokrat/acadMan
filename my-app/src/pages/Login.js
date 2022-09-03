import { React, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

async function loginUser(credentials) {
    return fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

const Login = function ({ setToken }) {

    const navigate = useNavigate();
    
    const formStyle = {
        borderRadius: "5px",
        backgroundColor: "#f2f2f2",
        padding: "20px 20px 20px 20px",
        margin: "auto",
        maxWidth: "70%",
        minWidth: "200px"
    }

    const inputStyle = {
        width: "40%",
        fontSize: "20px",
        padding: "12px 20px",
        margin: "8px"
    }

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

    const [inputs, setInputs] = useState({});
    const baseUrl = 'http://localhost:3000/';

    const config = {
        header: {
            "Content-Type": "application/json",
            "Clear-Site-Data": "*"
        }
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(inputs);

        axios.post(baseUrl + 'login', inputs)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    // console.log(res.data.token);
                    console.log("res data => ", res.data);
                    setToken(res.data.token);
                    navigate('/');
                }
                else {
                    console.log("authentication failed");
                }
            }).catch(function (error) {
                const response = error.response;
                alert(response.data.message);
                window.location.reload();
            });
    }

    return (
        <form className="notes-form" onSubmit={handleSubmit}>
            <div>
                <h1 style={{color:"black"}}>Login</h1>
            </div>
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder='Username'
                    value={inputs.username || ""}
                    style={inputStyle}
                    onChange={handleChange}
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    placeholder='Password'
                    value={inputs.password}
                    style={inputStyle}
                    onChange={handleChange}
                />
            </div>
            <div>

                <Link to='/' >
                    <button style={buttonStyle}>Cancel</button>
                </Link>
                <input type="submit" value="Submit" style={buttonStyle} />
            </div>
        </form>
    )
}

export default Login;