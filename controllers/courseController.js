const Course = require("../models/Course");
const Category = require("../models/Category");
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
        thumbnail: "/thumbnails/" + uploadedImage.name,
      });
      res.status(201).json({
        status: "success",
        course,
      });
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
    let filter = {};
    if (categorySlug) {
      filter = { category: category._id };
    }
    const courses = await Course.find(filter);
    const categories = await Category.find();
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
    const course = await Course.findOne({ slug: req.params.slug });
    res.status(200).render("course", {
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
