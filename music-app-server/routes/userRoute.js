const express = require("express")
const { loginUser, loadUser, logOut, register, getAllUser } = require("../controllers/userController")
const { isAuthenticated } = require("../middleware/auth")
const router = express.Router()

router.route("/login").post(loginUser)
router.route("/logout").get(logOut)
router.route("/users").get(getAllUser)
router.route("/me").get(isAuthenticated,loadUser)
router.route("/register").post(register)

module.exports = router