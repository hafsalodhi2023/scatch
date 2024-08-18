// Imported Required Modules
const express = require("express");
const debug = require("debug");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const { connectDB } = require("./config/mongodb-connection.config");

dotenv.config(); // Configuring Environment Variables
connectDB(); // Connecting to MongoDB

const app = express(); // Initializing Express App
const debugging = debug("development:app"); // Debugging

app.use(express.json()); // Parsing JSON Data
app.use(express.urlencoded({ extended: true })); // Parsing URL-Encoded Data
app.use(cors()); // Enabling Cross-Origin Resource Sharing
app.use(express.static(path.join(__dirname, "public"))); // Serving Static Files
app.set("view engine", "ejs"); // Setting View Engine
app.use(cookieParser()); // Parsing Cookies

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Starting Server
app.listen(process.env.PORT, () => {
  debugging(`Server is running on port ${process.env.PORT}`);
});
