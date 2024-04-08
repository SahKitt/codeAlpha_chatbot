const chatOutput = document.getElementById('chat-output');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const ws = new WebSocket('ws://localhost:3000');

sendBtn.addEventListener('click', () => {
  const message = userInput.value;
  if (message.trim() === '') return;

  appendMessage('You: ' + message);
  userInput.value = '';

  ws.send(message);
});

ws.onmessage = (event) => {
  appendMessage('Bot: ' + event.data);
};

function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  chatOutput.appendChild(messageElement);
}
