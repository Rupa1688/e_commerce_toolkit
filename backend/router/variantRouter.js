const express = require("express")
const variantRouter = express.Router()
const auth = require("../middleware/auth")
const multer = require("multer")

const storageEngine = multer.diskStorage({
  destination: "../e_commerce/public/variant",
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})
const upload = multer({
  storage: storageEngine,
})

const variantController = require("../controllers/variantController.js")
variantRouter.post(
  "/addVariant",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "variant_image" }]),
  variantController.addVariant
)
variantRouter.get(
  "/getVariant/:id",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "variant_image" }]),
  variantController.getVariant
)
variantRouter.get(
  "/getVariant",
  upload.fields([{ name: "image", maxCount: 1 }, { name: "variant_image" }]),
  variantController.VariantOfProduct
)

module.exports = variantRouter
