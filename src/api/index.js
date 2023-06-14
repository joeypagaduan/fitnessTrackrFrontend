
const BASE_URL = `https://fitnesstrac-kr.herokuapp.com/api`

//POST/users/register
export const registerUser = async (username, password, token) => {
       try {
         const response = await fetch(
           `${BASE_URL}/users/register`, {
           method: "POST",
           headers: {
             'Content-Type': 'application/json',
             'Authorization': `Bearer ${token}`
           },
           body: JSON.stringify({
             user: {
               username: username,
                password: password
             }
           })
         });
         const result = await response.json();
         // As written below you can log your result
         // to check what data came back from the above code.
         console.log(result)
         return result
       } catch (err) {
         console.error(err);
       }
     }

//POST/users/login

export const login = async (username, password, token) => {
      
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
          
        },
        body: JSON.stringify({
            user: {
                username,
                password,
              }
            
        })
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
}

// GET/users/me 
export const myData = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    const result = await response.json();
    console.log(result);
    return result
  } catch (err) {
    console.error(err);
  }
}

//GET/users/:username/routine
export const getRoutinesByUsername = async (token, username) => {

    try {
      const response = await fetch(`${BASE_URL}/users/${username}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const getActivities = async () => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const result = await response.json();
  
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
    
//POST/activities
export const postActivities = async ({ id, name, description }, token) => {
    try {
      const response = await fetch(`${BASE_URL}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          id,
          name,
          description,
        }) 
      });
  
      const result = await response.json();
  
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  //PATCH/activities/:activityId
  export const updateActivity = async (activityId, { name, description }, token) => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
        }) 
      });
  
      const result = await response.json();
  
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //GET/activities/:activityId/routines
  export const getRoutinesByActivityId = async (activityId) => {
    try {
      const response = await fetch(`${BASE_URL}/activities/${activityId}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

// GET/routines
export const getAllPublicRoutines = async () => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // POST/routines
  export const createRoutine = async (token, { name, goal, isPublic = null }) => {
    try {
      const response = await fetch(`${BASE_URL}/routines`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic
        })
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //PATCH /routines/:routineId

  export const updateRoutine = async (token, routineId, { name, goal, isPublic }) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          goal,
          isPublic
        })
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  
  //DELETE /routines/:routineId
  export const deleteRoutine = async (token, routineId) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  //POST /routines/:routineId/activities

  export const attachActivityToRoutine = async (routineId, { activityId, count, duration }) => {
    try {
      const response = await fetch(`${BASE_URL}/routines/${routineId}/activities`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          activityId,
          count,
          duration
        })
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  
  //PATCH /routine_activities/:routineActivityId

  export const updateRoutineActivity = async (token, routineActivityId, { count, duration }) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          count,
          duration
        })
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  

  //DELETE /routine_activities/:routineActivityId
  
  export const removeActivityFromRoutine = async (token, routineActivityId) => {
    try {
      const response = await fetch(`${BASE_URL}/routine_activities/${routineActivityId}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      const result = await response.json();
      console.log(result);
      return result;
    } catch (err) {
      console.error(err);
    }
  }
  

  //CALL API helper function//

const getURL = (path) => {
  const url = BASE_URL + path;
  return url
}

const getOptions = (method, body, token) => ({
    method: method ? method.toUpperCase() : "GET",
    headers: {
        'Content-Type': 'application/json', 
        ...(token && {'Authorization': `Bearer ${token}`})
    },
    ...( body && { body: JSON.stringify(body) }),
});

export const callAPI = async({path, method, body, token}) => {
    try {
        const result = await fetch(
            getURL(path),
            getOptions(method, body, token),
        );
        const response = await result.json();
        if (response.error) throw response.error;
        return response?.data;
    } catch(e) {
        console.error(e);
    }
}
