# Portfolio Website with Chatbot

A modern, responsive portfolio website with an interactive chatbot feature. Built as a Final Requirements for IT-ELAI subject.

## 🚀 Features

- **Modern Portfolio Design** - Beautiful gradient UI with smooth animations
- **Interactive Chatbot** - Client-side chatbot with multiple functions
- **Responsive Design** - Works on desktop, tablet, and mobile
- **No Backend Required** - Everything works client-side (perfect for free hosting!)

## 📁 Project Structure

```
IT-ELAI/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality & chatbot
├── logo.png            # Profile image
├── DEPLOYMENT_GUIDE.md # Guide for deploying for free
├── CHATBOT_FUNCTIONS_GUIDE.md # Guide for adding chatbot functions
└── README.md           # This file
```

## 🤖 Chatbot Functions

The chatbot can help with:

- **Calculator** - "calculate 5 + 3" or "what's 10 * 5"
- **Time** - "what time is it"
- **About** - "tell me about" or "who are you"
- **Projects** - "show projects"
- **Contact** - "contact info"
- **Weather** - "weather" (mock data)
- **Random** - "random number" or "flip coin"
- **Help** - "help" or "commands"

Type "help" in the chatbot to see all available commands!

## 🚀 Quick Start

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. That's it! No installation needed.

### Deploy for Free

See `DEPLOYMENT_GUIDE.md` for detailed instructions on deploying to:
- GitHub Pages (Recommended)
- Netlify
- Vercel
- Cloudflare Pages

**Quick GitHub Pages Setup:**
1. Create a GitHub account
2. Create a new repository
3. Upload your files
4. Go to Settings → Pages
5. Select "main" branch
6. Your site is live!

## 🛠️ Adding New Chatbot Functions

See `CHATBOT_FUNCTIONS_GUIDE.md` for a complete guide on:
- How functions work
- Step-by-step instructions
- Example functions
- Best practices

**Quick Example:**
```javascript
// In script.js, add to getBotResponse() function:
if (lowerMessage.includes('joke')) {
    return "Why don't programmers like nature? It has too many bugs! 🐛";
}
```

## 📝 Customization

### Change Colors
Edit the gradient colors in `styles.css`:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Update Personal Info
Edit `index.html`:
- Name, title, description
- Contact information
- Projects
- Skills

### Add More Sections
Simply add new `<section>` elements in `index.html` and style them in `styles.css`.

## 📚 Documentation

- **DEPLOYMENT_GUIDE.md** - How to deploy your site for free
- **CHATBOT_FUNCTIONS_GUIDE.md** - How to add chatbot functions
- **README.md** - This file

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML, CSS, JavaScript
- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [JavaScript Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions)

## 📧 Contact

- **Email:** markdavecatubig@gmail.com
- **Phone:** 09773812852
- **Location:** Cebu, Philippines

## 📄 License

This project is created for educational purposes as a Final Requirements for IT-ELAI.

---

**Made with ❤️ by Mark Dave Catubig**

