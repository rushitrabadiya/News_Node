const mongoose = require("mongoose");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");
const { STATUS_ENUM } = require("./../constants");

const roleMasterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    permission: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MenuMaster",
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
