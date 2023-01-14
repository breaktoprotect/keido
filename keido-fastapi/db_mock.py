"""
This is a mock DB implemented using TinyDB for dev purposes only and not recommended to be used in a production system.
"""
from tinydb import TinyDB, Query
import os.path
from initi_db_mock import init_db

#? Configuration
db_filepath = './db/mock-db.json'

# Check if json db file NOT exist
if not os.path.isfile(db_filepath):
    #debug
    print("[~] DB file don't exist! Initializing fresh DB file...")
    init_db()

db = TinyDB(db_filepath)
db_users = db.table("users")
db_activities = db.table("activities")

#* Get users
def get_user(user_email):
    User = Query()
    return db_users.search(User.email == user_email)
     
def get_all_users():
    return db_users.all()

#* Get schedule
#TODO
def get_activity(): #TODO params
    return

#TODO
def get_all_activities():
    return db_activities.all()

if __name__ == "__main__":
    pass


