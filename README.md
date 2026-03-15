# 🌌 SigmaGPT: Premium Full-Stack AI Chat

SigmaGPT is a state-of-the-art AI chat interface designed for deep focus and precision. It features a sophisticated "Dark Dim" UI, real-time message streaming, and intelligent thread management.

![SigmaGPT Header](file:///C:/Users/Suhas/.gemini/antigravity/brain/1d35360c-15e4-4715-944f-eb3b80884eed/sigmagpt_final_ui_1773558708507.png)

## ✨ Core Features

- **Dark Dim UI**: Absolute black backgrounds with slate grey accents optimized for visual comfort.
- **Ultra-Responsive**: Seamless experience across mobile, tablet, and desktop using Tailwind CSS v4.
- **Smart Sorting**: Your most recently used conversations automatically jump to the top of the sidebar.
- **Premium Aesthetics**: Glassmorphism, smooth animations, and high-end typography (Outfit).
- **Pro Dashboard**: A sleek user interface for account management and system insights.
- **Real-time Persistence**: Messages are securely stored in MongoDB and updated in real-time.

## 🛠️ Tech Stack

- **Frontend**: Vite + React + Tailwind CSS v4
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **AI Engine**: OpenAI (GPT-4o-Mini)
- **Styling**: Google Fonts (Outfit) + FontAwesome 6

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account
- OpenAI API Key

### 2. Installation
Clone the repository and install dependencies in both folders:

```bash
# Backend
cd Backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 3. Environment Setup
Create a `.env` file in the `Backend` directory:
```env
PORT=8080
MONGODB_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
```

Create a `.env` file in the `Frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8080
```

### 4. Running the App
Run the backend and frontend concurrently:

```bash
# Run Backend (from Backend dir)
npm run dev

# Run Frontend (from Frontend dir)
npm run dev
```

## 🌐 Deployment

For instructions on how to deploy this project to **Render**, please see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

Designed with ❤️ for the Sigma Community.
