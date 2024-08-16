from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware import Middleware
from fastapi.middleware.cors import CORSMiddleware

from apis.v1 import router as v1_api_router
from db.database import sessionmanager


@asynccontextmanager
async def lifespan(_app: FastAPI):
    """
    Function that handles startup and shutdown events.
    To understand more, read https://fastapi.tiangolo.com/advanced/events/
    """
    yield
    if sessionmanager.engine is not None:
        # Close the DB connection
        await sessionmanager.close()


origins = ["http://localhost", "http://localhost:4200"]
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    ),
]
app = FastAPI(lifespan=lifespan, middleware=middleware)

app.include_router(v1_api_router)
