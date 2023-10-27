const mongoose = require("mongoose")

const category = new mongoose.Schema({
  name: { type: String, default: null },
  image: { type: String, default: null },
  parent_id: {
    type: mongoose.Schema.Types.Mixed,
    ref: "category",
    default: null,
  },
})

module.exports = mongoose.model("category", category)
