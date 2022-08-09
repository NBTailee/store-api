const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "product's name must be provided"],
    trim: true,
    maxLength: [20, "name cannot be more than 20 chars"],
  },
  price: {
    type: Number,
    require: true,
    maxLength: 5,
  },
  rating: {
    type: Number,
    require: true,
    maxLength: 2,
    default: 4,
  },
  company: {
    type: String,
    require: true,
    maxLength: 20,
    trim: true,
    enum: {
      values: ["ikea", "liddy", "marcos", "caressa"],
      msg: "{VALUE} is not supported",
    },
  },
  feature: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
