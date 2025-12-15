const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

// Import RAG service
const { loadKnowledgeBase, getRAGContext } = require('./rag-service');
const chatbotHandler = require('./chatbotHandler');
const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');
const { addToHistory, getConversationContext, initializeConversation } = require('./conversationMemory');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('.'));

// Load knowledge base on startup
loadKnowledgeBase();

app.use(chatbotHandler);

// Knowledge base search endpoint with conversation context
app.post('/api/search', (req, res) => {
  const { query, sessionId } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Initialize or get conversation
  if (sessionId && !conversationHistory[sessionId]) {
    initializeConversation(sessionId);
  }

  // Search knowledge base
  const result = searchKnowledgeBase(query);
  
  // Add to conversation history
  if (sessionId) {
    addToHistory(sessionId, 'user', query);
    if (result) {
      addToHistory(sessionId, 'bot', result.answer);
    }
  }

  const answer = result ? result.answer : "I couldn't find an answer to that question. Could you rephrase it or contact support@example.com for assistance?";
  
  res.json({ 
    answer: answer,
    query: query,
    sessionId: sessionId,
    confidence: result?.confidence || 'low'
  });
});

// Get conversation history
app.get('/api/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const history = getConversationContext(sessionId);
  res.json({ history });
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Knowledge Base Server running on port ${PORT}`);
});
