var ran = require('./../Routes/passwordEncryption.js')


var createUser  = function(req,res,next){
   var d = new Date();
   d = d.getDay() + "" + d.getHours() + "" + d.getMilliseconds() +"" + d.getMonth()

   var Password          = req.body.Password
   var FirstName         = req.body.FirstName
   var LastName          = req.body.LastName 
   var Email             = req.body.Email 
   var id                = ran.genRandomString(15) + d  
   
   res.locals.val = [[id,FirstName,LastName,Email,Password,"TEMP"]]
   res.locals.id = id
   res.locals.sql = "INSERT INTO Person (ID, FirstName,LastName,Email, Password,Salt) VALUES ?"
	
	next()
}
var LoginUser = function(req,res,next){
   res.locals.select = "*"
   res.locals.table = "Person"
   res.locals.rmStr = "WHERE Email = ? AND Password = ?"
   res.locals.params = [req.body.Email, req.body.Password]
   next()

	
}
var GetUserById = function (req,res,next){
   res.locals.select = "*"
   res.locals.table = "Person"
   res.locals.rmStr = "ID = ?"
   res.locals.params = [req.body.ID]
   
   next() 

}

module.exports = {createUser,GetUserById,LoginUser}