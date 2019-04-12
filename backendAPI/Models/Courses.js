
var CreateCourses = function(req,res,next){
   var Name              = req.body.CourseName
   var SubjectCode       = req.body.SubjectCode 
   var CourseNumber      = req.body.CourseNumber  
   var CreditHours       = req.body.CreditHours 
   var CourseDescription = req.body.CourseDescription
   
   res.locals.sql  = "INSERT INTO Courses VALUES ?"
   res.locals.val = [[Name,SubjectCode, CourseNumber,CreditHours,CourseDescription]]
   next();
   
	
}

module.exports = {CreateCourses}
