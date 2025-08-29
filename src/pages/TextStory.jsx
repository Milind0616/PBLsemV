import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import './TextStory.css';

const TextStory = () => {
  const [storyLength, setStoryLength] = useState('Short');
  const [story, setStory] = useState('');

  const generateStory = () => {
    // Simple static example, can be replaced with AI API call
    let generatedStory = '';
    if (storyLength === 'Short') {
      generatedStory = 'A curious cat finds a magical hat.';
    } else if (storyLength === 'Medium') {
      generatedStory = 'A curious cat finds a magical hat and goes on an adventure to help its friends in the village.';
    } else {
      generatedStory = 'A curious cat finds a magical hat and goes on an adventure to help its friends in the village. Along the way, the cat learns about bravery, kindness, and the true meaning of friendship.';
    }
    setStory(generatedStory);
  };

  return (
    <>
      <Navbar />
      <div className="page-content text-story">
        <h2>Text Story</h2>
        <p>Write or generate your own text-based stories here!</p>
        <div className="quick-story-generator">
          <h3>Quick Story Generator</h3>
          <div className="story-controls">
            <div className="control-group">
              <label htmlFor="story-length">Story length:</label>
              <select
                id="story-length"
                value={storyLength}
                onChange={e => setStoryLength(e.target.value)}
              >
                <option value="Short">Short</option>
                <option value="Medium">Medium</option>
                <option value="Long">Long</option>
              </select>
            </div>
            <textarea
              readOnly
              value={story}
              placeholder="Your generated story will appear here."
              style={{ width: '100%', maxWidth: 500, minHeight: 80, marginBottom: 12 }}
            />
            <button className="generate-story" onClick={generateStory} style={{ marginBottom: 8 }}>
              Generate Story
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TextStory;
