const mongoose = require("mongoose");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");
const { STATUS_ENUM, ACTIONS } = require("./../constants");

const roleMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    permissions: [
      {
        menu: { type: mongoose.Schema.Types.ObjectId, ref: "MenuMaster" },
        actions: [{ type: String, enum: Object.values(ACTIONS) }],
      },
    ],
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.ACTIVE,
    },
  },
  { timestamps: true },
);

roleMasterSchema.plugin(autoTrackPlugin);

const RoleMaster = mongoose.model("RoleMaster", roleMasterSchema);

module.exports = RoleMaster;
