"""
For initializing a test TinyDB file for dev / testing
"""
from tinydb import TinyDB
import os

#? Config
DB_FILENAME = "./mock-db.json"
if os.path.exists(DB_FILENAME):
    os.remove(DB_FILENAME) # delete the file. db.truncate() doesn't work -_-
db = TinyDB(DB_FILENAME)

#! Temporary roles
admin_user = {
    'email': 'admin@kei.do',
    'hashed_password': '$2b$12$5INIF0hUA5h0La7yFsrM2uyGYyYC.trFkP4TgZigAGyxhOXiQm13u', #password -> "admin"
    'role':['admin', 'manager'],
    'status': "active"
    }

test_user = {
    'email': 'tester@kei.do', 
    'hashed_password': '$2b$12$ipEc9wilgn/s0NgJe77cVeViTzjcCYW4JGcQgrq2YBIlf0iQs4emy', #password -> "tester"
    'role':['user'],
    'status': "active"
}

manager_user = {
    'email': 'manager@kei.do', 
    'hashed_password': '$2b$12$.oOuVV0GpFOqYca6TV3Fz./qpeYr/j4BukJlzbml/ggAv.DqrpT66', #password -> "manager"
    'role':['manager'],
    'status': "active"
}

USERS = [admin_user, test_user, manager_user] 

#! Temporary schedule data for testing
SCHEDULE_DATA = [
        {
            "id": 1,
            "person": "Alan Au",
            "tasks": [
                { "type": "work", "effort": 5 },
                { "type": "free", "effort": 2 },
            ],
        },
        {
            "id": 2,
            "person": "Bob Bennington",
            "tasks": [
                { "type": "work", "effort": 2 },
                { "type": "free", "effort": 1 },
                { "type": "task", "effort": 2 },
                { "type": "free", "effort": 2 },
            ],
        },
        {
            "id": 3,
            "person": "Nooba Nelly",
            "tasks": [
                { "type": "training", "effort": 5 },
                { "type": "free", "effort": 2 },
            ],
        },
        {
            "id": 4,
            "person": "Zack Zimmermann",
            "tasks": [
                { "type": "free", "effort": 2 },
                { "type": "work", "effort": 1 },
                { "type": "task", "effort": 2 },
                { "type": "free", "effort": 2 },
            ],
        }
    ];


#* Init code
if __name__ == "__main__":
    

    print("[*] Adding USERS...")
    db_users = db.table("users")
    for i in USERS:
        db_users.insert(i)

    print("[*] Adding SCHEDULE_DATA...")
    db_acts = db.table("activities")
    for i in SCHEDULE_DATA:
        db_acts.insert(i)
    
    print("[*] DB Initialized -> {FILENAME}".format(FILENAME=DB_FILENAME))