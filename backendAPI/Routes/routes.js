/*
 Description: This file contains all of the routes needed to operate the backend API
*/

var db = require("./../db.js")
let _db = db.getDb()
var encryption = require(__dirname+'/passwordEncryption')

/*
 Description: This function creates a user in the database..
*/


var insertData = function(req,res, next){
   var sql = res.locals.sql
   var val = res.locals.val


    _db.query(sql,val, function(err,r2){
        if(err){
            console.log(err)
            res.send({err: err.code})
        }else {
            next()
        }

    })

}

var query = function(req,res,next){

    var str = "SELECT " +res.locals.select + " FROM " + res.locals.table;
    if(res.locals.rmStr){
        str = str + " WHERE " + res.locals.rmStr
    }
    var params = res.locals.params

    _db.query(str,params, function(err,r2){
        if(err){
            console.log(err)
            res.send({err: err.code})
        }else {

            res.send({r2})
        }

    })
}
var update = function (req,res,next){
   var str = "UPDATE " + res.locals.table + " SET " + res.locals.att + " WHERE " + res.locals.rmStr
   var params = res.locals.params
   console.log(str)
    _db.query(str,params, function(err,r2){
        if(err){
            console.log(err)
            res.send({err: err.code})
        }else {
            res.send({})
        }

    })



}
var del = function(req,res,next){
   var str = "DELETE FROM " + res.locals.table + " WHERE " + res.locals.rmStr
   var params = res.locals.params
    _db.query(str,params, function(err,r2){
        if(err){
            res.send({err: err.code})
        }else {
            console.log
            res.send({r2})
        }

    })
}

//Send the user id for storage client side
var sendUserId = function(req,res,next){
    var id = res.locals.id
    res.send({id})
}
var end = function(req,res,next){
    res.send({})
}



module.exports = {query,insertData,sendUserId,end,update,del}
