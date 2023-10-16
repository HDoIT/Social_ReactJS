const express = require("express")
const { userChats, createChat } = require("../controllers/chatController")

const router = express.Router()

router.route("/chat").post(createChat)
router.route("/chat/:userId").get(userChats)

module.exports = router

