const mongoose = require("mongoose");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");
const { STATUS_ENUM } = require("./../constants");

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  { timestamps: true },
);

categorySchema.plugin(autoTrackPlugin);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
