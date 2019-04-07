
var createCourses = function(req,res,next){
   var Name              = req.body.CourseName
   var SubjectCode       = req.body.SubjectCode 
   var CourseNumber      = req.body.CourseNumber  
   var CreditHours       = req.body.CreditHours 
   var CourseDescription = rewq.body.CourseDescription
   
   if(!NaN(CreditHours)){
      res.locals.sql  = "INSERT INTO Courses VALUES ?"
	  res.locals.values = [[CourseName,SubjectCode, CourseNumber,CreditHours,CourseDescription]]
	  next();
   }else{
	   res.send({Error: "Invalid Input"})
   }
	
}

module.exports = {createCourses}
