const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const { acc_tkn } = req.cookies;
  try {
    const decoded = jwt.verify(acc_tkn, process.env.JWT_SEC);
    if (decoded) {
      req.user = decoded;
      next();
    } else {
      res.status(401).send({ message: "Unothorized request 1" });
    }
  } catch (error) {
    res.status(401).send({ message: "Unothorized request" });
  }
};

const roleCheck = (roles) => {
  return (req, res, next) => {
    if (Array.isArray(roles) && roles.length > 0) {
      if (roles.includes(req.user.role)) {
        next();
      } else {
        res.status(400).send({ message: "Forbidden" });
      }
    } else {
      res.status(400).send({ message: "Forbidden" });
    }
  };
};

module.exports = { authMiddleware, roleCheck };
