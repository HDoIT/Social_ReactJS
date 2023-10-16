const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title:{
        type: String,
    },
    image:[
        {
          public_id: {
            type: String,
          },
          url: {
            type: String,
          },
        },
      ],
    likeCount:{
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User"
        }
      }
    ],
    reviews: [
     {
       user: {
         type: mongoose.Schema.ObjectId,
         ref: "User",
         required: true,
       },
       name: {
         type: String,
         required: true,
       },
       comment: {
         type: String,
         required: true,
       },
       createAt: {
         type: Date,
         default: Date.now(),
       },
     },
    ],
},
{ timestamps: true }
)

module.exports = mongoose.model("Post",postSchema)