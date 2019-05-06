 
 var CreateCourseGoal = function(req,res,next){
	var cn = req.body.CourseName 
    var gi = req.body.GoalsID  
	
	res.locals.sql    = "INSERT INTO CourseGoals VALUES (?,?)"
    res.locals.val = [cn,gi]
	
	next()
 }
 var GetCourseGoal = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CourseGoals"
	res.locals.rmStr = "GoalsID = ? AND CourseName = ?"
	res.locals.params = [req.body.GoalsID, req.body.CourseName]
	next()
 }

 var CreditsUsedToCover = function(req,res,next){
	res.locals.select = "Sum(Courses.CreditHours)"
	res.locals.table = "Courses, CourseGoals"
	res.locals.rmStr = "Courses.CourseName = CourseGoals.CourseName AND CourseGoals.GoalsID = ?"
	res.locals.params = [req.body.GoalsID]
	next()
 }
 var GetGoalsPartOfCourse = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "Goals, CourseGoals"
	res.locals.rmStr = "Goals.ID = CourseGoals.GoalsID AND CourseGoals.CourseName = ? AND Goals.Curriculum = ?"
	res.locals.params = [req.body.CourseName, req.body.GoalsID]
	next()
 }
 var GetGoalsNotPartOfCourse = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "Goals"
	res.locals.rmStr = "ID NOT IN SELECT CourseGoals.GoalsID FROM CourseGoals WHERE Goals.ID = CourseGoals.GoalsID AND CourseGoals.CourseName = ? AND Goals.Curriculum = ?"
	res.locals.params = [req.body.CourseName, req.body.GoalsID]
	next()
 }
 
 

 var DeleteRelationship = function(req,res,next){
 	res.locals.table = "CourseGoals"
 	res.locals.rmStr = "GoalsID = ? AND CourseName = ?"
 	res.locals.params = [req.body.GoalsID,req.body.CourseName]
 	next()
 }
 module.exports = {CreateCourseGoal,GetCourseGoal,CreditsUsedToCover,GetGoalsPartOfCourse,GetGoalsNotPartOfCourse,DeleteRelationship}
