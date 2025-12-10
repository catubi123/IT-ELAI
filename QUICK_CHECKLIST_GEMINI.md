# ✅ Quick Checklist: Enable Gemini AI on Your Deployed Site

Follow these steps in order:

## Step 1: Get API Key ⏱️ 5 min
- [ ] Go to: https://aistudio.google.com/app/apikey
- [ ] Sign in with Google account
- [ ] Click "Create API Key"
- [ ] Copy the key (looks like: `AIzaSy...`)
- [ ] Save it somewhere safe!

## Step 2: Add to Project ⏱️ 2 min
- [ ] Open `config.js` file
- [ ] Find: `API_KEY: 'YOUR_GEMINI_API_KEY_HERE'`
- [ ] Replace with: `API_KEY: 'YOUR_ACTUAL_KEY_HERE'`
- [ ] Save file (Ctrl+S)

## Step 3: Test Locally ⏱️ 1 min
- [ ] Open `index.html` in browser
- [ ] Click chatbot (💬 button)
- [ ] Ask: "What is artificial intelligence?"
- [ ] Should get AI response (not default message)
- [ ] ✅ If working → Proceed to Step 4
- [ ] ❌ If not → Check API key in `config.js`

## Step 4: Deploy ⏱️ 3 min
- [ ] Commit changes: `git add config.js && git commit -m "Add Gemini API" && git push`
- [ ] OR manually upload to Vercel
- [ ] Wait for deployment (1-2 minutes)

## Step 5: Verify ⏱️ 1 min
- [ ] Visit: https://catubig.vercel.app/
- [ ] Open chatbot
- [ ] Ask: "Explain machine learning"
- [ ] Should get intelligent AI response
- [ ] ✅ Success!

---

## 🎯 Total Time: ~12 minutes

## 🐛 Not Working?

1. **Check browser console** (F12 → Console tab)
2. **Verify API key** is correct in `config.js`
3. **Make sure** `config.js` is deployed (check Vercel files)
4. **Try** asking a question that doesn't match built-in functions

---

**Need detailed instructions?** See `GEMINI_DEPLOYMENT_GUIDE.md`

