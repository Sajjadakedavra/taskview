import { combineReducers } from "redux";
import auth from "./auth";
import date from "./date";


export default combineReducers({
    auth,
    date
});