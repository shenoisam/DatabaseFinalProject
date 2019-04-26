//Import all of the npm packages needed for this project
var express = require('express') 
var logger = require('morgan')
var bodyParser = require('body-parser') 
var cors = require ('cors');

//Set up the database connection
var db = require("./db.js") 
db.initDb(function(db){

})

//Import all of the models needed for this project 




var routes = require(__dirname+'/Routes/Router.js')

//Config the server 
var app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'))

app.use(cors());


//Routes
app.use('/',routes)
var port = '8888'

//Create the server 
app.listen(port,function(){
   console.log("App listening on Port:"+port)
})
