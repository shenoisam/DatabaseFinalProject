
var CreateCurriculum = function (req,res,next){
	var n = req.body.Name 
    var h = req.body.HeadPerson 
    var m = req.body.MinimumHours 
    var t = req.body.MaxTopicsCovered 
	
	res.locals.values = [[n,h,m,t]]
	res.locals.sql = "INSERT INTO Curriculum VALUES ?"
	
}

module.exports = {CreateCurriculum}