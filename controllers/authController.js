const User = require("../models/User");
const Category = require("../models/Category");
const Course = require("../models/Course");

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
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            //USER SESSION
            req.session.userID = user._id;

            res.status(200).redirect("/users/dashboard");
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
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
  console.log("kullanici cikis yaptı");
};
exports.dashboard = async (req, res) => {
  const categories = await Category.find();
 
  const user = await User.findOne({ _id: req.session.userID }).populate(
    "courses"
  );

  res.status(200).render("dashboard", {
    page_name: "dashboard",
    user,
    categories,
  });

  console.log("user :>> ", user);
  console.log("user.courses :>> ", user.courses);
};
