import React, { useState } from 'react';
import { login } from '../api';
import { useHistory } from 'react-router-dom';

const Login = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
    const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); 
    try {
      const response = await login(username, password);
      if (response.token) {
        setToken(response.token);
        history.push('/');
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
    }
  };


  return (

    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
          minLength={3}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit">Login</button>
      {error && <p className="error-message">{error}</p>} 
    </form>
  );
};

export default Login;
