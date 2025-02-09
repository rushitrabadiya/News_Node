const mongoose = require("mongoose");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");
const { STATUS_ENUM } = require("./../constants");

const tagSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

tagSchema.plugin(autoTrackPlugin);

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;
