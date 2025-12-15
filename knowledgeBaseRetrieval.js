const knowledgeBase = require('./knowledgeBase.json');

function searchKnowledgeBase(userQuery) {
  const query = userQuery.toLowerCase().trim();
  
  // Search with multiple matching strategies
  const exactMatches = knowledgeBase.qa_pairs.filter(pair =>
    pair.question.toLowerCase().includes(query)
  );
  
  const partialMatches = knowledgeBase.qa_pairs.filter(pair =>
    pair.answer.toLowerCase().includes(query) ||
    query.split(' ').some(word => 
      word.length > 3 && pair.question.toLowerCase().includes(word)
    )
  );
  
  const results = [...exactMatches, ...partialMatches];
  const bestMatch = results[0];
  
  // Return full answer without truncation
  return bestMatch ? {
    answer: bestMatch.answer,
    question: bestMatch.question,
    confidence: exactMatches.length > 0 ? 'high' : 'medium'
  } : null;
}

module.exports = { searchKnowledgeBase };
