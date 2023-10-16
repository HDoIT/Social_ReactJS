import React, { useEffect, useState } from 'react';
import logo from '../../images/music-logo.png';
import './Login.css';
import Snackbar from '@mui/material/Snackbar';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserAction, loginAction, registerAction } from '../../actions/userAction';
import { useNavigate } from 'react-router-dom';
import MuiAlert from "@mui/material/Alert";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Login = () => {

  const [open,setOpen] = useState(false);
  const [openSigup,setOpenSignup] = useState(true)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [emailRegister,setEmailRegister] = useState("")
  const [passwordRegister,setPasswordRegister] = useState("")
  const [firstname,setFirstName] = useState("")
  const [lastname,setLastName] = useState("")

  const [avatarPreview,setAvatarReview] = useState();
  const [avatar,setAvatar] = useState();
  const {error,user,isAuthenticated} = useSelector(state=>state.user)

//   console.log("user",user,isAuthenticated);
  const dispatch = useDispatch()
  const history = useNavigate()

  const handleClose = () =>{
    setOpen(false);
  }


  useEffect(()=>{
    if(isAuthenticated){
        // console.log("user",user);
        // dispatch(loadUserAction())
        history("/")
    }
    if(error){
      setOpen(true)
    }
  },[dispatch,isAuthenticated,history,error])

  const onLoginHandel = () =>{
    setOpenSignup(!openSigup);
  }

  const handleLoginSubmit = (e)=>{
    e.preventDefault()
    dispatch(loginAction(email,password))
  }

  const handelRegisterSubmit = (e)=>{
    e.preventDefault()

    const formData = new FormData();

    const name = `${firstname} ${lastname}`
    formData.set("name",name)
    formData.set("email",emailRegister)
    formData.set("password",passwordRegister)
    formData.set("avartar",avatar)

    // console.log(formData);
    // console.log(name,email);
    dispatch(registerAction(formData))
  }

//   useEffect(()=>{

//   },[avatarPreview])

  const handelPreviewAvatar = (e)=>{
    const file = e.target.files[0]

    file.preview = URL.createObjectURL(file)

    setAvatarReview(file)
    setAvatar(file.preview)
    console.log("avatar",file.preview);
  }

  const registerDataChange = (e) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarReview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    
  };
//   console.log(avatarPreview);
  return (
    <div className="Login">
        <div className="logo">
            <img src={logo} />
            <div>
            <h1>LHD media</h1>
            <p>Discover, stream, and share a constantly <br /> expanding mix of music from emerging and <br/> major artists around the world.</p>
            </div>
        </div>
        {
            openSigup ? (
                <div className="formLogin login" onSubmit={handleLoginSubmit}>
                    <form>
                        <h2>Login</h2>
                        <input type="email" placeholder='Email...' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" placeholder='Password...' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <div>
                            <a href='#' onClick={onLoginHandel}>Don't have an account Login</a>
                            <input type="submit" className='btn' value='Login' />
                        </div>
                    </form>
                </div>
            ) : (
                <div className="formLogin">
                    <form method="POST"
                        encType="multipart/form-data"
                        onSubmit={handelRegisterSubmit}>
                        <h2>Sign Up</h2>
                        <div>
                            <input type="text" placeholder='First Name' value={firstname} onChange={(e)=>setFirstName(e.target.value)}/>
                            <input type="text" placeholder='Last Name' value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
                        </div>
                        <input type="text" placeholder='Email' value={emailRegister} onChange={(e)=>setEmailRegister(e.target.value)}/>
                        <div>
                            <input type="text" placeholder='Password' value={passwordRegister} onChange={(e)=>setPasswordRegister(e.target.value)}/>
                            <input type="text" placeholder='Confirm Password' />
                        </div>
                        <div>
                            <label htmlFor="register-avatar">Ảnh đại diện</label>
                            <input type="file" name="" id="register-avatar" onChange={registerDataChange}/>
                            {
                                avatarPreview && (<img
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    width="80%"
                                  />)
                            }
                        </div>
                        <div>
                            <a href='#' onClick={onLoginHandel}>Already have an account Login</a>
                            <input type="submit" className='btn' value='Sign Up' />
                        </div>
                    </form>
                </div>
             )
        }
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="warning"
              sx={{ width: "100%", fontSize: "0.85em" }}
            >
              {error}
            </Alert>
          </Snackbar>
    </div>
  )
}

export default Login