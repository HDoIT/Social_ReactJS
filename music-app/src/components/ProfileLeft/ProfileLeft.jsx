import React from 'react';
import LogoSearch from '../profileSide/logoSearch/LogoSearch';
import EditIcon from '@mui/icons-material/Edit';
import './ProfileLeft.css';
import FollowCard from '../profileSide/followersCard/FollowCard';
import useModal from '../../ultils/useModal';
import ProfileModal from '../ProfileModal/ProfileModal';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logOut } from '../../actions/userAction';

const ProfileLeft = () => {

  const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
};      
// const {isShowing, toggle} = useModal();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch()
  const history = useNavigate()
  const onLogout = () =>{
    dispatch(logOut())
    history("/login")
  }
  return (
    <div className='ProfileLeft'>
        <LogoSearch />

        <div className="YourInfo">

            <div className="title">
                <h4>your info</h4>
                <span onClick={handleOpen}>
                <EditIcon />
                </span>
            </div>

            <div className="info">
                <p><span>status</span> in relationship</p>
                <p><span>lives</span> in ha noi</p>
                <p><span>works</span> at ...</p>
            </div>

            <div className="end">
                <Link className='btn' to="/login" onClick={onLogout}>Log Out</Link>
            </div>

        </div>

        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your info
            <CloseIcon className="close" onClick={handleClose}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form>
                <div>
                    <input type="text" placeholder='First Name' />
                    <input type="text" placeholder='Last Name' />
                </div>
                <input type="text" placeholder='Works at' />
                <div>
                    <input type="text" placeholder='Lives in' />
                    <input type="text" placeholder='Country' />
                </div>
                <input type="text" placeholder='Relationship status' />
                <input type="submit" className='btn' value="Update" />
            </form>
          </Typography>
        </Box>
        </Modal>

        {/* <ProfileModal /> */}

        <FollowCard />
    </div>
  )
}

export default ProfileLeft