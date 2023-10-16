import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import './RightSide.css';
import TrendCard from '../trendCard/TrendCard';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PostShare from '../postSide/postShare/PostShare';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { getAllUser } from '../../actions/userAction';

const RightSide = () => {

  const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -10%)',
    width: '60%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()

  const openChat = ()=>{
    dispatch(getAllUser());
  }

  return (
    <div className='RightSide'>

         <div className='navIcon'>
             <Link to="/"><HomeIcon fontSize="large"/></Link>
             <SettingsIcon fontSize="large"/>
             <NotificationsIcon fontSize="large"/>
             <Link to="/chat" onClick={openChat}><MessageIcon fontSize="large"/></Link>
         </div>

         <TrendCard />
         
         <button className='btn' onClick={handleOpen}>
            Share
         </button>

         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <CloseIcon className="close" onClick={handleClose}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <PostShare />
          </Typography>
        </Box>
        </Modal>

         {/* <ShareModal /> */}

     </div>
  )
}

export default RightSide
