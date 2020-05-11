import {SIGNIN_USER, SIGNOUT_USER} from "../actions";
import {INITIAL_STATE} from "../actions";
import { combineReducers } from 'redux'
const assert = require('assert');

function signin(state = INITIAL_STATE, action) {
    assert(typeof state !== "undefined");
    // keeping it as switch statement since expecting for action types
    switch (action.type) {
        case SIGNIN_USER:
            return Object.assign({}, state, {
                userID: action.userID,
                email: action.email,
                firstName: action.firstName,
                lastName: action.lastName
            });
        case SIGNOUT_USER:
            return Object.assign({}, state, {
                userID: "",
                email: "",
                firstName: "",
                lastName: ""
            });
        default:
            return state;
    }
}

const armaReducers = combineReducers({
    signin
});

export default armaReducers

