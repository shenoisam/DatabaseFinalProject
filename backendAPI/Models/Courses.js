
var CreateCourses = function(req,res,next){
   var Name              = req.body.CourseName
   var SubjectCode       = req.body.SubjectCode
   var CourseNumber      = req.body.CourseNumber
   var CreditHours       = req.body.CreditHours
   var CourseDescription = req.body.CourseDescription

res.locals.val = [Name,SubjectCode, CourseNumber,CreditHours,CourseDescription]
   res.locals.sql  = "INSERT INTO Courses (CourseName, SubjectCode, CourseNumber, CreditHours, CourseDescription) VALUES (?,?,?,?,?)"
   next();


}
var GetAllCourses = function (req,res,next){
   res.locals.select = "*"
	res.locals.table = "Courses"

	next()
}
var GetCourses = function(req,res,next){
   res.locals.select = "*"
	res.locals.table = "Courses"
	res.locals.rmStr = "CourseName = ?"
	res.locals.params = [req.body.CourseName]
	next()
}
var UpdateCourses = function(req,res,next){
   res.locals.table = "Courses"

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
       res.locals.rmStr = " CourseName = ?"
       params.append(req.body.ID)
       res.locals.params = params
       next()

   }else{
       res.send({err: "ERROR! Attributes and Lengths don't match up"})
   }
}

module.exports = {CreateCourses,GetCourses,UpdateCourses,GetAllCourses }
