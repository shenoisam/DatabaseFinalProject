
var CreateCurCourse = function(req,res,next){
	var c   = req.body.Curriculum
	var cN  = req.body.CourseName
    
	res.locals.sql    = "INSERT INTO CurCourse VALUES (?,?)"
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
var GetRequiredCourses = function(req,res,next){
	res.locals.select = "Count(*)"
	res.locals.table = "CurCourses"
	res.locals.rmStr = "Curriculum = ? AND Required = True"
	res.locals.params = [req.body.Curriculum]
	next()
}
var GetOptionalCourses = function(req,res,next){
	res.locals.select = "Count(*)"
	res.locals.table = "CurCourses"
	res.locals.rmStr = "Curriculum = ? AND Required = False"
	res.locals.params = [req.body.Curriculum]
	next()
}

module.exports = {CreateCurCourse,GetCurCourses,GetRequiredCourses,GetOptionalCourses}