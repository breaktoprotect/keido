"""
This is a mock DB implemented using TinyDB for dev purposes only and not recommended to be used in a production system.
"""
from tinydb import TinyDB, Query

#? Configuration
db = TinyDB('mock-db.json')
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
    print(get_all_users())