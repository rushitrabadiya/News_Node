const Joi = require("joi");
const { STATUS_ENUM } = require("./../constants");

const validateCreateUserSchema = Joi.object({
  firstName: Joi.string().min(2).required().messages({
    "string.min": "First name should be at least 2 characters long",
    "any.required": "First name is required",
  }),
  lastName: Joi.string().min(2).required().messages({
    "string.min": "Last name should be at least 2 characters long",
    "any.required": "Last name is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number must be a 10-digit number",
      "any.required": "Phone number is required",
    }),
  dialCode: Joi.string().required().messages({
    "any.required": "Dial code is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "Password should be at least 6 characters long",
    "any.required": "Password is required",
  }),
  pin: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.length": "PIN must be exactly 4 digits",
      "string.pattern.base": "PIN must only contain numbers",
      "any.required": "PIN is required",
    }),
  roleId: Joi.string().optional(),
  socialMedia: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
      }),
    )
    .optional(),
  status: Joi.string()
    .valid(...Object.values(STATUS_ENUM))
    .default(STATUS_ENUM.ACTIVE),
  profilePicture: Joi.string().uri().optional(),
  address: Joi.string().optional(),
  postcode: Joi.string().optional(),
  reporterId: Joi.string().optional(),
  city: Joi.string().required().messages({
    "any.required": "City is required",
  }),
  country: Joi.string().required().messages({
    "any.required": "Country is required",
  }),
  state: Joi.string().required().messages({
    "any.required": "State is required",
  }),
});
const validateCreateUser = (data) => {
  const { error } = validateCreateUserSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateUserLoginschema = Joi.object({
  email: Joi.string().email().optional().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .optional()
    .messages({
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
});
const validateUserLogin = (data) => {
  const { error } = validateUserLoginschema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateUpdateUserschema = Joi.object({
  firstName: Joi.string().min(2).messages({
    "string.min": "First name should be at least 2 characters long",
  }),
  lastName: Joi.string().min(2).messages({
    "string.min": "Last name should be at least 2 characters long",
  }),
  email: Joi.string().email().messages({
    "string.email": "Invalid email format",
  }),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number must be a 10-digit number",
    }),
  dialCode: Joi.string(),
  pin: Joi.string()
    .length(4)
    .pattern(/^[0-9]+$/)
    .messages({
      "string.length": "PIN must be exactly 4 digits",
      "string.pattern.base": "PIN must only contain numbers",
    }),
  socialMedia: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      url: Joi.string().uri().required(),
    }),
  ),
  status: Joi.string().valid(...Object.values(STATUS_ENUM)),
  profilePicture: Joi.string().uri(),
  address: Joi.string(),
  postcode: Joi.string(),
  reporterId: Joi.string(),
  city: Joi.string().messages({
    "any.required": "City is required",
  }),
  country: Joi.string().messages({
    "any.required": "Country is required",
  }),
  state: Joi.string().messages({
    "any.required": "State is required",
  }),
});
const validateUpdateUser = (data) => {
  const { error } = validateUpdateUserschema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().min(6).required().messages({
    "string.min": "oldPassword should be at least 6 characters long",
    "any.required": "oldPassword is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "newPassword should be at least 6 characters long",
    "any.required": "newPassword is required",
  }),
});

const validateChagePassword = (data) => {
  const { error } = changePasswordSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format",
    "any.required": "Email is required",
  }),
});
const validateForgotPassword = (data) => {
  const { error } = forgotPasswordSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    "any.required": "token is required",
  }),
  newPassword: Joi.string().min(6).required().messages({
    "string.min": "New password should be at least 6 characters long",
    "any.required": "New password is required",
  }),
});
const validateResetPassword = (data) => {
  const { error } = resetPasswordSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};
module.exports = {
  validateCreateUser,
  validateUserLogin,
  validateUpdateUser,
  validateChagePassword,
  validateResetPassword,
  validateForgotPassword,
};
