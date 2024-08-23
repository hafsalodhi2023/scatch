const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken.util");

module.exports.register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user)
      return res.status(401).send("You already have an account, please login!");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(400).send(err.message);
        else {
          const user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          res.status(201).send("User Created Successfully!");
        }
      });
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(401).send("Email or password is incorrect!");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      return res.status(200).send("Login Successful!");
    } else {
      return res.status(401).send("Email or password is incorrect!");
    }
  });
};
