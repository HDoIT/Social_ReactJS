import { LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_RESET, LIKE_POST_SUCCESS, LOAD_POST_FAIL, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, SHARE_POST_FAIL, SHARE_POST_REQUEST, SHARE_POST_RESET, SHARE_POST_SUCCESS } from "../constants/postConstant";

export const postsReducer = (state={posts:[]},action)=>{
    switch (action.type) {
        case LOAD_POST_REQUEST:
            return{
                ...state,
                loading: true,
            }
        case LOAD_POST_SUCCESS:
            return{
                ...state,
                loading: false,
                posts: action.payload
            }
        case LOAD_POST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case SHARE_POST_REQUEST:
            return{
                ...state,
                loading: true,
            }
        // case LIKE_POST_REQUEST:
        //     return{
        //         ...state,
        //         loading: true,
        //     }
        case SHARE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: true,
                posts: action.payload
            }
        case LIKE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdatedLike: true,
                posts: action.payload,
            }
        case SHARE_POST_FAIL:
        case LIKE_POST_FAIL:
            return{
                ...state,
                loading: false,
                error: action.payload
            }
        case SHARE_POST_RESET:
            return {
                ...state,
                isUpdated: false,
            }
        case LIKE_POST_RESET:
            return {
                ...state,
                isUpdatedLike: false,
            }
        default:
            return state;
    }
}