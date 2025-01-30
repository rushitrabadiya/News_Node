const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");

router.use("/auth", userRouter);

module.exports = router;
