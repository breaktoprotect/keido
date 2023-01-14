FROM    python:3.8.14-alpine3.16
LABEL   author="JS"
LABEL   remarks="Testing only"
# SECRETS for testing only - not to be used in PROD
ENV     SECRETS='4a81fc14cb98bc5ca7056e4130d772a40afbf0cb46ce3a760d870f64e780e49d' 
ENV     JWT_SESSION_HOURS=1

RUN     mkdir /app
RUN     mkdir /app/app
RUN     mkdir /app/db

COPY    ./* /app
COPY    ./app /app/app
COPY    ./requirements.txt /app

WORKDIR /app

RUN     pip3 install -r requirements.txt

EXPOSE  8000

CMD     [ "uvicorn", "main:app", "--host=0.0.0.0", "--reload" ]