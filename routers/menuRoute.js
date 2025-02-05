const express = require("express");
const router = express.Router();

const menuController = require("./../controller/menuController.js");
const {
  verifyToken,
  checkPermission,
} = require("./../middlewares/authMiddleware.js");
const { ACTIONS, KEY } = require("../constants.js");

router.post(
  "/",
  verifyToken,
  checkPermission(KEY.MENU, ACTIONS.CREATE),
  menuController.createMenuMaster,
);
router.get(
  "/",
  verifyToken,
  checkPermission(KEY.MENU, ACTIONS.READ),
  menuController.getAllMenu,
);
router.get(
  "/:id",
  verifyToken,
  checkPermission(KEY.MENU, ACTIONS.READ),
  menuController.getMenuById,
);
router.put(
  "/:id",
  verifyToken,
  checkPermission(KEY.MENU, ACTIONS.EDIT),
  menuController.updateMenuMaster,
);
router.delete(
  "/:id",
  verifyToken,
  checkPermission(KEY.MENU, ACTIONS.DELETE),
  menuController.deleteMenuById,
);

module.exports = router;
