const UserMaster = require("./../models/userMasterModel");
const jwt = require("jsonwebtoken");

const { sendResponse } = require("./../helper/responseHandler");
const { handleError } = require("./../helper/errorHandler");
const { comparePassword, hashPassword } = require("./../helper/hashHelper");
const { JWT_EXPIRES_IN, JWT_SECRET } = require("./../config/config");
const { sendLinkByEmail } = require("../helper/linkHelper");

const {
  validateCreateUser,
  validateUserLogin,
  validateUpdateUser,
  validateChangePassword,
  validateResetPassword,
  validateForgotPassword,
} = require("../Validation/userValidation");

exports.createUserMaster = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateCreateUser(bodyData);
    if (!isValid) {
      return sendResponse(res, false, null, 400, message);
    }

    const exitsUser = await UserMaster.findOne({
      $or: [{ email: bodyData.email }, { phoneNumber: bodyData.phoneNumber }],
      isDeleted: false,
    });

    if (exitsUser)
      return sendResponse(res, false, null, 400, "User already exists");

    const hashedPassword = await hashPassword(bodyData.password);

    const newUserMaster = new UserMaster({
      ...bodyData,
      password: hashedPassword,
      createdBy: req.user?._id,
    });

    await newUserMaster.save();

    return sendResponse(
      res,
      true,
      newUserMaster,
      200,
      "User created successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error registering UserMaster");
  }
};

exports.loginUserMaster = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUserLogin(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const user = await UserMaster.findOne({
      $or: [{ email: bodyData.email }, { phoneNumber: bodyData.phoneNumber }],
      isDeleted: false,
    });
    if (!user) return sendResponse(res, false, null, 400, "Invalid email");

    const isMatch = await comparePassword(bodyData.password, user.password);
    if (!isMatch) {
      return sendResponse(res, false, null, 400, "Invalid credentials");
    }

    const token = jwt.sign({ _id: user._id, roleId: user.roleId }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return sendResponse(res, true, { token }, 200, "User login successful");
  } catch (err) {
    return handleError(res, false, err, 500, "Error logging in UserMaster");
  }
};

exports.updateUserDetails = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUpdateUser(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const user = await UserMaster.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!user) return sendResponse(res, false, null, 400, "User not found");

    if (bodyData.email) {
      const emailExists = await UserMaster.findOne({
        email: bodyData.email,
        isDeleted: false,
        _id: { $ne: req.params.id },
      });
      if (emailExists) {
        return sendResponse(res, false, null, 400, "Email already exists");
      }
    }
    const updateUser = await UserMaster.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { ...bodyData, updatedBy: req.user?._id } },
      { new: true },
    );
    if (!updateUser) {
      return sendResponse(res, false, null, 400, "user not updated");
    }
    return sendResponse(res, true, updateUser, 200, "User update successful");
  } catch (err) {
    return handleError(res, false, err, 500, "Error update in UserMaster");
  }
};

exports.deleteUserMaster = async (req, res) => {
  try {
    const user = await UserMaster.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { isDeleted: true, deletedBy: req.user?._id } }, // Soft delete with deletedBy
      { new: true },
    );

    if (!user) return sendResponse(res, false, null, 404, "User not found");

    return sendResponse(res, true, user, 200, "User deleted successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error deleting UserMaster");
  }
};

exports.changePassword = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateChangePassword(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    if (bodyData.oldPassword === bodyData.newPassword) {
      return sendResponse(
        res,
        false,
        null,
        400,
        "new password and old password are not equal",
      );
    }
    const user = await UserMaster.findOne({
      _id: req.user._id,
      isDeleted: false,
    });
    if (!user) return sendResponse(res, false, null, 404, "User not found");

    const isMatch = await comparePassword(bodyData.oldPassword, user.password);
    if (!isMatch)
      return sendResponse(res, false, null, 400, "Incorrect old password");

    user.password = await hashPassword(bodyData.newPassword);
    user.updatedBy = req.user._id;
    await user.save();

    return sendResponse(res, true, null, 200, "Password updated successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error changing password");
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateForgotPassword(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const user = await UserMaster.findOne({
      email: bodyData.email,
      isDeleted: false,
    });
    if (!user) return sendResponse(res, false, null, 404, "User not found");

    const sendLinkResponse = await sendLinkByEmail(user, res);
    if (!sendLinkResponse.success) {
      return sendResponse(res, false, null, 500, sendLinkResponse.message);
    }
    return sendResponse(res, true, null, 200, "link sent to your email");
  } catch (err) {
    return handleError(res, false, err, 500, "Error in forgot password");
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateResetPassword(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const decoded = jwt.verify(bodyData.token, JWT_SECRET);
    const user = await UserMaster.findOne({
      _id: decoded.userId,
      isDeleted: false,
    });

    if (!user) {
      return sendResponse(res, false, null, 404, "User not found.");
    }
    user.password = await hashPassword(bodyData.newPassword);
    await user.save();
    return sendResponse(
      res,
      true,
      null,
      200,
      "Password has been reset successfully.",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error resetting password");
  }
};
