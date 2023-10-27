const mongoose = require("mongoose")

const tranjection = new mongoose.Schema({
  tranjection_id: { type: String, unique: true },
  amount: { type: Number, default: null },
  currency: { type: String, default: null },
  created_at: { type: Date, default: null },
  country: { type: String, default: null },
  shipping_amount: { type: Number, default: null },
  name: { type: String, default: null },
  email: { type: String, default: null },
  phoneno: { type: String, default: null },
  payment_method_types: { type: Array, default: null },
  payment_status: { type: String, default: null },
  status: { type: String, default: null },
})

module.exports = mongoose.model("tranjection", tranjection)
