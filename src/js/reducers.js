import {SIGNIN_USER, SIGNOUT_USER, UPDATE_CATEGORIES, CHANGE_DISPLAY_CATEGORY, EDIT_PROFILE} from "../actions";
import {INITIAL_STATE} from "../actions";
import { combineReducers } from 'redux'
import { REHYDRATE} from "redux-persist";

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
                username: action.username
            });
        case SIGNOUT_USER:
            return Object.assign({}, state, {
                userID: "",
                email: "",
                firstName: "",
                lastName: "",
                bio: "",
                username: ""
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
                bio: action.bio
            });

        // case REHYDRATE:
        //     const signin = action.payload.signin;
        //     return Object.assign({}, state, {
        //         userID: signin.userID,
        //         email: signin.email,
        //         firstName: signin.firstName,
        //         lastName: signin.lastName
        //     });
        default:
            return state;
    }
}

const armaReducers = combineReducers({
    signin
});

export default armaReducers

