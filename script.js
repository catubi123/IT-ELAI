const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

// Toggle chatbot visibility
chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
});

closeChatbot.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
});

// Send message
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Get bot response
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        addMessage(data.reply || 'Sorry, I encountered an error.', 'bot');
    } catch (error) {
        addMessage('Sorry, I could not connect to the server.', 'bot');
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender + '-message');
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}
