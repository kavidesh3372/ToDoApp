import axios from "axios";

// Change this to your Node.js backend URL
const REST_API_URL = 'http://localhost:8000/api/todos';

export const listTask = () => axios.get(REST_API_URL);
export const addTask = (taskData) => axios.post(REST_API_URL, taskData);
export const getTask = (taskId) => axios.get(`${REST_API_URL}/${taskId}`);
export const updateTask = (taskId, taskData) => axios.put(`${REST_API_URL}/${taskId}`, taskData);
export const deleteTask = (taskId) => axios.delete(`${REST_API_URL}/${taskId}`);