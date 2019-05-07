var CreateCourseTopic = function(req,res,next){
    var c   = req.body.Curriculum
	var cN  = req.body.CourseName
	var req = req.body.Topic

	res.locals.sql    = "INSERT INTO CourseTopic VALUES (?,?,?)"
    res.locals.val = [c,cN,req]

    next()
}
var GetTopicByCourseNameCurriculum = function(req,res,next){
    var c   = req.body.Curriculum
	var cN  = req.body.CourseName

    res.locals.select = "*"
	res.locals.table = "Topics,CourseTopics"
	res.locals.rmStr = "Topics.ID = CourseTopics.Topic AND CourseTopics.CourseName = ? AND Topics.Curriculum = ? "
	res.locals.params = [req.body.CourseName,req.body.Curriculum]
	next()

 
}
module.exports = {CreateCourseTopic,GetTopicByCourseNameCurriculum }