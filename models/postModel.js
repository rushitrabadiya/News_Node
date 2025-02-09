const mongoose = require("mongoose");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");
const { POST_STATUS } = require("./../constants");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subTitle: { type: String },
    postContent: { type: String, required: true },
    gallery: [{ type: String }],
    video: [{ type: String }],
    audio: [{ type: String }],
    link: [{ type: String }],
    quote: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMaster",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(POST_STATUS),
      default: POST_STATUS.DRAFT,
    },
    visitorCounter: { type: Number, default: 0 },
    featuredImage: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

postSchema.plugin(autoTrackPlugin);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
