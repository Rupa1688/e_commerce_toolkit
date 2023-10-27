const mongoose = require("mongoose")

const attribute = new mongoose.Schema({
  size: { type: String, default: null },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productCategory",
    default: null,
  },
})

module.exports = mongoose.model("attribute", attribute)
