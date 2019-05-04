/*
  Author: Sam Shenoi
  Description: This file contains the API endpoints for the backend API.
  Date Created: 5/3/2019

  NOTES:
   (FK: table) - this attribute is a foreign key that refers to this table. Please keep in mind when designing
*/

//Node Packages to include
var express = require('express')
var router = express.Router()

//Models for each of the tables in the database. Contain functions that match with that table.
var Users           = require('./../Models/Users.js')
var CourseGoals     = require('./../Models/CourseGoals.js')
var Courses         = require('./../Models/Courses.js')
var SectionGoal     = require('./../Models/SectionGoal.js')
var CurCourse       = require('./../Models/CurCourse.js')
var CurriclumTopics = require('./../Models/CurriclumTopics.js')
var Curriclum       = require('./../Models/Curriculum.js')
var Goals           = require('./../Models/Goals.js')
var Section         = require('./../Models/Section.js')
var Topics          = require('./../Models/Topics.js')
var routes          = require('./routes.js')


/*******************************************************************************************/

/*
    description: This function creates a user in the database
    parameters:
          - Password:  The users password
          - FirstName: The users firstname
          - LastName:  The users lastname
          - Email:     The users email
    return:
          - JSobj
             - If everything runs smoothly, returns new users Id for storage {r2: id}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateUser',Users.createUser,routes.insertData,routes.sendUserId)

/*
    description: This function Creates Course Goals in the database
    parameters:
          - CourseName: the course name (FK: Course)
          - GoalsID:  The goal id       (FK: Goals)
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateCourseGoals',CourseGoals.CreateCourseGoal,routes.insertData,routes.end)

/*
    description: This function creates Course in the database
    parameters:
          - CourseName
          - SubjectCode
          - CourseNumber
          - CreditHours
          - CourseDescription
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateCourses',Courses.CreateCourses,routes.insertData,routes.end)

/*
    description: This function creates SectionGoal in the database. It stores the grade distribution for the goal
                 for this section.
    parameters:
          - ID       : Section Id                                         (FK: section)
          - Semester : Semester this that this section was offered        (FK: section)
          - GoalsID  : Id of the Goal that is being graded                (FK: goals)
          - GAPlus   : # of A+ for the goal
          - GA       : # of A for the goal
          - GAMinus  : # of A- for the goal
          - GBPlus   : # of B+ for the goal
          - GB       : # of B for the goal
          - GBMinus  : # of B- for the goal
          - GCPlus   : # of C+ for the goal
          - GC       : # of C for the goal
          - GCMinus  : # of C- for the goal
          - GDPlus   : # of D+ for the goal
          - GD       : # of D for the goal
          - GDMinus  : # of D- for the goal
          - GF       : # of F for the goal
          - GW       : # of W for the goal
          - GI       : # of I for the goal
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateSectionGoal',SectionGoal.CreateSectionGoal,routes.insertData,routes.end)

/*
    description: This function creates Course in the database
    parameters:
          - CourseName : Name of the Course being referenced (FK : Courses)
          - Curriculum : Curriculum Being references         (FK : Curriculum)
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateCurCourse',CurCourse.CreateCurCourse,routes.insertData,routes.end)


/*
    description: This function creates Curriculum Topics
    parameters:
          - Name : Name of the Curriculum being referenced (FK : Curriculum)
          - ID   : Id of Topic being references            (FK : Topic)
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateCurriculumTopics',CurriclumTopics.CreateCurriculumTopics,routes.insertData,routes.end)

/*
    description: This function creates a Curriculum
    parameters:
          - Name             - name of the curriculum
          - HeadPerson       - Head person id of this curriculum                        (FK: Person)
          - MinimumHours     - INTEGER: Minimum Hours covered in each course
          - MaxTopicsCovered - INTEGER: Maximum Topics covered in each course
          - GoalCredHours    - INTEGER: How many credit hours can be applied to a goal
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateCurriculum',Curriclum.CreateCurriculum,routes.insertData,routes.end)

/*
    description: This function creates Goals
    parameters:
          - ID               - id of the goal
          - Description      - Description of the Goal
          - Curriculum       - curriculum assoicated with this goal   (FK: Curriculum)
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateGoals',Goals.CreateGoals,routes.insertData,routes.end)

/*
    description: This function creates Sections
    parameters:
          - ID       : Section Id
          - Semester : Semester this that this section was offered
          - NumStu   : Total number of students
          - Comment1 : Comment 1
          - Comment2 : Comment 2
          - GAPlus   : # of A+ for the section
          - GA       : # of A for the section
          - GAMinus  : # of A- for the section
          - GBPlus   : # of B+ for the section
          - GB       : # of B for the section
          - GBMinus  : # of B- for the section
          - GCPlus   : # of C+ for the section
          - GC       : # of C for the section
          - GCMinus  : # of C- for the section
          - GDPlus   : # of D+ for the section
          - GD       : # of D for the section
          - GDMinus  : # of D- for the section
          - GF       : # of F for the section
          - GW       : # of W for the section
          - GI       : # of I for the section
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateSection',Section.CreateSection,routes.insertData,routes.end)

/*
    description: This function creates Topics
    parameters:
          - ID          : Topic ID
      	  - Units       : DECIMAL units covered
	      - Level       : Level (1-4)
	      - Name        : Name of Topic
	      - SubjectArea : Subject Area
    return:
          - JSobj
             - If everything runs smoothly, returns empty object {}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/CreateTopic',Topics.CreateTopic,routes.insertData,routes.end)

//Get from the inserted diagrams

/*
    description: This function logins in a user
    parameters:
          - Email              - email of the user
          - Password           - password of the user
    return:
          - JSobj
             - If everything runs smoothly, returns JSON object {r2: [{Person}]}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/LoginUser',Users.LoginUser,routes.query)

/*
    description: This function gets user by ID
    parameters:
          - ID            - ID of user
    return:
          - JSobj
             - If everything runs smoothly, returns JSON object {r2: [{Person}]}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/GetUserById',Users.GetUserById,routes.query)

/*
    description: This function gets a curiculum
    parameters:
          - Name           - Name of the curriculum
    return:
          - JSobj
             - If everything runs smoothly, returns JSON object {r2: [{Curriculum}]}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/GetCurriculum',Curriclum.GetCurriculum,routes.query)

/*
    description: This function gets all of the curriclums
    parameters:
    return:
          - JSobj
             - If everything runs smoothly, returns JSON object {r2: [{Curriculum}]}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/GetAllCurriculums',Curriclum.GetAllCurriculums,routes.query)

/*
    description: This function gets a specific goal
    parameters:
         - ID - the id of the goal looking for
    return:
          - JSobj
             - If everything runs smoothly, returns JSON object {r2: [{Goal}]}
             - otherwise returns an err object {err : "Something went wrong"}
*/
router.post('/GetGoals',Goals.GetGoals,routes.query)

/*
  description: This function gets a section
  parameters: 
        - ID         - the ID of the section
        - Semester   - the semester for this section 
        - Year       - The year that this section was offered
        - CourseName - The course name associated with this section
  return: 
*/
router.post('/GetSection',Section.GetSection,routes.query)
<<<<<<< HEAD
=======

/*
  description: This function gets a section
  parameters: 
        - Spring     - if we are looking for section with Spring, enter spring otherwise enter ?
        - Summer     - if we are looking for section with Summer, enter summer otherwise enter ?
        - Fall       - if we are looking for section with Fall, enter fall otherwise enter ?
        - Winter     - if we are looking for section with winter, enter spring otherwise enter ?
        - YearLower  - The lower range of the year we are looking for 
        - YearUpper  - The upper range of the year we are looking for 
        - CourseName - The name of the course we are looking for
  return: 
*/
router.post('/GetSectionByCourseName', Section.etSectionByCourseNameYearSemester,routes.query)

/*
  description: This function gets all sections offered
  parameters: 
        - ID         - the ID of the section
        - Semester   - the semester for this section 
        - Year       - The year that this section was offered
        - CourseName - The course name associated with this section
  return: 
*/
router.post('/GetAllSections',Section.GetAllSections,routes.query)
>>>>>>> 319ea6ca66fa41d43ac5968dd99c6a8a9e6de193
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

/*******************************************************************************************/

//Export this file
module.exports = router
