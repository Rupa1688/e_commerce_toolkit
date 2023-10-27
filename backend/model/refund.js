const mongoose = require("mongoose")

const refund = new mongoose.Schema(
  {
    id: { type: String, default: null },
    object: { type: String, default: null },
    amount: { type: Number, default: null },
    balance_transaction: { type: String, default: null },
    created: { type: String, default: null },
    charge: { type: String, default: null },
    currency: { type: String, default: null },
    payment_intent: { type: String, default: null },
    reason: { type: String, default: null },
    receipt_number: { type: String, default: null },
    source_transfer_reversal: { type: String, default: null },
    status: { type: String, default: null },
    transfer_reversal: { type: String, default: null },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("refund", refund)
