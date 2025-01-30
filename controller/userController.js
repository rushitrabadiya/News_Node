const UserMaster = require("./../models/userMasterModel");
const jwt = require("jsonwebtoken");

const { sendResponse } = require("./../helper/responseHandler");
const { handleError } = require("./../helper/errorHandler");
const { comparePassword, hashPassword } = require("./../helper/hashHelper");
const { JWT_EXPIRES_IN, JWT_SECRET } = require("./../config/config");

const {
  validateCreateUser,
  validateUserLogin,
} = require("../Validation/userValidation");

exports.createUserMaster = async (req, res) => {
  const { isValid, message } = validateCreateUser(req.body);
  if (!isValid) return sendResponse(res, false, null, 400, message);
  const bodyData = req.body;

  try {
    const exitsUser = await UserMaster.findOne({
      email: bodyData.email,
      phoneNumber: bodyData.phoneNumber,
      isDeleted: false,
    });
    if (exitsUser)
      return sendResponse(res, false, null, 400, "User already exists");

    const hashedPassword = await hashPassword(bodyData.password);

    const newUserMaster = new UserMaster({
      ...bodyData,
      password: hashedPassword,
    });

    newUserMaster._user = req.user?._id;
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
  const { isValid, message } = validateUserLogin(req.body);
  if (!isValid) return sendResponse(res, false, null, 400, message);

  const bodyData = req.body;

  try {
    const user = await UserMaster.findOne({ email: bodyData.email });
    if (!user) return sendResponse(res, false, null, 400, "Invalid email");

    const isMatch = await comparePassword(bodyData.password, user.password);
    if (!isMatch) {
      handleErrorNotification(
        "Authentication Error",
        "Invalid credentials provided",
        req,
      );
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
