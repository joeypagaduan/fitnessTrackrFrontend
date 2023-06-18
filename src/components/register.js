import React, { useState } from 'react';
import { registerUser } from '../api';
import { useHistory } from 'react-router-dom';

const Register = ({ setToken, token }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    
    if (password !== passwordConfirmation) {
      setError("Password and password confirmation don't match");
      return;
    }

    try {
      const response = await registerUser(username, password);
      
      if (response.error === "A user by that username already exists") {
        setError('Username already exists. Please choose a different username.');
      } else if (response.token) {
        setToken(response.token);
        history.push('/');
      }
    } catch (err) {
      console.error(err);
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
    </form>
  );
};
export default Register;
