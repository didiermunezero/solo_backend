const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profile: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    sector: {
      type: mongoose.Types.ObjectId,
      ref: "Sector",
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
UserSchema.virtual("sectors", {
  ref: "Sector",
  localField: "sector",
  foreignField: "_id",
  justOne: true,
});
module.exports = mongoose.model("User", UserSchema);
