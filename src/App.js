import React, {useEffect, useState} from 'react';
import { Route, Link } from 'react-router-dom';
import { callAPI } from './api';

import {
    Activities
} from './components';

const App = () => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [activities, setActivities] = useState([]);

    const fetchActivities = async () => {
        const data = await callAPI({
            path: "/activities", token
        })

        if (data?.activities) {
            setActivities(data.activities);
        }
    }

    useEffect(() => {
        fetchActivitiess();
    }, [token]);

    return (
        <>
            <nav>
                <Link to="/">Home</Link> |
                <Link to="/Activities">Activities</Link> |
                {
                    token
                        ? <Link to="/users/me">My Profile</Link>
                        : <Link to="/users/login">Log In</Link>
                }
            </nav>

            <Route exact path="/">
                <Home user={user} />
            </Route>
            <Route exact path="/activities">
                {activities
                    ? <Activities
                        token={token}
                        fetchActivities={fetchActivities}
                        activities={activities}
                    /> : <strong>No activities to display!</strong>
                }
            </Route>
            <Route path="/activities/:post_Id">
                <PostPage
                    fetchActivities={fetchActivities}
                    token={token}
                    activities={activities} 
                />
            </Route>
        </>
    )
}

export default App;