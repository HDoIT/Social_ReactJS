import React, { useEffect } from 'react'
import './App.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import store from './store';
import { loadUserAction } from './actions/userAction';
import { useSelector } from 'react-redux';
import Chat from './pages/chat/Chat';

export default function App() {
  

  const {isAuthenticated} = useSelector(state=>state.user)

  // console.log("is", isAuthenticated);
  useEffect(()=>{
    store.dispatch(loadUserAction())
  },[])

  return (
    <div className="App">
      <div className='blur' style={{top: '-18%', right: '0'}}></div>
      <div className='blur' style={{top: '36%', left: '-8rem'}}></div>
 
      <BrowserRouter>
        <Routes>
            <Route path="/" exact element={isAuthenticated ? <Home /> : <Login />} />
            <Route path="/profile" element={isAuthenticated ? <Profile /> : <Login />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/chat" element={isAuthenticated ? <Chat /> :<Login />} />
            {/* <Route component={NotFound}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

