const express = require("express");
const router = express.Router();

const userController = require("./../controller/userController");
const { verifyToken } = require("./../middlewares/authMiddleware.js");

router.post("/login", userController.loginUserMaster);
router.post("/signup", userController.createUserMaster);
router.put("/:id", verifyToken, userController.updateUserDetails);
router.delete("/:id", verifyToken, userController.deleteUserMaster);
router.post("/change-password", verifyToken, userController.changePassword);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/profile", verifyToken, userController.getProfile);
router.get("/", verifyToken, userController.getAllUsers);

module.exports = router;
