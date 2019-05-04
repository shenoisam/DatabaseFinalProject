echo This script will insert some test data into your Database Final project using the backend API 



curl -d "&CourseName=Test&ID=3321&Year=2019&Semester=Winter&NumStu=20&Comment1=This is a potato&Comment2=This also sucks" -X POST http://localhost:8888/CreateGoals
#curl -d "&ID=1234&Description=This goal sucks&Curriculum=New Potato" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8888/CreateGoals
#curl -d "&ID=3321&Semester=Winter&GoalsID=1234&Year=2019&CourseName=Test" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8888/CreateSectionGoal