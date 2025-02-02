const RoleMaster = require("./../models/roleMasterModel");
const { handleError } = require("./../helper/errorHandler");
const { sendResponse } = require("./../helper/responseHandler");

const {
  validateCreateRoleMaster,
  validateUpdateRoleMaster,
} = require("../Validation/roleValidation");

exports.createRoleMaster = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateCreateRoleMaster(bodyData);
    if (!isValid) {
      return sendResponse(res, false, null, 400, message);
    }

    const existsRole = await RoleMaster.findOne({
      name: bodyData.name,
      isDeleted: false,
    });

    if (existsRole)
      return sendResponse(res, false, null, 400, "Role already exists");

    const newRoleMaster = new RoleMaster({
      ...bodyData,
      createdBy: req.user?._id,
    });

    await newRoleMaster.save();

    return sendResponse(
      res,
      true,
      newRoleMaster,
      200,
      "Role created successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error creating Role Master");
  }
};

exports.updateRoleMaster = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUpdateRoleMaster(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const role = await RoleMaster.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!role) return sendResponse(res, false, null, 400, "Role not found");

    if (bodyData.name) {
      const roleExists = await RoleMaster.findOne({
        name: bodyData.name,
        isDeleted: false,
        _id: { $ne: req.params.id },
      });
      if (roleExists) {
        return sendResponse(res, false, null, 400, "Name already exists");
      }
    }

    const updateRole = await RoleMaster.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { ...bodyData, updatedBy: req.user?._id } },
      { new: true },
    );

    if (!updateRole) {
      return sendResponse(res, false, null, 400, "Role not updated");
    }

    return sendResponse(res, true, updateRole, 200, "Role update successful");
  } catch (err) {
    return handleError(res, false, err, 500, "Error updating Role Master");
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await RoleMaster.findById(req.params.id, { isDeleted: false });

    if (!role) return sendResponse(res, false, null, 404, "Role not found");

    return sendResponse(res, true, role, 200, "Role Get successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error getting Role Master");
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await RoleMaster.find({ isDeleted: false });

    if (!roles || roles.length === 0)
      return sendResponse(res, false, null, 404, "No roles found");

    return sendResponse(res, true, roles, 200, "Roles Get successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error getting Role Master");
  }
};

exports.assignPermissions = async (req, res) => {
  try {
    const { roleId, permissions } = req.body;
    const role = await RoleMaster.findById(roleId);
    if (!role) return res.status(404).json({ message: "Role not found" });
    if (
      !permissions ||
      !Array.isArray(permissions) ||
      permissions.length === 0
    ) {
      return res.status(400).json({ message: "Invalid permissions data" });
    }
    role.permissions = permissions.map((perm) => ({
      menu: perm.menuId, // Store menuId as ObjectId reference
      actions: perm.actions,
    }));
    await role.save();
    return sendResponse(
      res,
      true,
      role,
      200,
      "Permissions assigned successfully",
    );
  } catch (error) {
    return handleError(res, false, error, 500, "Error assigning permissions");
  }
};
