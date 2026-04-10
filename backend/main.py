from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import articles
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="News Aggregator API",
    description="API REST pour agréger des articles de presse",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles.router, prefix="/articles", tags=["articles"])

@app.get("/")
def root():
    return {"status": "ok", "message": "News Aggregator API is running"}