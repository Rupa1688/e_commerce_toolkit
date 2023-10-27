const mongoose = require("mongoose")

const productCategory = new mongoose.Schema({
  name: { type: String, default: null },
  image: { type: String, default: null },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  category_parent_id: {
    type: mongoose.Schema.Types.Mixed,
    ref: "category",
    default: null,
  },
  desc: { type: String, default: null },
  price: { type: Number, default: null },
})

module.exports = mongoose.model("productCategory", productCategory)
