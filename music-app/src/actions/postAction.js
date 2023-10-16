import axios from "axios"
import { LIKE_POST_FAIL, LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LOAD_POST_FAIL, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, SHARE_POST_FAIL, SHARE_POST_REQUEST, SHARE_POST_SUCCESS } from "../constants/postConstant"


export const addPost = (postData) => async(dispatch)=>{
    try {
        dispatch({type: SHARE_POST_REQUEST})

        console.log("data",postData);
        const config = {
            headers:{
                "Content-Type": "multipart/form-data" 
            }
        }
        const {data} = await axios.post("http://localhost:4005/api/v1/newpost",postData,config)

        dispatch({
            type: SHARE_POST_SUCCESS,
            payload: data.newPost
        })
    } catch (error) {
        dispatch({
            type: SHARE_POST_FAIL,
            payload: error
        })
    }
}

export const getLike = () =>async(dispatch)=>{
    try {
        // dispatch({type: LOAD_LIKE_REQUEST})
        // const config = {
        //     headers:{
        //         "Content-Type": "multipart/form-data" 
        //     }
        // }
        const {data} = await axios.get("http://localhost:4005/api/v1/post")

        // console.log("getPost",data);
        dispatch({
            type: LOAD_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOAD_POST_FAIL,
            payload: error
        })
    }
}

export const getPost = () => async(dispatch)=>{
    try {
        dispatch({type: LOAD_POST_REQUEST})
        // const config = {
        //     headers:{
        //         "Content-Type": "multipart/form-data" 
        //     }
        // }
        const {data} = await axios.get("http://localhost:4005/api/v1/post")

        // console.log("getPost",data);
        dispatch({
            type: LOAD_POST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: LOAD_POST_FAIL,
            payload: error
        })
    }
}

export const likePost = (post,postID,user) => async(dispatch) =>{

    console.log(post,postID,user);
    const newPost = {...post,likes:[...post.likes,user._id]}
    dispatch({
        type: LIKE_POST_SUCCESS,
        payload: newPost
    })
    console.log("newPost",newPost);
    try{
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `token ${token}`,
            },
        };
        await axios.post("http://localhost:4005/api/v1/likepost",{
            postID
        },config)

        
        
    }catch(error){
        dispatch({
            type: LIKE_POST_FAIL,
            payload: error
        })
    }
}