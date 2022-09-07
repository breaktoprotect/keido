from pydantic import BaseModel

class AuthDetails(BaseModel):
    email: str
    password: str
    class Config:
        schema_extra = {
            "example": {
                "email": "bob",
                "password": "bob"
            }
        }