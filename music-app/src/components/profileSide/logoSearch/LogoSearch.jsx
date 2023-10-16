import React from 'react'
import './LogoSearch.css'
import Logo from '../../../images/music-logo.png'
import SearchIcon from '@mui/icons-material/Search';

const LogoSearch = () => {
  return (
    <div className="LogoSearch">
        <img src={Logo} alt="" />
        <div className="search">
            <input type="text" placeholder='#Explore' />
            <div className="s-icon">
              <SearchIcon />
            </div>
        </div>
    </div>
  )
}

export default LogoSearch