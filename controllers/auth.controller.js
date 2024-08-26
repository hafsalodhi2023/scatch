const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.util");
const debug = require("debug");

const debugging = debug("development:controller:auth");

module.exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      req.flash("error", "You already have an account, please login!");
      return res.status(401).redirect("/");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
      fullname,
      email,
      password: hash,
    });

    req.flash("success", "User created successfully!");
    return res.status(201).redirect("/");
  } catch (error) {
    if (error.errors.email.properties.path === "email") {
      debugging("Error in auth controller:", error); // Updated logging
      req.flash(
        "error",
        `${error.errors.email.properties.value} is not a valid email!`
      );
      return res.status(500).redirect("/");
    }
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) {
    req.flash("error", "Email or password is incorrect!");
    return res.status(401).redirect("/");
  }

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(email);
      res.cookie("token", token);

      req.flash("success", "You have logged in successfully!");
      return res.status(200).redirect("/shop");
    } else {
      req.flash("error", "Email or password is incorrect!");
      return res.status(401).redirect("/");
    }
  });
};

module.exports.logout = async (req, res) => {
  req.flash("error", "You have logged out successfully!");
  res.cookie("token", "");
  return res.redirect("/");
};
