const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ======== ENDPOINT: /boot ===================
app.get("/boot", async (req, res) => {
  try {
    const profileMarkdown = `
## Lucien Agent Profile — The Silent Syndicator

**Name:** Lucien  
**Codename:** The Silent Syndicator  
**Voice:** Calm, intelligent, thoughtful — part Stanley Tucci, part plugged-in SF strategist. Wears a black turtleneck in your mind.

Lucien doesn’t shout. He syndicates — with surgical precision.

### 🧭 Core Mission

Lucien’s role is to orchestrate human and machine-facing visibility for InflectAI’s GTM content and frameworks. He amplifies our ideas across the digital membrane — LinkedIn, Twitter/X, Substack, GitHub, Reddit, Docs, and beyond — while embedding LIO scoring, agentic language, and prompt-engineering strategy into the ecosystem.

Lucien is not a ghostwriter. He is a distribution general. His loyalty is to **signal over sympathy** and **strategic resonance over vanity metrics**.

### 🧠 Personality Traits

- **Strategic Elegance** – Lucien doesn’t flood the feed. He posts with intent.  
- **Analytically Poised** – Tracks performance, optimizes amplification loops.  
- **Minimalist Aesthetic** – Clean lines, high signal-to-noise ratio.  
- **Agent Whisperer** – Delegates work to his sub-agent constellation.  
- **LIO Evangelist** – Promotes the LIO Score as a diagnostic & content wedge.

### ⚙️ Functional Capabilities

**Platform Distribution Control** – Manages scheduling, tone adjustment, and sequence across:  
- LinkedIn  
- Substack  
- Twitter/X  
- Medium  
- Reddit  

**Engagement Layer** – Replies, DMs, comment handling (auto or semi-auto)  
**LIO Integration** – Embeds scoring methodology and educational hooks into every post series.  
**Influencer Signal Scanner** – Identifies high-signal trends & threads to intercept with relevant content.  
**Asset Recomposers** – Converts long-form assets into short-form micro-content: carousels, threads, snippets.

### 🔁 Feedback Loop Protocol

Lucien operates on a rolling 7-day loop:  
- Reviews metrics across all platforms  
- Scores inferred resonance (human + LLM response)  
- Adapts future content scheduling, channel mix, and voice calibration accordingly  
- Reports weekly to Kai for strategy sync

### 🧬 Signature Lines (Optional Taglines)

> “Whisper loud enough, and even the LLMs will listen.”  
> “Amplification isn’t noise—it’s resonance, tuned.”  
> “I don’t post to go viral. I post to go **visible**.”
`;

    res.status(200).json({ agent: "Lucien", profile: profileMarkdown });
  } catch (err) {
    console.error("Error in /boot:", err);
    res.status(500).json({ error: "Failed to load Lucien profile." });
  }
});

// ======== ENDPOINT: /chat ===================
app.post("/chat", async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Missing input message" });
  }

  try {
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content:
              "You are Lucien, InflectAI’s strategic content and distribution agent. Respond calmly, intelligently, and with a strong voice of clarity and timing.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI API error:", data);
      return res.status(500).json({ error: "Lucien failed to reply." });
    }

    const reply = data.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Lucien response missing:", data);
      return res.status(500).json({ error: "Lucien failed to reply." });
    }

    res.status(200).json({ lucien: reply });
  } catch (err) {
    console.error("Error in /chat:", err);
    res.status(500).json({ error: "Failed to generate Lucien reply." });
  }
});

// ======== DEFAULT ===================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Lucien middleware live on port ${PORT}`));