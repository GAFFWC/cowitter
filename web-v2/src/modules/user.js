const SET_LOGIN = __filename + "SET_LOGIN";
const SET_USER_DATA = __filename + "USER_DATA";

export const setLogin = (login) => ({ type: SET_LOGIN, login });
export const setUserData = (userData) => ({ type: SET_USER_DATA, userData });

const initialState = {
    login: false,
    userData: null
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                ...state,
                login: action.login
            };
        case SET_USER_DATA:
            return {
                ...state,
                userData: action.userData
            };
        default:
            return state;
    }
};

export default user;
