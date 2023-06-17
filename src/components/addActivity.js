import React, { useState } from 'react';

import { callAPI } from '../api';

const AddActivity = ({token, getActivities}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const AddActivity = async (event) => {
        event.preventDefault();

        const responseData = await callAPI({
            path: '/activities',
            method: "post",
            token,
            body: {
                activity: {
                    name,
                    description,
                }
            }
        });
        const {activity} = responseData;
        if (activity) {
            setName('');
            setDescription('');
            await getActivities();
        }
    }

    return (
        <>
            <h2>Add a New Activity</h2>
            <form onSubmit={AddActivity} id="addAnActivity">

                <label htmlFor="title">Name</label>
                <input
                    type="text"
                    name="name" 
                    onChange={event => setName(event.target.value)}
                    value={name}
                />

                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    name="description"
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                />

                <button type="submit">Submit</button>
            <hr/>
            </form>
        </>
    );
}

export default AddActivity;