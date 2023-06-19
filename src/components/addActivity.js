import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { callAPI } from '../api';

const AddActivity = ({token, getActivities}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const history = useHistory();

    const addActivity = async (event) => {
        event.preventDefault();


        
        const activity = await callAPI({
            path: '/activities',
            method: "post",
            token,
            body: {
                name,
                description
            }
        });
        
        if (activity) {
            setName('');
            setDescription('');
            await getActivities();
            history.push('/activities');
        }
    }

    return (
        <>
            <h2>Add a New Activity</h2>
            <form onSubmit={addActivity} id="addAnActivity">

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