const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// Simple chatbot responses (replace with API integration for smarter responses)
const botResponses = {
    'hello': 'Hi! How can I help you today?',
    'hi': 'Hello! What can I do for you?',
    'how are you': 'I\'m doing great! How about you?',
    'what is your name': 'I\'m Mark Dave\'s Portfolio Assistant.',
    'tell me about': 'I have a SIT-IN MONITORING SYSTEM project that monitors used and unused PCs in the CCS Department laboratory.',
    'projects': 'My main project is the SIT-IN MONITORING SYSTEM which helps track PC usage in the laboratory.',
    'skills': 'I specialize in full-stack development, system monitoring, and web applications.',
    'hire': 'Great! You can contact me via email at markdave@example.com or fill out the contact form to discuss opportunities.',
    'how can i contact': 'You can reach out via the Contact section or chat with me here!',
    'default': 'That\'s interesting! Tell me more or ask about my projects and experience.'
};

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message.toLowerCase();
    
    // Find matching response
    let reply = botResponses['default'];
    for (const key in botResponses) {
        if (userMessage.includes(key)) {
            reply = botResponses[key];
            break;
        }
    }

    res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
