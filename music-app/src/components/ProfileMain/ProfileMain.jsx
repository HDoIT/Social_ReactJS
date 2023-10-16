import React, { useState } from 'react';
import './ProfileMain.css';
import ProfileCard from '../profileSide/profileCard/ProfileCard';
import PostSide from '../postSide/PostSide';

const ProfileMain = () => {
  const [profilePage,setProfilePage] = useState(true)
  return (
    <div className="ProfileMain">
        <ProfileCard profilePage={profilePage}/>
        <PostSide profilePage={profilePage}/>
    </div>
  )
}

export default ProfileMain