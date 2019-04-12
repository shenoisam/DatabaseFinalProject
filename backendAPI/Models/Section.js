

var CreateSection = function(){
   res.locals. val = [[req.body.ID, req.body.Semester, req.body.NumStu,req.body.Comment1, req.body.Comment2 ,req.body.CourseName,req.body.APlus , req.body.A,req.body.AMinus,req.body.BPlus,req.body.B ,req.body.BMinus,req.body.CPlus,req.body.C,req.body.CMinus,req.body.DPlus,req.body.D,req.body.DMinus,req.body.F,req.body.W,req.body.I]]                    
   res.locals.sql    = "INSERT INTO Section VALUES ?"
   
   next()
}
var GetSection = function(req,res,next){
   res.locals.select = "*"
   res.locals.table = "Section"
   res.locals.rmStr = "ID = ? AND Semester = ?"
   res.locals.params = [req.body.ID,req.body.Semester]
   next()
}
module.exports = {CreateSection,GetSection}