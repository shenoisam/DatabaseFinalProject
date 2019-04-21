import mysql.connector
import random
import string

mydb = mysql.connector.connect(
            auth_plugin='mysql_native_password',
            host="localhost",
            user="DatabaseFinal",
            passwd="potato",
            database='DatabaseFinal'
        )
cursor = mydb.cursor(buffered=True)
numPeople = 10
numCurr = 10


#Generate people 
v = []
for o in range(0,numPeople):
    id = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(7)])
    fn = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(7)])
    ln = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(7)])
    email = fn + "@" + "potato.com"
    pword = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(10)])
    salt = "a"
    v.append((id,fn,ln,pword,salt,email))

sql = "INSERT INTO Person VALUES (%s,%s,%s,%s,%s,%s)" 

try:
    cursor.executemany(sql,v)
    mydb.commit()
except mysql.connector.Error as err:
    print("Error Code:", err.errno)
    print("SQLSTATE", err.sqlstate)
    print("Message", err.msg)

v2 = []
#Create Curriculums 
for o in range (0,10):
    name = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(5)])
    id       = v[random.randint(0,numPeople-1)][0]
    minHr    = random.randint(0,8)
    maxT     = random.randint(0,8)
    goalCred = random.randint(0,8)
    v2.append((name,id,minHr,maxT,goalCred))

sql = "INSERT INTO Curriculum (Name, HeadPerson, MinimumHours, MaxTopicsCovered, GoalCredHours) VALUES (%s,%s,%s,%s,%s)" 


try:
    cursor.executemany(sql,v2)
    mydb.commit()
except mysql.connector.Error as err:
    print("Error Code:", err.errno)
    print("SQLSTATE", err.sqlstate)
    print("Message", err.msg)

v3 = []
#CreateCourses 
for o in range (0,250):
    name     = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(5)])
    sbjCode  =  ''.join([random.choice(string.ascii_letters + string.digits) for n in range(4)])
    cNum     = random.randint(1000,3000)
    cHr      = random.randint(0,8)
    cDes     = name + " is a course for stuff to do stuff"
    v3.append((name,sbjCode,cNum,cHr,cDes))

sql = "INSERT INTO Courses VALUES (%s,%s,%s,%s,%s)" 

try:
    cursor.executemany(sql,v3)
    mydb.commit()
except mysql.connector.Error as err:
    print("Error Code:", err.errno)
    print("SQLSTATE", err.sqlstate)
    print("Message", err.msg)

v4 = []
v6 = []
#Create Cur Courses  and Goals
for l in v2:
   numC = random.randint(0,50)
   for o in range (0,numC):
     c = l[0]
     cN =  v3[random.randint(0,50)][0]
     v4.append(c,cN, bool(random.getrandbits(1)))

     id = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(5)])
     des = "This is a super cool goal for this super cool thing"
     v6.append(id,des,l[0])

v4= list(dict.fromkeys(v4))
sql = "INSERT INTO Courses VALUES (%s,%s,%s)" 

try:
    cursor.executemany(sql,v4)
    mydb.commit()
except mysql.connector.Error as err:
    print("Error Code:", err.errno)
    print("SQLSTATE", err.sqlstate)
    print("Message", err.msg)

#Create Topics 
v5 = []
for o in range(0,30):
    id    = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(20)])
    unit  = random.uniform(0,10)
    level = round(random.randint(0,4),1)
    name  = ''.join([random.choice(string.ascii_letters + string.digits) for n in range(8)])
    Sa    = "Potatoes"
    v5.append(id,unit,level,name,Sa)

sql = "INSERT INTO Topics VALUES (%s,%s,%s,%s,%s)" 

try:
    cursor.executemany(sql,v4)
    mydb.commit()
except mysql.connector.Error as err:
    print("Error Code:", err.errno)
    print("SQLSTATE", err.sqlstate)
    print("Message", err.msg)




 

