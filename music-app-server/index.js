const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const connectDatabase = require("./config/database");
const path = require("path")
const app = express();
const cloudinary = require("cloudinary")
require("dotenv").config({path: "config/config.env"})
const fileUpload = require("express-fileupload");
app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({ limit: "50mb", extended: true }))
app.use(fileUpload())
app.use(bodyParser.urlencoded({ extended: true,limit: '50mb'}));
app.use(cors())

const middlewareError = require('./middleware/error');

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader("Access-Control-Allow-Origin", "*");
  
    // Request methods you wish to allow
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
  
    // Request headers you wish to allow
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader("Access-Control-Allow-Credentials", true);
  
    // Pass to next layer of middleware
    next();
  });

connectDatabase();

const user = require("./routes/userRoute");
const chat = require("./routes/chatRoute");
const message = require("./routes/messageRoute");
const post = require("./routes/postRoute")
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });
app.use("/api/v1",user)
app.use("/api/v1",chat)
app.use("/api/v1",post)
app.use("/api/v1",message)

const PORT = process.env.PORT || 4006

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../music-app/public/index.html"))
})

const server = app.listen(PORT,()=>{
    console.log(`Máy chủ đang chạy trên cổng http://localhost:${PORT}`);
})
// console.log("hello");


let activeUsers = []

const socketIo = require("socket.io")(server,{
  cors:{
    origin: "*",
  }
})

socketIo.on("connection",(socket)=>{
  console.log("New client connected " + socket.id);

  socket.on("new-user-add",(newUserId)=>{
    console.log(newUserId);
    if(!activeUsers.some((user)=>user.userId === newUserId)){
      activeUsers.push({
        userId: newUserId,
        socketId: socket.id
      })
    }

    socketIo.emit("get-users", activeUsers)
  })

  // socket.emit("getId",socket.id);

  // socket.on("sendDataClient",function(data){
  //   console.log(data);
  //   socketIo.emit("sendDataServer",{data});
  // })

  socket.on("disconnect", () => {
    // remove user from active users
    activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
    console.log("User Disconnected", activeUsers);
    // send all active users to all users
    socketIo.emit("get-users", activeUsers);
  });
  // socket.on("disconnect",()=>{
  //   console.log("Client Disconnect");
  // })

  socket.on("send-message",(data)=>{
    const {receiverId}= data
    const user = activeUsers.find(user=>user.userId===receiverId);

    console.log("receiverId",receiverId);
    console.log("data",data);

    if(user){
      socketIo.to(user.socketId).emit("receive-message",data);
    }
  })
})

app.use(middlewareError)
