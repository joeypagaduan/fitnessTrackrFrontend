import React, { useState, useEffect } from "react";
import { getActivities } from "../api";

const ViewActivities = (props) => {
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
        <div>
            <h1>Activities</h1>
            <div>{activities.map((activity, index) => {
                return (
                    <div>
                        <div>{activity.id}</div>
                        <div>{activity.name}</div>
                        <div>{activity.description}</div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}

export default ViewActivities;