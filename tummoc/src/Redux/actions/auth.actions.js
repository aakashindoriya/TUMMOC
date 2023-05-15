import { AUTH_LOGIN_FAILURE, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_TRUE } from "../actionTypes/auth.action.type";
import axios from "axios";

//provide {email,username,password,toast,history,from}
export const authRegister = (data) => async (dispatch) => {

    try {
        dispatch({ type: AUTH_LOGIN_REQUEST });
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/signup`, { ...data }, { withCredentials: true })
        data.toast({
            title: `Welcome to Tummoc`,
            description: "Registration successfull",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top"
        });
        data.history(data.from)
        return dispatch({
            type: AUTH_LOGIN_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        data.toast({
            title: `somthing went wrong`,
            description: `${error.response.data.error}`,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
        })
        return dispatch({
            type: AUTH_LOGOUT,
            payload: {
                message: error.response.data,
            },
        });
    }
}

//provide {email,password,toast,history,from}
export const authLogin = (data) => async (dispatch) => {
    try {

        dispatch({ type: AUTH_LOGIN_REQUEST });
        const res = await axios.post(`${process.env.REACT_APP_BASEURL}/user/login`, { ...data }, {
            withCredentials: true
        });
        data.toast({
            title: `Welcome to Tummoc`,
            description: "Login successfull",
            status: "success",
            duration: 2000,
            isClosable: true,
            position: "top"
        });
        data.history(data.from)
        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: res.data });

    } catch (error) {
        console.log(error)
        data.toast({
            title: `ERROR`,
            description: error.response.data,
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
        })
        dispatch({ type: AUTH_LOGIN_FAILURE, payload: { message: error.response.data } });
    }
}

export const authLogout = () => async (dispatch) => {
    try {
        let res = await axios.delete(`${process.env.REACT_APP_BASEURL}/user/logout`, {
            withCredentials: true,
        })
        alert("logout successfully")
        dispatch({ type: AUTH_LOGOUT });
    } catch (error) {
        dispatch({ type: AUTH_LOGIN_FAILURE, payload: { message: error.response.data } });
    }
}
export const CheckAuth = () => async (dispatch) => {
    try {
        let res = await axios.get(`${process.env.REACT_APP_BASEURL}/info`, { withCredentials: true })
        dispatch({ type: AUTH_TRUE, payload: res.data })
    } catch (error) {
        dispatch({ type: AUTH_LOGIN_FAILURE, payload: { message: error.response.data } });
    }
}