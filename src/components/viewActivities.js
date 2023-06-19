import React, { useState, useEffect } from "react";
import { getActivities } from "../api";
import { Link } from 'react-router-dom';
import AddActivity from './addActivity';



const ViewActivities = ({ token }) => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        try {
            Promise.all([getActivities()])
                .then(([data]) => {
                    setActivities(data) 
                })
        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <>
            {token && <AddActivity token={token} getActivities={getActivities} /> }
            <h1>Activities</h1>
            {/* addActivity to be viewed */}
            <Link to="/addActivity">Add Activity</Link>
            
            <div className="activity-list"></div>
            <div>{activities.map((activity, index) => {
                return (
                    <div key={activity.id} className="activity-item">
                        <div>ID: {activity.id}</div>
                        <div>Name: {activity.name}</div>
                        <div>Description: {activity.description}</div>
                    </div>
                )
            })}
            </div>
        </>
    );
}

export default ViewActivities;