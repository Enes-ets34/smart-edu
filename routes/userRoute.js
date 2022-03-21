const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/signup").post(authController.createUser);
router.route("/logout").get(authController.logout);
router.route("/login").post(authController.login);
router.route("/dashboard").get(authMiddleware, authController.dashboard);

router.route("/").get(authController.getAllUsers);

module.exports = router;
