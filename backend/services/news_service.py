import requests
import os

def fetch_news():
    api_key = os.getenv("NEWSAPI_KEY")
    print(f"Clé API : {api_key}")  # ligne de debug
    url = "https://newsapi.org/v2/top-headlines"
    params = {
        "apiKey": api_key,
        "country": "fr",
        "pageSize": 20
    }
    response = requests.get(url, params=params)
    data = response.json()
    print(f"Réponse NewsAPI : {data}") #debug

    articles = []
    for item in data.get("articles", []):
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