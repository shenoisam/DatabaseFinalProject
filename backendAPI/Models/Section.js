var ran = require('./../Routes/passwordEncryption.js')

var CreateSection = function(req,res,next){
  var id          = (Math.floor(Math.random() * 1000)) + 99
  res.locals.val  = [id,req.body.Year, req.body.Semester, req.body.NumStu,req.body.Comment1, req.body.Comment2 ,req.body.CourseName,req.body.APlus , req.body.A,req.body.AMinus,req.body.BPlus,req.body.B ,req.body.BMinus,req.body.CPlus,req.body.C,req.body.CMinus,req.body.DPlus,req.body.D,req.body.DMinus,req.body.F,req.body.W,req.body.I]
  res.locals.sql  = "INSERT INTO Section VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

  next()
}

var GetAllSectionsForCourse = function(req,res,next){
    res.locals.select = "*"
    res.locals.table = "Section"
    res.locals.remStr = "CourseName = ?"
    res.locals.params = [req.body.CourseName]

    next()
 }

var GetSection = function(req,res,next){
   res.locals.select = "*"
   res.locals.table = "Section"
   res.locals.rmStr = "ID = ? AND Semester = ? AND Year = ? AND CourseName = ?"
   res.locals.params = [req.body.ID,req.body.Semester,req.body.Year, req.body.CourseName]
   next()
}

var GetSectionByCourseNameYearSemester = function(req,res,next){
    res.locals.select = "Sum(APlus), Sum(A), Sum(AMinus),Sum(BPlus), Sum(B), Sum(BMinus),Sum(CPlus), Sum(C), Sum(CMinus),Sum(DPlus), Sum(D), Sum(DMinus),Sum(F), Sum(I), Sum(W),"
    res.locals.table = "Section"
    res.locals.rmStr = "(Semester = ? OR Semester = ? OR Semester = ? OR Semester = ?) AND Year > ? AND Year < ? AND CourseName = ?"
    res.locals.params = [req.body.Spring,req.body.Summer,req.body.Fall,req.body.Winter,req.body.YearLower,req.body.YearUpper, req.body.CourseName]
    next()
 }
var UpdateSection = function(req,res,next){
   res.locals.table = "Section"

   //WHEN NAMING THESE ATTRIBUTES MAKE SURE TO USE Attribute[] AND Values[] FOR EACH OF THE FIELDS
   var a = req.body.Attribute
   var val = req.body.Values
   var uString  = ""
   var params = []
   if (a.length == val.length){
       for(var i =0; i<a.length; i++){
           uString  = uString + "?  = ? "
           params.append(a[i])
           params.append(val[i])
       }
       res.locals.att = uString
       res.locals.rmStr = " ID = ? AND Semester = ?"
       params.append(req.body.ID,req.body.Semester)
       res.locals.params = params
       next()

   }else{
       res.send({err: "ERROR! Attributes and Lengths don't match up"})
   }
}
module.exports = {CreateSection,GetSection,UpdateSection, GetAllSectionsForCourse ,GetSectionByCourseNameYearSemester}
