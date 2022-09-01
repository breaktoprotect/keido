from pydantic import BaseModel

class AuthDetails(BaseModel):
    username: str
    password: str
    class Config:
        schema_extra = {
            "example": {
                "username": "bob",
                "password": "bob"
            }
        }