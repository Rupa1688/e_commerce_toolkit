const express = require("express")
const discountsRouter = express.Router()
const auth = require("../middleware/auth")
const multer = require("multer")
const discountController = require("../controllers/discountController.js")
discountsRouter.post("/addPromocode", discountController.addPromocode)
discountsRouter.get("/getAllPromocode", discountController.getAllPromocode)
discountsRouter.post("/assignPromocode", discountController.assignPromocode)
discountsRouter.post("/applyPromocode", discountController.applyPromocode)

module.exports = discountsRouter
