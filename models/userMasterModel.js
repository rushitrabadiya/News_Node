const mongoose = require("mongoose");
const { STATUS_ENUM } = require("./../constants");
const autoTrackPlugin = require("./../helper/autoTrackPlugin");

const userMasterSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: [true, "First name is required"] },
    lastName: { type: String, required: [true, "Last name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    phoneNumber: { type: String, required: [true, "Phone number is required"] },
    dialCode: { type: String, required: [true, "Dial code is required"] },
    password: { type: String, required: [true, "Password is required"] },
    pin: { type: String, required: [true, "PIN is required"] },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RoleMaster",
      required: [false, "Role ID is required"],
    },
    socialMedia: [
      {
        name: {
          type: String,
          required: [true, "Social media name is required"],
        },
        url: { type: String, required: [true, "Social media URL is required"] },
      },
    ],
    status: {
      type: String,
      enum: Object.values(STATUS_ENUM),
      default: STATUS_ENUM.ACTIVE,
    },
    profilePicture: { type: String },
    address: { type: String },
    postcode: { type: String },
    reporterId: { type: String, required: [false, "Reporter ID is required"] },
    city: { type: String, required: [true, "City is required"] },
    country: { type: String, required: [true, "Country is required"] },
    state: { type: String, required: [true, "State is required"] },
    isDeleted: { type: Boolean, required: [true, ""], default: false },
  },
  { timestamps: true },
);

userMasterSchema.plugin(autoTrackPlugin);

const UserMaster = mongoose.model("UserMaster", userMasterSchema);

module.exports = UserMaster;
