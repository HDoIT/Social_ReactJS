const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel")
const ErrorHander = require("../utils/errorHandle")
const sendToken = require("../utils/jwt")
const cloudinary = require("cloudinary");
exports.loginUser = async (req,res,next) =>{

    const {email,password} = req.body

    if(!email || !password){
        return next(new ErrorHander("Nhập Email và mật khẩu",400))
    }
    
    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHander("Email hoặc mật khẩu không đúng",401))
    }

    // console.log(user);
    const isMatchedPassword = await user.comparePassword(password)

    // console.log(isMatchedPassword,password);
    if(!isMatchedPassword){
        return next(new ErrorHander("Mật khẩu không đúng",401))
    }

    sendToken(user,201,res)

}

exports.loadUser = async(req,res,next)=>{

    // console.log("req",req);
    const user = await User.findById(req.user._id)

    // console.log(user);
    res.status(200).json({
        success: true,
        user
    })
}

exports.logOut = async(req,res,next)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now())
    })

    res.status(200).json({
        success: true,
        message: "Bạn đã đăng xuất!"
    })
}

exports.register = catchAsyncError(async(req,res,next)=>{
    console.log("body:",req.body.avartar);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avartar, {
        folder: "avatarsSocial",
        width: 150,
        crop: "scale",
      });

    console.log("myCloud",myCloud);
        // console.log("Đăng ký");
    const {name,email,password} = req.body

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },
    })

    sendToken(user, 201, res);
})

exports.getAllUser = catchAsyncError(async(req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})