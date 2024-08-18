// Imported All Required Modules
const mongoose = require("mongoose");
const debug = require("debug");

const debugging = debug("development:models:user"); // Debugging

// User Schema
const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    default: [],
  },
  isadmin: {
    type: Boolean,
    default: false,
  },
  orders: {
    type: Array,
    default: [],
  },
  contact: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    default: "default.png",
  },
});

module.exports = mongoose.model("user", userSchema);
