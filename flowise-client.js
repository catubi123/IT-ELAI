const { FLOWISE_CONFIG } = require('./config.js');

// Flowise API Query Function
async function query(data) {
    try {
        const endpoint = `${FLOWISE_CONFIG.INSTANCE_URL.replace('/canvas', '/api/v1/prediction')}/${FLOWISE_CONFIG.CHATFLOW_ID}`;
        
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Flowise API Error:', error);
        throw error;
    }
}

// Test the connection
async function testConnection() {
    try {
        const response = await query({"question": "Hey, how are you?"});
        console.log('Flowise Response:', response);
    } catch (error) {
        console.error('Connection test failed:', error);
    }
}

// Export functions
module.exports = { query, testConnection };

// Uncomment to test on startup
// testConnection();
