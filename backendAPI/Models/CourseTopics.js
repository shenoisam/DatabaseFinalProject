

var CreatCourseTopics = function(req,res,next){
	var CourseName = req.body.CourseName
	var Topic      = req.body.Topic 
	
	res.locals.sql    = "INSERT INTO CourseTopics VALUES ?"
    res.locals.values = [[CourseName,Topic]]
    
    next()	
	
}