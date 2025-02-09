const Joi = require("joi");
const { POST_STATUS } = require("./../constants");

const validateCreatePostSchema = Joi.object({
  title: Joi.string().min(2).required().messages({
    "string.min": "Title should be at least 2 characters long",
    "any.required": "Title is required",
  }),
  subTitle: Joi.string().optional().allow("").messages({
    "string.base": "SubTitle must be a string",
  }),
  postContent: Joi.string().required().messages({
    "any.required": "Post content is required",
  }),
  gallery: Joi.array().items(Joi.string().uri()).optional(),
  video: Joi.array().items(Joi.string().uri()).optional(),
  audio: Joi.array().items(Joi.string().uri()).optional(),
  link: Joi.array().items(Joi.string().uri()).optional(),
  quote: Joi.string().optional().allow("").messages({
    "string.base": "Quote must be a string",
  }),
  categories: Joi.array().items(Joi.string().hex().length(24)).optional(),
  tags: Joi.array().items(Joi.string().hex().length(24)).optional(),
  author: Joi.string().hex().length(24).optional().messages({
    "any.required": "Author ID is required",
    "string.hex": "Author ID should be a valid ObjectId",
    "string.length": "Author ID should be 24 characters long",
  }),
  status: Joi.string()
    .valid(...Object.values(POST_STATUS))
    .optional()
    .messages({
      "any.only": `Status should be one of the following: ${Object.values(
        POST_STATUS,
      ).join(", ")}`,
    }),
  visitorCounter: Joi.number().integer().min(0).optional(),
  featuredImage: Joi.string().uri().optional(),
});

const validateUpdatePostSchema = validateCreatePostSchema.fork(
  ["title", "postContent", "author"],
  (schema) => schema.optional(),
);

const validateGetPostByIdSchema = Joi.object({
  id: Joi.string().hex().length(24).required().messages({
    "string.hex": "Post ID should be a valid ObjectId",
    "string.length": "Post ID should be 24 characters long",
    "any.required": "Post ID is required",
  }),
});

const validateCreatePost = (data) => {
  const { error } = validateCreatePostSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateUpdatePost = (data) => {
  const { error } = validateUpdatePostSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

const validateGetPostById = (data) => {
  const { error } = validateGetPostByIdSchema.validate(data);
  return {
    isValid: !error,
    message: error ? error.details[0].message : null,
  };
};

module.exports = {
  validateCreatePost,
  validateUpdatePost,
  validateGetPostById,
};
