import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TextStory from './pages/TextStory';
import AudioStory from './pages/AudioStory';
import VideoStory from './pages/VideoStory';
import Games from './pages/Games';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/text-story" element={<TextStory />} />
      <Route path="/audio-story" element={<AudioStory />} />
      <Route path="/video-story" element={<VideoStory />} />
      <Route path="/games" element={<Games />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </Router>
);

export default App;
