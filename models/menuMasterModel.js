const mongoose = require("mongoose");
const { STATUS_ENUM, KEY } = require("./../constants");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");

const menuMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    url: { type: String, required: false },
    icon: { type: String, required: false },
    parentName: { type: String, default: null },
    order: { type: Number, default: 0 },
    key: { type: String, enum: Object.values(KEY) },
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.ACTIVE,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

menuMasterSchema.plugin(autoTrackPlugin);

const MenuMaster = mongoose.model("MenuMaster", menuMasterSchema);

module.exports = MenuMaster;
