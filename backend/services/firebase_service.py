import firebase_admin
from firebase_admin import credentials, firestore
import os
import json

def get_db():
    if not firebase_admin._apps:
        creds_json = os.getenv("FIREBASE_CREDENTIALS")
        if creds_json:
            cred = credentials.Certificate(json.loads(creds_json))
        else:
            base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
            key_path = os.path.join(base_dir, "firebase-key.json")
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