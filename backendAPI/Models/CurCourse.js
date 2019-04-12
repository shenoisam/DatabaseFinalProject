
var CreateCurCourse = function(req,res,next){
	var c   = req.body.Curriculum
	var cN  = req.body.CourseName
    
	res.locals.sql    = "INSERT INTO CurCourse VALUES ?"
    res.locals.val = [[c,cN]]
    
    next()	
	
}
var GetCurCourses = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CurCourses"
	res.locals.rmStr = "Curriculum = ? AND CourseName = ?"
	res.locals.params = [req.body.Curriculum, req.body.CourseName]
	next()
}

module.exports = {CreateCurCourse,GetCurCourses}