// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Toggle chatbot visibility
if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWidget.classList.toggle('active');
    });
}

if (closeChatbot) {
    closeChatbot.addEventListener('click', () => {
        chatbotWidget.classList.remove('active');
    });
}

// Send message
if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// Chatbot response function - handles all user messages
function getBotResponse(message) {
    const lowerMessage = message.toLowerCase().trim();
    
    // Greeting function
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || 
        lowerMessage.includes('hey') || lowerMessage.includes('greetings')) {
        const greetings = [
            "Hello! 👋 How can I help you today?",
            "Hi there! What would you like to know?",
            "Hey! Nice to meet you. How can I assist you?",
            "Greetings! I'm here to help. What can I do for you?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }
    
    // Help function
    if (lowerMessage.includes('help') || lowerMessage.includes('commands') || 
        lowerMessage.includes('what can you do')) {
        const config = window.GEMINI_CONFIG || {};
        const hasGemini = config.ENABLED && config.API_KEY && config.API_KEY !== 'YOUR_GEMINI_API_KEY_HERE';
        
        let helpText = `I can help you with:\n\n` +
               `📊 Calculator - Try "calculate 5 + 3" or "what's 10 * 5"\n` +
               `⏰ Time - Ask "what time is it" or "current time"\n` +
               `📝 About - Ask "tell me about" or "who are you"\n` +
               `💼 Projects - Ask "show projects" or "what projects"\n` +
               `📧 Contact - Ask "contact info" or "how to reach"\n` +
               `🌤️ Weather - Ask "weather" (mock data)\n` +
               `🎲 Random - Try "random number" or "flip coin"\n` +
               `🌍 Language - Say "change language" or "speak Spanish"`;
        
        if (hasGemini) {
            helpText += `\n\n🤖 AI Mode: I can also answer complex questions using Gemini AI!\n` +
                       `Try asking: "What is machine learning?" or "Explain quantum computing"\n` +
                       `💬 I can respond in multiple languages! Say "change language" to see options.`;
        } else {
            helpText += `\n\n💡 Tip: Add Gemini AI for intelligent responses! See GEMINI_SETUP_GUIDE.md`;
        }
        
        helpText += `\n\nType any of these to get started!`;
        return helpText;
    }
    
    // Calculator function
    if (lowerMessage.includes('calculate') || lowerMessage.includes('what is') || 
        lowerMessage.includes('what\'s') || lowerMessage.includes('solve') ||
        /\d+\s*[+\-*/]\s*\d+/.test(message)) {
        try {
            // Extract math expression
            const mathMatch = message.match(/(\d+\.?\d*)\s*([+\-*/])\s*(\d+\.?\d*)/);
            if (mathMatch) {
                const num1 = parseFloat(mathMatch[1]);
                const operator = mathMatch[2];
                const num2 = parseFloat(mathMatch[3]);
                
                let result;
                switch(operator) {
                    case '+': result = num1 + num2; break;
                    case '-': result = num1 - num2; break;
                    case '*': result = num1 * num2; break;
                    case '/': 
                        if (num2 === 0) return "❌ Cannot divide by zero!";
                        result = num1 / num2; 
                        break;
                    default: return "❌ Invalid operator. Use +, -, *, or /";
                }
                return `✅ ${num1} ${operator} ${num2} = ${result}`;
            }
            return "❌ Please provide a valid calculation like '5 + 3' or '10 * 2'";
        } catch (error) {
            return "❌ Sorry, I couldn't calculate that. Try something like '5 + 3'";
        }
    }
    
    // Time function
    if (lowerMessage.includes('time') || lowerMessage.includes('what time') || 
        lowerMessage.includes('current time')) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            second: '2-digit',
            hour12: true 
        });
        const dateString = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        return `⏰ Current Time: ${timeString}\n📅 Date: ${dateString}`;
    }
    
    // About function
    if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || 
        lowerMessage.includes('tell me about')) {
        return `👋 I'm Mark Dave Catubig's portfolio chatbot!\n\n` +
               `I'm here to help you learn about:\n` +
               `• Mark's projects and skills\n` +
               `• Contact information\n` +
               `• Portfolio details\n\n` +
               `This is a Final Requirements for the subject IT-ELAI. ` +
               `Type "help" to see what I can do!`;
    }
    
    // Projects function
    if (lowerMessage.includes('project') || lowerMessage.includes('portfolio') || 
        lowerMessage.includes('work') || lowerMessage.includes('show project')) {
        return `💼 Here are Mark's projects:\n\n` +
               `1. 💻 SIT-IN MONITORING SYSTEM\n` +
               `   - Monitors current used and unused PC in the laboratory CCS Department\n` +
               `   - Type: Web App, Monitoring\n\n` +
               `2. 🚀 Portfolio Website\n` +
               `   - Modern, responsive portfolio with integrated chatbot feature\n` +
               `   - Type: Portfolio, Responsive\n\n` +
               `You can scroll up to see more details in the Projects section!`;
    }
    
    // Contact function
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || 
        lowerMessage.includes('phone') || lowerMessage.includes('reach') ||
        lowerMessage.includes('how to contact')) {
        return `📧 Contact Information:\n\n` +
               `📧 Email: markdavecatubig@gmail.com\n` +
               `📱 Phone: 09773812852\n` +
               `📍 Location: Cebu, Philippines\n\n` +
               `🔗 Social Links:\n` +
               `• Facebook\n` +
               `• LinkedIn\n` +
               `• GitHub\n\n` +
               `You can also use the contact form above!`;
    }
    
    // Weather function (mock data)
    if (lowerMessage.includes('weather') || lowerMessage.includes('temperature')) {
        const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'];
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const temp = Math.floor(Math.random() * 15) + 25; // 25-40°C
        return `🌤️ Weather in Cebu, Philippines:\n\n` +
               `☀️ Condition: ${randomWeather}\n` +
               `🌡️ Temperature: ${temp}°C\n` +
               `💨 Humidity: ${Math.floor(Math.random() * 30) + 60}%\n\n` +
               `(Note: This is mock data. For real weather, you'd need a weather API)`;
    }
    
    // Random number function
    if (lowerMessage.includes('random number') || lowerMessage.includes('random')) {
        const min = 1;
        const max = 100;
        const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        return `🎲 Random number (1-100): ${randomNum}`;
    }
    
    // Coin flip function
    if (lowerMessage.includes('flip') || lowerMessage.includes('coin') || 
        lowerMessage.includes('heads or tails')) {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        return `🪙 Coin Flip Result: ${result}!`;
    }
    
    // Skills function
    if (lowerMessage.includes('skill') || lowerMessage.includes('what can mark do') || 
        lowerMessage.includes('technologies')) {
        return `🛠️ Skills & Technologies:\n\n` +
               `• HTML/CSS\n` +
               `• JavaScript\n` +
               `• Node.js\n` +
               `• Web Development\n` +
               `• UI/UX Design\n\n` +
               `Mark is a dedicated IT student passionate about web development!`;
    }
    
    // Goodbye function
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye') || 
        lowerMessage.includes('see you') || lowerMessage.includes('exit')) {
        return `👋 Goodbye! Thanks for visiting. Feel free to come back anytime!`;
    }
    
    // Default response - if no function matches
    const defaultResponses = [
        "I'm not sure I understand. Try asking about projects, contact info, or type 'help' for commands!",
        "Hmm, I didn't catch that. You can ask me about Mark's projects, contact information, or type 'help' to see what I can do!",
        "I'm still learning! Try asking about:\n• Projects\n• Contact info\n• Skills\n• Or type 'help' for all commands"
    ];
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// Check if message matches built-in functions
function hasBuiltInFunction(message) {
    const lowerMessage = message.toLowerCase().trim();
    const builtInKeywords = [
        'hello', 'hi', 'hey', 'greetings',
        'help', 'commands',
        'calculate', 'what is', 'what\'s', 'solve',
        'time', 'current time',
        'about', 'who are you',
        'project', 'portfolio', 'work',
        'contact', 'email', 'phone',
        'weather', 'temperature',
        'random number', 'random',
        'flip', 'coin',
        'skill', 'technologies',
        'bye', 'goodbye'
    ];
    return builtInKeywords.some(keyword => lowerMessage.includes(keyword));
}

// Call Gemini API for AI-powered responses
async function getGeminiResponse(message) {
    const config = window.GEMINI_CONFIG || {};
    
    // Check if Gemini is enabled and API key is set
    if (!config.ENABLED || !config.API_KEY || config.API_KEY === 'AIzaSyDkQTnafjtEW__DBIZbSy-ZkjpPlYK7KrY') {
        return null; // Return null if Gemini is not configured
    }

    try {
        const response = await fetch(
            `${config.API_URL}?key=${config.API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `You are a helpful assistant for Mark Dave Catubig's portfolio website. 
                            You help visitors learn about Mark's projects, skills, and contact information.
                            Be friendly, concise, and helpful. 
                            If asked about Mark, mention he's an IT student passionate about web development.
                            User message: ${message}`
                        }]
                    }]
                })
            }
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        }
        
        return null;
    } catch (error) {
        console.error('Gemini API error:', error);
        return null;
    }
}

async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    const typingIndicator = addMessage('Typing...', 'bot');
    typingIndicator.classList.add('typing');

    // Check if we should use built-in functions or Gemini
    const config = window.GEMINI_CONFIG || {};
    const useBuiltInFirst = config.USE_AS_FALLBACK !== false;
    
    let botResponse = null;

    if (useBuiltInFirst && hasBuiltInFunction(message)) {
        // Use built-in function (fast response)
        setTimeout(() => {
            botResponse = getBotResponse(message);
            typingIndicator.remove();
            addMessage(botResponse, 'bot');
        }, 500);
    } else if (config.ENABLED && config.API_KEY && config.API_KEY !== 'YOUR_GEMINI_API_KEY_HERE') {
        // Use Gemini API for AI-powered response
        try {
            botResponse = await getGeminiResponse(message);
            
            // If Gemini fails or returns null, fall back to built-in
            if (!botResponse) {
                botResponse = getBotResponse(message);
            }
        } catch (error) {
            console.error('Error getting Gemini response:', error);
            botResponse = getBotResponse(message); // Fallback to built-in
        }
        
        typingIndicator.remove();
        addMessage(botResponse, 'bot');
    } else {
        // No Gemini configured, use built-in functions
        setTimeout(() => {
            botResponse = getBotResponse(message);
            typingIndicator.remove();
            addMessage(botResponse, 'bot');
        }, 500);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender + '-message');
    messageDiv.textContent = text;
    if (chatbotMessages) {
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    return messageDiv;
}

// Add initial bot message
window.addEventListener('DOMContentLoaded', () => {
    if (chatbotMessages) {
        setTimeout(() => {
            addMessage('Hello! 👋 I\'m here to help you learn about Mark\'s portfolio. Type "help" to see what I can do!', 'bot');
        }, 1000);
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Success feedback
            submitBtn.innerHTML = '<span>✓ Message Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.style.cssText = 'background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 1rem; border-radius: 8px; margin-top: 1rem; text-align: center; animation: slideDown 0.3s ease;';
            successMsg.innerHTML = `✓ Thank you, ${name}! Your message has been sent. I'll get back to you soon at ${email}.`;
            contactForm.appendChild(successMsg);
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                successMsg.remove();
            }, 3000);
        }, 1500);
    });
}

// Add slideDown animation for success message
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
