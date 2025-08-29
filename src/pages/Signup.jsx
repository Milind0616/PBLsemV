import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import AuthModal from '../components/AuthModal/AuthModal';
import './Signup.css';

const Signup = () => (
  <>
    <Navbar />
    <div className="page-content signup-page">
      <h2>Sign Up</h2>
      <AuthModal isOpen={true} mode="signup" onClose={() => {}} onAuth={() => {}} />
    </div>
  </>
);

export default Signup;
