const express = require("express");
const router = express.Router();

const tagController = require("./../controller/tagController.js");
const {
  verifyToken,
  checkPermission,
} = require("./../middlewares/authMiddleware.js");
const { ACTIONS, KEY } = require("../constants.js");

router.post(
  "/",
  verifyToken,
  checkPermission(KEY.TAGS, ACTIONS.CREATE),
  tagController.createTag,
);
router.get(
  "/",
  verifyToken,
  checkPermission(KEY.TAGS, ACTIONS.READ),
  tagController.getAllTags,
);
router.get(
  "/:id",
  verifyToken,
  checkPermission(KEY.TAGS, ACTIONS.READ),
  tagController.getTagById,
);
router.put(
  "/:id",
  verifyToken,
  checkPermission(KEY.TAGS, ACTIONS.EDIT),
  tagController.updateTag,
);
router.delete(
  "/:id",
  verifyToken,
  checkPermission(KEY.TAGS, ACTIONS.DELETE),
  tagController.deleteTag,
);

module.exports = router;
