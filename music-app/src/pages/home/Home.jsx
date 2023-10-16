import React, { useEffect, useRef, useState } from 'react'
import PostSide from '../../components/postSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/rightSide/RightSide'
import './Home.css'
import socketIOClient from "socket.io-client"
import { useSelector } from 'react-redux'
const host = "http://localhost:4005"
const Home = () => {

  const {loading} = useSelector((state) => state.posts)
  const socketRef = useRef();
  const messagesEnd = useRef();
  // const ProfilePage = false;
  const [id,setId] = useState();
  const [onlineUsers,setOnlineUsers] = useState([])
  const [openChat,setOpenChat] = useState(false)
  const [mess, setMess] = useState([]);
  const [message, setMessage] = useState('');

  const {user}= useSelector(state=>state.user)

  useEffect(()=>{
    socketRef.current = socketIOClient.connect(host)


    socketRef.current.emit("new-user-add",user._id)

    socketRef.current.on("get-users",(users)=>{
      setOnlineUsers(users)
    })
    socketRef.current.on('getId',data => {
      setId(data)
    })

    socketRef.current.on("sendDataServer",dataGot =>{
      setMess(oldMss=>[...oldMss,dataGot.data])
      scrollToBottom()
    })

    return ()=>{
      socketRef.current.disconnect()
    }
  },[])



  const sendMessage = () => {
    if(message !== null) {
      const msg = {
        content: message, 
        id: id
      }
      socketRef.current.emit('sendDataClient', msg)
      setMessage('')
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }
  

  const renderMess =  mess.map((m, index) => 
        <div key={index} className={`${m.id === id ? 'your-message' : 'other-people'} chat-item`}>
          {m.content}
        </div>
      )

  const handleChange = (e) => {
    setMessage(e.target.value)
  }

  const onEnterPress = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false) {
      sendMessage()
    }
  }

  const handleChat = () =>{
    setOpenChat(!openChat)
  }
  return (
    <div className="Home">
        <ProfileSide />
        <PostSide />
        <RightSide />
        <div className="chat-screen">
        <i class="fab fa-facebook-messenger" onClick={handleChat}></i>
      {/* {
        openChat ? (
                <div>
                    <div class="box-chat_message">
                    {renderMess}
                    <div style={{ float:"left", clear: "both" }}
                            ref={messagesEnd}>
                        </div>
                    </div>

                    <div class="send-box">
                        <textarea 
                            value={message}  
                            onKeyDown={onEnterPress}
                            onChange={handleChange} 
                            placeholder="Nhập tin nhắn ..." 
                        />
                        <button onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
        ) : ""
      } */}
        </div>
    </div>
  )
}

export default Home