import React from 'react';
import { Link } from 'react-router-dom';


const Home = ({ user }) => (
    
  <>
    <h1>Fitness Track.r</h1>
    {user ? (
      <>
        <h2>Welcome!</h2>
        <p>Click here to view your routines </p>  
        <Link to="/my-routines">My Routines</Link>
        
      </>
    ) : (
      <>
        <p>Log in to see more</p>
        <Link to="/users/login">Login</Link>
        <p>Don't have an account yet?</p>
        <Link to="/users/register">Register here</Link>
      </>
    )}
 
    <div id="welcomeUser">
      <img src="./images/fitness_logo.png" alt="Fitness Track.r Logo" id="logo"/>
    </div>
  </>
  
);
export default Home;
