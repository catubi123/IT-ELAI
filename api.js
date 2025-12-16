require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.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
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Knowledge Base API is running' });
});

app.post('/api/search', async (req, res) => {
  const { query } = req.body;
  
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }
  
  const kbResult = searchKnowledgeBase(query);
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful website assistant. Answer questions based on the provided information.'
        },
        {
          role: 'user',
          content: `Knowledge Base Info: ${kbResult ? kbResult.answer : 'No specific info found'}\n\nUser Question: ${query}`
        }
      ]
    });
    
    res.json({
      answer: response.choices[0].message.content,
      question: query,
      confidence: kbResult ? 'high' : 'medium'
    });
  } catch (error) {
    res.json({
      answer: kbResult ? kbResult.answer : 'I couldn\'t find an answer to that question.'
    });
  }
});

app.listen(3000, () => console.log('API running on port 3000'));
