import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    AUTH_TRUE,
} from "../actionTypes/auth.action.type";

const initialState = {
    isAuth: false,
    isLoading: false,
    token: ""

};

export default function authReducer(state = initialState, { type, payload }) {
    switch (type) {
        case AUTH_LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case AUTH_LOGIN_SUCCESS:
            let obj1 = {
                ...state,
                isAuth: true,
                isError: false,
                isLoading: false,
                token: payload.token
            }
            return obj1;
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                isLoading: false
            };
        case AUTH_TRUE: return {
            ...state,
            isAuth: payload.token ? true : false,
            isLoading: false,
            token: payload.token ? payload.token : ""
        }
        case AUTH_LOGOUT:
            return initialState;
        default:
            return state;
    }
}