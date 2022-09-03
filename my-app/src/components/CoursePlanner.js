import React, { useState } from 'react';
import axios from 'axios';
import { fetchSemData } from '../pages/CoursePlanner';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaPlus, FaTrash } from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
// import Dropdown from 'react-bootstrap/Dropdown';
// import FormControl from 'react-bootstrap/FormControl';

const api = axios.create({
	baseURL: "http://localhost:3000/coursePlanner",
});

function DeleteButton({ onClick, color }) {
	return (
		<Button variant='outline-danger' className='rounded-circle' size='sm'>
			<FaTrash size={12} onClick={onClick} color={color} />
		</Button>
	);
}

function PlusButton({ onClick }) {
	return (
		<Button className='pill-button' size='sm' onClick={onClick} variant='success'>
			<b><FaPlus />Add Semester</b>
		</Button>
	);
}

export default function CoursePlannerComp({ semData, setSemData, courses }) {

	async function handleStuff(localURL, method) {
		method(localURL).then(res => {
			if(res.status === 200) {
				// alert(res.data.message);
				fetchSemData(setSemData);
			}
		}).catch(err => {
			alert(err.message);
			console.log(err);
		});
	}

	async function handleAddSemAtEnd() {
		handleStuff(`/semester`, api.post).catch(err => alert(err.message));
	}

	async function handleAddSem(semNum) {
		handleStuff(`/semester/${semNum}`, api.post).catch(err => alert(err.message));
	}

	async function handleDeleteSem(semNum) {
		handleStuff(`/semester/${semNum}`, api.delete).catch(err => alert(err.message));
	}

	async function handleDeleteCourse(semNum, courseID) {
		handleStuff(`/semester/${semNum}/course/${courseID}`, api.delete)
		.catch(err => alert(err.message));
	}

	function AddCourse({ num }) {
		const [name, setName] = useState('');

		async function handleSubmit(event) {
			event.preventDefault();
			api.post(`/semester/${num}/course/${name}`).then(res => {
				if(res.status === 200) fetchSemData(setSemData);
				else alert(res.message);
			}).catch(err => {
				if(err.response.status == 405){
					alert('Course is already added');
				}
				else{
					alert('Course not found');
				}
			});
		}

		function handleChange(event) {
			const value = event.target.value;
			setName(value);
		}

		return (
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Add Course</Form.Label>
					<Form.Control placeholder='Enter name' name='course-name' onChange={handleChange}/>
				</Form.Group>
				<Button variant='success' type='submit'>
					Add
				</Button>
			</Form>
		);
	}

	function SemesterData({ semester, num }) {
		return (
			<div>
				<h1><Badge pill bg='light' text='dark'>Courses</Badge></h1>
				<ListGroup>
					{semester.courses.map(course => 
						<ListGroup.Item variant='success'
						className='d-flex justify-content-between align-items-start'
						>
							<div className='ms-2 me-auto'>
								<div className="fw-bold">{course.courseID.toUpperCase()}</div>
								{course.name}
							</div>
							<DeleteButton onClick={() => handleDeleteCourse(num, course.courseID)} color='black' />
						</ListGroup.Item>
					)}
				</ListGroup>
				<AddCourse num={num}/>
			</div>
		);
	}

	function BottomParts() {
		return (
			<p align="left">
			</p>
		);
	}

	if(semData.length === 0) return (
		<div>
			<Alert variant='light'>
			<div align='left' style={{ marginBottom: '.5rem' }}> <PlusButton onClick={handleAddSemAtEnd} /> </div>
				<h3>Nothing to show here :)</h3>
			</Alert>
			<BottomParts />
		</div>
	);

	else return (
		<div>
			<Alert variant='light'>
			<div align='left' style={{ marginBottom: '.5rem' }}> <PlusButton onClick={handleAddSemAtEnd} /> </div>
			{' '}
			<Tabs defaultActiveKey={`sem${semData.length}`} id='all_sems_tab' variant='pills'>
				{semData.map((sem, idx) => {
					return (
						<Tab eventKey={`sem${idx+1}`} title={
							<>
								<b>{`Sem ${idx+1}`}</b>
								<DeleteButton onClick={() => handleDeleteSem(idx+1)} color='white' />
							</>
						}>
							<SemesterData semester={sem} num={idx+1} />
						</Tab>
					)
				})}
			</Tabs>
			</Alert>
			<BottomParts />
		</div>
	)
}
