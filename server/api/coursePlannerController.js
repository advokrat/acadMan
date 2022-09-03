const {
	getNumberOfSemesters,
	getAllSemesters,
	getSemester,
	getCourse,
	addSemester,
	addSemesterAtEnd,
	addCourse,
	deleteSemester,
	deleteCourse,
} = require('../dao/coursePlannerDAO')

async function apiAddCourse(req, res) {
	const { semNumber, courseID } = req.params;
    const { username } = req;

    addCourse(courseID, semNumber, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiDeleteCourse(req, res) {
    const { semNumber, courseID } = req.params;
    const { username } = req;

    deleteCourse(courseID, semNumber, username)
        .then(result => {
            return res.status(result.status).json({ message: result.message });
        })
        .catch(error => {
            return res.status(error.status).json({ message: error.message });
        });
}

async function apiAddSemester(req, res) {
	const { semNumber } = req.params;
	const { username } = req;

	addSemester(semNumber, username)
		.then(result => {
			return res.status(result.status).json({ message: result.message });
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiAddSemesterAtEnd(req, res) {
	const { username } = req;

	addSemesterAtEnd(username)
		.then(result => {
			return res.status(result.status).json({ message: result.message });
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiDeleteSemester(req, res) {
	const { semNumber } = req.params;
	const { username } = req;

	deleteSemester(semNumber, username)
		.then(result => {
			return res.status(result.status).json({ message: result.message });
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetNumberOfSemesters(req, res) {
	const { username } = req;

	getNumberOfSemesters(username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				numSem: result.numSem
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetSemester(req, res) {
	const { username } = req;
	const { semNumber } = req.params;

	getSemester(semNumber, username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				semester: result.semester,
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetAllSemesters(req, res) {
	const { username } = req;

	getAllSemesters(username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				semesters: result.semesters,
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

async function apiGetCourse(req, res) {
	const { username } = req;
	const { courseID, semNumber } = req.params;

	getCourse(courseID, semNumber, username)
		.then(result => {
			return res.status(result.status).json({
				message: result.message,
				course: result.course,
			});
		})
		.catch(error => {
			return res.status(error.status).json({ message: error.message });
		});
}

module.exports = {
	apiAddCourse,
	apiDeleteCourse,
	apiAddSemesterAtEnd,
	apiAddSemester,
	apiDeleteSemester,
	apiGetNumberOfSemesters,
	apiGetAllSemesters,
	apiGetSemester,
	apiGetCourse,
};
