import React, { useRef, useState } from 'react'
import './PostShare.css'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../../actions/postAction';

function PostShare(){

  const [image, setImage] = useState(null);
  const desc = useRef();
  const imageRef = useRef();
  
  const {user}=useSelector(state=>state.user)

  const onImageChange = (e) =>{

    // const reader = new FileReader();

    // reader.onload = () => {
    //   if (reader.readyState === 2) {
    //     setImage(reader.result);
    //   }
    // };

    // reader.readAsDataURL(e.target.files[0]);
    if(e.target.files && e.target.files[0]){
          let img = e.target.files[0];
          setImage({
                image: URL.createObjectURL(img),
            });
        }
  }
  const dispatch = useDispatch()

  const onShareHandle = (e) =>{

    e.preventDefault();

    const postData = new FormData()

    postData.set("title",desc.current.value);
    postData.set("image",image.image);
    postData.set("user",user._id);

    dispatch(addPost(postData))
    dispatch({type: "SHARE_POST_RESET"})

    desc.current.value = "";
    imageRef.current.value = "";
    setImage("")
  }
  
  return (
    <div className='post-share'>
        <img src={user ? (user.avatar.url) : ""} alt="" />
        <div>
            <input type="text" name='post' ref={desc} placeholder="What's happening?"/>
            <div className='post-option'>
                <div className='option' style={{color: "var(--photo)"}}
                onClick={()=>imageRef.current.click()}>
                    <PhotoLibraryIcon />
                    Photo
                </div>
                <div className='option' style={{color: "var(--video)"}}>
                    <VideoLibraryIcon />
                    Video
                </div>
                <div className='option' style={{color: "var(--location)"}}>
                    <LocationOnIcon />
                    Location
                </div>
                <div className='option' style={{color: "var(--shedule)"}}>
                    <CalendarMonthIcon />
                    Shedule
                </div>
                <div className="btn" onClick={onShareHandle}>share</div>
                <div style={{display: "none"}}>
                    <input 
                        type="file"
                        name='myImage'
                        ref = {imageRef}
                        onChange= {onImageChange} />
                        
                </div>
            </div>
            {image && (
                <div className="previewImage">
                    <CloseIcon onClick={()=>setImage(null)} />
                    <img src={image.image} alt="" />
                </div>
            )}
        </div>
    </div>
  )
}

export default PostShare