const mongoose = require("mongoose");

const SectorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district: {
      type: mongoose.Types.ObjectId,
      ref: "District",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

SectorSchema.virtuals("district", {
  ref: "District",
  localField: "district",
  foreignField: "_id",
  justOne: true,
});
