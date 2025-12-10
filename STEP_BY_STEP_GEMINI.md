# 🎯 Step-by-Step: Make Your Chatbot Work Like Gemini AI

## 📸 Visual Guide

### **STEP 1: Get Your FREE API Key**

1. **Open this link in your browser:**
   ```
   https://aistudio.google.com/app/apikey
   ```

2. **You'll see a page like this:**
   - Click **"Create API Key"** button
   - Or **"Get API Key"** button

3. **Select project:**
   - Choose **"Create API key in new project"**
   - Click **"Create API key"**

4. **Copy your key:**
   - It will look like: `AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567`
   - **⚠️ COPY IT NOW!** You won't see it again.

---

### **STEP 2: Add API Key to config.js**

1. **Open `config.js` file** (in your project folder)

2. **You'll see this:**
   ```javascript
   API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
   ```

3. **Replace it with your actual key:**
   ```javascript
   API_KEY: 'AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567',
   ```
   (Use YOUR actual key, not this example!)

4. **Save the file** (Press Ctrl+S)

---

### **STEP 3: Test Locally**

1. **Open `index.html`** in your browser
   - Double-click the file
   - Or right-click → Open with → Chrome/Firefox

2. **Click the chatbot button** (💬 icon)

3. **Type a test question:**
   ```
   What is artificial intelligence?
   ```

4. **Expected result:**
   - ✅ You get a detailed, intelligent AI response
   - ❌ If you see "Sorry, Gemini API is not configured..." → Go back to Step 2

---

### **STEP 4: Deploy to Vercel**

#### **If using GitHub:**

1. **Open terminal/command prompt** in your project folder

2. **Run these commands:**
   ```bash
   git add config.js
   git commit -m "Add Gemini API key"
   git push
   ```

3. **Wait 1-2 minutes** for Vercel to auto-deploy

#### **If deploying manually:**

1. **Go to:** https://vercel.com/dashboard
2. **Click your project** (catubig)
3. **Go to Deployments tab**
4. **Click "..." → Redeploy**
5. **Upload your files** (make sure `config.js` is included!)

---

### **STEP 5: Test on Deployed Site**

1. **Visit your site:**
   ```
   https://catubig.vercel.app/
   ```

2. **Open chatbot** (💬 button)

3. **Test with these questions:**
   - "What is artificial intelligence?"
   - "Explain machine learning"
   - "How do I learn programming?"
   - "Tell me about web development"

4. **✅ Success if:**
   - You get intelligent, detailed responses
   - Responses are different each time
   - Can answer complex questions

---

## 🎉 Done!

Your chatbot now works like Gemini AI!

---

## 🐛 Troubleshooting

### **Problem: Still getting default responses**

**Check:**
1. ✅ API key is correct in `config.js`
2. ✅ No extra spaces in API key
3. ✅ `config.js` is saved and deployed
4. ✅ Try asking: "What is AI?" (not matching built-in functions)

### **Problem: "Gemini API is not configured"**

**Fix:**
1. Open `config.js`
2. Make sure API key is NOT `'YOUR_GEMINI_API_KEY_HERE'`
3. Should be: `'AIzaSyYourActualKeyHere'`
4. Save and redeploy

### **Problem: Error in browser console**

**Check:**
1. Press F12 → Console tab
2. Look for red error messages
3. Common errors:
   - "API key invalid" → Get new key
   - "CORS error" → Shouldn't happen with Gemini API
   - "Network error" → Check internet connection

---

## 📝 Quick Reference

| Step | Action | Time |
|------|--------|------|
| 1 | Get API key | 5 min |
| 2 | Add to config.js | 2 min |
| 3 | Test locally | 1 min |
| 4 | Deploy | 3 min |
| 5 | Verify | 1 min |
| **Total** | | **~12 min** |

---

**Need more help?** See `GEMINI_DEPLOYMENT_GUIDE.md` for detailed instructions!

