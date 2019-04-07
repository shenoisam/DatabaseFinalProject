
var CreateCurCourse = function(req,res,next){
	var c   = req.body.Curriculum
	var cN  = req.body.CourseName
    
	res.locals.sql    = "INSERT INTO CurCourse VALUES ?"
    res.locals.values = [[c,cN]]
    
    next()	
	
}

module.exports = {CreateCurCourse}