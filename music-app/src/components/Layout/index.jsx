import React from 'react'
import ProfileSide from '../profileSide/ProfileSide'
import RightSide from '../rightSide/RightSide'

function DefaultLayout(props) {
  return (
    <>
        <ProfileSide />
        {props.children}
        <RightSide />
    </>
  )
}

export default DefaultLayout