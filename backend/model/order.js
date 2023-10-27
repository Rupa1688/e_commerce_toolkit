const mongoose = require("mongoose")

const order = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, default: null },
    customerId: { type: String, default: null },
    tranjection_id: { type: String, default: null },
    paymentIntent: { type: String, default: null },
    products: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId },
        name: { type: String, default: null },
        color: { type: String, default: null },
        product_id: { type: mongoose.Schema.Types.ObjectId, default: null },
        image: { type: String, default: null },
        desc: { type: String, default: null },
        price: { type: Number, default: null },
        productSize: { type: mongoose.Schema.Types.ObjectId, default: null },
        quantity: { type: Number, default: null },
      },
    ],
    amountSubTotal: { type: Number, required: true },
    amountTotal: { type: Number, required: true },
    shipping: { type: Object, default: null },
    currency: { type: String, default: null },
    payment_method: { type: Array, default: null },
    payment_status: { type: String, default: null },
    delivery_ststus: { type: String, default: "pending" },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("order", order)
