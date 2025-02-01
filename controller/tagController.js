const Tag = require("../models/tagModel");
const { handleError } = require("../helper/errorHandler");
const { sendResponse } = require("../helper/responseHandler");

const {
  validateCreateTag,
  validateUpdateTag,
  validateGetTagById,
} = require("../Validation/tagValidation");

exports.createTag = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateCreateTag(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const existingTag = await Tag.findOne({
      name: bodyData.name,
      isDeleted: false,
    });
    if (existingTag)
      return sendResponse(res, false, null, 400, "Tag already exists");

    const newTag = new Tag({ ...bodyData, createdBy: req.user?._id });
    await newTag.save();

    return sendResponse(res, true, newTag, 200, "Tag created successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error creating tag");
  }
};

exports.updateTag = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUpdateTag(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const tag = await Tag.findOne({ _id: req.params.id, isDeleted: false });
    if (!tag) return sendResponse(res, false, null, 400, "Tag not found");

    if (bodyData.name) {
      const tagExists = await Tag.findOne({
        name: bodyData.name,
        isDeleted: false,
        _id: { $ne: req.params.id },
      });
      if (tagExists)
        return sendResponse(res, false, null, 400, "Tag name already exists");
    }

    const updatedTag = await Tag.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { ...bodyData, updatedBy: req.user?._id } },
      { new: true },
    );

    if (!updatedTag)
      return sendResponse(res, false, null, 400, "Tag not updated");

    return sendResponse(res, true, updatedTag, 200, "Tag updated successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error updating tag");
  }
};

exports.getTagById = async (req, res) => {
  try {
    const { isValid, message } = validateGetTagById({ id: req.params.id });
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const tag = await Tag.findOne({ _id: req.params.id, isDeleted: false });
    if (!tag) return sendResponse(res, false, null, 404, "Tag not found");

    return sendResponse(res, true, tag, 200, "Tag retrieved successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error retrieving tag");
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({ isDeleted: false });

    if (!tags || tags.length === 0)
      return sendResponse(res, false, null, 404, "No tags found");

    return sendResponse(res, true, tags, 200, "Tags retrieved successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error retrieving tags");
  }
};

exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { isDeleted: true, deletedBy: req.user?._id } },
      { new: true },
    );

    if (!tag)
      return sendResponse(
        res,
        false,
        null,
        400,
        "Tag not found or already deleted",
      );

    return sendResponse(res, true, null, 200, "Tag deleted successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error deleting tag");
  }
};
