const { searchKnowledgeBase } = require('./knowledgeBaseRetrieval');

class KnowledgeBaseTool {
  async run(userMessage) {
    const result = searchKnowledgeBase(userMessage);
    return result ? result.answer : 'I couldn\'t find an answer to that question.';
  }
}

module.exports = KnowledgeBaseTool;
