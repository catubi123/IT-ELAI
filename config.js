// Gemini API Configuration
// Get your FREE API key from: https://aistudio.google.com/app/apikey

const GEMINI_CONFIG = {
    API_KEY: process.env.AIzaSyDIs511cUOFbeJytJIxTR73jDeh0J0fcVk|| '',
    MODEL: 'gemini-pro',
    BASE_URL: 'https://generativelanguage.googleapis.com/v1beta/models',
    MAX_TOKENS: 2048,
    TEMPERATURE: 0.7
};

module.exports = GEMINI_CONFIG;