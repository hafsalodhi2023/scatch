// Imported all the required modules
const express = require("express");
const Router = express.Router();
const dotenv = require("dotenv");
const ownerModel = require("../models/owner.model");

// Loading Environment Variables
dotenv.config();

// Created a GET request
Router.get("/admin", (req, res) => {
  let success = req.flash("success");
  let error = req.flash("error");
  res.render("createproducts", { success, error });
});

if (process.env.NODE_ENV === "development") {
  Router.post("/create", async (req, res) => {
    const owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .status(504)
        .send("You don't have permission to create a new owner.");
    }
    const { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    return res.status(201).send(createdOwner);
  });
}

// Exporting the Router
module.exports = Router;
