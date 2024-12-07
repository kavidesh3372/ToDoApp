import axios from "axios";

const REST_API_URL = 'http://localhost:8080/api/v1/task';

export const listTask = () => axios.get(REST_API_URL);
export const addTask = (taskData) => axios.post(REST_API_URL, taskData);
export const getTask = (taskId) => axios.get(REST_API_URL+'/'+taskId);
export const updateTask = (taskId,taskData) => axios.put(REST_API_URL+'/'+taskId,taskData);
export const deleteTask = (taskId) => axios.delete(REST_API_URL+'/'+taskId);
