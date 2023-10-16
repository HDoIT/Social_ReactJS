import { LOAD_ALL_USER_FAIL, LOAD_ALL_USER_REQUEST, LOAD_ALL_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_REQUEST, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/userConstant"
import axios from "axios"

export const getAllUser = () => async(dispatch)=>{
    try {
        dispatch({type: LOAD_ALL_USER_REQUEST})

        const {data} = await axios.get("http://localhost:4005/api/v1/users")

        // console.log("data",data);
        dispatch({
            type: LOAD_ALL_USER_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: LOAD_ALL_USER_FAIL,
            payload: error
        })
    }
}

export const loginAction = (email,password) => async (dispatch) =>{
    try {
        dispatch({type: LOGIN_REQUEST})

        const token = localStorage.getItem("token")

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `token ${token}`
            }
        }

        const {data} = await axios.post("http://localhost:4005/api/v1/login",
        {
            email,
            password
        },
        config)

        // console.log("data",data);
        localStorage.setItem("token",data.token)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUserAction = ()=>async(dispatch)=>{
    try {
        dispatch({type: LOAD_USER_REQUEST})

        const token = localStorage.getItem("token")

        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization:  `token ${token}`
            }
        }

        const {data} = await axios.get("http://localhost:4005/api/v1/me",config)

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.message
        })
    }
}

export const logOut = ()=>async(dispatch)=>{
    try {
        await axios.get("http://localhost:4005/api/v1/logout")

        localStorage.removeItem("token")

        dispatch({type: LOGOUT_SUCCESS})
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error
        })
    }
}

export const registerAction = (userData) => async(dispatch) =>{
    try {
        dispatch({type: REGISTER_REQUEST})

        const config = {
            headers:{
                "Content-Type": "multipart/form-data" 
            }
        }

        const {data} = await axios.post(`http://localhost:4005/api/v1/register`,
        userData,config)

        dispatch({
            type: REGISTER_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error
        })

    }
}