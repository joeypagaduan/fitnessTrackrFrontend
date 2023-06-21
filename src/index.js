import React, { useEffect, useState } from 'react';
import ReactDOMClient from 'react-dom/client';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import { callAPI, myData } from './api';

import {
  Home,
  ViewActivities,
  Register,
  Login,
  AddActivity,
  Routines,
  MyRoutines,
} from './components';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') ?? '');
  const [user, setUser] = useState(null);
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  const getActivities = async () => {
    const data = await callAPI({
      path: '/activities',
      token,
    });

    if (data?.activities) {
      setActivities(data.activities);
    }
  };

  useEffect(() => {
    //fetch the user and call set user.

    // const fetchUser = async () => {
    //   try {
    //     const response = await getUser(token);
    //     if (response && response.data && response.data.user) {
    //       setUser(response.data.user);
    //     }
    //   } catch (error) {
    //     console.error('Error fetching user data:', error);
    //   }
    // };
    //fetchUser();
    getActivities();
  }, [token]);

  // stay logged in between page visits
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);

  const handleLogout = () => {
    setToken('');
    setUser(null);
  };

  return (
    <div className="app">
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/routines">Routines</Link>
        <Link to="/myroutines">My Routines</Link>
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <Switch>
        <Route exact path="/" render={(props) => <Home user={user} />}></Route>
        <Route
          path="/activities"
          render={(props) => <ViewActivities />}
        ></Route>
        {!token ? (
          <Route path="/users/register">
            <Register setToken={setToken} />
          </Route>
        ) : null}

        {!token && (
          <Route path="/users/login">
            <Login
              login={Login}
              setToken={setToken}
              token={token}
              setUser={setUser}
            />
          </Route>
        )}

        {/* link to addActivity  */}

        <Route
          exact
          path="/addActivity"
          render={(props) => <AddActivity token={token} />}
        ></Route>
        {/* <Route path="/activities/:post_Id">
                <ActivityPage
                    ViewActivities={ViewActivities}
                    token={token}
                    activities={activities} 
                />
              </Route> */}
        <Route
          path="/routines"
          render={(props) => <Routines token={token} />}
        ></Route>
        <Route
          path="/myroutines"
          render={(props) => <MyRoutines token={token} />}
        ></Route>
      </Switch>
    </div>
  );
};

const rootEl = document.getElementById('app');
const root = ReactDOMClient.createRoot(rootEl);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
