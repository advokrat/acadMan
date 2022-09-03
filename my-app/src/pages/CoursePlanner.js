import axios from 'axios';
import React, { useState, useEffect } from 'react';
import CoursePlannerComp from '../components/CoursePlanner';
import courseList from '../course_list.json';

const api = axios.create({
	baseURL: 'http://localhost:3000/coursePlanner',
});

export async function fetchSemData(setSemData) {
	api.get('/semester').then(res => {
		if(res.status === 200) {
			console.log("Successfully fetched semesters data");
			setSemData(res.data.semesters);
		}
		else {
			alert("An error occured! Status != 200");
			console.log(res);
		}
	}).catch(err => {
		alert("An error occured!");
		console.log(err);
	});
}

export default function CoursePlannerPage () {
	const [semData, setSemData] = useState(null);
	const [courses, setCourses] = useState(null);
	useEffect(() => {
		fetchSemData(setSemData);
		setCourses(courseList.courses);
	}, []);

	return (
		<div>
			{semData && courses &&
				<CoursePlannerComp semData={semData} setSemData={setSemData} courses={courses} />
			}
		</div>
	);
}
