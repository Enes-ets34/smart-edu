const User = require("../models/User");
const bcrypt = require("bcrypt");
exports.createUser = async (req, res) => {
  const user = await User.create(req.body);
  try {
    res.status(201).redirect(
      "/",
      {
        page_name: "index",
      },
      user
    );
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  try {
    res.status(201).json({
      status: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.login =  (req, res) => {
  try {
    const { email, password } = req.body;
     User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //USER SESSION
            res.status(200).send({
              message: "you are logged in",
              user,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "bad request",
    });
  }
};
