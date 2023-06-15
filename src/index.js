import React, { useEffect, useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { callAPI, myData } from './api';

import {
  Home,
  ViewActivities,
  Register, 
  Login,
} from "./components"
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')??'');
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const data = await callAPI({
        path: "/activities", token
    })

    if (data?.activities) {
        setActivities(data.activities);
    }
}

useEffect(() => {
    getActivities();
}, [token]);

const handleLogout = () => {
  setToken('');
  setUser(null);
};

  return (
    <div className='app'>
    <nav className='navbar'>
        <Link to='/'>Home</Link>
        <Link to='/activities'>Activities</Link>
        <Link to='/routines'>Routines</Link>
        <Link to='/my-routines'>My Routines</Link>
        
        {/* {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to='/users/register'>Register</Link>
            <Link to='/users/login'>Login</Link>
          </>
        )} */}
            
        </nav>
        <Router>
            <Switch>
              <Route exact path='/' render={(props) => (
                  <Home />
              )}>
              </Route>
              <Route path='/activities' render={(props) => (
                  <ViewActivities />
              )}>
              </Route>
              <Route path='/users/register' render={(props) => (
                  <Register setToken={setToken} />
              )}>
              </Route>
              <Route path='/users/login' render={(props) => (
                  <Login login={Login} setToken={setToken} token={token}/>
              )}>
              </Route>
              {/* <Route path="/activities/:post_Id">
                <ActivityPage
                    ViewActivities={ViewActivities}
                    token={token}
                    activities={activities} 
                />
              </Route> */}
                {/* <Route path='/routines' render={(props) => (
                    <ViewRoutines />
                )}>
                </Route> */}
            </Switch>
        </Router>
    </div>
  )
}

const rootEl = document.getElementById('app');
const root = ReactDOMClient.createRoot(rootEl);

root.render(
<BrowserRouter>
  <App />
</BrowserRouter>)
