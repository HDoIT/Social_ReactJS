const catchAsyncError = require("../middleware/catchAsyncError");
const Post = require("../models/postModel")
const cloudinary = require("cloudinary");
const ErrorHandle = require("../utils/errorHandle")
exports.createPost = catchAsyncError(async(req,res,next)=>{
    const image = req.body.image
    console.log(image);
    var buffer = Buffer.from(image); // tạo một buffer từ blob
    var arrayBuffer = Uint8Array.from (buffer); // tạo một mảng byte buffer từ buffer
// console.log(req.body,user);
console.log(arrayBuffer);

    const myCloud = await cloudinary.v2.uploader.upload_large(arrayBuffer, {
        folder: "postSocial",
        chunk_size: 6000000
        // width: 150,
        // crop: "scale",
      });
    const {title,user} = req.body
    // console.log("title",req.body);
    const newPost = await Post.create({
        title,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
        user,
    })

    res.status(201).json({
        success: true,
        newPost
    })
})

exports.getPost = catchAsyncError(async(req,res,next)=>{
    const post = await Post.find().populate("user")

    // const listLike = post.listLike
    // console.log("2",listLike);
    res.status(200).json({
        success: true,
        post
    })
})

exports.likePost = catchAsyncError(async(req,res,next)=>{
    const {postID} = req.body

    // console.log("a",postID);
    let post = await Post.find({_id: postID, likes: req.user._id})
    
    console.log(req.user._id);
    if(!post){
        return next(new ErrorHandle("Không tìm thấy bài viết!",400))
    }

    console.log(post.length);
    if(post.length>0){
        return next(new ErrorHandle("Bạn đã like",400))
    }

    await Post.findOneAndUpdate({_id: postID},{
        $push: {likes: req.user._id}
    },{new: true})


    // let likeCount = post.likeCount;
    // const listLike = post.likes;
    // console.log('BODY Like',JSON.stringify(req.user._id));
    // console.log(likeCount);


    // if(listLike.filter((us)=> us._id == req.user._id).length == 0){
    //     post.likeCount++
    //     listLike.push(req.user._id)
    //     post = await post.save();
    // }else{ 
    //     post.likeCount--;
    //     let indexUserLike = listLike.findIndex((p)=>p._id == req.user._id)
    //     // listLike.pop();
    //     listLike.splice(indexUserLike,1)
    //     post = await post.save();
    // }
    
    // console.log("list",[].length == 0);
    // console.log("list2",post);
    res.status(201).json({
        success: true,
        post
    })
})