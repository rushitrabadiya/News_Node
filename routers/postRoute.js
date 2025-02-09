const express = require("express");
const router = express.Router();

const postController = require("./../controller/postController.js");
const {
  verifyToken,
  checkPermission,
} = require("./../middlewares/authMiddleware.js");
const { ACTIONS, KEY } = require("../constants.js");

router.post(
  "/",
  verifyToken,
  checkPermission(KEY.POSTS, ACTIONS.CREATE),
  postController.createPost,
);
router.get(
  "/",
  verifyToken,
  checkPermission(KEY.POSTS, ACTIONS.READ),
  postController.getAllPosts,
);
router.get(
  "/:id",
  verifyToken,
  checkPermission(KEY.POSTS, ACTIONS.READ),
  postController.getPostById,
);
router.put(
  "/:id",
  verifyToken,
  checkPermission(KEY.POSTS, ACTIONS.EDIT),
  postController.updatePost,
);
router.delete(
  "/:id",
  verifyToken,
  checkPermission(KEY.POSTS, ACTIONS.DELETE),
  postController.deletePost,
);

module.exports = router;
