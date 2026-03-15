# Deploying SigmaGPT to Render

Follow these steps to deploy your full-stack AI application to [Render](https://render.com/).

## 1. Prepare Your Code
Ensure your frontend uses an environment variable for the backend URL instead of `localhost`. 

> [!TIP]
> I have already updated your `Sidebar.jsx` and `ChatWindow.jsx` to use `import.meta.env.VITE_API_BASE_URL`.

## 2. Deploy the Backend (Web Service)
1. **Create New Web Service** on Render.
2. **Connect Repository**: Point to your SigmaGPT GitHub repo.
3. **Root Directory**: `Backend`
4. **Environment**: `Node`
5. **Build Command**: `npm install`
6. **Start Command**: `node server.js`
7. **Environment Variables**: Add the following in the Render Dashboard:
   - `OPENAI_API_KEY`: Your OpenAI key.
   - `MONGODB_URL`: Your MongoDB connection string.
   - `PORT`: `8080` (Render will provide this automatically, but ensure your code uses `process.env.PORT`).

## 3. Deploy the Frontend (Static Site)
1. **Create New Static Site** on Render.
2. **Connect Repository**: Point to the same repo.
3. **Root Directory**: `Frontend`
4. **Build Command**: `npm run build`
5. **Publish Directory**: `dist`
6. **Environment Variables**: Add:
   - `VITE_API_BASE_URL`: The URL of your deployed Render Backend (e.g., `https://sigmagpt-api.onrender.com`).

## 4. Database (MongoDB Atlas)
1. Go to **Network Access** in your MongoDB Atlas dashboard.
2. Click **Add IP Address**.
3. Choose **Allow Access from Anywhere** (0.0.0.0/0) or add Render's outbound IPs.

---

### Verification
Once both are deployed, open your Static Site URL. You should be able to chat with SigmaGPT just as you did locally!
