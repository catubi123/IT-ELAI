// Gemini API Configuration
// Get your FREE API key from: https://aistudio.google.com/app/apikey

const GEMINI_CONFIG = {
    // Use API key from environment or fallback
    API_KEY: typeof process !== 'undefined' && process.env 
        ? process.env.GEMINI_API_KEY 
        : 'AIzaSyDkQTnafjtEW__DBIZbSy-ZkjpPlYK7KrY',
    
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    ENABLED: true,
    
    USE_AS_FALLBACK: true
};

window.GEMINI_CONFIG = GEMINI_CONFIG;

console.log('✅ Gemini Config loaded:', {
    enabled: GEMINI_CONFIG.ENABLED,
    hasApiKey: !!GEMINI_CONFIG.API_KEY && GEMINI_CONFIG.API_KEY !== 'AIzaSyDkQTnafjtEW__DBIZbSy-ZkjpPlYK7KrY',
    apiKeyLength: GEMINI_CONFIG.API_KEY ? GEMINI_CONFIG.API_KEY.length : 0
});

