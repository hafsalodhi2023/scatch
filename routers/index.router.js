// Importing all the required modules
const express = require("express");
const Router = express.Router();
const isloggedin = require("../middlewares/isloggedin.middleware");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");

Router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  let loggedIn = req.cookies.token ? true : false;
  res.render("index", { error, success, loggedIn });
});

Router.get("/shop", isloggedin, async (req, res) => {
  let success = req.flash("success");
  let products = await productModel.find();
  res.render("shop", { success, products });
});

Router.get("/addtocart/:productId", isloggedin, async (req, res) => {
  let user = await userModel.findOne({ user: req.user });
  user.cart.push(req.params.productId);
  await user.save();

  req.flash("success", "Product added to cart successfully!");
  res.redirect("/shop");
});

Router.get("/cart", isloggedin, async (req, res) => {
  res.render("cart");
});

// Exporting the Router
module.exports = Router;
