// Imported All Required Modules
const mongoose = require("mongoose");
const debug = require("debug");

const debugging = debug("development:models:owner"); // Debugging

// Owner Schema
const ownerSchema = mongoose.Schema({
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
  products: {
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
  gstin: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("owner", ownerSchema);
