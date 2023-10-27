const mongoose = require("mongoose")

const promoCodeData = new mongoose.Schema({
  title: { type: String, default: null },
  promocode: { type: String, default: null },
  discount: { type: Number, default: null },
  expiryDate: { type: Date, default: null },
})

module.exports = mongoose.model("promoCodeData", promoCodeData)
