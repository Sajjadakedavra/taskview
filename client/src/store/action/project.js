import { PROJECT_CREATED, TASK_CREATED, GET_PROJECTS, PROJECT_DELETED, TASK_DELETED, TASK_EDITED, USERS_COMMENT } from "../constants/actionTypes";
import axios from "axios";
import socket from "../../utils/socketConn";

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
        socket._instance && socket._instance.emit('notification', res.data)
        dispatch({ type: TASK_CREATED, payload: res.data });
        console.log("task created successfully");

    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}


export const editTask = (project_id, task_id, projectName, comments, task, editType) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = { name: projectName, task, comments, editType };

    try {
        const res = await axios.patch(`/api/projects/${project_id}/${task_id}`, body, config);
        dispatch({ type: TASK_EDITED, payload: res.data });
        console.log("task edited and dispatched")
    } catch (err) {
        if (err) {
            console.error(err);
        }
    }
}



//Get all users who commented on a selected project
export const getAllUsersWhoCommented = (project_id) => async dispatch => {

    try {
        const res = await axios.get(`/api/projects/${project_id}`);

        dispatch({ type: USERS_COMMENT, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};


//Get all projects of user
export const getAllProjects = () => async dispatch => {

    try {
        const res = await axios.get('/api/projects');

        dispatch({ type: GET_PROJECTS, payload: res.data });
    } catch (err) {
        console.log(err);
    }
};