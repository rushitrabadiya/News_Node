const express = require("express");
const router = express.Router();

const tagController = require("./../controller/tagController.js");
const { verifyToken } = require("./../middlewares/authMiddleware.js");

router.post("/", verifyToken, tagController.createTag);
router.get("/", verifyToken, tagController.getAllTags);
router.get("/:id", verifyToken, tagController.getTagById);
router.put("/:id", verifyToken, tagController.updateTag);
router.delete("/:id", verifyToken, tagController.deleteTag);

module.exports = router;
