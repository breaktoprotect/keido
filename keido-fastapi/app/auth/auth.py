from hashlib import algorithms_available
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone
from os import environ

class AuthHandler():
    SECRETS = environ['SECRETS']

    security = HTTPBearer()
    pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto') # Bcrypt salt is generated https://passlib.readthedocs.io/en/stable/lib/passlib.hash.bcrypt.html

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    def encode_token(self, user_id):
        payload = {
            'exp': (datetime.now(tz=timezone.utc) + timedelta(minutes=1)).timestamp(), #TODO - bug won't expire or always expire
            'iat': datetime.now(tz=timezone.utc).timestamp(), #issued at time (iat)
            'sub': user_id
        }

        #debug
        print("payload -->", payload)
        

        return jwt.encode(
            payload,
            self.SECRETS,
            algorithm = 'HS256'
        )
    
    def decode_token(self, token):
        try:
            #debug
            print("utcnow() ->", datetime.utcnow().timestamp())

            payload = jwt.decode(token, self.SECRETS, algorithms=['HS256'])        
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid token')

    # Dependency injection
    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)