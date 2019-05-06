
var contains = function(needle) {
   // Per spec, the way to identify NaN is that it is not equal to itself
   var findNaN = needle !== needle;
   var indexOf;

   if(!findNaN && typeof Array.prototype.indexOf === 'function') {
       indexOf = Array.prototype.indexOf;
   } else {
       indexOf = function(needle) {
           var i = -1, index = -1;

           for(i = 0; i < this.length; i++) {
               var item = this[i];

               if((findNaN && item !== item) || item === needle) {
                   index = i;
                   break;
               }
           }

           return index;
       };
   }

   return indexOf.call(this, needle) > -1;
};
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
   console.log("Attributes", a)
   var params = req.body.Values


   var uString  = ""
   if(contains.call(a,"CreditHours")){
       uString = uString + "CreditHours = ?,"
   }
   if(contains.call(a,"Description")){
       uString = uString + "Description= ?,"
   }
   if(contains.call(a,"CourseNumber")){
       uString = uString + "CourseNumber = ?"
   }
   if(contains.call(a,"SubjectCode")){
      uString = uString + "SubjectCode= ?"
   }
  
   
   res.locals.att = uString
   res.locals.rmStr = " CourseName = ?"
   params.push(req.body.CourseName)
   res.locals.params = params
   console.log(uString,params)
   next()
}

module.exports = {CreateCourses,GetCourses,UpdateCourses,GetAllCourses }
