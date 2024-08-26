// Importing all the required modules
const express = require("express");
const Router = express.Router();
const isloggedin = require("../middlewares/isloggedin.middleware");

// Created a GET request
Router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success });
});

Router.get("/shop", isloggedin, (req, res) => {
  let success = req.flash("success");
  res.render("shop", { success });
});

// Exporting the Router
module.exports = Router;
