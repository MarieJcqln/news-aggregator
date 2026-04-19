import requests
import os

def fetch_guardian():
    api_key = os.getenv("GUARDIAN_KEY")
    url = "https://content.guardianapis.com/search"
    params = {
        "api-key": api_key,
        "show-fields": "trailText,thumbnail",
        "page-size": 20,
        "order-by": "newest"
    }
    try:
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        articles = []
        for item in data.get("response", {}).get("results", []):
            fields = item.get("fields", {})
            articles.append({
                "id": item.get("id"),
                "title": item.get("webTitle"),
                "description": fields.get("trailText"),
                "url": item.get("webUrl"),
                "image": fields.get("thumbnail"),
                "source": "the-guardian",
                "published_at": item.get("webPublicationDate"),
                "type": "api"
            })
        return articles
    except Exception as e:
        print(f"Erreur Guardian : {e}")
        return []