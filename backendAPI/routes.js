/*
 Description: This file contains all of the routes needed to operate the backend API 
*/

var db = require("./db.js") 
var encryption = require(__dirname+'/passwordEncryption')

/*
 Description: This function creates a user in the database..
*/
var createUser = function(req,res){
   var Password          = req.body.Password
   var FirstName         = req.body.FirstName
   var LastName          = req.body.LastName 
   var Email             = req.body.Email 
   val = [[FirstName,LastName,Email,Password,"TEMP"]]
   var sql = "INSERT INTO Person (FirstName,LastName,Email, Password,Salt) VALUES ?"
   _db = db.getDb()

   _db.query(sql, [val], function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
   });
   //Send a user token for indentification?
   res.send({})
}

var query = function(req,res,next){
    _db = db.getDb()
    str = "SELECT * FROM CURRICULUM"
    _db.query(str,function(err,r2){
        if(err){
            console.log(err)
        }
        res.send({r2})
    })
}

module.exports = {query,createUser}