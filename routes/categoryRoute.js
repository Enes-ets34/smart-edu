const express = require("express");
const categoryController = require("../controllers/categoryController");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.route("/").post(roleMiddleware, categoryController.createCategory);
router.route("/").get(categoryController.getAllCategories);

module.exports = router;
