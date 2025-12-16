// Gemini API Configuration
// Get your FREE API key from: https://aistudio.google.com/app/apikey

const GEMINI_CONFIG = {
    API_KEY: process.env.GEMINI_API_KEY || '',
    MODEL: 'gemini-pro',
    TIMEOUT: 30000
};

module.exports = GEMINI_CONFIG;