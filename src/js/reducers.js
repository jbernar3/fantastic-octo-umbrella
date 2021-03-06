import {SIGNIN_USER, SIGNOUT_USER, UPDATE_CATEGORIES, CHANGE_DISPLAY_CATEGORY, EDIT_PROFILE, UPDATE_EMAIL, UPDATE_USERNAME} from "../actions";
import {INITIAL_STATE} from "../actions";
import { combineReducers } from 'redux';

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
                lastName: action.lastName,
                bio: action.bio,
                username: action.username,
                profileImg: action.profileImg
            });
        case SIGNOUT_USER:
            return Object.assign({}, state, {
                userID: "",
                email: "",
                firstName: "",
                lastName: "",
                bio: "",
                username: "",
                profileImg: ""
            });
        case UPDATE_CATEGORIES:
            return Object.assign({}, state, {
                categories: action.categories
            });
        case CHANGE_DISPLAY_CATEGORY:
            return Object.assign({}, state, {
                indexDisplayCategory: action.index
            });
        case EDIT_PROFILE:
            return Object.assign({}, state, {
                firstName: action.firstName,
                lastName: action.lastName,
                bio: action.bio,
                profileImg: action.profileImg
            });
        case UPDATE_EMAIL:
            return Object.assign({}, state, {
               email: action.email
            });
        case UPDATE_USERNAME:
            return Object.assign({}, state, {
                username: action.username
            });
        default:
            return state;
    }
}

const armaReducers = combineReducers({
    signin
});

export default armaReducers

