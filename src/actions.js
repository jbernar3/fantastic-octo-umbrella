/*
 * action types.
 */

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';

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