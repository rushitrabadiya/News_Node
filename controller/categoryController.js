const Category = require("./../models/categoriesModel");
const { handleError } = require("../helper/errorHandler");
const { sendResponse } = require("../helper/responseHandler");

const {
  validateCreateCategory,
  validateUpdateCategory,
  validateGetCategoryById,
} = require("../Validation/categoryValidation");

const getNestedCategories = async (parentId = null) => {
  const categories = await Category.find({ parentId, isDeleted: false });

  const nestedCategories = await Promise.all(
    categories.map(async (category) => {
      const subcategories = await getNestedCategories(category._id);
      return { ...category.toObject(), subcategories };
    }),
  );

  return nestedCategories;
};
exports.createCategory = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateCreateCategory(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const existingCategory = await Category.findOne({
      name: bodyData.name,
      isDeleted: false,
    });
    if (existingCategory)
      return sendResponse(res, false, null, 400, "Category already exists");

    const newCategory = new Category({ ...bodyData, createdBy: req.user?._id });
    await newCategory.save();

    return sendResponse(
      res,
      true,
      newCategory,
      200,
      "Category created successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error creating category");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUpdateCategory(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const category = await Category.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!category)
      return sendResponse(res, false, null, 400, "Category not found");

    if (bodyData.name) {
      const categoryExists = await Category.findOne({
        name: bodyData.name,
        isDeleted: false,
        _id: { $ne: req.params.id },
      });
      if (categoryExists)
        return sendResponse(
          res,
          false,
          null,
          400,
          "Category name already exists",
        );
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { ...bodyData, updatedBy: req.user?._id } },
      { new: true },
    );

    if (!updatedCategory)
      return sendResponse(res, false, null, 400, "Category not updated");

    return sendResponse(
      res,
      true,
      updatedCategory,
      200,
      "Category updated successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error updating category");
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { isValid, message } = validateGetCategoryById({ id: req.params.id });
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const category = await Category.findOne({
      _id: req.params.id,
      isDeleted: false,
    });
    if (!category)
      return sendResponse(res, false, null, 404, "Category not found");

    return sendResponse(
      res,
      true,
      category,
      200,
      "Category retrieved successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error retrieving category");
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await getNestedCategories();

    if (!categories || categories.length === 0)
      return sendResponse(res, false, null, 404, "No categories found");

    return sendResponse(
      res,
      true,
      categories,
      200,
      "Categories retrieved successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error retrieving categories");
  }
};
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { isDeleted: true, deletedBy: req.user?._id } },
      { new: true },
    );

    if (!category)
      return sendResponse(
        res,
        false,
        null,
        400,
        "Category not found or already deleted",
      );

    return sendResponse(res, true, null, 200, "Category deleted successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error deleting category");
  }
};
