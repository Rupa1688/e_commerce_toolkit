const express = require("express")
const multer = require("multer")
const productRouter = express.Router()
const auth = require("../middleware/auth")
const storageEngine = multer.diskStorage({
  destination: "../e_commerce/public/images",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const storageProduct = multer.diskStorage({
  destination: "../e_commerce/public/products",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({
  storage: storageEngine,
})
const upload1 = multer({
  storage: storageProduct,
})
const productController = require("../controllers/productController.js")
productRouter.post(
  "/addCategory",
  upload.single("image"),
  productController.addCategory
)
productRouter.get(
  "/category/:id",
  upload.single("image"),
  productController.getCategory
)
productRouter.get(
  "/parrent_category",
  upload.single("image"),
  productController.getParentCategory
)
productRouter.post(
  "/addProductCategory",
  upload1.single("product_image"),
  productController.addProductCategory
)
productRouter.get(
  "/getAllProductCategory",
  upload1.single("product_image"),
  productController.getAllProductCategory
)
productRouter.get(
  "/getProductCategory/:id",
  upload1.single("product_image"),
  productController.getProductCategory
)
productRouter.get(
  "/getAllProduct/",
  upload1.single("product_image"),
  productController.getAllProduct
)

module.exports = productRouter
