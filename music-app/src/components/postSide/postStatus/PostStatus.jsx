import React, { useEffect, useState } from 'react'
import './PostStatus.css'
import status from '../../../images/status1.jpg'
import logo from '../../../images/profile.jpg'
import { Status } from '../../../Data/StatusData'
import moment from "moment";
import Loading from "../../common/Loading/Loading"
// import "moment/locale/vi";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch, useSelector } from 'react-redux'
import { getPost, likePost } from '../../../actions/postAction'
import { LIKE_POST_RESET } from '../../../constants/postConstant'
import FooterPost from '../FooterPost'

function PostStatus(props) {

  const [like,setLike] = useState(0)
  const [likeStatus,setLikeStatus] = useState(false)
  const {loading,isUpdated,isUpdatedLike,posts,listLike}=useSelector(state=>state.posts)
  const {user,isAuthenticated} = useSelector(state=>state.user)
  const {users} = useSelector(state=>state.users)


  const profilePage = props.profilePage

  const dispatch = useDispatch()



  useEffect(()=>{

      dispatch(getPost())
    
  },[dispatch])



  return (
    <>
          <div className="PostStatus">
        {
            profilePage ? (
              posts.post&&posts.post.filter(post=>post.user.name === user.name).sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
              }).map((status)=>{
                  return(
                      <div className="status" key={status._id}>
                          <div className="avtUser">
                            <img src={status.user.avatar.url} alt=""/>
                            <div className="inforStatus">
                              <p>{status.user.name}</p>
                              <p>{moment(status.createdAt).locale("vi").format("DD/MM/YYYY HH:mm")}</p>
                            </div>
                          </div>
                          <p>{status.title}</p>
                          <img src={status.image[0].url} alt="" />
                          {/* <div className="actions">
                              <p>{likeStatus ? (<ThumbUpIcon />) : (<ThumbUpOffAltIcon />)} {status.likeCount}</p>
                              <div className="action">
                                  <a href='#'>{status.numOfReviews} Comments</a>
                                  <a href='#'>{status.share} Share</a>
                              </div>
                          </div> */}
                          {/* <FooterPost /> */}
                      </div>
                  )
              })
            ) : (
              posts.post&&posts.post.sort(function(a,b){
                return new Date(b.createdAt) - new Date(a.createdAt);
              }).map((status)=>{
                  return(
                      <div className="status" key={status._id}>
                          <div className="avtUser">
                            <img src={status.user.avatar.url} alt=""/>
                            <div className="inforStatus">
                              <p>{status.user.name}</p>
                              <p>{moment(status.createdAt).locale("vi").format("DD/MM/YYYY HH:mm")}</p>
                            </div>
                          </div>
                          <p>{status.title}</p>
                          <img src={status.image[0].url} alt="" />
                          {/* <div className="actions">
                              <p>{status.likes.some(u=>u._id==user._id) ? (<ThumbUpIcon onClick={()=>handleLikePost(status._id)}/>) : (<ThumbUpOffAltIcon onClick={()=>handleLikePost(status._id)}/>)} {status.likeCount}</p>
                              <div className="action">
                                  <a href='#'>{status.numOfReviews} Comments</a>
                                  <a href='#'>{status.share} Share</a>
                              </div>
                          </div> */}
                          <FooterPost postData={status} userD={user} likeStatus={status.likes.some(u=>u._id==user._id)}/>

                      </div>
                  )
              })
            )
        }
    </div>
    </>
  )
}

export default PostStatus