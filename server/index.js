require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;
const USERS_FILE = path.join(__dirname, 'users.json');

const { murfTextToSpeech } = require('./murf');

app.use(cors());
app.use(express.json());

// Helper to read users
function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper to write users
function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Signup endpoint
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required.' });
  }
  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ message: 'Username already exists.' });
  }
  users.push({ username, password });
  writeUsers(users);
  res.status(201).json({ message: 'Signup successful.' });
});

// Signin endpoint
app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials.' });
  }
  res.json({ message: 'Signin successful.' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Murf text-to-speech endpoint
app.post('/api/text-to-speech', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required.' });
  try {
    const data = await murfTextToSpeech(text);
    res.json(data);
  } catch (err) {
    console.error('Murf API error:', err);
    res.status(500).json({ message: 'TTS failed', error: err });
  }
});
