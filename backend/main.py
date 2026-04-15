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
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://news-aggregator-a6459.web.app",
        "https://news-aggregator-a6459.firebaseapp.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(articles.router, prefix="/articles", tags=["articles"])

@app.get("/")
def root():
    return {"status": "ok", "message": "News Aggregator API is running"}