const mongoose = require("mongoose")

const assignPromocode = new mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, default: null, ref: "user" },
  promocode: { type: String, default: null },
  promocodeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "promoCodeData",
  },
  status: { type: Boolean, default: true },
})

module.exports = mongoose.model("assignPromocode", assignPromocode)
