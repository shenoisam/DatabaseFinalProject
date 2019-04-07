
var CreateGoals = function(req,res,next){
	var ID          = req.body.ID
	var Description = req.body.Description
	var Cur         = req.body.Curriculum 
	
	res.locals.sql    = "INSERT INTO Goals VALUES ?"
    res.locals.values = [[ID,Description,Cur]]
	next()
	
}

module.exports = {CreateGoals}