echo This script will insert some test data into your Database Final project using the backend API 


curl -d "&HeadPerson=300863361d400035147144&Name=Hello&MinimumHours=90&MaxTopicsCovered=6&GoalCredHours=10" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8888/CreateCurriculum
