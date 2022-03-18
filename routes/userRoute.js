const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/logout").get(authController.logout);
router.route("/signup").post(authController.createUser);
router.route("/login").post(authController.login);
router.route("/").get(authController.getAllUsers);
router.route("/dashboard").get(authController.dashboard);

module.exports = router;
