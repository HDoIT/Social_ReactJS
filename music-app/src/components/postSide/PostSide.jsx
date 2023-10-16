import React from 'react'
import PostShare from './postShare/PostShare'
import PostStatus from './postStatus/PostStatus'
import './PostSide.css'

const PostSide = (props) => {
  const profilePage = props.profilePage
  return (
    <div className="post-side">
        <PostShare />
        <PostStatus profilePage={profilePage}/>
    </div>
  )
}

export default PostSide