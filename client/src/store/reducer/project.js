import { PROJECT_CREATED, TASK_CREATED, GET_PROJECTS, PROJECT_DELETED, TASK_DELETED, TASK_EDITED } from "../constants/actionTypes";

const INIT_STATE = {
    project: {}, //the project being currently worked upon
    projects: [] //all projects of logged in user
};

export default (state = INIT_STATE, action) => {

    switch (action.type) {
        case PROJECT_CREATED:
        case TASK_CREATED:
            return { ...state, project: action.payload };

        case GET_PROJECTS:
            return { ...state, projects: action.payload };

        case PROJECT_DELETED:
            return { ...state, project: {} };

        case TASK_DELETED:
            return { ...state, project: action.payload };

        case TASK_EDITED:
            return { ...state, project: action.payload };

        default:
            return state;
    }
}