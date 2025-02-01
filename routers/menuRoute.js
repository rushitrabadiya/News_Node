const express = require("express");
const router = express.Router();

const menuController = require("./../controller/menuController.js");
const { verifyToken } = require("./../middlewares/authMiddleware.js");

router.post("/", verifyToken, menuController.createMenuMaster);

router.get("/", verifyToken, menuController.getAllMenu);
router.get("/:id", verifyToken, menuController.getMenuById);

router.delete("/:id", verifyToken, menuController.deleteMenuById);
router.put("/:id", verifyToken, menuController.updateMenuMaster);

module.exports = router;
