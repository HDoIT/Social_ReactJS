const express = require("express")
const { getMessages, addMessages } = require("../controllers/messageController")

const router = express.Router()

router.route("/getmessage").post(getMessages)
router.route("/addmessage").post(addMessages)

module.exports = router

