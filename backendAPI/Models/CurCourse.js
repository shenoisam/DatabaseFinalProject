
var CreateCurCourse = function(req,res,next){
	var c   = req.body.Curriculum
	var cN  = req.body.CourseName
	var req = req.body.Required

	res.locals.sql    = "INSERT INTO CurCourse VALUES (?,?,?)"
  res.locals.val = [c,cN,req]
  next()

}
var GetCurCourses = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CurCourse"
	res.locals.rmStr = "Curriculum = ? AND CourseName = ?"
	res.locals.params = [req.body.Curriculum, req.body.CourseName]
	next()
}
var GetRequiredCourses = function(req,res,next){
	res.locals.select = "Count(*) AS COUNT"
	res.locals.table = "CurCourse"
	res.locals.rmStr = "Curriculum = ? AND Required = 1"
	res.locals.params = [req.body.Curriculum]
	next()
}
var GetOptionalCourses = function(req,res,next){
	res.locals.select = "Count(*) AS COUNT"
	res.locals.table = "CurCourse"
	res.locals.rmStr = "Curriculum = ? AND Required = 0"
	res.locals.params = [req.body.Curriculum]
	next()
}
var GetCurriculumCourses = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CurCourse, Courses"
	res.locals.rmStr = "CurCourse.Curriculum = ? AND CurCourse.CourseName = Courses.CourseName ORDER BY Required"
	res.locals.params = [req.body.Curriculum]
	next()
}
var GetCoursesCurriculum = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CurCourse, Curriculum"
	res.locals.rmStr = "CurCourse.CourseName = ? AND CurCourse.Curriculum = Curriculum.Name"
	res.locals.params = [req.body.CourseName]
	next()
}
var CoursesNotInCurriculum = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "Courses"
	res.locals.rmStr = "CourseName NOT IN (SELECT CourseName FROM CurCourse WHERE CurCourse.Curriculum = ? AND CurCourse.CourseName = Courses.CourseName)"
	res.locals.params = [req.body.Curriculum]
	next()
}
var DeleteRelationship = function(req,res,next){
	res.locals.table = "CurCourse"
	res.locals.rmStr = "Curriculum = ? AND CourseName = ?"
	res.locals.params = [req.body.Curriculum,req.body.CourseName]
	next()
}

module.exports = {CreateCurCourse,GetCurCourses,GetRequiredCourses,
	 GetOptionalCourses,GetCurriculumCourses,CoursesNotInCurriculum,DeleteRelationship,GetCoursesCurriculum }
