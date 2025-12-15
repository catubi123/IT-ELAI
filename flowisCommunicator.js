const axios = require('axios');

async function queryKnowledgeBase(userMessage) {
  try {
    const response = await axios.post('http://localhost:3000/api/search', {
      query: userMessage
    });
    return response.data;
  } catch (error) {
    return { answer: 'Sorry, I couldn\'t find an answer to that question.' };
  }
}

module.exports = { queryKnowledgeBase };
