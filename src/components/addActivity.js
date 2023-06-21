import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { callAPI } from '../api';

const AddActivity = ({token, getActivities}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const addActivity = async (event) => {
        event.preventDefault();
        setError(''); 

        
        const activity = await callAPI({
            path: '/activities',
            method: "post",
            token,
            body: {
                name,
                description
            }
        });
        console.log(activity);
        try {
            if (activity) {
                setName('');
                setDescription('');
                history.push('/activities');
            } else {
                setError('Error! This activity already exists.');
            }
        } catch (error) {
            setError(error.message);
        }}

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
                {error && <p className="error-message">{error}</p>}
            <hr/>
            </form>
        </>
    );
}

export default AddActivity;