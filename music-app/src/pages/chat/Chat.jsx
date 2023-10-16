import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUser } from '../../actions/userAction';
import socketIOClient from "socket.io-client"
const host = "http://localhost:4005"

function Chat() {

  const {users} = useSelector(state=>state.users)
  const [message,setMessage] = useState("")
  const {user,isAuthenticated} = useSelector(state=>state.user)
  const [currentUser,setCurrentUser] = useState(null)
  const [onlineUsers,setOnlineUsers] = useState([])
  const [sendMessage,setSendMessage] = useState(null)
  const [receivedMessage,setReceivedMessage] = useState(null)
  const socketRef = useRef();

  const dispatch = useDispatch();


  useEffect(()=>{
    if(users && isAuthenticated){
        dispatch(getAllUser())
    }
  },[dispatch])

  useEffect(()=>{
    socketRef.current = socketIOClient.connect(host)

    setCurrentUser(user._id)
    socketRef.current.emit("new-user-add",user._id)

    socketRef.current.on("get-users",(us)=>{
      setOnlineUsers(us)
    })
    // socketRef.current.on('getId',data => {
    //   setId(data)
    // })

    // socketRef.current.on("sendDataServer",dataGot =>{
    //   setMess(oldMss=>[...oldMss,dataGot.data])
    //   scrollToBottom()
    // })

    return ()=>{
      socketRef.current.disconnect()
    }
  },[])

  useEffect(()=>{
    if(sendMessage!==null){
      socketRef.current.emit("send-message",sendMessage)
    }
  },[sendMessage])

  const handelChangeUser = (mess) =>{
    setSendMessage(mess)
  }

  // console.log("online",onlineUsers);
  const handleSendMessage = () =>{

  }

  // console.log("cr",currentUser,user._id);

  return (
    <div className="main-chat">
        <div className="chat-container">
            <div className="chat-user">

                {
                    users ? users.filter(us=>us._id!==user._id).map((user,index)=>
                        (
                              <div className="user" key={index} onClick={()=>handelChangeUser(user._id)}>
                                <div className="avatar-user">
                                  <img src={user.avatar.url} alt="" />
                                  {onlineUsers.some(us=>user._id===us.userId) ? (<div className="activeUser"></div>) : (<div className="noneActiveUser"></div>)}
                                </div>
                                {user.name} 
                            </div>
                        )
                    ) : ""
                }

            </div>
            <div className="chat-box">
                {sendMessage && `${sendMessage}`}
                <div className="send-box">
                  <textarea
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    placeholder='Nhập tin nhắn...'></textarea>
                  <button>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Chat