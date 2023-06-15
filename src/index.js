import React, { useEffect, useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { callAPI } from './api';

import {
  Home,
  ViewActivities
} from "./components"
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';



const App = () => {

  const [token, setToken] = useState(null);
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


  return (
    <div className='app'>
        <nav className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/activities'>Activities</Link>
            <Link to='/routines'>Routines</Link>
            <Link to='/my-routines'>My Routines</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
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
