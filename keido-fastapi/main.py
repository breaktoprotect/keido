from http.client import HTTPException
import uvicorn
from fastapi import FastAPI, Body, Depends
from app.auth.auth import AuthHandler
from app.model import AuthDetails
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

ALLOWED_ORIGINS = ['*'] #! SECURITY ALERT

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

auth_handler = AuthHandler()

#TODO for DB in future
USERS = [] 
ADMINS = ['admin']

#! Temporary roles
admin_user = {
    'email': 'admin@kei.do',
    'hashed_password': '$2b$12$5INIF0hUA5h0La7yFsrM2uyGYyYC.trFkP4TgZigAGyxhOXiQm13u', #password -> "admin"
    'role':'admin'
    }
test_user = {
    'email': 'tester@kei.do', 
    'hashed_password': '$2b$12$ipEc9wilgn/s0NgJe77cVeViTzjcCYW4JGcQgrq2YBIlf0iQs4emy', #password -> "tester"
    'role':'user'
}

USERS.append(admin_user)
USERS.append(test_user)

#! Temporary schedule data
schedule_data = [
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


#* ********************** Public APIs *************************
#* Misc
# Example of an unprotected page
@app.get('/user/version', tags=['Misc'])
def version():
    return {}
# Server heartbeat
@app.get("/", tags=["Heartbeat"])
def heartbeat():
    return {"status": "alive!"}

#* Users 
# Registration
@app.post('/user/register', tags=['Users'], status_code=201)
def register(auth_details: AuthDetails):
    if any(user['email'] == auth_details.email for user in USERS):
        #raise HTTPException(status_code=400, detail="Email is already taken")

        #? Obfuscation 
        return { "status": "success"}

    # Adding new user
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    USERS.append({
        'email': auth_details.email,
        'hashed_password': hashed_password,
        'role': ['user']
    })
    return { "status": "success"}

# Login
@app.post('/user/login', tags=['Users'])
def login(auth_details: AuthDetails):
    confirmed_user = None
    for user in USERS:
        if user['email'] == auth_details.email:
            confirmed_user = user
            break
    # User don't exist!
    if confirmed_user == None:
        return { "status": "login failed"}

    # Password mismatch!
    if not auth_handler.verify_password(auth_details.password, confirmed_user['hashed_password']):
        return { "status": "login failed"}

    # Check if user is admin
    if confirmed_user['email'] in ADMINS:
        # Create token with admin role
        token = auth_handler.encode_token(confirmed_user['email'], 'admin')
    else:
        token = auth_handler.encode_token(confirmed_user['email'], 'user')

    return { 'token': token}

#? ********************* Private APIs *************************
@app.get('/users/list', tags=['Users'])
def list_users(email=Depends(auth_handler.check_authenticated)):
    #debug
    print("REACHED main::list_users()")
    return [user['email'] for user in USERS]

#todo test data only - temp
@app.get('/schedule/list', tags=['Test only'])
def list_schedule(email=Depends(auth_handler.check_authenticated)):
    return schedule_data

#? ####################### Admin APIs #########################
@app.get('/admin/test', tags=['Administration'])
def admin_test(email=Depends(auth_handler.check_admin)):
    return { 'msg':'admin page reached successfully!'}