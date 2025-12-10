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
        return `I can help you with:\n\n` +
               `📊 Calculator - Try "calculate 5 + 3" or "what's 10 * 5"\n` +
               `⏰ Time - Ask "what time is it" or "current time"\n` +
               `📝 About - Ask "tell me about" or "who are you"\n` +
               `💼 Projects - Ask "show projects" or "what projects"\n` +
               `📧 Contact - Ask "contact info" or "how to reach"\n` +
               `🌤️ Weather - Ask "weather" (mock data)\n` +
               `🎲 Random - Try "random number" or "flip coin"\n\n` +
               `Type any of these to get started!`;
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

async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show typing indicator
    const typingIndicator = addMessage('Typing...', 'bot');
    typingIndicator.classList.add('typing');

    // Simulate typing delay for better UX
    setTimeout(() => {
        // Get bot response using our function
        const botResponse = getBotResponse(message);
        typingIndicator.remove();
        addMessage(botResponse, 'bot');
    }, 500); // 500ms delay to simulate thinking
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
        // Add your form submission logic here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}
