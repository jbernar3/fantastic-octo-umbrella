/*
 * action types.
 */

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';

export const INITIAL_STATE = {
    type: SIGNIN_USER,
    userID: "",
    email: "",
    firstName: "",
    lastName: "",
    categories: null
};


/*
 * action creators
 */

export function signinUser(userID, email, firstName, lastName, categories) {
    return { type: SIGNIN_USER, userID, email, firstName, lastName, categories}
}

export function signoutUser() {
    return {type: SIGNOUT_USER}
}

export function updateCategories(categories) {
    return {type: UPDATE_CATEGORIES, categories}
}