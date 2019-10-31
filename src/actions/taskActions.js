import { FETCH_TASKS } from './types';
import axios from 'axios';

const taskAPI = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 1000
})

export const fetchTasks = () => dispatch => {
  taskAPI.get('/tasks')
    .then(tasks =>
      dispatch({
        type: FETCH_TASKS,
        payload: tasks.data
      })
    );
};

export const createTask = taskData => dispatch => {
  taskAPI.post('/tasks', taskData)
    .then(tasks =>
      dispatch({
        type: FETCH_TASKS,
        payload: tasks.data
      })
    );
};

export const toggleTask = id => dispatch => {
  taskAPI.post('/tasks/' + id)
    .then(tasks =>
      dispatch({
        type: FETCH_TASKS,
        payload: tasks.data
      })
    );
};