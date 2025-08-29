const axios = require('axios');


async function murfTextToSpeech(text) {
  const apiKey = process.env.MURF_API_KEY;
  const url = 'https://api.murf.ai/v1/speech/generate';
  try {
    const response = await axios.post(
      url,
      {
        text,
        voiceId: 'en-US-terrell',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'api-key': apiKey,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
}

module.exports = { murfTextToSpeech };
