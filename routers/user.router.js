// Importing all the required modules
const express = require("express");
const Router = express.Router();

// Created a GET request
Router.get("/", (req, res) => {
  res.send("Hello Users!");
});

// Exporting the Router
module.exports = Router;
