const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  phone_number: { type: Number, default: null },
  address: { type: String, default: null },
  role: { type: Number, default: 0 },
})

module.exports = mongoose.model("user", userSchema)
