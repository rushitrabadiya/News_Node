const Joi = require("joi");
const { STATUS_ENUM } = require("./../constants");

const validateCreateTagSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Tag name should be at least 2 characters long",
    "any.required": "Tag name is required",
  }),
  slug: Joi.string().required().messages({
    "any.required": "Slug is required",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
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

const validateUpdateTagSchema = Joi.object({
  name: Joi.string().min(2).optional().messages({
    "string.min": "Tag name should be at least 2 characters long",
  }),
  slug: Joi.string().optional().messages({
    "string.base": "Slug must be a string",
  }),
  description: Joi.string().optional().allow("").messages({
    "string.base": "Description must be a string",
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

const validateGetTagByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Tag ID should be a valid ObjectId",
    "string.length": "Tag ID should be 24 characters long",
    "any.required": "Tag ID is required",
  }),
});

const validateCreateTag = (data) => {
  const { error } = validateCreateTagSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateUpdateTag = (data) => {
  const { error } = validateUpdateTagSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateGetTagById = (data) => {
  const { error } = validateGetTagByIdSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

module.exports = {
  validateCreateTag,
  validateUpdateTag,
  validateGetTagById,
};
