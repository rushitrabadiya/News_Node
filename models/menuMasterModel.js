const mongoose = require("mongoose");
const { STATUS_ENUM } = require("./../constants");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");

const menuMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
    parentName: { type: String, default: null },
    order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.ACTIVE,
    },
  },
  { timestamps: true },
);

menuMasterSchema.plugin(autoTrackPlugin);

const MenuMaster = mongoose.model("MenuMaster", menuMasterSchema);

module.exports = MenuMaster;
