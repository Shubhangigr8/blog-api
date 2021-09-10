const jwt = require("jsonwebtoken");

module.exports = {
  checktoken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            status: "success"
          })
        } else {
          req.user = jwt.decode(token, process.env.JWT_KEY)
          next()
        }
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Token is Required"
      })
    }
  }
}