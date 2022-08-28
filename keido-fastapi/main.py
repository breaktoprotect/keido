import uvicorn
from fastapi import FastAPI, Body, Depends

app = FastAPI()

@app.get("/", tags=["Heartbeat"])
def heartbeat():
    return {"status": "alive!"}