import React, { useEffect } from 'react'
import './FollowCard.css'

import {Followers} from '../../../Data/FollowerData'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../../actions/userAction'

const FollowCard = () => {

  const {users} = useSelector(state=>state.users)
  const {user} = useSelector(state=>state.user)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllUser())
  },[dispatch])

  return (
    <div className="follow-card">
        <h3>who is following you</h3>

        {
            users && users.filter(us=>us._id !== user._id).map((follower)=>{
                return(
                    <div className='follower' key={follower._id}>
                        <div>
                            <img src={follower.avatar.url} alt="" />
                            <div className="name">
                                <p>{follower.name}</p>
                                <p>{follower.email}</p>
                            </div>
                        </div>
                        <div className="btn fl-btn">follow</div>
                    </div>
                )
            })
        }

        <span>More...</span>
    </div>
  )
}

export default FollowCard