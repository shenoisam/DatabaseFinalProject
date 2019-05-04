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
          - Year     : Get the year that this section is offered                                        
          - Semester : Semester this that this section was offered        
          - NumStu   : Total number of students
          - Comment1 : Comment 1 
          - Comment2 : Comment 2
          - APlus   : # of A+ for the section 
          - A       : # of A for the section
          - AMinus  : # of A- for the section
          - BPlus   : # of B+ for the section
          - B       : # of B for the section
          - BMinus  : # of B- for the section
          - CPlus   : # of C+ for the section
          - C       : # of C for the section
          - CMinus  : # of C- for the section
          - DPlus   : # of D+ for the section
          - D       : # of D for the section
          - DMinus  : # of D- for the section
          - F       : # of F for the section
          - W       : # of W for the section
          - I       : # of I for the section
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
router.post('/GetSection',Section.GetSection,routes.query)
router.post('/GetAllSections',Section.GetAllSections,routes.query)
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