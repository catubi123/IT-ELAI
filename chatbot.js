const { FLOWISE_CONFIG } = require('./config');

async function sendMessageToFlowise(userMessage) {
    try {
        const response = await fetch(
            `${FLOWISE_CONFIG.INSTANCE_URL}/api/v1/prediction/${FLOWISE_CONFIG.CHATFLOW_ID}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userMessage })
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.text;
    } catch (error) {
        console.error('Error calling Flowise:', error);
        throw error;
    }
}

module.exports = { sendMessageToFlowise };
