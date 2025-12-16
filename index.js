require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'AIzaSyDIs511cUOFbeJytJIxTR73jDeh0J0fcVk');

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
