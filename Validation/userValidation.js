const Joi = require("joi");
const { STATUS_ENUM } = require("./../constants");

const validateData = (data, schema) => {
  const { error } = schema.validate(data);
  if (error) {
    console.error("Validation error details:", error.details);
    return {
      isValid: false,
      message: error.details.map((err) => err.message).join(", "),
    };
  }
  return {
    isValid: true,
    message: "Validation successful",
  };
};

const validateCreateUser = (data) => {
  const schema = Joi.object({
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

  return validateData(data, schema);
};

const validateUserLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Invalid email format",
      "any.required": "Email is required",
    }),
    password: Joi.string().required().messages({
      "any.required": "Password is required",
    }),
  });

  return validateData(data, schema);
};

module.exports = {
  validateCreateUser,
  validateUserLogin,
};
