const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const userController = require("../controllers/userController.js")
router.post("/addUser", userController.signUp)
router.post("/login", userController.signIn)
router.get("/getAllUser", auth, userController.getAllUser)
module.exports = router
