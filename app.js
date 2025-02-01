const express = require("express");

const Routes = require("./routers/router");
const { unknownRouteHandler } = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/", Routes);
app.use(unknownRouteHandler);

module.exports = app;
