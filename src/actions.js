/*
 * action types.
 */

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';

export const INITIAL_STATE = {
    type: SIGNIN_USER,
    email: "",
    firstName: "",
    lastName: ""
};


/*
 * action creators
 */

export function signinUser(email, firstName, lastName) {
    return { type: SIGNIN_USER, email, firstName, lastName}
}

export function signoutUser() {
    return {type: SIGNOUT_USER}
}