// Importing all the required modules
const express = require("express");
const Router = express.Router();
const { register, login, logout } = require("../controllers/auth.controller");

// Created a GET request
Router.get("/", (req, res) => {
  res.send("Hello Users!");
});

Router.post("/register", register);
Router.post("/login", login);
Router.get("/logout", logout);

// Exporting the Router
module.exports = Router;
