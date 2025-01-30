const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");
const { verifyToken } = require("./../middlewares/authMiddleware.js");

router.post("/login", userController.loginUserMaster);
router.post("/signup", userController.createUserMaster);

// router
//   .route("/change-password")
//   .post(verifyToken, userController.changePassword);

module.exports = router;
