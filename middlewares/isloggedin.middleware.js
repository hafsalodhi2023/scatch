const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first.");
    return res.redirect("/");
  }

  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");
    req.user = user;
    next();
  } catch (error) {
    req.flash("error", "something went wrong and you need to login again.");
  }
};
