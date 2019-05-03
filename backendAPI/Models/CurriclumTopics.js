var CreateCurriculumTopics = function(req,res,next){
	
	var Name = req.body.Name
	var Id = req.body.ID
	
	res.locals.val = [[Name,Id]]
	res.locals.sql    = "INSERT INTO CurriculumTopics VALUES (?,?)"
	
}
var GetCurriculumTopics = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "GetCurriculumTopics"
	res.locals.rmStr = "ID = ? AND Name = ?"
	res.locals.params = [req.body.ID, req.body.Name]
	next()
}

module.exports = {CreateCurriculumTopics,GetCurriculumTopics}