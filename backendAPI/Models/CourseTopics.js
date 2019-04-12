

var CreateCourseTopics = function(req,res,next){
	var CourseName = req.body.CourseName
	var Topic      = req.body.Topic 
	
	res.locals.sql    = "INSERT INTO CourseTopics VALUES ?"
    res.locals.val = [[CourseName,Topic]]
    
    next()	
	
}
var GetCourseTopics = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CourseTopic"
	res.locals.rmStr = "CourseName = ? AND Topic = ?"
	res.locals.params = [req.body.CourseName,req.body.Topic]
	next()
}
module.exports = {CreateCourseTopics,GetCourseTopics }