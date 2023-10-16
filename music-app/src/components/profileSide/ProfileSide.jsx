import React from 'react'
import LogoSearch from './logoSearch/LogoSearch'
import ProfileCard from './profileCard/ProfileCard'
import FollowCard from './followersCard/FollowCard'
import './ProfileSide.css'
const ProfileSide = () => {
  return (
    <div className="ProfileSide">
          <LogoSearch />
          <ProfileCard profilePage={false}/>
          <FollowCard />
    </div>
  )
}

export default ProfileSide
