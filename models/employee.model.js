const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema(
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
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    district: {
      type: mongoose.Types.ObjectId,
      ref: "District",
    },
    sector_id: {
      type: mongoose.Types.ObjectId,
      ref: "Sector",
    },
    employee_type: {
      type: mongoose.Types.ObjectId,
      ref: "Type",
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
EmployeeSchema.virtual("type", {
  ref: "Type",
  localField: "employee_type",
  foreignField: "_id",
  justOne: true,
});
EmployeeSchema.virtual("sector", {
  ref: "Sector",
  localField: "sector_id",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
