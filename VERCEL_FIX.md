# 🔧 Fix "Cannot GET" Error on Vercel

## The Problem
Vercel is trying to run your Express server (`server.js`) as a serverless function, but it's not configured correctly. Since your chatbot works **client-side** (no backend needed), you should deploy as a **static site**.

## ✅ Solution: Configure Vercel as Static Site

### Option 1: Fix in Vercel Dashboard (Easiest)

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project (`catubig`)
3. Go to **Settings** → **General**
4. Scroll to **Framework Preset**
5. Change it to: **"Other"** or **"None"**
6. **Build Command:** (leave empty)
7. **Output Directory:** `.` (or leave empty)
8. **Install Command:** (leave empty)
9. Click **Save**

### Option 2: Use vercel.json (Already Created)

I've created a `vercel.json` file for you. Just:

1. **Redeploy** your site on Vercel:
   - Go to your project
   - Click **Deployments**
   - Click the **"..."** menu on the latest deployment
   - Click **Redeploy**

OR

2. **Push to GitHub** (if connected):
   ```bash
   git add vercel.json
   git commit -m "Fix Vercel static deployment"
   git push
   ```
   Vercel will automatically redeploy.

## 🎯 Why This Works

Your chatbot uses:
- ✅ **Client-side JavaScript** (script.js)
- ✅ **Gemini API** (called directly from browser)
- ✅ **No backend needed**

So you don't need the Express server (`server.js`) for deployment. The `vercel.json` file tells Vercel to serve your files as a static site instead of trying to run a server.

## ✅ After Fixing

Your site should work at: `https://catubig.vercel.app/`

The chatbot will work perfectly because it runs entirely in the browser!

---

## 📝 Note About server.js

The `server.js` file is still useful for:
- Local development (`npm start`)
- If you want to add backend features later

But for deployment, Vercel will ignore it and serve your static files instead.

