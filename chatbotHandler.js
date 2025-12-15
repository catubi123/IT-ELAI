const express = require('express');
const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');
const router = express.Router();

router.post('/api/flowsie-chat', async (req, res) => {
  const { message } = req.body;
  
  // Search knowledge base
  const context = searchKnowledgeBase(message);
  
  // If found in knowledge base, return it
  if (context) {
    return res.json({ response: context, source: 'knowledge_base' });
  }
  
  // Otherwise, call Flowsie API
  const flowsieResponse = await callFlowsieAPI(message);
  res.json({ response: flowsieResponse, source: 'flowsie' });
});

async function callFlowsieAPI(message) {
  // Replace with your Flowsie API endpoint and key
  const response = await fetch('https://api.flowsie.com/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.FLOWSIE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  
  const data = await response.json();
  return data.response;
}

module.exports = router;
