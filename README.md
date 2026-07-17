# 📰 News Aggregator

A full-stack news aggregator that collects articles from multiple international sources and displays them through a clean, editorial-inspired interface.

Built as a personal end-of-studies project at **IMAC (ESIEE Paris / Université Gustave Eiffel)**, focusing on backend architecture, REST API design, and cloud deployment.

🌐 **Live app:** [news-aggregator-a6459.web.app](https://news-aggregator-a6459.web.app)  
🔌 **API:** [news-aggregator-c8rj.onrender.com](https://news-aggregator-c8rj.onrender.com)

---

## Features

- Aggregates articles from **7 sources** (APIs + RSS feeds)
- Filter articles by source
- Editorial card-based UI with varied paper textures and typefaces
- Article detail modal
- Fully responsive (mobile-first design)

---

## Architecture

```
┌─────────────────────────────────────────────┐
│              Browser (React + Vite)         │
│              Firebase Hosting               │
└────────────────────┬────────────────────────┘
                     │ REST API
┌────────────────────▼────────────────────────┐
│           FastAPI Backend (Python)          │
│                Render.com                   │
└──────┬─────────────────────────┬────────────┘
       │ firebase-admin SDK      │ HTTP fetch
┌──────▼──────┐        ┌────────▼────────────┐
│  Firestore  │        │   External Sources  │
│  (Firebase) │        │      Guardian       │
│             │        │  NYTimes · RSS feeds│
└─────────────┘        └─────────────────────┘

```

---

## Tech Stack

### Backend
| Tool | Role |
|------|------|
| Python + FastAPI | REST API framework |
| firebase-admin | Firestore read/write |
| feedparser | RSS XML parsing |
| requests | HTTP calls to news APIs |
| Render.com | Cloud deployment (free tier) |

### Frontend
| Tool | Role |
|------|------|
| React + Vite | UI framework |
| Firebase Hosting | Static hosting (free tier) |

### Data & Automation
| Tool | Role |
|------|------|
| Firebase Firestore | NoSQL article storage |
| cron-job.org | Scheduled fetch (every 6h) |

---

## News Sources

| Source | Type | Language |
|--------|------|----------|
| The Guardian | REST API | EN |
| New York Times | REST API | EN |
| Le Monde | RSS | FR |
| BBC | RSS | EN |
| Reuters | RSS | EN |
| Ouest-France | RSS | FR |
| Médiapart | RSS | FR |

---

## Project Structure

```
news-aggregator/
├── backend/
│   ├── main.py                  # FastAPI entry point + CORS config
│   ├── routers/
│   │   └── articles.py          # API routes
│   ├── services/
│   │   ├── firebase_service.py  # Firestore read/write
│   │   ├── guardian_service.py  # The Guardian API
│   │   ├── nytimes_service.py   # NY Times API
│   │   └── rss_service.py       # RSS feed parser
│   ├── requirements.txt
│   └── .env                     # API keys (not committed)
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── components/
│   │       ├── Header.jsx
│   │       ├── FilterBar.jsx
│   │       ├── ArticleGrid.jsx
│   │       ├── ArticleCard.jsx
│   │       └── ArticleModal.jsx
│   └── package.json
├── firebase.json
└── .firebaserc
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/articles/` | Get all articles (optional `?source=` filter) |
| `GET` | `/articles/{id}` | Get article by ID |
| `POST` | `/articles/refresh` | Fetch from all sources and save to Firestore |

### Source filter values
`all` · `rss` · `api` · `the-guardian` · `new-york-times` · `lemonde` · `bbc` · `reuters`

---

## Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- Firebase project (Spark plan)
- API keys: The Guardian, NY Times

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
```

Create a `.env` file:
```
NEWSAPI_KEY=your_key
GUARDIAN_KEY=your_key
NYTIMES_KEY=your_key
FIREBASE_KEY_PATH=firebase-key.json
```

Place your Firebase service account key as `backend/firebase-key.json`.

Run the API:
```bash
uvicorn main:app --reload
```

API available at `http://127.0.0.1:8000`  
Interactive docs at `http://127.0.0.1:8000/docs`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App available at `http://localhost:5173`

---

## Deployment

### Backend → Render
- Connect GitHub repo to Render
- Root directory: `backend`
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add environment variables: `NEWSAPI_KEY`, `GUARDIAN_KEY`, `NYTIMES_KEY`, `FIREBASE_CREDENTIALS`

### Frontend → Firebase Hosting
```bash
cd frontend && npm run build
cd ..
npx firebase-tools deploy --only hosting
```

### Automated fetch → cron-job.org
Two cron jobs:
1. **Wake-up** — `GET /` at `58 5,11,17,23 * * *`
2. **Refresh** — `POST /articles/refresh` at `0 0,6,12,18 * * *`

---

## Author

**Marie Jacquelin** — IMAC 3rd year, Web specialization  
ESIEE Paris / Université Gustave Eiffel · 2025–2026
