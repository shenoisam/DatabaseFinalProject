var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

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
    var params =  req.body.Values

    var uString  = ""

    if(contains.call(a,"MaxTopicsCovered")){
        uString = uString + ",MaxTopicsCovered = ?"
    }
    if(contains.call(a,"GoalCredHours")){
        uString = uString + ",GoalCredHours = ?,"
    }
    if(contains.call(a,"MinimumHours")){
        uString = uString + ",MinimumHours = ?"
    }

    res.locals.att = uString
    res.locals.rmStr = " Name = ?"
    params.push(req.body.Name)
    res.locals.params = params
    console.log(uString,params)
    next()

 
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

var CheckExtensive = function(req,res,next){
    res.locals.select = "Count(*)"
    res.locals.table = " Curriculum"

    var str = "Curriculum.Name = ? AND  Curriculum.MaxTopicsCovered <(" 
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND (Topics.Level = 1 OR Topics.Level = 2) AND Topics.Units < ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str +   "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    str = str + "UNION SELECT Count(*) FROM Curriculum WHERE Curriculum.Name = ? AND Curriculum.MaxTopicsCovered <= ("
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND CurriculumTopics.Name = Curriculum.Name AND Topics.Level = 3 AND Curriculum.MaxTopicsCovered <= ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str + "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    

    res.local.rmStr = str
    res.locals.params = [req.body.Curriculum, req.body.Curriculum]
	next()
}
var CheckInclusive = function(req,res,next){
    res.locals.select = "Count(*)"
    res.locals.table = " Curriculum"

    var str = "Curriculum.Name = ? AND  Curriculum.MaxTopicsCovered <(" 
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND (Topics.Level = 1 OR Topics.Level = 2) AND Topics.Units < ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str +   "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    

    res.local.rmStr = str
    res.locals.params = [req.body.Curriculum]
	next()
}

//DON'T THINK THIS WORKS BUT OH WELL 
var CheckBasicPlus = function(req,res,next){
    res.locals.select = "Count(*)"
    res.locals.table = " Curriculum"

    var str = "Curriculum.Name = ? AND  Curriculum.MaxTopicsCovered <(" 
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND Topics.Level = 1  AND Topics.Units < ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str +   "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    str = str + "UNION SELECT Count(*) FROM Curriculum WHERE Curriculum.Name = ? AND Curriculum.MaxTopicsCovered <= ("
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND CurriculumTopics.Name = Curriculum.Name AND Topics.Level = 2 AND Curriculum.MaxTopicsCovered <= ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str + "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    str = str + "UNION SELECT Count(*) FROM Curriculum WHERE Curriculum.Name = ? AND Curriculum.MaxTopicsCovered <= ("
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND CurriculumTopics.Name = Curriculum.Name AND Topics.Level = 2 AND Curriculum.MaxTopicsCovered <= ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str + "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = False )))"
    

    res.local.rmStr = str
    res.locals.params = [req.body.Curriculum, req.body.Curriculum,req.body.Curriculum]
	next()
}
var CheckBasic = function(req,res,next){
    res.locals.select = "Count(*)"
    res.locals.table = " Curriculum"

    var str = "Curriculum.Name = ? AND  Curriculum.MaxTopicsCovered <(" 
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND Topics.Level = 1 AND Topics.Units < ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str +   "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    str = str + "UNION SELECT Count(*) FROM Curriculum WHERE Curriculum.Name = ? AND Curriculum.MaxTopicsCovered <= ("
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND CurriculumTopics.Name = Curriculum.Name AND Topics.Level = 2 AND Curriculum.MaxTopicsCovered <= ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str + "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    
    res.local.rmStr = str
    res.locals.params = [req.body.Curriculum, req.body.Curriculum]
	next()
}
var CheckUnsatisfactory = function(req,res,next){
    res.locals.select = "Count(*)"
    res.locals.table = " Curriculum"

    var str = "Curriculum.Name = ? AND  Curriculum.MaxTopicsCovered <(" 
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND Topics.Level = 1 AND Topics.Units < ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str +   "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    str = str + "UNION SELECT Count(*) FROM Curriculum WHERE Curriculum.Name = ? AND Curriculum.MaxTopicsCovered >= ("
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND CurriculumTopics.Name = Curriculum.Name AND Topics.Level = 2 AND Curriculum.MaxTopicsCovered <= ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str + "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    
    res.local.rmStr = str
    res.locals.params = [req.body.Curriculum, req.body.Curriculum]
	next()
}

//Technically wont always work either
var CheckUnsatisfactory = function(req,res,next){
    res.locals.select = "Count(*)"
    res.locals.table = " Curriculum"

    var str = "SELECT Count(*) FROM Curriculum WHERE Curriculum.Name = ? AND Curriculum.MaxTopicsCovered >= ("
    str = str + "SELECT Count(Topics.ID) FROM Topics, CurriculumTopics WHERE CurriculumTopics.ID = Topics.ID AND CurriculumTopics.Name = Curriculum.Name AND Topics.Level = 2 AND Curriculum.MaxTopicsCovered <= ("
    str = str +  "SELECT Sum(NumUnitsCovered) FROM CourseTopic WHERE CourseTopic.Topic = Topics.ID AND CourseTopic.Curriculum = Curriculum.Name AND CourseTopic.CourseName IN ("
    str = str + "SELECT CourseName From CurCourse WHERE CurCourse.Curriculum = Curriculum.Name AND CurCourse.Required = True )))"
    
    res.local.rmStr = str
    res.locals.params = [req.body.Curriculum]
	next()
}


module.exports = {CreateCurriculum,GetCurriculum,UpdateCurriculum,GoalValid,GetAllCurriculums,GetPersonInCharge,CheckExtensive,CheckInclusive,CheckBasicPlus,CheckBasic,CheckUnsatisfactory}
