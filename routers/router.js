const express = require("express");
const router = express.Router();

const userRouter = require("./userRoute");
const menuRoute = require("./menuRoute");
const roleRoute = require("./roleRoute");
const tagRoute = require("./tagRoute");
const categoryRoute = require("./categoryRoute");
const postRoute = require("./postRoute");

router.use("/auth", userRouter);
router.use("/menu", menuRoute);
router.use("/role", roleRoute);
router.use("/tag", tagRoute);
router.use("/category", categoryRoute);
router.use("/post", postRoute);

module.exports = router;
