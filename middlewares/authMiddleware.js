const jwt = require("jsonwebtoken");
const { sendResponse } = require("./../helper/responseHandler");
const { JWT_SECRET } = require("./../config/config");

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return sendResponse(
      res,
      "false",
      null,
      401,
      "Access denied. No token provided.",
    );
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, "false", null, 401, "Invalid token.");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return sendResponse(res, "false", null, 403, "Access denied. Admins only.");
  }

  next();
};

const isVerify = (req, res, next) => {
  if (req.user.isVerifyEmail || req.user.isVerifyPhoneno) next();
  else {
    return sendResponse(
      res,
      "false",
      null,
      403,
      "Access denied. User not verified.",
    );
  }
};

const isVerifyEmail = (req, res, next) => {
  if (req.user.isVerifyEmail) {
    next();
  } else {
    return sendResponse(
      res,
      "false",
      null,
      403,
      "Access denied. Email not verified.",
    );
  }
};

const isVerifyPhoneno = (req, res, next) => {
  // console.log(req.user);

  if (req.user.isVerifyPhoneno) {
    next();
  } else {
    return sendResponse(
      res,
      "false",
      null,
      403,
      "Access denied. Phone number not verified.",
    );
  }
};
const unknownRouteHandler = (req, res, next) => {
  return sendResponse(res, "false", null, 400, "API endpoint not found.");
};
module.exports = {
  verifyToken,
  isAdmin,
  isVerify,
  isVerifyPhoneno,
  isVerifyEmail,
  unknownRouteHandler,
};
