

var CreateCourseTopics = function(req,res,next){
	var CourseName = req.body.CourseName
	var Topic      = req.body.Topic 
	
	res.locals.sql    = "INSERT INTO CourseTopics VALUES ?"
    res.locals.val = [[CourseName,Topic]]
    
    next()	
	
}
module.exports = {CreateCourseTopics}