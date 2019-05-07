
DROP SCHEMA DatabaseFinal;
CREATE SCHEMA DatabaseFinal;
Use DatabaseFinal;
CREATE TABLE Person(
   ID        VARCHAR (25) PRIMARY KEY NOT NULL,
   FirstName VARCHAR (25) NOT NULL, 
   LastName  VARCHAR (25) NOT NULL, 
   Password  VARCHAR (90) NOT NULL,
   Salt      VARCHAR (45) NOT NULL,  
   Email     VARCHAR (25) NOT NULL UNIQUE 
);
CREATE TABLE Curriculum(
    Name             varchar (25) PRIMARY KEY NOT NULL,
    HeadPerson       VARCHAR (25) NOT NULL,
    MinimumHours     int NOT NULL,
    MaxTopicsCovered INT NOT NULL,
    GoalCredHours    INT NOT NULL,

    FOREIGN KEY (HeadPerson)  REFERENCES Person(ID)
    
);
CREATE TABLE Courses(
   CourseName          Varchar (25)  NOT NULL Primary Key, 
   SubjectCode         VarChar (25)  Not NULL, 
   CourseNumber        INT           NOT NULL ,
   CreditHours         INT           NOT NULL, 
   CourseDescription   VARCHAR(45)   NOT NULL, 
   CONSTRAINT UC_Courses UNIQUE (SubjectCode, CourseNumber)
  
);
CREATE TABLE CurCourse (
   Curriculum VARCHAR (25) NOT NULL,
   CourseName VARCHAR (25) NOT NULL,
   Required   bit          NOT NULL, 
   
   FOREIGN KEY (Curriculum)  REFERENCES Curriculum(Name),
   FOREIGN KEY (CourseName)  REFERENCES Courses(CourseName),
   CONSTRAINT CurCourse_pk PRIMARY KEY (Curriculum, CourseName)
   
   
);
CREATE TABLE Topics(
  ID            VARCHAR (25) PRIMARY KEY,
  Units         Decimal(20,1)NOT NULL, 
  Level         INT          NOT NULL CHECK (Level>0 AND Level < 4),
  Name          VARCHAR (25) NOT NULL, 
  SubjectArea   VARCHAR (25) NOT NULL
);
CREATE TABLE Goals(
  ID          VarChar (25) PRIMARY KEY,
  Description VARCHAR (45), 
  Curriculum  VarChar (25) NOT NULL,
  
  FOREIGN KEY (Curriculum)  REFERENCES Curriculum(Name)
);

CREATE TABLE Section(
   ID         INT          NOT NULL, Check(ID>99 AND ID < 1000),
   Year       VarChar(25)  NOT NULL, 
   Semester   VARCHAR(25)  NOT NULL, 
   NumStu     INT          NOT NULL,
   Comment1   VARCHAR(45)  NOT NULL, 
   Comment2   VARCHAR(45)  NOT NULL,
   CourseName VARCHAR(25)  NOT NULL, 
   APlus      INT          , 
   A          INT          ,
   AMinus     INT          , 
   BPlus      INT          , 
   B          INT          , 
   BMinus     INT          , 
   CPlus      INT          , 
   C          INT          , 
   CMinus     INT          , 
   DPlus      INT          , 
   D          INT          , 
   DMinus     INT          , 
   F          INT          ,
   W          INT          , 
   I          INT          ,
   
   
   FOREIGN KEY (CourseName)  REFERENCES Courses(CourseName),
   CONSTRAINT Sections_pk PRIMARY KEY (ID, Semester,Year,CourseName) 
   
);
CREATE TABLE SectionGoal(
   ID         INT          NOT NULL, Check(ID>99 AND ID < 1000),
   Year       VarChar(25)  NOT NULL,
   CourseName VARCHAR(25)  NOT NULL,  
   Semester   VARCHAR(25)  NOT NULL, 
   GoalsID    VarChar(25)  NOT NULL, 
   GAPlus     INT          , 
   GA         INT          , 
   GAMinus    INT          , 
   GBPlus     INT          , 
   GB         INT          , 
   GBMinus    INT          , 
   GCPlus     INT          , 
   GC         INT          , 
   GCMinus    INT          , 
   GDPlus     INT          , 
   GD         INT          , 
   GDMinus    INT          , 
   GF         INT          ,
   GW         INT          , 
   GI         INT          ,

   FOREIGN KEY (GoalsID)       REFERENCES Goals(ID),
   FOREIGN KEY (ID, Semester,Year,CourseName)  REFERENCES Section(ID, Semester,Year, CourseName),
   CONSTRAINT SectionGoals_pk PRIMARY KEY (GoalsID, ID, Semester,Year, CourseName)

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
CREATE TABLE CourseTopic(
   CourseName VARCHAR (25) NOT NULL,
   Topic      VARCHAR(25)  NOT NULL,
   Curriculum VARCHAR(25) NOT NULL, 
   
   FOREIGN KEY (CourseName)  REFERENCES Courses(CourseName),
   FOREIGN KEY (Topic)       REFERENCES Topics(ID),
   FOREIGN KEY (Curriculum)  REFERENCES Curriculum(Name),
   CONSTRAINT CourseTopics_pk PRIMARY KEY (CourseName, Topic,Curriculum)
);
