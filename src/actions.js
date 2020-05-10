/*
 * action types.
 */

export const SIGNIN_USER = 'SIGNIN_USER';

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