const express = require("express");
const router = express.Router();

const categoryController = require("./../controller/categoryController.js");
const {
  verifyToken,
  checkPermission,
} = require("./../middlewares/authMiddleware.js");
const { ACTIONS, KEY } = require("../constants.js");

router.post(
  "/",
  verifyToken,
  checkPermission(KEY.CATEGORIES, ACTIONS.CREATE),
  categoryController.createCategory,
);
router.get(
  "/",
  verifyToken,
  checkPermission(KEY.CATEGORIES, ACTIONS.READ),
  categoryController.getAllCategories,
);
router.get(
  "/nestedCategories",
  verifyToken,
  checkPermission(KEY.CATEGORIES, ACTIONS.READ),
  categoryController.getNestedCategories,
);
router.get(
  "/:id",
  verifyToken,
  checkPermission(KEY.CATEGORIES, ACTIONS.READ),
  categoryController.getCategoryById,
);
router.put(
  "/:id",
  verifyToken,
  checkPermission(KEY.CATEGORIES, ACTIONS.EDIT),
  categoryController.updateCategory,
);
router.delete(
  "/:id",
  verifyToken,
  checkPermission(KEY.CATEGORIES, ACTIONS.DELETE),
  categoryController.deleteCategory,
);

module.exports = router;
