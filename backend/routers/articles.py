from fastapi import APIRouter, Query
from services.news_service import fetch_news
from services.rss_service import fetch_rss
from services.firebase_service import save_articles, get_articles_from_db

router = APIRouter()

@router.get("/")
def get_articles(source: str = Query(default="all")):
    return get_articles_from_db(source)

@router.post("/refresh")
def refresh_articles():
    rss = fetch_rss()
    news = fetch_news()
    all_articles = rss + news
    saved = save_articles(all_articles)
    return {"message": f"{saved} articles sauvegardés dans Firestore"}

@router.get("/{article_id}")
def get_article(article_id: str):
    db_articles = get_articles_from_db()
    for a in db_articles:
        if a.get("id") == article_id:
            return a
    return {"error": "article non trouvé"}