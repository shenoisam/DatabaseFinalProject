var express = require('express') 
var logger = require('morgan')
var bodyParser = require('body-parser') 
var db = require("./db.js") 



var routes = require(__dirname+'/routes.js')

var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'))

/*db.initDb(function(db){

})*/



app.post('/addUser', routes.createUser)
var port = '8888'

app.listen(port,function(){
   console.log("App listening on Port:"+port)
})
