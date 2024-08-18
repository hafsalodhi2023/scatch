const mongoose = require("mongoose");
const debug = require("debug");

const debugging = debug("development:config:mongodb-connection");
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    debugging("MongoDB Connected");
  } catch (err) {
    debugging(err.message);
  }
};

module.exports = { connectDB };
