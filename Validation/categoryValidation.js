const Joi = require("joi");
const { STATUS_ENUM } = require("./../constants");

const validateCreateCategorySchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Category name should be at least 2 characters long",
    "any.required": "Category name is required",
  }),
  parentId: Joi.string().hex().length(24).optional().allow(null).messages({
    "string.hex": "Parent ID should be a valid ObjectId",
    "string.length": "Parent ID should be 24 characters long",
  }),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(
        STATUS_ENUM,
      ).join(", ")}`,
    }),
});

const validateUpdateCategorySchema = Joi.object({
  name: Joi.string().min(2).optional().messages({
    "string.min": "Category name should be at least 2 characters long",
  }),
  parentId: Joi.string().hex().length(24).optional().allow(null).messages({
    "string.hex": "Parent ID should be a valid ObjectId",
    "string.length": "Parent ID should be 24 characters long",
  }),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(
        STATUS_ENUM,
      ).join(", ")}`,
    }),
});

const validateGetCategoryByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Category ID should be a valid ObjectId",
    "string.length": "Category ID should be 24 characters long",
    "any.required": "Category ID is required",
  }),
});

const validateCreateCategory = (data) => {
  const { error } = validateCreateCategorySchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateUpdateCategory = (data) => {
  const { error } = validateUpdateCategorySchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateGetCategoryById = (data) => {
  const { error } = validateGetCategoryByIdSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
  validateGetCategoryById,
};
