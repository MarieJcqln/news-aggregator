from fastapi import APIRouter, Query
from services.news_service import fetch_news
from services.rss_service import fetch_rss
from services.guardian_service import fetch_guardian
#from services.nytimes_service import fetch_nytimes
from services.firebase_service import save_articles, get_articles_from_db

router = APIRouter()

@router.get("/")
def get_articles(source: str = Query(default="all")):
    try:
        return get_articles_from_db(source)
    except Exception as e:
        print(f"Erreur Firestore : {e}")
        return []

@router.post("/refresh")
def refresh_articles():
    rss = fetch_rss()
    news = fetch_news()
    guardian = fetch_guardian()
    # nytimes = fetch_nytimes()
    all_articles = rss + news + guardian 
    saved = save_articles(all_articles)
    return {"saved": saved}

@router.get("/{article_id}")
def get_article(article_id: str):
    db_articles = get_articles_from_db()
    for a in db_articles:
        if a.get("id") == article_id:
            return a
    return {"error": "article non trouvé"}