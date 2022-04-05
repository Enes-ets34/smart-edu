const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");

const fs = require("fs");

exports.createCourse = async (req, res) => {
  const uploadDir = "public/thumbnails";

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  let uploadedImage = req.files.thumbnail;
  let uploadPath = __dirname + "/../public/thumbnails/" + uploadedImage.name;

  uploadedImage.mv(uploadPath, async () => {
    try {
      const course = await Course.create({
        ...req.body,
        createdAt: Date.now(),
        user: req.session.userID,
        thumbnail: "/thumbnails/" + uploadedImage.name,
      });
      res.status(201).redirect("/courses");
    } catch (error) {
      res.status(400).json({
        status: "fail",
        error,
      });
    }
  });
};
exports.getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });
    const query = req.query.search;

    let filter = {};

    if (query) {
      filter = { title: query };
    }
    if (categorySlug) {
      filter = { category: category._id };
    }
    if (!query && !categorySlug) {
      filter.title = "";
      filter.category = null;
    }

    const categories = await Category.find();
    const courses = await Course.find({
      $or: [
        { title: { $regex: ".*" + filter.title + ".*", $options: "i" }, },
        { category: filter.category },
      ],
    })
      .sort("-createdAt")
      .populate("user").populate('category')
    res.status(200).render("courses", {
      courses,
      categories,
      page_name: "courses",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getSingleCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("user")
      .populate("category");
    res.status(200).render("course", {
      course,
      user,
      page_name: "course",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    const course = req.body.course;
    await user.courses.push(course);
    await user.save();
    res.redirect("/users/dashboard", 200, {
      course,
      page_name: "course",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
