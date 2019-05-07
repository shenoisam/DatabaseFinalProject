use databasefinal;
SELECT Count(Topics.ID) FROM Topics, CurriculumTopics 
WHERE CurriculumTopics.ID = Topics.ID 

AND (Topics.Level = 1 OR Topics.Level = 2) 
AND Topics.Units < (
             SELECT Sum(NumUnitsCovered) 
             FROM CourseTopic 
             WHERE CourseTopic.Topic = Topics.ID 
             AND CourseTopic.Curriculum = "Potato" 
             AND CourseTopic.CourseName IN (
												SELECT CourseName 
												From CurCourse
												WHERE CurCourse.Curriculum = "Potato"
                                                AND CurCourse.Required = True 
             
                                             )
			)
UNION 
SELECT Count(Topics.ID) FROM Topics, CurriculumTopics,Curriculum 
WHERE CurriculumTopics.ID = Topics.ID 
AND Curriculum.Name = "Potato"
AND Topics.Level = 3 
AND Curriculum.MaxTopicsCovered < (
             SELECT Sum(NumUnitsCovered) 
             FROM CourseTopic 
             WHERE CourseTopic.Topic = Topics.ID 
             AND CourseTopic.Curriculum = Curriculum.Name
             AND CourseTopic.CourseName IN (
												SELECT CourseName 
												From CurCourse
												WHERE CurCourse.Curriculum = Curriculum.Name
                                                AND CurCourse.Required = True 
             
                                             )
			)


