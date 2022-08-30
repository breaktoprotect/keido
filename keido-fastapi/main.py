from http.client import HTTPException
import uvicorn
from fastapi import FastAPI, Body, Depends
from app.auth.auth import AuthHandler
from app.model import AuthDetails

app = FastAPI()

auth_handler = AuthHandler()
users = [] #TODO for DB in future

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
    if any(user['username'] == auth_details.username for user in users):
        #raise HTTPException(status_code=400, detail="Username is already taken")

        #? Obfuscation 
        return { "status": "success"}

    # Adding new user
    hashed_password = auth_handler.get_password_hash(auth_details.password)
    users.append({
        'username': auth_details.username,
        'hashed_password': hashed_password
    })
    return { "status": "success"}

# Login
@app.post('/user/login', tags=['Users'])
def login(auth_details: AuthDetails):
    confirmed_user = None
    for user in users:
        if user['username'] == auth_details.username:
            confirmed_user = user
            break
    # User don't exist!
    if confirmed_user == None:
        return { "status": "login failed"}

    # Password mismatch!
    if not auth_handler.verify_password(auth_details.password, confirmed_user['hashed_password']):
        return { "status": "login failed"}

    # Create token
    token = auth_handler.encode_token(confirmed_user['username'])

    return { 'token': token}

#? ********************* Private APIs *************************
@app.get('/users/list', tags=['Users'])
def list_users(username=Depends(auth_handler.auth_wrapper)):
    return [user['username'] for user in users]
