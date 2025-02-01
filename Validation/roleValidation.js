const Joi = require("joi");
const { STATUS_ENUM } = require("./../constants");

const validateCreateRoleMasterSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Role name should be at least 2 characters long",
    "any.required": "Role name is required",
  }),
  permission: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .optional()
    .messages({
      "array.includes": "Permissions should be an array of valid ObjectIds",
      "string.hex": "Each permission should be a valid ObjectId",
      "string.length": "Each permission should be 24 characters long",
    }),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .default(STATUS_ENUM.ACTIVE)
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(STATUS_ENUM).join(", ")}`,
    }),
});

const validateUpdateRoleMasterSchema = Joi.object({
  name: Joi.string().min(2).optional().messages({
    "string.min": "Role name should be at least 2 characters long",
  }),
  permission: Joi.array()
    .items(Joi.string().hex().length(24).required())
    .optional()
    .messages({
      "array.includes": "Permissions should be an array of valid ObjectIds",
      "string.hex": "Each permission should be a valid ObjectId",
      "string.length": "Each permission should be 24 characters long",
    }),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(STATUS_ENUM).join(", ")}`,
    }),
});

const validateCreateRoleMaster = (data) => {
  const { error } = validateCreateRoleMasterSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateUpdateRoleMaster = (data) => {
  const { error } = validateUpdateRoleMasterSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

module.exports = {
  validateCreateRoleMaster,
  validateUpdateRoleMaster,
};
