
var CreateCurriculum = function (req,res,next){
	var n = req.body.Name 
    var h = req.body.HeadPerson 
    var m = req.body.MinimumHours 
    var t = req.body.MaxTopicsCovered 
	
	res.locals.val = [[n,h,m,t]]
    res.locals.sql = "INSERT INTO Curriculum VALUES ?"
    next()
	
}


var GetCurriculum = function(req,res,next){
    res.locals.sql = "*"
    res.locals.table = "Curriculum"
    res.locals.rmStr = " Name = ?"
    res.locals.params = [req.body.Name]
    next();
}

var UpdateCurriculum = function(req,res,next){
    res.locals.table = "Curriculum"
    
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
        res.locals.rmStr = " Name = ?"
        params.append(req.body.Name)
        res.locals.params = params
        next() 

    }else{
        res.send({err: "ERROR! Attributes and Lengths don't match up"})
    }




}
module.exports = {CreateCurriculum,GetCurriculum,UpdateCurriculum }