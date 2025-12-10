# Deployment Configuration Guide

## For Static Site Deployment (Recommended)

Since your chatbot works client-side, you can deploy as a **static site** (no server needed).

### Netlify Configuration:

**Framework Preset:** `None` or `Plain HTML`

**Settings:**
- Build command: (leave empty)
- Publish directory: `/` (root) or leave empty
- Install command: (leave empty)

**OR create `netlify.toml`:**
```toml
[build]
  publish = "."
  command = ""
```

### Vercel Configuration:

**Framework Preset:** `Other` or `None`

**Settings:**
- Build Command: (leave empty)
- Output Directory: `.` (root)
- Install Command: (leave empty)

**OR create `vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.html",
      "use": "@vercel/static"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

---

## For Express Server Deployment

If you want to use your `server.js` file:

### Netlify (with Functions):

**Framework Preset:** `Express` or `Node.js`

**Settings:**
- Build command: `npm install`
- Publish directory: (leave empty)
- Install command: `npm install`

**Note:** Netlify uses serverless functions, so you'd need to convert `server.js` to Netlify Functions format.

### Vercel (with Serverless):

**Framework Preset:** `Express`

**Settings:**
- Build Command: `npm install`
- Output Directory: (leave empty)
- Install Command: `npm install`

**OR create `vercel.json`:**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

---

## Recommendation

**Use Static Site Deployment** because:
- ✅ Your chatbot works client-side (no backend needed)
- ✅ Simpler setup
- ✅ Works on GitHub Pages (completely free)
- ✅ Faster loading
- ✅ No server costs

The `server.js` file is optional - your chatbot uses Gemini API directly from the browser!

---

## Quick Setup

### For Netlify (Static):
1. Framework Preset: **None**
2. Publish directory: **/** (root)
3. Deploy!

### For Vercel (Static):
1. Framework Preset: **Other**
2. Output Directory: **.**
3. Deploy!

### For GitHub Pages:
- No configuration needed!
- Just enable Pages in repository settings
- Select `main` branch and `/ (root)` folder

---

**That's it! Your site will deploy as a static site! 🚀**

