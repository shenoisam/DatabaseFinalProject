var express = require('express')
var router = express.Router()

var Users           = require('./../Models/Users.js')
var CourseGoals     = require('./../Models/CourseGoals.js')
var Courses         = require('./../Models/Courses.js')
var SectionGoal    = require('./../Models/SectionGoal.js')
var CurCourse       = require('./../Models/CurCourse.js')
var CurriclumTopics = require('./../Models/CurriclumTopics.js')
var Curriclum       = require('./../Models/Curriculum.js')
var Goals           = require('./../Models/Goals.js')
var Section         = require('./../Models/Section.js')
var Topics          = require('./../Models/Topics.js')
var routes          = require('./routes.js')


//Insert into the tables 
router.post('/CreateUser',Users.createUser,routes.insertData,routes.sendUserId)
router.post('/CreateCourseGoals',CourseGoals.CreateCourseGoal,routes.insertData,routes.end)
router.post('/CreateCourses',Courses.CreateCourses,routes.insertData,routes.end)
router.post('/CreateSectionGoal',SectionGoal.CreateSectionGoal,routes.insertData,routes.end)
router.post('/CreateCurCourse',CurCourse.CreateCurCourse,routes.insertData,routes.end)
router.post('/CreateCurriculumTopics',CurriclumTopics.CreateCurriculumTopics,routes.insertData,routes.end)
router.post('/CreateCurriculum',Curriclum.CreateCurriculum,routes.insertData,routes.end)
router.post('/CreateGoals',Goals.CreateGoals,routes.insertData,routes.end)
router.post('/CreateSection',Section.CreateSection,routes.insertData,routes.end)
router.post('/CreateTopic',Topics.CreateTopic,routes.insertData,routes.end)

//Get from the inserted diagrams
router.post('/LoginUser',Users.LoginUser,routes.query)
router.post('/GetUserById',Users.GetUserById,routes.query)
router.post('/GetCurriculum',Curriclum.GetCurriculum,routes.query)
router.post('/GetAllCurriculums',Curriclum.GetAllCurriculums,routes.query)
router.post('/GetGoals',Goals.GetGoals,routes.query)
router.post('/GetSection',Section.GetSection,routes.query)
router.post('/GetTopic',Topics.GetTopic,routes.query)
router.post('/GetCourseGoals',CourseGoals.GetCourseGoal,routes.query)
router.post('/GetCourses',Courses.GetCourses,routes.query)
router.post('/GetSectionGoal',SectionGoal.GetSectionGoal,routes.query)
router.post('/GetCurCourse',CurCourse.GetCurCourses,routes.query)
router.post('/GetCurriculumTopics',CurriclumTopics.GetCurriculumTopics,routes.query)

//Update all of the different types of data 
router.post('/UpdateCurriculum',Curriclum.GetCurriculum,routes.update)
router.post('/UpdateGoals',Goals.UpdateGoals,routes.update)
router.post('/UpdateSection',Section.UpdateSection,routes.update)
router.post('/UpdateTopic',Topics.UpdateTopics,routes.update)
router.post('/UpdateCourses',Courses.UpdateCourses,routes.update)


//Other stuff 
router.post('/CurriculumRequiredCourses',CurCourse.GetRequiredCourses,routes.query)
router.post('/CurriculumOptionalCourses',CurCourse.GetOptionalCourses,routes.query)
router.post('/GoalValid',Curriclum.GoalValid,routes.query)

module.exports = router