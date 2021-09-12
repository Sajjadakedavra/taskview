import { PROJECT_CREATED, TASK_CREATED, GET_PROJECTS, PROJECT_DELETED, TASK_DELETED } from "../constants/actionTypes";
import axios from "axios";

export const createProject = (name, tasks) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name, tasks };

    try {
        const res = await axios.post('/api/projects', body, config);
        dispatch({ type: PROJECT_CREATED, payload: res.data });

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}


export const createTask = ({ task }) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { task };

    try {
        const res = await axios.put('/api/projects', body, config);
        dispatch({ type: TASK_CREATED, payload: res.data });

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}


//Get all projects of user
export const getAllProjects = () => async dispatch => {

    try {
        const res = await axios.get('/api/projects');

        dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};