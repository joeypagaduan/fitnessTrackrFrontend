import React from 'react';
import { Link } from 'react-router-dom'

const Home = ({ user}) => (
    <>
        <h1>Fitness Track.r</h1>
        <div id="welcomeUser">
            <img src="./images/fitness_logo.png" alt="Fitness Track.r Logo" id='logo'/>
            {user?.username &&  <>
                <p>Welcome {user.username}!</p>
                <Link to="/profile">View Your Profile</Link>
            </>}
        </div>
    </>
)
export default Home;