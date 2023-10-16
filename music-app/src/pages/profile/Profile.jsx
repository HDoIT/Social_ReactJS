import React from 'react'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import ProfileMain from '../../components/ProfileMain/ProfileMain'
import ProfileRight from '../../components/ProfileRight/ProfileRight'
import './Profile.css'
const Profile = () => {
  return (
    <div className="Profile">
        <ProfileLeft />
        <ProfileMain />
        <ProfileRight />
    </div>
  )
}

export default Profile
