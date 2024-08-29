// Importing all the required modules
const express = require("express");
const Router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product.model");

// Created a GET request
Router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    const product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "Product created successfully!");
    res.status(201).redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
    res.status(201).redirect("/owner/admin");
  }
});

// Exporting the Router
module.exports = Router;
