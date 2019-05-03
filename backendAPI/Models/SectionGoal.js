

var CreateSectionGoal = function(req,res,next){
   var vals = [req.body.ID,req.body.Semester,req.body.GoalsID, req.body.GAPlus, req.body.GA,req.body.GAMinus ,req.body.GBPlus,req.body.GB ,req.body.GBMinus,req.body.GCPlus ,req.body.GC ,req.body.GCMinus,req.body.GDPlus,req.body.GD ,req.body.GDMinus ,req.body.GF,req.body.GW,req.body.GI]  
	
	res.locals.sql    = "INSERT INTO SectionGoal VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    res.locals.val = [vals]
    
    next()	
	
}
var GetSectionGoal = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "SectionGoal"
	res.locals.rmStr = "GoalsID = ? AND ID = ? AND Semester = ?"
	res.locals.params = [req.body.CourseName,req.body.Topic]
	next()
}
module.exports = {CreateSectionGoal,GetSectionGoal }