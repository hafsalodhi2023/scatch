// Importing all the required modules
const express = require("express");
const Router = express.Router();
const isloggedin = require("../middlewares/isloggedin.middleware");
const productModel = require("../models/product.model");
const userModel = require("../models/user.model");
const { verifyJWT } = require("../utils/verifyJWT.util");

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
  const verifiedToken = verifyJWT(req.cookies.token);
  let user = await userModel.findById(verifiedToken.id);
  user.cart.push(req.params.productId);
  await user.save();

  res.redirect("/shop");
  req.flash("success", "Product added to cart successfully!");
});

Router.get("/cart", isloggedin, async (req, res) => {});

// Exporting the Router
module.exports = Router;
