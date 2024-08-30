const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

module.exports.verifyJWT = (token) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET,
    function (err, decoded) {
      if (!err) {
        return decoded;
      } else {
        return err;
      }
    }
  );
  return decoded;
};
