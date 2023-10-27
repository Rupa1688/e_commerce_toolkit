const mongoose = require("mongoose")

const variantProduct = new mongoose.Schema({
  name: { type: String, default: null },
  color: { type: String, default: null },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productCategory",
  },
  image: { type: String, default: null },
  variant_image: { type: Array, default: null },
  desc: { type: String, default: null },
  price: { type: Number, default: null },
})

module.exports = mongoose.model("variantProduct", variantProduct)
