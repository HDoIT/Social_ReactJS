const catchAsyncError = require("../middleware/catchAsyncError");
const Messages = require("../models/messageModel")

exports.getMessages = catchAsyncError(async(req,res,next)=>{
    const {from,to}= req.body

    const messages = await Messages.find({
        users: {
            $all: [from,to]
        }
    }).sort({updatedAt: 1})

    const projectedMessages = messages.map((msg)=>{
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text
        }
    })

    res.status(200).json(projectedMessages)
})

exports.addMessages = catchAsyncError(async(req,res,next)=>{
    const {from,to,message} = req.body

    const data = await Messages.create({
        message:{text: message},
        users: [from,to],
        sender: from
    })

    res.status(201).json({
        data
    })
})