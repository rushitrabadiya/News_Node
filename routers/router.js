const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const menuRoute = require("./menuRoute");
const roleRoute = require("./roleRoute");

router.use("/auth", userRouter);
router.use("/menu", menuRoute);
router.use("/role", roleRoute);

module.exports = router;
