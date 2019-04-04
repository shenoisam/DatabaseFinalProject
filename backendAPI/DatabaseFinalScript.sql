DROP SCHEMA DatabaseFinal;
CREATE SCHEMA DatabaseFinal;
Use DatabaseFinal;
CREATE TABLE Person(
   ID        Int          AUTO_INCREMENT PRIMARY KEY NOT NULL,
   FirstName VARCHAR (25) NOT NULL, 
   LastName  VARCHAR (25) NOT NULL, 
   Password  VARCHAR (90) NOT NULL,
   Salt      VARCHAR (45) NOT NULL,  
   Email     VARCHAR (25) NOT NULL UNIQUE 
);
CREATE TABLE Curriculum(
    Name varchar (25) PRIMARY KEY NOT NULL,
    HeadPerson int NOT NULL,
    MinimumHours int NOT NULL,
    MaxTopicsCovered INT NOT NULL,

    FOREIGN KEY (HeadPerson)  REFERENCES Person(ID)
    
);
CREATE TABLE Courses(
   CourseName          Varchar (25)  NOT NULL Primary Key, 
   SubjectCode         VarChar (25)  Not NULL, 
   CourseNumber        VarChar(25)   NOT NULL,
   CreditHours         INT           NOT NULL, 
   CourseDescription   VARCHAR(45)   NOT NULL, 
   Curriculum          VarChar (25)  NOT NULL,
   CONSTRAINT UC_Courses UNIQUE (SubjectCode, CourseNumber),
   FOREIGN KEY (Curriculum)  REFERENCES Curriculum(Name)
);
CREATE TABLE Topics(
  ID            VARCHAR (25) PRIMARY KEY,
  Units         VarChar (25) NOT NULL, 
  Level         INT          CHECK (Level>0 AND Level < 4),
  Name          VARCHAR (25) NOT NULL, 
  SubjectArea   VARCHAR (25)
);
CREATE TABLE Goals(
  ID          VarChar (25) PRIMARY KEY,
  Description VARCHAR (45), 
  Curriculum  VarChar (25) NOT NULL,
  
  FOREIGN KEY (Curriculum)  REFERENCES Curriculum(Name)
);

CREATE TABLE CourseTopic(
   CourseName VARCHAR (25) NOT NULL,
   Topic      VARCHAR(25)  NOT NULL,
   
   FOREIGN KEY (CourseName)  REFERENCES Courses(CourseName),
   FOREIGN KEY (Topic)       REFERENCES Courses(CourseName),
   CONSTRAINT CourseTopics_pk PRIMARY KEY (CourseName, Topic)
);
CREATE TABLE Section(
   ID         INT          NOT NULL, Check(ID>99 AND ID < 1000),
   Semester   VARCHAR(25)  NOT NULL, 
   NumStu     INT          NOT NULL,
   Comment1   VARCHAR(45)  NOT NULL, 
   Comment2   VARCHAR(45)  NOT NULL,
   CourseName VARCHAR(25)  NOT NULL, 
   
   FOREIGN KEY (CourseName)  REFERENCES Courses(CourseName),
   CONSTRAINT Sections_pk PRIMARY KEY (ID, Semester) 
   
);
CREATE TABLE CourseGoals(
   CourseName VARCHAR(25)  NOT NULL, 
   GoalsID    VarChar(25)  NOT NULL,  
   
   FOREIGN KEY (CourseName)  REFERENCES Courses(CourseName),
   FOREIGN KEY (GoalsID)       REFERENCES Goals(ID),
   CONSTRAINT CourseGoals_pk PRIMARY KEY (CourseName, GoalsID)
);
CREATE TABLE CurriculumTopics(
   Name          varchar (25) ,
   ID            VARCHAR (25) ,
    
   FOREIGN KEY (Name)  REFERENCES Curriculum(Name),
   FOREIGN KEY (ID)       REFERENCES Topics(ID),
   CONSTRAINT CurriculumTopics_pk PRIMARY KEY (Name, ID)
   

);
