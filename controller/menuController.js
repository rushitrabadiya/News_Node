const MenuMaster = require("./../models/menuMasterModel");
const { handleError } = require("./../helper/errorHandler");
const { sendResponse } = require("./../helper/responseHandler");

const {
  validateCreateMenuMaster,
  validateUpdateMenuMaster,
} = require("../Validation/menuValidation");

exports.createMenuMaster = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateCreateMenuMaster(bodyData);
    if (!isValid) {
      return sendResponse(res, false, null, 400, message);
    }

    const exitsMenu = await MenuMaster.findOne({
      $and: [{ name: bodyData.name }, { order: bodyData.order }],
      isDeleted: false,
    });

    if (exitsMenu)
      return sendResponse(res, false, null, 400, "Menu already exists");

    const newMenuMaster = new MenuMaster({
      ...bodyData,
      createdBy: req.user?._id,
    });

    await newMenuMaster.save();

    return sendResponse(
      res,
      true,
      newMenuMaster,
      200,
      "Menu created successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error registering Menu Master");
  }
};

exports.updateMenuMaster = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUpdateMenuMaster(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const menu = await MenuMaster.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!menu) return sendResponse(res, false, null, 400, "Menu not found");

    if (bodyData.name) {
      const menuExists = await MenuMaster.findOne({
        name: bodyData.name,
        isDeleted: false,
        _id: { $ne: req.params.id },
      });
      if (menuExists) {
        return sendResponse(res, false, null, 400, "Name already exists");
      }
    }
    const updateMenu = await MenuMaster.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { ...bodyData, updatedBy: req.user?._id } },
      { new: true },
    );
    if (!updateMenu) {
      return sendResponse(res, false, null, 400, "menu not updated");
    }
    return sendResponse(res, true, updateMenu, 200, "Menu update successful");
  } catch (err) {
    return handleError(res, false, err, 500, "Error update in Menu update");
  }
};

exports.getMenuById = async (req, res) => {
  try {
    const menu = await MenuMaster.findById(req.params.id, { isDeleted: false });

    if (!menu) return sendResponse(res, false, null, 404, "Menu not found");

    return sendResponse(res, true, menu, 200, "Menu Get successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error getting MenuMaster");
  }
};

exports.getAllMenu = async (req, res) => {
  try {
    const menu = await MenuMaster.find({ isDeleted: false });

    if (!menu) return sendResponse(res, false, null, 404, "Menu not found");

    return sendResponse(res, true, menu, 200, "Menu Get successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error getting MenuMaster");
  }
};

exports.deleteMenuById = async (req, res) => {
  try {
    const menu = await MenuMaster.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { isDeleted: true, deletedBy: req.user?._id } },
      { new: true },
    );

    if (!menu) return sendResponse(res, false, null, 404, "Menu not found");

    return sendResponse(res, true, menu, 200, "Menu deleted successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error deleting Menu master");
  }
};
