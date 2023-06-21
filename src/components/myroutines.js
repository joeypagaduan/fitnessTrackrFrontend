import React, { useEffect, useState } from 'react';

import { createRoutine, getRoutinesByUsername, myData } from '../api';

const MyRoutines = ({ token, fetchRoutines }) => {
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [routines, setRoutines] = useState([]);

  const eventHandler = async (event) => {
    event.preventDefault();
    console.log(`Name: ${name}, Goal: ${goal}`);
    const responseData = createRoutine(token, { name, goal, isPublic: true });
    console.log('Response After Submitting: ', responseData);
    updateRoutines();
  };

  const updateRoutines = async () => {
    const myInformation = await myData(token);
    console.log('My Data: ', myInformation);
    console.log('User: ', myInformation.username);
    const routinesByUsername = await getRoutinesByUsername(
      token,
      myInformation.username
    );
    setRoutines(routinesByUsername);
  };

  useEffect(() => {
    updateRoutines();
  }, []);

  return (
    <>
      <h2>Create Routine</h2>
      <div className="main">
        <form onSubmit={eventHandler} id="Routines">
          <div className="inputwrapper">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder=" Name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="inputwrapper">
            <textarea
              name="goal"
              id="goal"
              cols="100"
              rows="5"
              placeholder="Goals"
              onChange={(event) => setGoal(event.target.value)}
            ></textarea>
          </div>

          <input type="submit" value="Submit" className="mybutton" />
        </form>
      </div>

      <hr></hr>

      <h2>My Routines</h2>
      <table border={1}>
        <tbody>
          <tr>
            <td>Routine Name</td>
            <td>Creator Name</td>
            <td>Goal</td>
            <td>Activities</td>
          </tr>
          {routines &&
            routines.map((routine, i) => {
              return (
                <tr key={i}>
                  <td>{routine.name}</td>
                  <td>{routine.creatorName}</td>
                  <td>{routine.goal}</td>
                  <td>
                    <ul>
                      {routine.activities &&
                        routine.activities.map((activity, i) => {
                          return (
                            <li key={i}>
                              {activity.name}
                              <ol>
                                <li>Description: {activity.description}</li>
                                <li>Count: {activity.count}</li>
                                <li>Duration: {activity.duration}</li>
                              </ol>
                            </li>
                          );
                        })}
                    </ul>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default MyRoutines;
