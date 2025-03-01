
// Replace 'YOUR_API_KEY' with your actual OpenAI API key
const API_KEY = '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';

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSubmit = document.getElementById('chat-submit');

chatSubmit.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        addMessageToChat('user', message);
        chatInput.value = '';
        getBotResponse(message);
    }
}

function addMessageToChat(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getBotResponse(message) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {role: "system", content: "You are a helpful assistant for a learning platform called WAQas Khan Learning Hub. You can provide information about courses and answer general questions."},
                    {role: "user", content: message}
                ]
            })
        });

        const data = await response.json();
        const botMessage = data.choices[0].message.content;
        addMessageToChat('bot', botMessage);
    } catch (error) {
        console.error('Error:', error);
        addMessageToChat('bot', 'Sorry, I encountered an error. Please try again later.');
    }
}