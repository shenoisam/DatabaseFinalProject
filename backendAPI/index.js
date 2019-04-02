var express = require('express') 
var logger = require('morgan')
var bodyParser = require('body-parser') 


var app = express()
app.use(bodyParser.json())
app.use(logger('dev'))


var port = '8888'

app.listen(port,function(){
   console.log("App listening on Port:"+port)
})
