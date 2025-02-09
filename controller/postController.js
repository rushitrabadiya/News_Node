const Post = require("../models/postModel");
const { handleError } = require("../helper/errorHandler");
const { sendResponse } = require("../helper/responseHandler");

const {
  validateCreatePost,
  validateUpdatePost,
  validateGetPostById,
} = require("../Validation/postValidation");

exports.createPost = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateCreatePost(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const newPost = new Post({ ...bodyData, author: req.user?._id });
    await newPost.save();

    return sendResponse(res, true, newPost, 200, "Post created successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error creating post");
  }
};

exports.updatePost = async (req, res) => {
  try {
    const bodyData = req.body;
    const { isValid, message } = validateUpdatePost(bodyData);
    if (!isValid) return sendResponse(res, false, null, 400, message);

    const post = await Post.findOne({ _id: req.params.id, isDeleted: false });
    if (!post) return sendResponse(res, false, null, 400, "Post not found");

    const updatedPost = await Post.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { ...bodyData, updatedBy: req.user?._id } },
      { new: true },
    );

    if (!updatedPost)
      return sendResponse(res, false, null, 400, "Post not updated");

    return sendResponse(
      res,
      true,
      updatedPost,
      200,
      "Post updated successfully",
    );
  } catch (err) {
    return handleError(res, false, err, 500, "Error updating post");
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { isValid, message } = validateGetPostById({ id: req.params.id });
    if (!isValid) return sendResponse(res, false, null, 400, message);
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $inc: { visitorCounter: 1 } },
      { new: true },
    )
      .populate("author", "_id name")
      .populate("categories", "_id name")
      .populate("tags", "_id name");
    if (!post) return sendResponse(res, false, null, 404, "Post not found");

    return sendResponse(res, true, post, 200, "Post retrieved successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error retrieving post");
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const { categoryId, tagId, search } = req.query;
    let query = { isDeleted: false };
    if (categoryId) {
      query.categories = {
        $in: Array.isArray(categoryId) ? categoryId : [categoryId],
      };
    }
    if (search) {
      query.title = { $regex: search, $options: "i" };
      query.subTitle = { $regex: search, $options: "i" };
    }
    if (tagId) {
      query.tags = { $in: Array.isArray(tagId) ? tagId : [tagId] };
    }
    const posts = await Post.find(query)
      .populate("author", "_id firstName lastName")
      .populate("categories", "_id name")
      .populate("tags", "_id name");

    if (!posts || posts.length === 0)
      return sendResponse(res, false, null, 404, "No posts found");

    return sendResponse(res, true, posts, 200, "Posts retrieved successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error retrieving posts");
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { $set: { isDeleted: true, deletedBy: req.user?._id } },
      { new: true },
    );

    if (!post)
      return sendResponse(
        res,
        false,
        null,
        400,
        "Post not found or already deleted",
      );

    return sendResponse(res, true, null, 200, "Post deleted successfully");
  } catch (err) {
    return handleError(res, false, err, 500, "Error deleting post");
  }
};
