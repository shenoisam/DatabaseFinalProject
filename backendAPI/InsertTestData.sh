echo This script will insert some test data into your Database Final project using the backend API 

curl -d "&FirstName=Sam&LastName=Shenoi&Password=asdcadsc&Salt=asdf&Email=shenoisam@gmail.com" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://localhost:8888/CreateUser 