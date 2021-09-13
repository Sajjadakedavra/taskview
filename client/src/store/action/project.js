import { PROJECT_CREATED, TASK_CREATED, GET_PROJECTS, PROJECT_DELETED, TASK_DELETED, TASK_EDITED } from "../constants/actionTypes";
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


export const createTask = (project_id, tasks, editType) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { tasks, editType };

    try {
        const res = await axios.put(`/api/projects/${project_id}`, body, config);
        dispatch({ type: TASK_CREATED, payload: res.data });

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}


export const editTask = (project_id, task_id, projectName, comments, tasks, alteration) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name: projectName, tasks, comments, alteration };

    try {
        const res = await axios.put(`/api/projects/${project_id}/${task_id}`, body, config);
        dispatch({ type: TASK_EDITED, payload: res.data });

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