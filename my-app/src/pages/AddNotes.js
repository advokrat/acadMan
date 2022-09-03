import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useEffect } from 'react';

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

const AddNotes = function () {
    // var [note, setNote] = useState({});
    const [title, setTitle] = useState();
    const [course, setCourse] =useState();
    const [content, setContent] = useState();
    const [topOptions, setTopOptions] = useState();

    var [tag, setTag] = useState();
    var [tags, setTags] = useState([]);
    const [options, setOptions] = useState(['CS253A', 'CS315A', 'AE462A', 'AE712A', 'CSO203A', 'MBA634A']);

    // const options = [
    //     'CS253A', 'CS315A', 'AE462A', 'AE712A', 'CSO203A', 'MBA634A'
    // ];
    const defaultOption = options[0];

    function handleTitleChange(event) {
        setTitle(event.target.value);
        // console.log(note);
    }

    function handleCourseIDChange(event) {
        // setNote(previousState => {
        //     return { ...previousState, course: event.target.value }
        // });

        setCourse(event.target.value);

        // console.log(note);

    }

    function handleTagChange(event) {
        // setTag(event.target.value);
        // console.log("tag = " + tag);

        setContent(event.target.value);
    }


    function handleTagSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        let tempList;

        if (tags) {
            tempList = tags;
            tempList.push(event.target.value);
        }
        else {
            tempList = [event.target.value];
        }
        // console.log(tempList);
        setTag(tempList);
    }

    function handleDescriptionChange(event) {
        // setNote(previousState => {
        //     return { ...previousState, content: event.target.value }
        // });

        setContent(event.target.value);

        // console.log(note);

    }

    function handleNoteSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        axios.post(`/notes`,
            {
                courseID: course,
                title: title,
                content: content,
                tags: tags
            },
            {
                withCredentials: true
            }
        )
            .then((res) => {
                if (res.status === 200) {
                    console.log('Note added');
                    alert('Note added');
                }
                else {
                    console.log('There was some ERROR');
                    alert('Note could not be added');
                }
            }).catch((error) => {
                console.log('API request failed');
                alert('Note could not be added');
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/course/getAllCourses`)
            .then((response) => {
                // setReviewList(() => {
                //     console.log("response: ", response);
                //     return response.data.reviews;
                // });
                console.log("logging all courses in frontend: ", response.data.courses);
                console.log(response.data.courses);
                setOptions(response.data.courses);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <form class="notes-form" style={{color:"black"}}>
                <div>
                    <label>Note Title:</label>
                    <input type="text" className="input-title" value={title} onChange={handleTitleChange} required placeholder="Note Title" />
                </div>

                <div>
                    <label>Select Course: </label>
                    <select value={course} className="input-select" required onChange={handleCourseIDChange}>
                        {
                            options.map(currValue => {
                                return <option value={currValue.courseID}>{currValue.courseID}</option>
                            })
                        }
                    </select>
                </div>

                <div>
                    <label >Note Description:</label>
                    <textarea type="text" className="input-textarea" value={content} onChange={handleDescriptionChange} placeholder="Enter your note here" ></textarea>
                </div>

                <div>
                    <Link to='/' >
                        <button style={buttonStyle}>Cancel</button>
                    </Link>
                    <button type="submit" style={buttonStyle} onClick={handleNoteSubmit}>Submit</button>
                </div>

            </form>
        </div>
    )
}

export default AddNotes;