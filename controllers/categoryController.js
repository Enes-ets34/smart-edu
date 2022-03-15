const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  try {
    res.status(201).json({
      status: "success",
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  try {
    res.status(201).json({
      status: "success",
      categories,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};