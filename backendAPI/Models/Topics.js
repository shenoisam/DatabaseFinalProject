


var CreateTopic = function(req,res,next){
	var ID      = req.body.ID
	var Units   = req.body.Units
	var Level   = req.body.Level
	var Name    = req.body.Name 
	var SA      = req.body.SubjectArea
	
	res.locals.sql    = "INSERT INTO Topics VALUES ?"
    res.locals.val = [[ID,Units,Level,Name,SA]]
	next()
	
}
var GetTopic = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "Topics"
	res.locals.rmStr = "ID = ?"
	res.locals.params = [req.body.ID]
	next()
}

module.exports = {CreateTopic,GetTopic}