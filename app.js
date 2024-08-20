// Imported Required Modules
const express = require("express");
const debug = require("debug");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const { connectDB } = require("./config/mongodb-connection.config");

dotenv.config(); // Loading Environment Variables
connectDB(); // Connecting to MongoDB

const app = express(); // Initializing Express App
const debugging = debug("development:app"); // Debugging

const ownerRouter = require("./routers/owner.router"); // Importing Owner Router
const userRouter = require("./routers/user.router"); // Importing User Router
const productRouter = require("./routers/product.router"); //Importing Product Router

app.use(express.json()); // Parsing JSON Data
app.use(express.urlencoded({ extended: true })); // Parsing URL-Encoded Data
app.use(cors()); // Enabling Cross-Origin Resource Sharing
app.use(express.static(path.join(__dirname, "public"))); // Serving Static Files
app.set("view engine", "ejs"); // Setting View Engine
app.use(cookieParser()); // Parsing Cookies

app.use("/owner", ownerRouter); // Mounting Owner Router
app.use("/user", userRouter); // Mounting User Router
app.use("/product", productRouter); // Mounting Product Router

// Home Route
app.get("/", (req, res) => {
  res.render("index");
});

// Starting Server
app.listen(process.env.PORT, () => {
  debugging(`Server is running on port ${process.env.PORT}`);
});
