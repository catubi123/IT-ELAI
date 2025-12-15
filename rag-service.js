const fs = require('fs');
const path = require('path');

function createSimpleEmbedding(text) {
    const words = text.toLowerCase().split(/\W+/);
    const embedding = new Array(50).fill(0);
    
    words.forEach(word => {
        let hash = 0;
        for (let i = 0; i < word.length; i++) {
            hash = ((hash << 5) - hash) + word.charCodeAt(i);
            hash = hash & hash;
        }
        const index = Math.abs(hash) % 50;
        embedding[index]++;
    });
    
    return embedding;
}

function cosineSimilarity(vec1, vec2) {
    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;
    
    for (let i = 0; i < vec1.length; i++) {
        dotProduct += vec1[i] * vec2[i];
        magnitude1 += vec1[i] * vec1[i];
        magnitude2 += vec2[i] * vec2[i];
    }
    
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);
    
    if (magnitude1 === 0 || magnitude2 === 0) return 0;
    return dotProduct / (magnitude1 * magnitude2);
}

let knowledgeBase = [];
let embeddedDocs = [];

function loadKnowledgeBase() {
    try {
        const kbPath = path.join(__dirname, 'knowledge-base.json');
        const rawData = fs.readFileSync(kbPath, 'utf8');
        const data = JSON.parse(rawData);
        
        knowledgeBase = data.documents;
        embeddedDocs = knowledgeBase.map(doc => ({
            ...doc,
            embedding: createSimpleEmbedding(doc.content),
            fullText: `${doc.title} ${doc.content}`
        }));
        
        console.log('✅ Knowledge base loaded with', embeddedDocs.length, 'documents');
    } catch (error) {
        console.error('❌ Error loading knowledge base:', error);
    }
}

function retrieveRelevantDocuments(query, topK = 3) {
    if (embeddedDocs.length === 0) {
        loadKnowledgeBase();
    }
    
    const queryEmbedding = createSimpleEmbedding(query);
    
    const scoredDocs = embeddedDocs.map(doc => ({
        ...doc,
        similarity: cosineSimilarity(queryEmbedding, doc.embedding)
    }));
    
    return scoredDocs
        .sort((a, b) => b.similarity - a.similarity)
        .slice(0, topK)
        .filter(doc => doc.similarity > 0.1);
}

function formatContext(documents) {
    if (documents.length === 0) return '';
    
    return 'Based on Mark\'s portfolio information:\n' +
        documents
            .map((doc, i) => `${i + 1}. ${doc.title}: ${doc.content}`)
            .join('\n\n');
}

function getRAGContext(userQuery) {
    const relevantDocs = retrieveRelevantDocuments(userQuery);
    return formatContext(relevantDocs);
}

module.exports = {
    loadKnowledgeBase,
    getRAGContext
};
