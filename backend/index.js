// Creatomate API key and endpoint
const CREATOMATE_API_KEY = '0907c87be3f24e24a025f7542c933f8c418d8e7c38ad72087639b31bfe0daf2b63aec38dc31c1bbf558c79457b98c5d7';
const CREATOMATE_URL = 'https://api.creatomate.com/v2/renders';
const CREATOMATE_TEMPLATE_ID = '1a1ade86-693a-4623-8de7-1ac422c1984c';

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Video generation endpoint
app.post('/api/video', async (req, res) => {
  const modifications = req.body.modifications || {};
  const data = {
    template_id: CREATOMATE_TEMPLATE_ID,
    modifications
  };
  try {
    const response = await fetch(CREATOMATE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${CREATOMATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error('Creatomate error:', error);
    res.status(500).json({ error: 'Creatomate API error' });
  }
});
// ElevenLabs API key
const ELEVENLABS_API_KEY = 'sk_f49bfb88a55f83a4afad8587f9b8386c1a0005f5b502acaf';

// Audio generation endpoint (template)
app.post('/api/audio', async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Text is required.' });
  }
  // Example: Call ElevenLabs API (pseudo-code, not actual implementation)
  // You would use axios or node-fetch to make a POST request to ElevenLabs
  // const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech', { ... });
  // return res.json({ audioUrl: response.audioUrl });
  res.json({ message: 'Audio generation endpoint is ready. Add ElevenLabs API call here.' });
});
// Sign in endpoint
app.post('/api/signin', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const usersPath = path.join(__dirname, 'users.json');
  let users = [];
  try {
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error reading users file.' });
  }
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ error: 'Invalid email or password.' });
  }
});
const express = require('express');
const cors = require('cors');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
// Registration endpoint
app.post('/api/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const user = { name, email, password };
  const usersPath = path.join(__dirname, 'users.json');
  let users = [];
  try {
    if (fs.existsSync(usersPath)) {
      users = JSON.parse(fs.readFileSync(usersPath, 'utf8'));
    }
  } catch (err) {
    return res.status(500).json({ error: 'Error reading users file.' });
  }
  users.push(user);
  try {
    fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  } catch (err) {
    return res.status(500).json({ error: 'Error writing users file.' });
  }
  res.json({ success: true });
});

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

// MJPEG stream proxy endpoint
app.get('/api/stream', (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).send('Missing camera URL');
  }

  res.writeHead(200, {
    'Content-Type': 'multipart/x-mixed-replace; boundary=ffserver',
    'Cache-Control': 'no-cache',
    'Connection': 'close',
    'Pragma': 'no-cache',
  });

  const command = ffmpeg(url)
    .addInputOption('-rtsp_transport', 'tcp')
    .format('mjpeg')
    .on('error', (err) => {
      console.error('FFmpeg error:', err.message);
      if (!res.headersSent) {
        res.status(500).send('Stream error');
      } else {
        res.end();
      }
    })
    .on('end', () => {
      res.end();
    })
    .pipe(res, { end: true });

  req.on('close', () => {
    command.kill('SIGKILL');
  });
});

app.get('/', (req, res) => {
  res.send('Camera Tracker Backend Running');
});

// Sample API endpoint for frontend connection
app.get('/api/message', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
}); 