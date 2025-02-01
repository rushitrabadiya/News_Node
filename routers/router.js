const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const menuRoute = require("./menuRoute");
const roleRoute = require("./roleRoute");
const tagRoute = require("./tagRoute");

router.use("/auth", userRouter);
router.use("/menu", menuRoute);
router.use("/role", roleRoute);
router.use("/tag", tagRoute);

module.exports = router;
