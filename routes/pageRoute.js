const express = require("express");
const router = express.Router();
const pageController = require("../controllers/pageController");
const courseController = require("../controllers/courseController");

router.route("/").get(pageController.getIndexPage);
router.route("/courses").post(courseController.createCourse);

router.route("/about").get(pageController.getAboutPage);
router.route("/teachers").get(pageController.getTeachersPage);
router.route("/pricing").get(pageController.getPricingPage);
router.route("/contact").get(pageController.getContactPage);

module.exports = router;
