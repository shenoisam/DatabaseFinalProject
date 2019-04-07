 
 var CreateCourseGoal = function(req,res,next){
	var cn = req.body.CourseName 
    var gi = req.body.GoalsID  
	
	res.locals.sql    = "INSERT INTO CourseGoals VALUES ?"
    res.locals.values = [[cn,gi]]
	
	next()
 }
 
 module.exports = {CreateCourseGoal}