import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onLogin, onSignup, user }) => {
  return (
    <nav className="navbar">
  <div className="logo"><Link to="/">Story AI</Link></div>
      <ul className="nav-links">
        <li>
          <Link to="/text-story">Text Story</Link>
        </li>
        <li>
          <Link to="/audio-story">Audio Story</Link>
        </li>
        <li>
          <Link to="/video-story">Video Story</Link>
        </li>
        <li>
          <Link to="/games">Games</Link>
        </li>
      </ul>
      <div className="auth-buttons">
        {user ? (
          <span className="user-greeting">Hello, {user}!</span>
        ) : (
          <>
            <Link to="/login"><button className="login" onClick={onLogin}>Log In</button></Link>
            <Link to="/signup"><button className="signup" onClick={onSignup}>Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
