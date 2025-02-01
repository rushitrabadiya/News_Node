const Joi = require("joi");
const { STATUS_ENUM } = require("./../constants");

const validateCreateMenuMasterSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Menu name should be at least 2 characters long",
    "any.required": "Menu name is required",
  }),
  url: Joi.string().uri().optional().messages({
    "string.uri": "URL should be a valid URI",
  }),
  icon: Joi.string().optional().messages({
    "string.base": "Icon should be a valid string",
  }),
  parentName: Joi.string().optional().messages({
    "string.base": "Parent name should be a valid string",
  }),
  order: Joi.number().integer().min(1).required().messages({
    "number.integer": "Order should be an positive integer value",
  }),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .default(STATUS_ENUM.ACTIVE)
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(STATUS_ENUM).join(", ")}`,
    }),
});

const validateUpdateMenuMasterSchema = Joi.object({
  name: Joi.string().min(2).optional().messages({
    "string.min": "Menu name should be at least 2 characters long",
  }),
  url: Joi.string().uri().optional().messages({
    "string.uri": "URL should be a valid URI",
  }),
  icon: Joi.string().optional().messages({
    "string.base": "Icon should be a valid string",
  }),
  parentName: Joi.string().optional().messages({
    "string.base": "Parent name should be a valid string",
  }),
  order: Joi.number().integer().optional().messages({
    "number.integer": "Order should be an integer value",
  }),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(STATUS_ENUM).join(", ")}`,
    }),
});

const validateCreateMenuMaster = (data) => {
  const { error } = validateCreateMenuMasterSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};
const validateUpdateMenuMaster = (data) => {
  const { error } = validateUpdateMenuMasterSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

module.exports = {
  validateUpdateMenuMaster,
  validateCreateMenuMaster,
};
