const knowledgeBase = require('./knowledgeBase.json');

function calculateSimilarity(str1, str2) {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();
  
  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);
  const matches = words1.filter(w => words2.includes(w)).length;
  
  return matches / Math.max(words1.length, words2.length);
}

function searchKnowledgeBase(userQuery) {
  const query = userQuery.toLowerCase().trim();
  
  if (!query || query.length === 0) return null;
  
  // Score all Q&A pairs
  const scored = knowledgeBase.qa_pairs.map(pair => ({
    ...pair,
    score: Math.max(
      calculateSimilarity(query, pair.question),
      calculateSimilarity(query, pair.answer) * 0.7
    )
  }));
  
  // Sort by score and return best match
  scored.sort((a, b) => b.score - a.score);
  const bestMatch = scored[0];
  
  return bestMatch && bestMatch.score > 0.2 ? {
    answer: bestMatch.answer,
    question: bestMatch.question,
    confidence: bestMatch.score > 0.6 ? 'high' : bestMatch.score > 0.4 ? 'medium' : 'low'
  } : null;
}

module.exports = { searchKnowledgeBase };
