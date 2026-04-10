import firebase_admin
from firebase_admin import credentials, firestore
import os

def get_db():
    if not firebase_admin._apps:
        key_path = os.getenv("FIREBASE_KEY_PATH", "firebase-key.json")
        cred = credentials.Certificate(key_path)
        firebase_admin.initialize_app(cred)
    return firestore.client()

def save_articles(articles: list):
    db = get_db()
    collection = db.collection("articles")
    saved = 0
    for article in articles:
        if not article.get("id"):
            continue
        doc_id = article["id"].replace("/", "_").replace(".", "_")[:100]
        collection.document(doc_id).set(article)
        saved += 1
    return saved

def get_articles_from_db(source: str = "all"):
    db = get_db()
    collection = db.collection("articles")
    if source != "all":
        query = collection.where("type", "==", source).limit(50)
    else:
        query = collection.limit(50)
    docs = query.stream()
    return [doc.to_dict() for doc in docs]