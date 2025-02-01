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
  },
  { timestamps: true },
);

tagSchema.plugin(autoTrackPlugin);

const Tag = mongoose.model("tag", tagSchema);

module.exports = Tag;
