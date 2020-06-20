/*
 * action types.
 */

export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNOUT_USER = 'SIGNOUT_USER';
export const UPDATE_CATEGORIES = 'UPDATE_CATEGORIES';
export const CHANGE_DISPLAY_CATEGORY = 'CHANGE_DISPLAY_CATEGORY';
export const EDIT_PROFILE = 'EDIT_PROFILE';

export const INITIAL_STATE = {
    type: SIGNIN_USER,
    userID: "",
    email: "",
    firstName: "",
    lastName: "",
    bio: ""
};


/*
 * action creators
 */

export function signinUser(userID, email, firstName, lastName, bio) {
    return { type: SIGNIN_USER, userID, email, firstName, lastName, bio}
}

export function signoutUser() {
    return {type: SIGNOUT_USER}
}

export function updateCategories(categories) {
    return {type: UPDATE_CATEGORIES, categories}
}

export function changeDisplayCategory(index) {
    return {type: CHANGE_DISPLAY_CATEGORY, index}
}

export function editProfile(firstName, lastName, bio) {
    return {type: EDIT_PROFILE, firstName, lastName, bio}
}