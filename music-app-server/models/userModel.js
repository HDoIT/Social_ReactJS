const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const userSchema = mongoose.Schema({
    name: {
        type: String,

    },
    email:{
        type: String,
        require: [true,"Hãy nhập email"],
        unique: true,
        validate: [validator.isEmail,"Làm ơn nhập đúng định dạng email"]
    },
    password:{
        type: String,
        select: false
    },
    avatar: {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
          default:
            "https://res.cloudinary.com/phuockaito/image/upload/v1617902959/user/1_gxwhfk.jpg",
        },
    },
})

//Middleware trong mongoose
// +Pre middleware function
// +Post middleware
//pre-save hook
userSchema.pre("save", async function (next){
    if(!this.isModified("password")){
        next()
    }

    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.getJWToken = function(){
    return jwt.sign({_id: this.id},process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    })
}

userSchema.methods.comparePassword = async function (password){
    return await bcrypt.compare(password,this.password)
}



module.exports = mongoose.model("User",userSchema)