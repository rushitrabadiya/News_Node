const Joi = require("joi");
const { STATUS_ENUM, ACTIONS } = require("./../constants");

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.error("any.invalid");
  }
  return value;
};

const validateCreateRoleMasterSchema = Joi.object({
  name: Joi.string().min(2).required().messages({
    "string.min": "Role name should be at least 2 characters long",
    "any.required": "Role name is required",
  }),
  permissions: Joi.array()
    .items(
      Joi.object({
        menu: Joi.string()
          .custom(objectIdValidator, "ObjectId validation")
          .required()
          .messages({
            "any.invalid": "Menu ID must be a valid ObjectId",
            "any.required": "Menu ID is required",
          }),
        actions: Joi.array()
          .items(Joi.string().valid(...Object.values(ACTIONS)))
          .min(1)
          .required()
          .messages({
            "array.includes": "Each action must be a valid permission",
            "array.min": "At least one action is required",
          }),
      }),
    )
    .optional()
    .messages({
      "array.includes": "Permissions should be an array of valid objects",
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
