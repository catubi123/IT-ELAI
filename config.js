// Gemini API Configuration
// Get your FREE API key from: https://makersuite.google.com/app/apikey
// Or: https://aistudio.google.com/app/apikey

const GEMINI_CONFIG = {
    // ⚠️ IMPORTANT: Replace with your own API key
    // Get it for FREE at: https://aistudio.google.com/app/apikey
    API_KEY: 'YOUR_GEMINI_API_KEY_HERE',
    
    // API endpoint (using Google's Gemini API)
    API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    
    // Enable/disable Gemini (set to false to use only built-in functions)
    ENABLED: true,
    
    // Use Gemini only if built-in functions don't match
    USE_AS_FALLBACK: true
};

// Make it available globally
window.GEMINI_CONFIG = GEMINI_CONFIG;

