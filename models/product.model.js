// Imported All Required Modules
const mongoose = require("mongoose");
const debug = require("debug");

const debugging = debug("development:models:product"); // Debugging

// Product Schema
const productSchema = mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
    default: 0,
  },
  bgcolor: {
    type: String,
    required: true,
  },
  panelcolor: {
    type: String,
    required: true,
  },
  textcolor: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("product", productSchema);
