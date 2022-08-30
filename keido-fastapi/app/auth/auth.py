from hashlib import algorithms_available
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from datetime import datetime, timedelta
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
            'exp': (datetime.utcnow() + timedelta(days=0, minutes=5)).timestamp(), #TODO - bug won't expire or always expire
            'iat': datetime.utcnow().timestamp(), #issued at time (iat)
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
            payload = jwt.decode(token, self.SECRETS, algorithms=['HS256'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token has expired')
        except jwt.InvalidTokenError as e:
            raise HTTPException(status_code=401, detail='Invalid token')

    # Dependency injection
    def auth_wrapper(self, auth: HTTPAuthorizationCredentials = Security(security)):
        return self.decode_token(auth.credentials)