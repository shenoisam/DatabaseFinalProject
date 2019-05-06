var CreateCurriculumTopics = function(req,res,next){

	var Name = req.body.Name
	var Id = req.body.ID

	res.locals.val = [Name,Id]
	res.locals.sql    = "INSERT INTO CurriculumTopics VALUES (?,?)"
	next()

}
var GetCurriculumTopics = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CurriculumTopics"
	res.locals.rmStr = "ID = ? AND Name = ?"
	res.locals.params = [req.body.ID, req.body.Name]
	next()
}
var GetTopicsInCurriculum = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "CurriculumTopics,Topics"
	res.locals.rmStr = "CurriculumTopics.Name = ? AND CurriculumTopics.ID = Topics.ID"
	res.locals.params = [req.body.Name]
	next()
}
var GetTopicsNotInCurriculum = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "Topics"
	res.locals.rmStr = "ID NOT IN (SELECT ID FROM CurriculumTopics WHERE CurriculumTopics.Name = ? AND CurriculumTopics.ID = Topics.ID)"
	res.locals.params = [req.body.Name]
	next()
}
var DeleteCurriculumTopic = function(req,res,next){
	res.locals.table = "CurriculumTopics"
	res.locals.rmStr = "Name = ? AND ID = ?"
	res.locals.params = [req.body.Name, req.body.ID]
	next()

}

module.exports = {CreateCurriculumTopics,GetCurriculumTopics,GetTopicsInCurriculum,GetTopicsNotInCurriculum,DeleteCurriculumTopic}
