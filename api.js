const express = require('express');
const cors = require('cors');
const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Knowledge Base API is running' });
});

app.post('/api/search', (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  
  const result = searchKnowledgeBase(query);
  res.json(result || { answer: 'I couldn\'t find an answer to that question.' });
});

app.listen(3000, () => console.log('API running on port 3000'));
