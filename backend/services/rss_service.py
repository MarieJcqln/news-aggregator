import feedparser

RSS_FEEDS = {
    "lemonde": "https://www.lemonde.fr/rss/une.xml",
    "bbc": "http://feeds.bbci.co.uk/news/world/rss.xml"
}

def fetch_rss():
    articles = []
    for source_name, feed_url in RSS_FEEDS.items():
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
    return articles