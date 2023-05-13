import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
} from "../actionTypes/auth.action.type";

const initialState = {
    isAuth: false,
    isLoading: false,
    username: "",
    id: "",
    email: "",
    token: ""

};
let savedstate = JSON.parse(localStorage.getItem("auth")) || initialState

export default function authReducer(state = savedstate, { type, payload }) {
    switch (type) {
        case AUTH_LOGIN_REQUEST:
            return { ...state, isLoading: true };
        case AUTH_LOGIN_SUCCESS:
            let obj1 = {
                ...state,
                isAuth: true,
                isError: false,
                isLoading: false,
                username: payload.username,
                id: payload.id,
                email: payload.email,
                token: payload.token
            }
            localStorage.setItem("auth", JSON.stringify(obj1))
            return obj1;
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                isAuth: false,
                isLoading: false
            };
        case AUTH_LOGOUT:
            localStorage.removeItem("auth")
            return initialState;
        default:
            return state;
    }
}