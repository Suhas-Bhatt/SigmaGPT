# 🌌 SigmaGPT

A premium, full-stack AI chat application powered by OpenAI GPT-4o-Mini. Features a sophisticated Dark Dim UI, real-time conversation persistence, and intelligent thread management — all containerised with Docker.

---

## ✨ Features

- **AI-Powered Chat** — Conversations driven by OpenAI GPT-4o-Mini
- **Dark Dim UI** — Absolute-black backgrounds with slate-grey accents, optimised for long sessions
- **Conversation Threads** — Create, rename, and switch between multiple chat sessions
- **Smart Sidebar Sorting** — Most recently active threads surface to the top automatically
- **Real-time Persistence** — All messages stored in MongoDB Atlas
- **Responsive Design** — Seamless across mobile, tablet, and desktop via Tailwind CSS v4
- **Glassmorphism Aesthetics** — Smooth animations and premium typography (Outfit font)

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5 |
| **Database** | MongoDB Atlas (Mongoose) |
| **AI Engine** | OpenAI API — GPT-4o-Mini |
| **Containerisation** | Docker, Docker Compose, Nginx |

---

## 📁 Project Structure

```
SigmaGPT-AI-Chat-Application/
├── Backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express API routes
│   ├── utils/           # Helper utilities
│   ├── server.js        # Entry point
│   ├── .env             # Backend environment variables (git-ignored)
│   └── Dockerfile
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Chat.jsx
│   │   ├── ChatWindow.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── .env             # Frontend environment variables (git-ignored)
│   ├── nginx.conf       # Nginx config for SPA routing
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 🔑 Environment Variables

### `Backend/.env`
```env
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
OPENAI_API_KEY=sk-...
```

### `Frontend/.env`
```env
# URL the browser uses to reach the backend
VITE_API_BASE_URL=http://localhost:8080
```

> **Note:** Neither `.env` file is committed to version control. Create them manually before running the app.

---

## 🖥️ Local Development (without Docker)

### Prerequisites
- Node.js v18+
- A MongoDB Atlas cluster
- An OpenAI API key

### Install dependencies

```bash
# Backend
cd Backend && npm install

# Frontend
cd ../Frontend && npm install
```

### Run

```bash
# Terminal 1 — Backend (http://localhost:8080)
cd Backend
node server.js

# Terminal 2 — Frontend (http://localhost:5173)
cd Frontend
npm run dev
```

---

## 🐳 Docker Setup (Recommended)

The entire application (backend + frontend via Nginx) runs with a single command using Docker Compose.

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Architecture

```
Browser
  │
  ├── :80   → Frontend (Nginx serving React build)
  └── :8080 → Backend  (Node.js / Express)
                └── MongoDB Atlas (cloud)
```

### Run

```bash
docker-compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost:8080 |

### Stop

```bash
docker-compose down
```

---

## 🌐 Cloud Deployment

For instructions on deploying to **Render**, see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

Designed with ❤️ for the Sigma Community.
