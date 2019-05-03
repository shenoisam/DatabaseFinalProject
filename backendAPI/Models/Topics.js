
var CreateTopic = function(req,res,next){
	var ID      = req.body.ID
	var Units   = req.body.Units
	var Level   = req.body.Level
	var Name    = req.body.Name 
	var SA      = req.body.SubjectArea
	
	res.locals.sql    = "INSERT INTO Topics VALUES (?,?,?,?,?)"
    res.locals.val = [[ID,Units,Level,Name,SA]]
	next()
	
}
var GetTopic = function(req,res,next){
	res.locals.select = "*"
	res.locals.table = "Topics"
	res.locals.rmStr = "ID = ?"
	res.locals.params = [req.body.ID]
	next()
}
var UpdateTopics = function(req,res,next){
    res.locals.table = "Topics"
    //WHEN NAMING THESE ATTRIBUTES MAKE SURE TO USE Attribute[] AND Values[] FOR EACH OF THE FIELDS
    var a = req.body.Attribute
    var val = req.body.Values

    var uString  = ""
    var params = []
    if (a.length == val.length){
        for(var i =0; i<a.length; i++){
            uString  = uString + "?  = ? " 
            params.append(a[i]) 
            params.append(val[i]) 
        }
        res.locals.att = uString
        res.locals.rmStr = " ID = ?"
        params.append(req.body.ID)
        res.locals.params = params
        next() 

    }else{
        res.send({err: "ERROR! Attributes and Lengths don't match up"})
    }
}

module.exports = {CreateTopic,GetTopic,UpdateTopics}