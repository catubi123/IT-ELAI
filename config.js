// Gemini API Configuration
// Get your FREE API key from: https://aistudio.google.com/app/apikey

const GEMINI_CONFIG = {
    API_KEY: process.env.GEMINI_API_KEY || '',
};

// Flowise Chatbot Configuration (with Gemini backend)
const FLOWISE_CONFIG = {
    INSTANCE_URL: process.env.FLOWISE_INSTANCE_URL || 'https://cloud.flowiseai.com/canvas/d2934a76-56f4-4a25-bcec-79c7c854f1d3',
    CHATFLOW_ID: process.env.FLOWISE_CHATFLOW_ID || '"d2934a76-56f4-4a25-bcec-79c7c854f1d3',
};

const OPENAI_CONFIG = {
    API_KEY: process.env.OPENAI_API_KEY || '',
};

module.exports = { GEMINI_CONFIG, FLOWISE_CONFIG, OPENAI_CONFIG };