const express = require('express');
const http = require('http');
const WebSocket = require('ws'); // Import WebSocket module
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Replace this line with your actual OpenAI API key
const OPENAI_API_KEY = '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';

let previousResponse = null;

wss.on('connection', (ws) => {
  ws.on('message', async (message) => {
    try {
      // Convert the message to string
      const prompt = message.toString();

      // Check if the user wants to erase the previous response
      if (prompt.trim().toLowerCase() === 'erase' && previousResponse) {
        previousResponse = null;
        ws.send('Previous response erased.');
        return;
      }

      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: prompt,
          max_tokens: 256,
          temperature: 0.2,
          stop: '\n',
          model: 'gpt-3.5-turbo-instruct'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
          }
        }
      );

      // Ensure response contains data and choices array
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const generatedResponse = response.data.choices[0].text.trim();
        previousResponse = generatedResponse;
        ws.send(generatedResponse);
      } else {
        console.error("Invalid response format:", response);
      }
    } catch (error) {
      console.error(error);
    }
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
