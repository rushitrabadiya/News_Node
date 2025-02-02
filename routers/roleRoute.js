const express = require("express");
const router = express.Router();

const roleController = require("./../controller/roleController.js");
const { verifyToken } = require("./../middlewares/authMiddleware.js");

router.post("/", verifyToken, roleController.createRoleMaster);
router.post(
  "/assign-permissions",
  verifyToken,
  roleController.assignPermissions,
);

router.get("/", verifyToken, roleController.getAllRoles);
router.get("/:id", verifyToken, roleController.getRoleById);
router.put("/:id", verifyToken, roleController.updateRoleMaster);

module.exports = router;
