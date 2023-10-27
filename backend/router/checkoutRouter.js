const express = require("express")
const checkoutRouter = express.Router()
const auth = require("../middleware/auth")
const checkoutController = require("../controllers/checkoutController.js")
checkoutRouter.post(
  "/create-checkout-session",
  checkoutController.createCheckoutSession
)
checkoutRouter.post(
  "/webhook",
  express.raw({ type: "*/*" }),
  checkoutController.webhook
)
checkoutRouter.post("/refund", checkoutController.refund)
checkoutRouter.get("/transactionDetail", checkoutController.transactionDetail)

// checkoutController.post("/login", attrController.signIn)
// checkoutController.get("/getAttribute/:product_id", attrController.getAttribute)
module.exports = checkoutRouter
