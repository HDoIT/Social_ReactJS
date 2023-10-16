import React, { useState } from 'react'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch } from 'react-redux';
import { likePost } from '../../../actions/postAction';

function FooterPost(props) {

    // const [likeStatus,setLikeStatus] = useState(false)
    // console.log(props.userD._id);
    const dispatch = useDispatch()
    const handleLikePost = (postId) =>{
    
      // console.log("props",props.postData);
      dispatch(likePost(props.postData,postId,props.userD))
      
    }
  return (
    <>
        <div className="actions">
            <p>{props.likeStatus ? (<ThumbUpIcon onClick={()=>handleLikePost(props.postData._id)}/>) : (<ThumbUpOffAltIcon onClick={()=>handleLikePost(props.postData._id)}/>)} {props.postData.likeCount} </p>
            <div className="action">
                <a href='#'>Comments</a>
                <a href='#'> Share</a>
            </div>
        </div>
    </>
  )
}

export default React.memo(FooterPost)