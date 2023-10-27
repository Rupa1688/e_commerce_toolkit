const express = require("express")
const attrRouter = express.Router()
const auth = require("../middleware/auth")
const attrController = require("../controllers/attrController.js")
attrRouter.post("/addAttribute", attrController.addAttribute)
// attrRouter.post("/login", attrController.signIn)
attrRouter.get("/getAttribute/:product_id", attrController.getAttribute)
module.exports = attrRouter
