
var CreateGoals = function(req,res,next){
	var ID          = req.body.ID
	var Description = req.body.Description
	var Cur         = req.body.Curriculum 
	
	res.locals.sql    = "INSERT INTO Goals VALUES ?"
    res.locals.val = [[ID,Description,Cur]]
	next()
	
}
var GetGoals = function(req,res,next){
   res.locals.select = "*"
   res.locals.table = "Goals"
   res.locals.rmStr = "ID = ?"
   res.locals.params = [req.body.ID]
   next()
}

module.exports = {CreateGoals,GetGoals}