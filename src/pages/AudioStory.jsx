import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import './AudioStory.css';

const AudioStory = () => {
  const [text, setText] = useState('Once upon a time, there was a magical forest.');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    setAudioUrl('');
    try {
      const res = await fetch('http://localhost:5000/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'TTS failed');
      // Assume data.audioUrl or data.audio (base64/mp3)
      if (data.audioUrl) {
        setAudioUrl(data.audioUrl);
      } else if (data.audio) {
        setAudioUrl(`data:audio/mp3;base64,${data.audio}`);
      } else {
        setError('No audio returned.');
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="page-content audio-story">
        <h2>Audio Story</h2>
        <p>Type your story and generate audio using AI!</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          rows={4}
          style={{ width: '100%', maxWidth: 500, marginBottom: 16 }}
        />
        <button onClick={handleGenerate} disabled={loading} style={{ marginBottom: 16 }}>
          {loading ? 'Generating...' : 'Generate Audio'}
        </button>
        {audioUrl && (
          <audio controls src={audioUrl} style={{ marginTop: 16 }} />
        )}
        {error && <div style={{ color: 'red', marginTop: 12 }}>{error}</div>}
      </div>
    </>
  );
};

export default AudioStory;
