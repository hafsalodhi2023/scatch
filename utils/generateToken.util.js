const jwt = require("jsonwebtoken");

module.exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};
