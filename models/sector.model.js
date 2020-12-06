const mongoose = require("mongoose");

const SectorSchema = mongoose.Schema(
  {
    sector: {
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

SectorSchema.virtual("districts", {
  ref: "District",
  localField: "district",
  foreignField: "_id",
  justOne: true,
});

module.exports = mongoose.model("Sector", SectorSchema);
