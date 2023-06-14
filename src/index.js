import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import {
  getActivities
} from "./components"

const App = () => {

  return (
    <div className='app'>
        <nav className='navbar'>
            <Link to='/'>Home</Link>
            <Link to='/routines'>Routines</Link>
            <Link to='/my-routines'>My Routines</Link>
            <Link to='/activities'>Activities</Link>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
        </nav>
        <Router>
            <Switch>
              <Route path='/activities' render={(props) => (
                  <ViewActivities />
              )}>
                {/* <Route exact path='/' render={(props) => (
                    <Home />
                )}>
                </Route> */}
                {/* <Route path='/routines' render={(props) => (
                    <ViewRoutines />
                )}>
                </Route> */}
                </Route>
            </Switch>
        </Router>
    </div>
  )
}

ReactDOM.render(
<Router>
  <App />
</Router>,
document.getElementById("app")
)
