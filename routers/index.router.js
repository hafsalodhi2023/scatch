// Importing all the required modules
const express = require("express");
const Router = express.Router();

// Created a GET request
Router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error });
});

// Exporting the Router
module.exports = Router;
