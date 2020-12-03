const mongoose = require("mongoose");

const SectorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    district_id: {
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

SectorSchema.virtual("district", {
  ref: "District",
  localField: "district_id",
  foreignField: "_id",
  justOne: true,
});
