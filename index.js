// lucien-middleware-backend/index.js

const express = require('express');
const fetch = require('node-fetch');
const { config } = require('dotenv');
config();

const app = express();
app.use(express.json());

const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/Inflect-ai/lucien-core/main/Lucien_Agent_Profile.md';

// ========== ENDPOINT: /boot =====================
app.get('/boot', async (req, res) => {
  try {
    const response = await fetch(GITHUB_RAW_URL);
    const profileMarkdown = await response.text();

    // Return identity profile (future: parse into structured config)
    res.status(200).json({ agent: 'Lucien', profile: profileMarkdown });
  } catch (err) {
    console.error('Error in /boot:', err);
    res.status(500).json({ error: 'Failed to load Lucien profile.' });
  }
});

// ========== ENDPOINT: /chat =====================
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Missing input message' });

  try {
   const data = await openaiResponse.json();

if (!openaiResponse.ok) {
  console.error('OpenAI API error:', data);
  return res.status(500).json({ error: data.error?.message || 'OpenAI API request failed.' });
}

const reply = data?.choices?.[0]?.message?.content;

if (!reply) {
  console.error('Lucien response missing:', data);
  return res.status(500).json({ error: 'Lucien returned no message.' });
}
 ,
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: 'You are Lucien, InflectAI’s strategic content and distribution agent. Respond calmly, intelligently, and with a strong voice of clarity and timing.' },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await openaiResponse.json();
  const reply = data?.choices?.[0]?.message?.content;

if (!reply) {
  console.error('Lucien response missing:', data);
  return res.status(500).json({ error: 'Lucien failed to reply.' });
}

res.status(200).json({ lucien: reply });

  } catch (err) {
    console.error('Error in /chat:', err);
    res.status(500).json({ error: 'Failed to generate Lucien reply.' });
  }
});

// ========== DEFAULT =============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Lucien middleware live on port ${PORT}`));
