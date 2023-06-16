import React from 'react';
import { Link } from 'react-router-dom'

const Home = ({ user }) => (
    <>
      <h1>Fitness Track.r</h1>
      <p>Log in to see more</p>
      <Link to="/users/login">Login</Link>
      <p>Don't have an account yet?</p>
      <Link to="/users/register">Register here</Link>
      <div id="welcomeUser">
        <img src="./images/fitness_logo.png" alt="Fitness Track.r Logo" id="logo" />
  
        {user?.username && (
          <>
            <p>Welcome {user.username}!</p>
            <Link to="/profile">View Your Profile</Link>
            <div className="tab-navigation">
              <Link to="/routines">Routines</Link>
              <Link to="/my-routines">My Routines</Link>
              <Link to="/activities">Activities</Link>
            </div>
          </>
        )}
      </div>
    </>
  );
  
  export default Home;
  
  
  
  
  
  
  
  