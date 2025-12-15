const conversationHistory = {};

function initializeConversation(sessionId) {
  conversationHistory[sessionId] = [];
}

function addToHistory(sessionId, role, message) {
  if (!conversationHistory[sessionId]) {
    initializeConversation(sessionId);
  }
  conversationHistory[sessionId].push({
    role: role, // 'user' or 'bot'
    message: message,
    timestamp: new Date()
  });
}

function getConversationContext(sessionId, limit = 10) {
  if (!conversationHistory[sessionId]) {
    return [];
  }
  return conversationHistory[sessionId].slice(-limit);
}

function clearConversation(sessionId) {
  delete conversationHistory[sessionId];
}

module.exports = {
  initializeConversation,
  addToHistory,
  getConversationContext,
  clearConversation
};
