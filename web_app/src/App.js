function Signup() {
  const [form, setForm] = React.useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert(data.error || 'Signup failed');
      }
    } catch {
      alert('Signup failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', background: '#222', borderRadius: '8px', color: '#fff' }}>
      <h2 style={{ color: '#00bfae' }}>Sign Up</h2>
      {submitted ? (
        <p>Thank you for signing up, {form.name}!</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#00bfae', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem' }}>
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
}

function Signin() {
  const [form, setForm] = React.useState({ email: '', password: '' });
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
      } else {
        setError(data.error || 'Sign in failed');
      }
    } catch {
      setError('Sign in failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: 'auto', background: '#222', borderRadius: '8px', color: '#fff' }}>
      <h2 style={{ color: '#00bfae' }}>Sign In</h2>
      {success ? (
        <p>Sign in successful!</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#00bfae', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem' }}>
            Sign In
          </button>
        </form>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}



import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Welcome to Gen AI Website</h2>
      <p>This is the Home page of your Gen AI website.</p>
    </div>
  );
}

function TextGenerating() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { role: "system", content: "Welcome to Gen AI Text Generator! Type your prompt below." }
  ]);
  const [loading, setLoading] = React.useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    try {
      const res = await fetch("/api/genai/text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { role: "assistant", content: data.response }]);
    } catch {
      setMessages(msgs => [...msgs, { role: "assistant", content: "Error: Could not get response." }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ background: '#222', borderRadius: '8px', padding: '1rem', minHeight: '300px', marginBottom: '1rem' }}>
      <h2 style={{ color: '#00bfae' }}>Text Generating</h2>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ margin: '0.5rem 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
          <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#00bfae' : '#fff' }}>
            {msg.role === 'user' ? 'You: ' : 'GenAI: '}
          </span>
          {msg.content}
        </div>
      ))}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your prompt..."
          style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          disabled={loading}
        />
        <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#00bfae', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem' }} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

function VideoGenerating() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#00bfae' }}>Video Generating</h2>
      <p>Generate videos using Gen AI. (Feature coming soon!)</p>
    </div>
  );
}

function AudioGenerating() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#00bfae' }}>Audio Generating</h2>
      <p>Generate audio using Gen AI. (Feature coming soon!)</p>
    </div>
  );
}

function Chat() {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([
    { role: "system", content: "Welcome to Gen AI! Ask me anything." }
  ]);
  const [loading, setLoading] = React.useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    setMessages([...messages, { role: "user", content: input }]);
    try {
      const res = await fetch("/api/genai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });
      const data = await res.json();
      setMessages(msgs => [...msgs, { role: "assistant", content: data.response }]);
    } catch {
      setMessages(msgs => [...msgs, { role: "assistant", content: "Error: Could not get response." }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div style={{ background: '#222', borderRadius: '8px', padding: '1rem', minHeight: '300px', marginBottom: '1rem' }}>
      {messages.map((msg, idx) => (
        <div key={idx} style={{ margin: '0.5rem 0', textAlign: msg.role === 'user' ? 'right' : 'left' }}>
          <span style={{ fontWeight: msg.role === 'user' ? 'bold' : 'normal', color: msg.role === 'user' ? '#00bfae' : '#fff' }}>
            {msg.role === 'user' ? 'You: ' : 'GenAI: '}
          </span>
          {msg.content}
        </div>
      ))}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
          style={{ flex: 1, padding: '0.75rem', borderRadius: '4px', border: 'none', fontSize: '1rem' }}
          disabled={loading}
        />
        <button type="submit" style={{ padding: '0.75rem 1.5rem', background: '#00bfae', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1rem' }} disabled={loading}>
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>About Gen AI</h2>
      <p>This page provides information about the Gen AI project and its features.</p>
    </div>
  );
}

function Contact() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Contact Us</h2>
      <p>For inquiries, please email us at contact@genai.com.</p>
    </div>
  );
}


function App() {
  return (
    <BrowserRouter>
      <div className="App" style={{ background: '#181818', minHeight: '100vh', color: '#fff' }}>
        <nav style={{ display: 'flex', gap: '2rem', padding: '1rem', background: '#222', justifyContent: 'center' }}>
          <Link to="/" style={{ color: '#00bfae', textDecoration: 'none', fontWeight: 'bold' }}>Home</Link>
          <Link to="/text" style={{ color: '#00bfae', textDecoration: 'none', fontWeight: 'bold' }}>Text Generating</Link>
          <Link to="/video" style={{ color: '#00bfae', textDecoration: 'none', fontWeight: 'bold' }}>Video Generating</Link>
          <Link to="/audio" style={{ color: '#00bfae', textDecoration: 'none', fontWeight: 'bold' }}>Audio Generating</Link>
          <Link to="/signup" style={{ color: '#00bfae', textDecoration: 'none', fontWeight: 'bold' }}>Sign Up</Link>
          <Link to="/signin" style={{ color: '#00bfae', textDecoration: 'none', fontWeight: 'bold' }}>Sign In</Link>
        </nav>
        <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/text" element={<TextGenerating />} />
            <Route path="/video" element={<VideoGenerating />} />
            <Route path="/audio" element={<AudioGenerating />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
