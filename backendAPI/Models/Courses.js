/*
var createCourses = function(req,res,next){
   var Name              = req.body.Name
   var MaxCovered        = req.body.MaxTopicsCovered 
   var MinHours          = req.body.MinimumHours 
   var id                = req.body.HeadPerson 
   
   if(!NaN(MaxCovered) && !NaN(MinHours)){
      res.locals.sql  = "INSERT INTO Courses VALUES ?"
	  res.locals.values = [[Name,id, MinHours,MaxCovered]]
	  next();
   }else{
	   res.send({Error: "Invalid Input"})
   }
	
}

module.exports = {createCourses}
*/