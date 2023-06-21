import React, { useState, useEffect } from 'react';

import { getAllPublicRoutines, createRoutine } from '../api';

const Routines = ({ token }) => {
  const [routines, setRoutines] = useState([]);
  const [name, setName] = useState('');
  const [goal, setGoal] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  const handleSubmit = async () => {
    console.log(`Token ${token}`);
    createRoutine(token, { name, goal, isPublic });
    setRoutines(await getAllPublicRoutines());
    setName('');
    setGoal('');
  };

  useEffect(() => {
    async function check() {
      setRoutines(await getAllPublicRoutines());
    }
    check();
  }, []);

  return (
    <>
      <h1>Routines</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        id="routines"
      >
        <label htmlFor="title">Name: </label>
        <input
          type="text"
          name="name"
          onChange={(event) => setName(event.target.value)}
          value={name}
        />
        <br />
        <label htmlFor="goal">Goal: </label>
        <input
          type="text"
          name="goal"
          onChange={(event) => setGoal(event.target.value)}
          value={goal}
        />
        <br />
        <button type="submit">Submit</button>
        <hr />
      </form>

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

export default Routines;
