require("dotenv").config()
require("./config/database")
const express = require("express")
const multer = require("multer")
var cors = require("cors")
const app = express()
const http = require("http")
app.use(cors())
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const userRouter = require("./router/userRouter")
const productRouter = require("./router/productRouter")
const variantRouter = require("./router/variantRouter")
const attrRouter = require("./router/attributeRouter")
const checkoutRouter = require("./router/checkoutRouter")
const discountRouter = require("./router/discountRouter")
// app.use(express.json())
app.use(
  express.json({
    // limit: "5mb",
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)
app.use(express.urlencoded({ extended: true }))

app.use("/user", userRouter)
app.use("/product", productRouter)
app.use("/product/variant", variantRouter)
app.use("/product", attrRouter)
app.use("/api", checkoutRouter)
app.use("/api", discountRouter)
const server = http.createServer(app)
const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

// server listening
server.listen(port, () => {
  console.log(`Server running on port ${port}`)
})

module.exports = app
