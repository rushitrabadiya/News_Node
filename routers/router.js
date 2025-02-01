const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const menuRoute = require("./menuRoute");

router.use("/auth", userRouter);
router.use("/menu", menuRoute);

module.exports = router;
