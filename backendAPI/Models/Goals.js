
var CreateGoals = function(req,res,next){
	var ID          = req.body.ID
	var Description = req.body.Description
	var Cur         = req.body.Curriculum 
	
	res.locals.sql    = "INSERT INTO Goals VALUES (?,?,?)"
    res.locals.val = [ID,Description,Cur]
	next()
	
}
var GetGoals = function(req,res,next){
   res.locals.select = "*"
   res.locals.table = "Goals"
   res.locals.rmStr = "ID = ?"
   res.locals.params = [req.body.ID]
   next()
}
var GetGoalsInCurriculum = function(req,res,next){  
   res.locals.select = "*"
   res.locals.table = "Goals"
   res.locals.rmStr = "Curriculum = ?"
   res.locals.params = [req.body.Curriculum]
   next()
}
var UpdateGoals = function(req,res,next){
    res.locals.table = "Goals"
    
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

module.exports = {CreateGoals,GetGoals,UpdateGoals,GetGoalsInCurriculum}