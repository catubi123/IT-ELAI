# 🤖 Chatbot Functions Guide

## How to Add New Functions to Your Chatbot

This guide will teach you how to add custom functions to your chatbot. The chatbot works entirely on the client-side (no backend needed), making it perfect for free hosting!

---

## 📍 Where to Add Functions

All chatbot functions are located in `script.js` in the `getBotResponse()` function.

**Location:** `script.js` → `getBotResponse(message)` function

---

## 🎯 Function Structure

Every function follows this pattern:

```javascript
// 1. Check if user message matches your keywords
if (lowerMessage.includes('keyword1') || lowerMessage.includes('keyword2')) {
    // 2. Your function logic here
    // 3. Return a response string
    return "Your response here";
}
```

---

## 📝 Step-by-Step: Adding a New Function

### Example: Adding a "Joke" Function

#### Step 1: Open `script.js`
Find the `getBotResponse()` function (around line 99).

#### Step 2: Add Your Function
Add this code **before** the "Default response" section:

```javascript
// Joke function
if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || 
    lowerMessage.includes('laugh')) {
    const jokes = [
        "Why don't programmers like nature? It has too many bugs! 🐛",
        "How do you comfort a JavaScript bug? You console it! 😄",
        "Why did the developer go broke? Because he used up all his cache! 💰",
        "What's a programmer's favorite hangout place? Foo Bar! 🍺"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}
```

#### Step 3: Test It
1. Save `script.js`
2. Open `index.html` in your browser
3. Type "tell me a joke" in the chatbot
4. It should respond with a random joke!

---

## 💡 More Function Examples

### Example 1: Quote Generator

```javascript
// Quote function
if (lowerMessage.includes('quote') || lowerMessage.includes('inspiration') || 
    lowerMessage.includes('motivation')) {
    const quotes = [
        "The only way to do great work is to love what you do. - Steve Jobs",
        "Innovation distinguishes between a leader and a follower. - Steve Jobs",
        "Code is like humor. When you have to explain it, it's bad. - Cory House",
        "First, solve the problem. Then, write the code. - John Johnson"
    ];
    return `💬 "${quotes[Math.floor(Math.random() * quotes.length)]}"`;
}
```

### Example 2: Color Theme Changer

```javascript
// Theme changer function
if (lowerMessage.includes('change color') || lowerMessage.includes('theme') || 
    lowerMessage.includes('change theme')) {
    const colors = [
        { name: 'Purple', value: '#667eea' },
        { name: 'Blue', value: '#4facfe' },
        { name: 'Pink', value: '#f093fb' },
        { name: 'Green', value: '#43e97b' },
        { name: 'Orange', value: '#fa709a' }
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Change navbar color
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.background = `linear-gradient(135deg, ${randomColor.value} 0%, ${randomColor.value}dd 100%)`;
    }
    
    return `🎨 Changed theme to ${randomColor.name}! Refresh to see the change.`;
}
```

### Example 3: Age Calculator

```javascript
// Age calculator function
if (lowerMessage.includes('age') || lowerMessage.includes('how old')) {
    // Extract year from message (e.g., "born in 2000")
    const yearMatch = message.match(/born in (\d{4})|(\d{4})/);
    if (yearMatch) {
        const birthYear = parseInt(yearMatch[1] || yearMatch[2]);
        const currentYear = new Date().getFullYear();
        const age = currentYear - birthYear;
        
        if (age > 0 && age < 150) {
            return `🎂 If you were born in ${birthYear}, you are ${age} years old (or will be this year)!`;
        }
    }
    return "Please provide a birth year, like 'born in 2000' or 'age 2000'";
}
```

### Example 4: Unit Converter

```javascript
// Unit converter function
if (lowerMessage.includes('convert') || lowerMessage.includes('celsius') || 
    lowerMessage.includes('fahrenheit')) {
    // Extract temperature (e.g., "convert 32 fahrenheit to celsius")
    const tempMatch = message.match(/(\d+)\s*(celsius|fahrenheit|°c|°f)/i);
    if (tempMatch) {
        const temp = parseFloat(tempMatch[1]);
        const unit = tempMatch[2].toLowerCase();
        
        if (unit.includes('fahrenheit') || unit.includes('f')) {
            const celsius = ((temp - 32) * 5 / 9).toFixed(1);
            return `🌡️ ${temp}°F = ${celsius}°C`;
        } else if (unit.includes('celsius') || unit.includes('c')) {
            const fahrenheit = ((temp * 9 / 5) + 32).toFixed(1);
            return `🌡️ ${temp}°C = ${fahrenheit}°F`;
        }
    }
    return "Try: 'convert 32 fahrenheit to celsius' or 'convert 0 celsius to fahrenheit'";
}
```

### Example 5: Password Generator

```javascript
// Password generator function
if (lowerMessage.includes('password') || lowerMessage.includes('generate password')) {
    const length = 12; // Default length
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return `🔐 Generated Password (${length} characters):\n${password}\n\n⚠️ Keep this secure!`;
}
```

---

## 🎨 Advanced Functions

### Function with Multiple Actions

```javascript
// Multi-action function
if (lowerMessage.includes('portfolio info') || lowerMessage.includes('summary')) {
    // Scroll to about section
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    return `📋 Portfolio Summary:\n\n` +
           `👤 Name: Mark Dave Catubig\n` +
           `🎓 Student: IT-ELAI\n` +
           `💼 Projects: 2\n` +
           `🛠️ Skills: HTML/CSS, JavaScript, Node.js\n\n` +
           `Scrolling to About section...`;
}
```

### Function with User Input Parsing

```javascript
// Function that parses complex input
if (lowerMessage.includes('remind me') || lowerMessage.includes('reminder')) {
    // Extract time and message (e.g., "remind me in 5 minutes to call mom")
    const timeMatch = message.match(/in (\d+)\s*(minute|hour|second)/i);
    const taskMatch = message.match(/to (.+)/i);
    
    if (timeMatch && taskMatch) {
        const time = parseInt(timeMatch[1]);
        const unit = timeMatch[2].toLowerCase();
        const task = taskMatch[1];
        
        // Convert to milliseconds
        let milliseconds = time * 1000; // seconds
        if (unit.includes('minute')) milliseconds = time * 60 * 1000;
        if (unit.includes('hour')) milliseconds = time * 60 * 60 * 1000;
        
        setTimeout(() => {
            if (chatbotMessages) {
                addMessage(`⏰ Reminder: ${task}`, 'bot');
            }
        }, milliseconds);
        
        return `✅ I'll remind you to "${task}" in ${time} ${unit}!`;
    }
    
    return "Try: 'remind me in 5 minutes to call mom'";
}
```

---

## 📋 Function Checklist

When adding a new function:

- [ ] Choose clear keywords that users might type
- [ ] Use `lowerMessage.includes('keyword')` to check for matches
- [ ] Handle edge cases (empty input, invalid data, etc.)
- [ ] Return a helpful response string
- [ ] Test with different phrasings
- [ ] Update the "help" function to include your new command
- [ ] Add emojis for better UX (optional but recommended)

---

## 🔧 Updating the Help Function

When you add a new function, update the help function so users know about it:

```javascript
// In the help function, add your new command:
if (lowerMessage.includes('help') || lowerMessage.includes('commands')) {
    return `I can help you with:\n\n` +
           `📊 Calculator - Try "calculate 5 + 3"\n` +
           `⏰ Time - Ask "what time is it"\n` +
           `🎭 Joke - Try "tell me a joke"  ← NEW!\n` +  // Add your new function here
           `... (other commands)`;
}
```

---

## 🐛 Debugging Tips

1. **Open Browser Console** (F12) to see errors
2. **Test with different phrasings** - users type differently
3. **Check spelling** - use common misspellings too
4. **Add console.log()** for debugging:
   ```javascript
   if (lowerMessage.includes('test')) {
       console.log('Test function triggered!');
       return "Test successful!";
   }
   ```

---

## 🚀 Best Practices

1. **Use Multiple Keywords**: Users type differently
   ```javascript
   // Good ✅
   if (lowerMessage.includes('joke') || lowerMessage.includes('funny') || 
       lowerMessage.includes('laugh')) {
   
   // Bad ❌
   if (lowerMessage.includes('joke')) {
   ```

2. **Handle Errors Gracefully**:
   ```javascript
   try {
       // Your code
       return "Success!";
   } catch (error) {
       return "Sorry, something went wrong. Please try again.";
   }
   ```

3. **Provide Helpful Default Messages**:
   ```javascript
   return "I didn't understand. Try: 'calculate 5 + 3' or type 'help'";
   ```

4. **Use Emojis** (makes responses friendlier):
   ```javascript
   return "✅ Success!";  // Better than just "Success!"
   ```

---

## 📚 Current Functions Reference

Your chatbot currently has these functions:

1. ✅ **Greeting** - "hello", "hi", "hey"
2. ✅ **Help** - "help", "commands"
3. ✅ **Calculator** - "calculate 5 + 3", "what's 10 * 5"
4. ✅ **Time** - "what time is it", "current time"
5. ✅ **About** - "tell me about", "who are you"
6. ✅ **Projects** - "show projects", "what projects"
7. ✅ **Contact** - "contact info", "how to reach"
8. ✅ **Weather** - "weather" (mock data)
9. ✅ **Random Number** - "random number"
10. ✅ **Coin Flip** - "flip coin", "heads or tails"
11. ✅ **Skills** - "skills", "technologies"
12. ✅ **Goodbye** - "bye", "goodbye"

---

## 🎓 Learning Exercise

Try adding these functions yourself:

1. **Dictionary Function** - Look up word definitions (use a simple object)
2. **BMI Calculator** - Calculate Body Mass Index
3. **Tip Calculator** - Calculate restaurant tip
4. **Countdown Timer** - Set a countdown
5. **Random Color** - Generate a random hex color

---

## 💬 Need Help?

- Check the `getBotResponse()` function in `script.js`
- Look at existing functions as examples
- Test in browser console (F12)
- Refer to JavaScript documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**Happy coding! 🚀**

