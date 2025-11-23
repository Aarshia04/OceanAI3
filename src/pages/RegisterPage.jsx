import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register as registerUser } from '../api/auth.js';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setError('');
      await registerUser({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Unable to register.');
    }
  };

  return (
    <section className="card">
      <div className="page-header">
        <div>
          <h1>Create an account</h1>
          <p>Register to start crafting project presentations.</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name</label>
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p style={{ color: '#dc2626', marginBottom: '1rem' }}>
            {error}
          </p>
        )}
        <button className="button primary" type="submit">
          Register
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;
