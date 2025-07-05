// index.js — Lucien V.02 Runtime Injection Engine

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const config = require('./lucien-config');

// Load and parse markdown with frontmatter validation
function loadMarkdownWithValidation(filepath, label) {
  const fullPath = path.resolve(__dirname, filepath);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const parsed = matter(fileContents);

  if (!parsed.data.version) {
    throw new Error(`Missing version metadata in ${label} (${filepath})`);
  }

  console.log(`[${label}] Loaded version ${parsed.data.version}`);
  return parsed;
}

// Load Lucien's identity and intent at runtime
const agentProfile = loadMarkdownWithValidation(config.agentProfile, 'Agent Profile');
const bootProtocol = loadMarkdownWithValidation(config.bootProtocol, 'Boot Protocol');

// Initialize agent behavior from parsed metadata
function initializeAgent(profile, protocol) {
  console.log(`🚀 Booting ${profile.data.name || 'Unknown Agent'}...`);
  console.log(`🧠 Intent: ${protocol.data.intent || 'No intent defined'}`);
  console.log(`🪪 Voice: ${profile.data.voice || 'No voice specified'}`);

  // Placeholder: Inject LLM, memory hooks, publishing logic here
}

initializeAgent(agentProfile, bootProtocol);