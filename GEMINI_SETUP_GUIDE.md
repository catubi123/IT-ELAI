# 🤖 Gemini AI Chatbot Setup Guide

This guide will help you integrate Google's Gemini AI into your chatbot for intelligent, AI-powered responses!

## 🎯 What is Gemini?

Gemini is Google's AI chatbot (similar to ChatGPT) that can:
- Answer questions intelligently
- Have natural conversations
- Understand context
- Provide helpful information
- And much more!

## ✅ Benefits

- **FREE API Key** - Google provides free API access
- **Intelligent Responses** - AI-powered, not just rule-based
- **Natural Conversations** - Understands context and intent
- **Hybrid System** - Built-in functions for fast responses + AI for complex questions

## 🚀 Step 1: Get Your FREE Gemini API Key

### Option 1: Google AI Studio (Recommended)
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click **"Create API Key"** or **"Get API Key"**
4. Copy your API key (it looks like: `AIzaSy...`)

### Option 2: Google Cloud Console
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable "Generative Language API"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy your API key

**Note:** The free tier includes:
- 60 requests per minute
- 1,500 requests per day
- Perfect for personal projects!

## 📝 Step 2: Add Your API Key

1. Open `config.js` in your project
2. Find this line:
   ```javascript
   API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
   ```
3. Replace `YOUR_GEMINI_API_KEY_HERE` with your actual API key:
   ```javascript
   API_KEY: 'AIzaSyYourActualAPIKeyHere',
   ```
4. Save the file

## ⚙️ Step 3: Configure Settings

In `config.js`, you can customize:

```javascript
const GEMINI_CONFIG = {
    API_KEY: 'YOUR_API_KEY',           // Your Gemini API key
    ENABLED: true,                      // Set to false to disable Gemini
    USE_AS_FALLBACK: true               // Use Gemini only if built-in functions don't match
};
```

### Configuration Options:

- **ENABLED**: Set to `false` to disable Gemini and use only built-in functions
- **USE_AS_FALLBACK**: 
  - `true` = Use built-in functions first (fast), Gemini for complex questions
  - `false` = Always use Gemini for all questions

## 🧪 Step 4: Test It!

1. Open `index.html` in your browser
2. Open the chatbot
3. Try asking:
   - "What is artificial intelligence?"
   - "Explain quantum computing"
   - "Tell me a story"
   - "How do I learn programming?"

If Gemini is working, you'll get intelligent AI responses!

## 🔒 Security: Protecting Your API Key

### ⚠️ Important for Production:

**For GitHub Pages / Public Hosting:**
- Your API key will be visible in the browser
- Google allows this for client-side use
- Consider setting usage limits in Google Cloud Console

**Better Option (Advanced):**
- Create a backend server (Node.js, Python, etc.)
- Store API key on server
- Make API calls from server
- Client calls your server, not Google directly

### Setting API Key Restrictions (Recommended):

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Credentials"
3. Click on your API key
4. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Generative Language API"
5. Under "Application restrictions":
   - Add your website domain (e.g., `yourusername.github.io`)
6. Save

This limits where your API key can be used!

## 🎨 How It Works

### Hybrid System:

1. **Built-in Functions** (Fast) - For common questions:
   - "calculate 5 + 3" → Instant math
   - "what time is it" → Current time
   - "show projects" → Portfolio info

2. **Gemini AI** (Intelligent) - For complex questions:
   - "What is machine learning?" → AI explanation
   - "How do I become a web developer?" → Detailed advice
   - "Explain quantum physics" → Educational response

### Flow Diagram:

```
User Message
    ↓
Is it a built-in function? (help, calculate, time, etc.)
    ↓ YES → Use Built-in Function (Fast Response)
    ↓ NO
Is Gemini enabled and configured?
    ↓ YES → Call Gemini API (AI Response)
    ↓ NO → Use Built-in Function (Fallback)
```

## 🐛 Troubleshooting

### Problem: "API key not set" or no AI responses

**Solution:**
1. Check that you've added your API key in `config.js`
2. Make sure `ENABLED: true` in `config.js`
3. Open browser console (F12) to see errors
4. Verify API key is correct (no extra spaces)

### Problem: "API error: 400" or "Invalid API key"

**Solution:**
1. Double-check your API key is correct
2. Make sure you copied the entire key
3. Verify the API is enabled in Google Cloud Console
4. Check if you've hit rate limits (60/min, 1500/day)

### Problem: "CORS error" or network errors

**Solution:**
- This shouldn't happen with Gemini API
- If it does, check your internet connection
- Make sure you're using the correct API endpoint

### Problem: Responses are slow

**Solution:**
- This is normal - AI responses take 1-3 seconds
- Built-in functions are instant
- Consider using `USE_AS_FALLBACK: true` for faster common responses

## 📊 API Usage & Limits

### Free Tier Limits:
- **60 requests per minute**
- **1,500 requests per day**
- Perfect for personal portfolios!

### Monitoring Usage:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" → "Dashboard"
3. View your API usage

### If You Exceed Limits:
- You'll get an error message
- Wait for the limit to reset (1 minute or 24 hours)
- Or upgrade to paid tier if needed

## 🎓 Advanced: Customizing Gemini Responses

You can customize the AI's behavior by editing the prompt in `script.js`:

```javascript
text: `You are a helpful assistant for Mark Dave Catubig's portfolio website. 
You help visitors learn about Mark's projects, skills, and contact information.
Be friendly, concise, and helpful. 
If asked about Mark, mention he's an IT student passionate about web development.
User message: ${message}`
```

Change this text to customize:
- The AI's personality
- What information it knows
- How it responds
- Its tone and style

## 🚀 Deployment

### For GitHub Pages:

1. Add your API key to `config.js`
2. Commit and push to GitHub
3. Your site will work with Gemini!

**Note:** Your API key will be visible in the code. This is okay for Gemini API, but consider setting restrictions (see Security section above).

### For Netlify/Vercel:

Same as GitHub Pages - just make sure `config.js` is included in your deployment.

## 📚 Additional Resources

- [Gemini API Documentation](https://ai.google.dev/docs)
- [Google AI Studio](https://aistudio.google.com/)
- [API Pricing](https://ai.google.dev/pricing) (Free tier available!)
- [Getting Started Guide](https://ai.google.dev/tutorials/web_quickstart)

## ✅ Checklist

- [ ] Got API key from Google AI Studio
- [ ] Added API key to `config.js`
- [ ] Tested in browser
- [ ] Set API key restrictions (optional but recommended)
- [ ] Deployed to hosting platform
- [ ] Tested on live site

---

**Congratulations! Your chatbot now has AI superpowers! 🚀🤖**

Need help? Check the troubleshooting section or review the code comments in `script.js`.

