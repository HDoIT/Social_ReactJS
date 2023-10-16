const express = require("express")
const { createPost, getPost, likePost } = require("../controllers/postController")
const { isAuthenticated } = require("../middleware/auth")

const route = express.Router()

route.route("/newpost").post(createPost)
route.route("/likepost").post(isAuthenticated,likePost)
route.route("/post").get(getPost)

module.exports = route  