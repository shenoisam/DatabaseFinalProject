var ran = require('./../Routes/passwordEncryption.js')


var createUser  = function(req,res,next){
   var Password          = req.body.Password
   var FirstName         = req.body.FirstName
   var LastName          = req.body.LastName 
   var Email             = req.body.Email 
   var id                = ran.genRandomString(20) 
   
   res.locals.val = [[id,FirstName,LastName,Email,Password,"TEMP"]]
   res.locals.sql = "INSERT INTO Person (ID, FirstName,LastName,Email, Password,Salt) VALUES ?"
   _db = db.getDb()
	
	next()
}
var findUser = function(req,res,next){
   sql = "SELECT * FROM Person WHERE "	
	
}


module.exports = {createUser}