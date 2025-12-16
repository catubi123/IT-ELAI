require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.AIzaSyDIs511cUOFbeJytJIxTR73jDeh0J0fcVk);

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
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `You are a helpful website assistant. Answer questions based on the provided information.
    
Knowledge Base Info: ${kbResult ? kbResult.answer : 'No specific info found'}

User Question: ${query}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({
      answer: text,
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
