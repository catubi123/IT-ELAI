const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

let currentLanguage = 'en';

const responses = {
  en: {
    welcome: "Hi! I can help you with:\n📊 Calculator - Try 'calculate 5 + 3'\n⏰ Time - Ask 'what time is it'\n📝 About - Ask 'tell me about'\n💼 Projects - Ask 'show projects'\n📧 Contact - Ask 'contact info'\n🌤️ Weather - Ask 'weather'\n🎲 Random - Try 'random number'\n🌍 Language - Say 'change language'\n🤖 AI - Ask any complex question",
    calculator: (num) => `Result: ${num}`,
    time: () => new Date().toLocaleTimeString(),
    about: "I'm Mark Dave's AI Assistant, built to help answer questions about his portfolio and skills!",
    projects: "My Projects:\n1. SIT-IN MONITORING SYSTEM - Lab PC monitoring\n2. Portfolio Website - This site with chatbot!",
    contact: "📧 Email: markdavecatubig@gmail.com\n📱 Phone: +63 977 381 2852\n📍 Location: Cebu, Philippines",
    weather: "🌤️ Current Weather (Mock): 25°C, Sunny ☀️",
    randomNum: () => Math.floor(Math.random() * 100),
    coinFlip: () => Math.random() > 0.5 ? "Heads 🪙" : "Tails 🪙",
    changeLang: "Select language: 'English', 'Spanish', 'French'"
  },
  es: {
    welcome: "¡Hola! Puedo ayudarte con:\n📊 Calculadora\n⏰ Hora\n📝 Sobre mí\n💼 Proyectos\n📧 Contacto",
    calculator: (num) => `Resultado: ${num}`,
    time: () => new Date().toLocaleTimeString('es-ES'),
    about: "¡Soy el Asistente de IA de Mark Dave!",
    projects: "Mis Proyectos:\n1. Sistema de Monitoreo\n2. Sitio de Portafolio",
    contact: "📧 Email: markdavecatubig@gmail.com\n📱 Teléfono: +63 977 381 2852",
    weather: "🌤️ Clima Actual: 25°C, Soleado",
    randomNum: () => Math.floor(Math.random() * 100),
    coinFlip: () => Math.random() > 0.5 ? "Cara 🪙" : "Cruz 🪙",
    changeLang: "Selecciona idioma: 'English', 'Spanish', 'French'"
  },
  fr: {
    welcome: "Bonjour! Je peux vous aider avec:\n📊 Calculatrice\n⏰ Heure\n📝 À propos\n💼 Projets\n📧 Contact",
    calculator: (num) => `Résultat: ${num}`,
    time: () => new Date().toLocaleTimeString('fr-FR'),
    about: "Je suis l'Assistant IA de Mark Dave!",
    projects: "Mes Projets:\n1. Système de Surveillance\n2. Site Portfolio",
    contact: "📧 Email: markdavecatubig@gmail.com\n📱 Téléphone: +63 977 381 2852",
    weather: "🌤️ Météo Actuelle: 25°C, Ensoleillé",
    randomNum: () => Math.floor(Math.random() * 100),
    coinFlip: () => Math.random() > 0.5 ? "Face 🪙" : "Pile 🪙",
    changeLang: "Sélectionnez la langue: 'English', 'Spanish', 'French'"
  }
};

chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
    if (chatbotWidget.classList.contains('active')) {
        if (chatbotMessages.children.length === 0) {
            addMessage(responses[currentLanguage].welcome, 'bot');
        }
        chatbotInput.focus();
    }
});

closeChatbot.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
});

async function processMessage(message) {
    const lowerMsg = message.toLowerCase().trim();
    
    if (lowerMsg.includes('calculate')) {
        try {
            const expr = lowerMsg.replace('calculate', '').trim();
            const result = eval(expr);
            return responses[currentLanguage].calculator(result);
        } catch {
            return "Invalid calculation. Try 'calculate 5 + 3'";
        }
    }
    
    if (lowerMsg.includes('time') || lowerMsg.includes('what time')) {
        return `🕐 ${responses[currentLanguage].time()}`;
    }
    
    if (lowerMsg.includes('about') || lowerMsg.includes('who are you')) {
        return responses[currentLanguage].about;
    }
    
    if (lowerMsg.includes('projects') || lowerMsg.includes('show projects')) {
        return responses[currentLanguage].projects;
    }
    
    if (lowerMsg.includes('contact') || lowerMsg.includes('reach')) {
        return responses[currentLanguage].contact;
    }
    
    if (lowerMsg.includes('weather')) {
        return responses[currentLanguage].weather;
    }
    
    if (lowerMsg.includes('random number') || lowerMsg.includes('random')) {
        return `🎲 Random Number: ${responses[currentLanguage].randomNum()}`;
    }
    
    if (lowerMsg.includes('flip coin')) {
        return `🪙 ${responses[currentLanguage].coinFlip()}`;
    }
    
    if (lowerMsg.includes('change language') || lowerMsg.includes('speak')) {
        if (lowerMsg.includes('spanish') || lowerMsg.includes('español')) {
            currentLanguage = 'es';
            return "✅ Idioma cambiado a Español";
        } else if (lowerMsg.includes('french') || lowerMsg.includes('français')) {
            currentLanguage = 'fr';
            return "✅ Langue changée au Français";
        } else if (lowerMsg.includes('english')) {
            currentLanguage = 'en';
            return "✅ Language changed to English";
        }
        return responses[currentLanguage].changeLang;
    }
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: message })
        });
        const data = await response.json();
        return data.answer || "Sorry, I couldn't process that.";
    } catch (error) {
        return "🤖 AI Mode: I can answer complex questions! What would you like to know?";
    }
}

async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    chatbotInput.value = '';
    addMessage('Thinking...', 'bot typing');

    const response = await processMessage(message);
    
    const typingMessage = chatbotMessages.querySelector('.message.typing');
    if (typingMessage) typingMessage.remove();
    addMessage(response, 'bot');
}

function addMessage(text, sender) {
    const messageEl = document.createElement('div');
    messageEl.className = sender === 'bot typing' ? 'message bot-message typing' : `message ${sender}-message`;
    messageEl.textContent = text;
    chatbotMessages.appendChild(messageEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks) navLinks.classList.remove('active');
    });
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.boxShadow = window.scrollY > 50 ? '0 8px 30px rgba(0,0,0,0.15)' : '0 4px 20px rgba(0,0,0,0.1)';
    }
});

document.querySelectorAll('section').forEach((section, index) => {
    section.style.animationDelay = `${index * 0.1}s`;
});
