
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
module.exports = {CreateCurriculum,GetCurriculum}