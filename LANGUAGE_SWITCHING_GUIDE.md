# 🌍 Language Switching Feature Guide

Your chatbot now supports **multiple languages**! You can tell it to change language and it will respond in that language.

---

## 🎯 How to Use

### **Change Language:**

Simply tell the chatbot to change language! Here are examples:

**English:**
- "Change language to Spanish"
- "Switch to French"
- "Speak Filipino"
- "Respond in Japanese"
- "Set language to German"

**Other languages:**
- "Cambiar idioma a inglés" (Change language to English)
- "Parler en français" (Speak in French)
- "Mag-Tagalog" (Speak Tagalog)

### **See Available Languages:**

Just say:
- "Change language"
- "Language"
- "Show languages"

You'll see a list of all supported languages!

---

## 🌐 Supported Languages

Your chatbot supports **16 languages**:

| Language | Code | How to Ask |
|----------|------|------------|
| 🇺🇸 English | `en` | "Change to English" |
| 🇪🇸 Spanish | `es` | "Change to Spanish" / "Cambiar a español" |
| 🇫🇷 French | `fr` | "Change to French" / "Parler en français" |
| 🇩🇪 German | `de` | "Change to German" / "Auf Deutsch" |
| 🇮🇹 Italian | `it` | "Change to Italian" / "In italiano" |
| 🇵🇹 Portuguese | `pt` | "Change to Portuguese" |
| 🇯🇵 Japanese | `ja` | "Change to Japanese" / "日本語で" |
| 🇰🇷 Korean | `ko` | "Change to Korean" |
| 🇨🇳 Chinese | `zh` | "Change to Chinese" |
| 🇸🇦 Arabic | `ar` | "Change to Arabic" |
| 🇮🇳 Hindi | `hi` | "Change to Hindi" |
| 🇵🇭 Filipino | `tl` | "Change to Filipino" / "Mag-Tagalog" |
| 🇷🇺 Russian | `ru` | "Change to Russian" |
| 🇳🇱 Dutch | `nl` | "Change to Dutch" |
| 🇵🇱 Polish | `pl` | "Change to Polish" |

---

## ✨ Features

### **1. Language Persistence**
- Your language choice is **saved** in your browser
- It will remember your preference even after closing the page
- The language indicator shows your current language in the chatbot header

### **2. Smart Detection**
- The chatbot detects language names in multiple languages
- You can ask in English, Spanish, French, etc.
- Examples:
  - "Cambiar idioma a inglés" → Changes to English
  - "Parler en français" → Changes to French
  - "Mag-Tagalog" → Changes to Filipino

### **3. AI-Powered Responses**
- When using Gemini AI, responses are **automatically translated** to your selected language
- Built-in functions also adapt to your language preference
- The chatbot will respond in your chosen language, even if you ask in a different language

---

## 🎨 Visual Indicator

The chatbot header shows your current language:

```
Chat with Me  🇺🇸 English
```

This updates automatically when you change languages!

---

## 📝 Examples

### **Example 1: Change to Spanish**

**You:** "Change language to Spanish"

**Bot:** 
```
✅ Language changed to 🇪🇸 Spanish!

I will now respond in Spanish. How can I help you?
```

**You:** "Tell me about the projects"

**Bot:** (Responds in Spanish)
```
💼 Aquí están los proyectos de Mark:

1. 💻 SISTEMA DE MONITOREO SIT-IN
   - Monitorea las PC usadas y no usadas en el laboratorio...
```

---

### **Example 2: Change to Filipino**

**You:** "Mag-Tagalog"

**Bot:**
```
✅ Language changed to 🇵🇭 Filipino!

I will now respond in Filipino. How can I help you?
```

**You:** "Ano ang mga proyekto?"

**Bot:** (Responds in Filipino)
```
💼 Narito ang mga proyekto ni Mark:

1. 💻 SIT-IN MONITORING SYSTEM
   - Sinusubaybayan ang ginagamit at hindi ginagamit na PC...
```

---

### **Example 3: Change to Japanese**

**You:** "Change language to Japanese"

**Bot:**
```
✅ Language changed to 🇯🇵 Japanese!

I will now respond in Japanese. How can I help you?
```

**You:** "プロジェクトについて教えてください"

**Bot:** (Responds in Japanese)
```
💼 マークのプロジェクトは以下の通りです：

1. 💻 SIT-IN MONITORING SYSTEM
   - ラボの使用中・未使用のPCを監視...
```

---

## 🔧 How It Works

### **Technical Details:**

1. **Language Storage:** Uses `localStorage` to save your preference
2. **Language Detection:** Smart keyword matching for language names
3. **Gemini Integration:** Language preference is sent to Gemini API
4. **Built-in Functions:** Some responses are translated based on language

### **Code Location:**

- Language management: `script.js` → `CHATBOT_LANGUAGE` object
- Language change function: `script.js` → `getBotResponse()` → Language change handler
- Gemini integration: `script.js` → `getGeminiResponse()` → Includes language in prompt

---

## 🐛 Troubleshooting

### **Problem: Language not changing**

**Solutions:**
1. Make sure you're using the correct language name
2. Try: "Change language" to see available options
3. Check browser console (F12) for errors
4. Clear browser cache and try again

### **Problem: Responses still in English**

**Solutions:**
1. Make sure Gemini AI is enabled (check `config.js`)
2. The language change only affects AI responses (Gemini)
3. Built-in functions may still show some English text
4. Try asking a complex question that uses Gemini AI

### **Problem: Language indicator not showing**

**Solutions:**
1. Refresh the page
2. Check if `index.html` has the language indicator element
3. Open browser console (F12) to check for errors

---

## 💡 Tips

1. **Natural Language:** You can ask naturally - "Speak Spanish" works just as well as "Change language to Spanish"

2. **Multiple Ways:** There are many ways to ask:
   - "Change language to [language]"
   - "Switch to [language]"
   - "Speak [language]"
   - "Respond in [language]"

3. **Language Names:** You can use language names in any language:
   - "Cambiar a español" (Spanish)
   - "Parler en français" (French)
   - "Mag-Tagalog" (Filipino)

4. **Persistence:** Your language choice is saved, so you don't need to change it every time!

---

## ✅ Summary

Your chatbot now supports **16 languages** with:
- ✅ Easy language switching
- ✅ Language persistence (saved in browser)
- ✅ Visual language indicator
- ✅ Smart language detection
- ✅ AI-powered multilingual responses

**Just say "change language" to get started!** 🌍

