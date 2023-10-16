const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorHandle");
const catchAsyncError = require("./catchAsyncError");
exports.isAuthenticated = catchAsyncError(async (req,res,next)=>{
    const token = req.header("Authorization").split(" ")[1];
    // console.log(token === null);
    if(token === "null"){
        return next(new ErrorHander("Bạn cần đăng nhập",401));
    }
    if(!token){
        return next(new ErrorHander("Bạn cần đăng nhập",401));
    }

    const DecodeToken = jwt.verify(token,process.env.JWT_SECRET)
    req.user = await User.findById(DecodeToken._id)
    next();
}) 