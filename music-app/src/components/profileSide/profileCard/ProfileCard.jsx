import React, { useEffect, useState } from 'react';
import './Profile.css';
import profile from '../../../images/profile.jpg';
import cover from '../../../images/background.jpg';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction } from '../../../actions/userAction';

const ProfileCard = (props) => {

  const {user,isAuthenticated} = useSelector(state=>state.user)

  // const dispatch = useDispatch()

  // useEffect(()=>{
  //   dispatch(loadUserAction())
  // },[dispatch])
  const profilePage = props.profilePage;
  // console.log(user);
  return (
    <div className="ProfileCard">
      <div className="ProfileImage">
        <img src={cover} alt="" />
        <img src={user ? (user.avatar.url) : ""} alt="" />
      </div>
      <div className="ProfileName">
        <span>{user ? (user.name) : ""}</span>
        <span>Manchester United</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>1,1tr</span>
            <span>Followings</span>
          </div>
          <div className="bs"></div>
          <div className="follow">
            <span>1</span>
            <span>Followers</span>
          </div>

          {profilePage && (
            <>
              <div className="bs"></div>
              <div className="follow">
                <span>4</span>
                <span>Post</span>
              </div>
            </>
          )}

        </div>
        <hr />
      </div>
      
      {profilePage ? "" : <span><Link to="/profile">My Profile</Link></span>}
    </div>
  )
}

export default ProfileCard