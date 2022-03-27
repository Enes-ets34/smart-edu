const User = require("../models/User");

module.exports = async (req, res, next) => {
  const roles = ["teacher", "admin"];
  const user = await User.findOne({ _id: req.session.userID });
  console.log("user :>> ", user.role);

  const userRole = user.role;
  console.log("userRole :>> ", userRole);
  if (roles.includes(userRole)) {
    next();
  } else {
    return res.status(401).send("you cant do it");
  }
};
