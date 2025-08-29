import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import AuthModal from '../components/AuthModal/AuthModal';
import './Login.css';

const Login = () => (
  <>
    <Navbar />
    <div className="page-content login-page">
      <h2>Log In</h2>
      <AuthModal isOpen={true} mode="signin" onClose={() => {}} onAuth={() => {}} />
    </div>
  </>
);

export default Login;
