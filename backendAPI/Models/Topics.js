


var CreateTopic = function(req,res,next){
	var ID      = req.body.ID
	var Units   = req.body.Units
	var Level   = req.body.Level
	var Name    = req.body.Name 
	var SA      = req.body.SubjectArea
	
	res.locals.sql    = "INSERT INTO Topics VALUES ?"
    res.locals.values = [[ID,Units,Level,Name,SA]]
	next()
	
}

module.exports = {CreateTopic}