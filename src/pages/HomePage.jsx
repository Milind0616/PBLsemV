import React, { useState } from 'react';
import styles from './HomePage.module.css';
import { FaBookOpen, FaHeadphones, FaVideo, FaGamepad } from './HomePage.icons';
import Navbar from '../components/Navbar/Navbar';
import GenreSelector from '../components/GenreSelector/GenreSelector';
import AuthModal from '../components/AuthModal/AuthModal';



const HomePage = () => {
  const [storyLength, setStoryLength] = useState('Short');
  const [story, setStory] = useState('');
  const [authModal, setAuthModal] = useState({ open: false, mode: 'login' });
  const [user, setUser] = useState(null);

  const generateStory = () => {
    const generatedStory = `A librarian discovers a magical book that can bring stories to life.`;
    setStory(generatedStory);
  };

  // Pass these handlers to Navbar
  const handleLogin = () => setAuthModal({ open: true, mode: 'signin' });
  const handleSignup = () => setAuthModal({ open: true, mode: 'signup' });
  const handleCloseModal = () => setAuthModal({ ...authModal, open: false });
  const handleAuth = (username) => setUser(username);

  return (
    <div className={styles.homepage}>
      <Navbar onLogin={handleLogin} onSignup={handleSignup} user={user} />
      <AuthModal
        isOpen={authModal.open}
        onClose={handleCloseModal}
        mode={authModal.mode}
        onAuth={handleAuth}
      />
      <header className={styles.heroSection}>
        <div className={styles.heroMascot}>
          <img src="https://cdn-icons-png.flaticon.com/512/616/616494.png" alt="Story AI Mascot" width="80" height="80" />
        </div>
        <h1 className={styles.heroTitle}>Welcome to Story AI</h1>
        <p className={styles.heroSubtitle}>Unleash your imagination with our creative AI tools for kids!<br/>Generate, listen, watch, and play with stories in fun new ways.</p>
      </header>

      <div className={styles.cardGrid}>
        <div className={styles.card} style={{'--accent':'#4f8cff'}}>
          <FaBookOpen className={styles.cardIcon} style={{color:'#4f8cff'}}/>
          <h2>Text Story</h2>
          <p>Write or generate your own text-based stories. Try out the story generator or visit the <b>Text Story</b> page for more options.</p>
          <a className={styles.cardLink} href="/text-story">Go to Text Story &rarr;</a>
        </div>
        <div className={styles.card} style={{'--accent':'#ff6f91'}}>
          <FaHeadphones className={styles.cardIcon} style={{color:'#ff6f91'}}/>
          <h2>Audio Story</h2>
          <p>Turn your stories into audio using AI voices! Visit the <b>Audio Story</b> page to try text-to-speech.</p>
          <a className={styles.cardLink} href="/audio-story">Go to Audio Story &rarr;</a>
        </div>
        <div className={styles.card} style={{'--accent':'#00b894'}}>
          <FaVideo className={styles.cardIcon} style={{color:'#00b894'}}/>
          <h2>Video Story</h2>
          <p>Bring your stories to life with visuals and animation. Explore the <b>Video Story</b> page for creative video tools.</p>
          <a className={styles.cardLink} href="/video-story">Go to Video Story &rarr;</a>
        </div>
        <div className={styles.card} style={{'--accent':'#ff9800'}}>
          <FaGamepad className={styles.cardIcon} style={{color:'#ff9800'}}/>
          <h2>Games</h2>
          <p>Play fun and educational games inspired by your stories. Check out the <b>Games</b> page for interactive learning!</p>
          <a className={styles.cardLink} href="/games">Go to Games &rarr;</a>
        </div>
      </div>

      <GenreSelector />
    </div>
  );
};

export default HomePage;
