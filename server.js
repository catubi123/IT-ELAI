const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Import RAG service
const { loadKnowledgeBase, getRAGContext } = require('./rag-service');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// Load knowledge base on startup
loadKnowledgeBase();

app.post('/api/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        
        // Get RAG context from knowledge base
        const ragContext = getRAGContext(userMessage);
        
        res.json({ 
            context: ragContext
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ context: '' });
    }
});

// Explicitly serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
