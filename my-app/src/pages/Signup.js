import { React, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 

const Signup = function () {

    const navigate = useNavigate()

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
        width: "10%",
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        axios.post(baseUrl + 'signup', inputs)
            .then(function (res) {
                console.log(res);
                if (res.status === 200) {
                    alert("User registered successfully!")
                    navigate('/login')
                }
                else if(res.status === 208) {
                    alert(res.data.message)
                    window.location.reload()
                }
            }).catch(function (error) {
                const response = error.response
                alert(response.data.message)
                window.location.reload()
            });
    }

    return (
        <form className='notes-form' onSubmit={handleSubmit}>
            <div>
                <h1 style={{color:"black"}}>SignUp</h1>
            </div>
            <div>
                <input
                    type="text"
                    name="username"
                    placeholder='Username'
                    value={inputs.username || ""}
                    style={inputStyle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="number"
                    name="rollNo"
                    placeholder='IITK Roll Number'
                    value={inputs.rollNo}
                    style={inputStyle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder='IITK Registered Name'
                    value={inputs.name}
                    style={inputStyle}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="department"
                    placeholder='Department'
                    value={inputs.department}
                    style={inputStyle}
                    onChange={handleChange}
                    required
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
                    required
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

export default Signup;