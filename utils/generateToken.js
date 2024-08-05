const jwt = require("jsonwebtoken");

const jwtToken = () => {
  let salt = "2334dssdg";
  return {
    generateToken(data) {
      const hash = jwt.sign(data, salt);
      return hash;
    },
    verifyToken(req, res, next) {
      const { token } = req.cookies;
      if (token) {
        let verified = jwt.verify(token, salt);
        if (verified) {
          next();
        } else {
          res.status(400).send({ message: "User not verified" });
        }
      } else {
        res.status(400).send({ message: "User not verified" });
      }
    },
  };
};

module.exports = { jwtToken };
