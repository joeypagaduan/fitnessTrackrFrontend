import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess(false);
    
    if (password !== passwordConfirmation) {
      setError("Password and password confirmation don't match");
      return;
    }

    
    try {
      const response = await registerUser(username, password);
      console.log(username)
      if ( response.token) {
        setToken(response.token);
        setSuccess(true);
        console.log('success')
      }
    } catch (error) {
      setError('An error occurred during registration. Please try again.');
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
      <div>
        <label htmlFor="passwordConfirmation">Confirm Password:</label>
        <input
          type="password"
          id="passwordConfirmation"
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          required
          minLength={6}
        />
      </div>
      <button type="submit">Register</button>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">Registration successful!</p>}
    </form>
  );
};
export default Register;
