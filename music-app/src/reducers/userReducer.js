import { LOAD_ALL_USER_FAIL, LOAD_ALL_USER_REQUEST, LOAD_ALL_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../constants/userConstant";

export const userReducer = (state={user: {}},action) =>{
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
        case REGISTER_REQUEST:
            return{
                isAuthenticated: false,
                loading: true
            }
        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                loading: false
            }
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:
        case LOGOUT_FAIL:
        case REGISTER_FAIL:
            return {
                user: null,
                isAuthenticated: false,
                loading: false,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return{
                isAuthenticated: false,
                loading: false,
                user: null
            }
        default:
            return state;
    }
}

export const allUserReducer = (state= {users: []},action)=>{
    switch (action.type) {
        case LOAD_ALL_USER_REQUEST:
            return{
                loading: true,
                users: []
            }
        case LOAD_ALL_USER_SUCCESS:
            return{
                loading: false,
                users: action.payload
            }
        case LOAD_ALL_USER_FAIL:
            return{
                loading: false,
                error: action.payload,
            }
        default:
            return state;
    }
}