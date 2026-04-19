import feedparser

RSS_FEEDS = {
    "lemonde": "https://www.lemonde.fr/rss/une.xml",
    "bbc": "http://feeds.bbci.co.uk/news/world/rss.xml",
    "reuters": "https://feeds.reuters.com/reuters/topNews",
    "ouest-france": "https://www.ouest-france.fr/rss-en-continu.xml",
    "mediapart": "https://www.mediapart.fr/articles/feed"
}

def fetch_rss():
    articles = []
    for source_name, feed_url in RSS_FEEDS.items():
        try:
            feed = feedparser.parse(feed_url)
            for entry in feed.entries[:10]:
                articles.append({
                    "id": entry.get("link"),
                    "title": entry.get("title"),
                    "description": entry.get("summary"),
                    "url": entry.get("link"),
                    "image": None,
                    "source": source_name,
                    "published_at": entry.get("published"),
                    "type": "rss"
                })
        except Exception as e:
            print(f"Erreur RSS {source_name} : {e}")
    return articles