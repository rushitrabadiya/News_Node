const express = require("express");

const userRoutes = require("./routers/router");
const { unknownRouteHandler } = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRoutes);
app.use(unknownRouteHandler);

module.exports = app;
