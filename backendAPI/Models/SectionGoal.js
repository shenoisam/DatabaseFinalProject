

var CreateSectionGoal = function(req,res,next){
   var vals = [req.body.SectionID,req.body.Year,req.body.CourseName,req.body.Semester,req.body.GoalsID, req.body.GAPlus, req.body.GA,req.body.GAMinus ,req.body.GBPlus,req.body.GB ,req.body.GBMinus,req.body.GCPlus ,req.body.GC ,req.body.GCMinus,req.body.GDPlus,req.body.GD ,req.body.GDMinus ,req.body.GF,req.body.GW,req.body.GI]  
	
	res.locals.sql    = "INSERT INTO SectionGoal VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    res.locals.val = vals
    
    next()	
	
}
var GetSectionGoal = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "SectionGoal"
	res.locals.rmStr = "GoalsID = ? AND ID = ? AND Semester = ?"
	res.locals.params = [req.body.CourseName,req.body.Topic]
	next()
}
var GetSectionGoalByCourseNameYearSemesterGoalID = function(req,res,next){
    res.locals.select = "Sum(GAPlus), Sum(GA), Sum(GAMinus), Sum(GBPlus), Sum(GB), Sum(GBMinus), Sum(GCPlus), Sum(GC), Sum(GCMinus), Sum(GDPlus), Sum(GD), Sum(GDMinus), Sum(GF), Sum(GW), Sum(GI)"
    res.locals.table = "SectionGoal"
    res.locals.rmStr = "(Semester = ? OR Semester = ? OR Semester = ? OR Semester = ?) AND Year >= ? AND Year <= ? AND CourseName = ? AND GoalsID = ?"
    res.locals.params = [req.body.Spring,req.body.Summer,req.body.Fall,req.body.Winter,req.body.YearLower,req.body.YearUpper, req.body.CourseName,req.body.GoalsID]
    next()
 }
 var GetSectionGoalByYearSemesterGoalID = function(req,res,next){
    res.locals.select = "Sum(GAPlus), Sum(GA), Sum(GAMinus), Sum(GBPlus), Sum(GB), Sum(GBMinus), Sum(GCPlus), Sum(GC), Sum(GCMinus), Sum(GDPlus), Sum(GD), Sum(GDMinus), Sum(GF), Sum(GW), Sum(GI)"
    res.locals.table = "SectionGoal"
    res.locals.rmStr = "(Semester = ? OR Semester = ? OR Semester = ? OR Semester = ?) AND Year >= ? AND Year <= ? AND CourseName = ? AND GoalsID = ?"
    res.locals.params = [req.body.Spring,req.body.Summer,req.body.Fall,req.body.Winter,req.body.YearLower,req.body.YearUpper, req.body.CourseName,req.body.GoalsID]
    next()
 }
module.exports = {CreateSectionGoal,GetSectionGoal,GetSectionGoalByCourseNameYearSemesterGoalID,GetSectionGoalByYearSemesterGoalID  }