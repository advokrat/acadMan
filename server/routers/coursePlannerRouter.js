const express = require('express');

const { authorization } = require('../api/login.js');
const {
  apiGetCourse,
  apiAddCourse,
  apiDeleteCourse,
  apiGetSemester,
	apiGetAllSemesters,
  apiAddSemester,
  apiAddSemesterAtEnd,
  apiDeleteSemester,
  apiGetNumberOfSemesters,
} = require('../api/coursePlannerController');

const router = express.Router();

router.get('/getNum', authorization, apiGetNumberOfSemesters);
router.get('/semester', authorization, apiGetAllSemesters);
router.get('/semester/:semNumber', authorization, apiGetSemester);
router.get('/semester/:semNumber/course/:courseID', authorization, apiGetCourse);

router.post('/semester', authorization, apiAddSemesterAtEnd);
router.post('/semester/:semNumber', authorization, apiAddSemester);
router.post('/semester/:semNumber/course/:courseID', authorization, apiAddCourse);

router.delete('/semester/:semNumber', authorization, apiDeleteSemester);
router.delete('/semester/:semNumber/course/:courseID', authorization, apiDeleteCourse);

module.exports = router;
