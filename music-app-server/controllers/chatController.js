const catchAsyncError = require("../middleware/catchAsyncError")
const Chat = require("../models/chatModel")

exports.createChat = catchAsyncError(async(req,res,next)=>{
    // console.log(req.body);
    const newChat = await Chat({
        members: [req.body.senderId,req.body.receiverId]
    });

    const chat = await newChat.save()

    res.status(200).json({
        chat
    })
})

exports.userChats = catchAsyncError(async(req,res,next)=>{
    const chat = await Chat.find({
        members: {$in: [req.params.userId]}
    })

    res.status(200).json(
        chat
    )
})