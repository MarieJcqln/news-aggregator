import requests
import os

def fetch_news():
    api_key = os.getenv("NEWSAPI_KEY")
    url = "https://newsapi.org/v2/top-headlines"
    params = {
        "apiKey": api_key,
        "country": "fr",
        "pageSize": 20
    }
    try:
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        print(f"NewsAPI status: {data.get('status')} - {data.get('message', '')}")
        if data.get("status") != "ok":
            return []
        articles = []
        for item in data.get("articles", []):
            if not item.get("title") or item.get("title") == "[Removed]":
                continue
            articles.append({
                "id": item.get("url"),
                "title": item.get("title"),
                "description": item.get("description"),
                "url": item.get("url"),
                "image": item.get("urlToImage"),
                "source": item.get("source", {}).get("name"),
                "published_at": item.get("publishedAt"),
                "type": "newsapi"
            })
        return articles
    except Exception as e:
        print(f"Erreur NewsAPI : {e}")
        return []