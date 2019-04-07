var CreateCurriculumTopics = function(req,res,next){
	
	var Name = req.body.Name
	var Id = req.body.ID
	
	res.locals.values = [[Name,Id]]
	res.locals.sql    = "INSERT INTO CurriculumTopics VALUES ?"
	
}

module.exports = {CreateCurriculumTopics}