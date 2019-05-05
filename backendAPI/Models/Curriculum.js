
var CreateCurriculum = function (req,res,next){
	var n = req.body.Name
    var h = req.body.HeadPerson
    var m = req.body.MinimumHours
    var t = req.body.MaxTopicsCovered
    var g = req.body.GoalCredHours

	res.locals.val = [n,h,m,t,g]
    res.locals.sql = "INSERT INTO Curriculum VALUES (?,?,?,?,?)"
    next()

}

var GetAllCurriculums = function(req,res,next){
    res.locals.select = "*"
    res.locals.table = "Curriculum"
    next();

}
var GetCurriculum = function(req,res,next){
    res.locals.select = "*"
    res.locals.table = "Curriculum"
    res.locals.rmStr = "Name = ?"
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

//Want this to return 0 
var GoalValid = function(req,res,next){
	res.locals.select = "Count(*) AS NUMGOALNOTVALID"
    res.locals.table = "Goals,Curriculum"
    res.locals.rmStr = " Goals.Curriculum = Curriculum.Name AND Curriculum.Name = ? AND Curriculum.GoalCredHours > (Select Sum(Courses.CreditHours) FROM Courses, CourseGoals WHERE Courses.CourseName = CourseGoals.CourseName AND CourseGoals.GoalsId = Goals.Id)"
    res.locals.params = [req.body.Name]
	next()
}

var GetPersonInCharge = function(req,res,next){
    res.locals.select = "Person.FirstName, Person.LastName"
    res.locals.table = "Person, Curriculum"
    res.locals.rmStr = "Person.ID = Curriculum.HeadPerson AND Name = ?"
    res.locals.params = [req.body.Name]
	next()
}


module.exports = {CreateCurriculum,GetCurriculum,UpdateCurriculum,GoalValid,GetAllCurriculums,GetPersonInCharge}
