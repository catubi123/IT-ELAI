const knowledgeBase = require('./knowledgeBase.json');

function searchKnowledgeBase(userQuery) {
  const query = userQuery.toLowerCase();
  const results = knowledgeBase.qa_pairs.filter(pair =>
    pair.question.toLowerCase().includes(query) ||
    pair.answer.toLowerCase().includes(query)
  );
  
  return results.length > 0 ? results[0].answer : null;
}

module.exports = { searchKnowledgeBase };
