var express = require('express')
var router = express.Router()

var Users           = require('./../Models/Users.js')
var CourseGoals     = require('./../Models/CourseGoals.js')
var Courses         = require('./../Models/Courses.js')
var CourseTopics    = require('./../Models/CourseTopics.js')
var CurCourse       = require('./../Models/CurCourse.js')
var CurriclumTopics = require('./../Models/CurriclumTopics.js')
var Curriclum       = require('./../Models/Curriculum.js')
var Goals           = require('./../Models/Goals.js')
var Section         = require('./../Models/Section.js')
var Topics          = require('./../Models/Topics.js')
var routes          = require('./routes.js')


router.post('/CreateUser',Users.createUser,routes.insertData,routes.sendUserId)
router.post('/CreateCourseGoals',CourseGoals.CreateCourseGoal,routes.insertData)
router.post('/CreateCourses',Courses.CreateCourses,routes.insertData,routes.end)
router.post('/CreateCourseTopics',CourseTopics.CreateCourseTopics,routes.insertData,routes.end)
router.post('/CreateCurCourse',CurCourse.CreateCurCourse,routes.insertData,routes.end)
router.post('/CreateCurriculumTopics',CurriclumTopics.CreateCurriculumTopics,routes.insertData,routes.end)
router.post('/CreateCurriculum',Curriclum.CreateCurriculum,routes.insertData,routes.end)
router.post('/CreateGoals',Goals.CreateGoals,routes.insertData,routes.end)
router.post('/CreateSection',Section.CreateSection,routes.insertData,routes.end)
router.post('/CreateTopic',Topics.CreateTopic,routes.insertData,routes.end)

router.post('/GetData',routes.query)

module.exports = router