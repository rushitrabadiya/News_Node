const mongoose = require("mongoose");

const autoTrackPlugin = (schema) => {
  // Add common fields to the schema
  schema.add({
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMaster",
      required: [false, "Created by user is required"],
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMaster",
      required: [false, "Updated by user is required"],
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserMaster",
      required: [false, "Deleted by user is required"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: [true, "Deletion status is required"],
    },
  });

  // Middleware to set createdBy on document creation
  schema.pre("save", function (next) {
    if (this.isNew && this._user) {
      this.createdBy = this._user; // Set createdBy if it's a new document
    }
    next();
  });

  // Middleware to set updatedBy on document update
  schema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (this._user) {
      update.updatedBy = this._user; // Set updatedBy during update
    }
    next();
  });

  // Middleware to set deletedBy and isDeleted on document deletion
  schema.pre("findOneAndDelete", function (next) {
    const update = this.getUpdate();
    if (this._user) {
      update.deletedBy = this._user; // Set deletedBy if user is provided
      update.isDeleted = true; // Set isDeleted to true when deleting
    }
    next();
  });
};

module.exports = autoTrackPlugin;
