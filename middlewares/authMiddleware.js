const jwt = require("jsonwebtoken");
const { sendResponse } = require("./../helper/responseHandler");
const { JWT_SECRET } = require("./../config/config");
const Role = require("./../models/roleMasterModel");
const User = require("./../models/userMasterModel");

const verifyToken = async (req, res, next) => {
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
    const userData = await User.findById(req.user._id);
    req.user.roleId = userData.roleId;
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

const checkPermission = (menuKey, action) => {
  return async (req, res, next) => {
    try {
      const userRole = req.user.roleId;

      if (!userRole) {
        return res.status(403).json({ message: "User role not found" });
      }

      const role = await Role.findById(userRole).populate({
        path: "permissions.menu",
        select: "key",
      });

      if (!role) {
        return res.status(403).json({ message: "Role not found in database" });
      }

      if (!role.permissions || role.permissions.length === 0) {
        return res
          .status(403)
          .json({ message: "No permissions assigned to this role" });
      }

      const menuPermission = role.permissions.find(
        (perm) => perm.menu && perm.menu.key === menuKey,
      );

      if (!menuPermission) {
        return res
          .status(403)
          .json({ message: `No permissions for module: ${menuKey}` });
      }

      if (!menuPermission.actions.includes(action)) {
        return res.status(403).json({
          message: `Permission '${action}' denied for module: ${menuKey}`,
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
};

const unknownRouteHandler = (req, res, next) => {
  return sendResponse(res, "false", null, 400, "API endpoint not found.");
};
module.exports = {
  verifyToken,
  isAdmin,
  isVerify,
  unknownRouteHandler,
  checkPermission,
};
