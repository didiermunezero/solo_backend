const mongoose = require("mongoose");

const DistrictSchema = mongoose.Schema({
  district: {
    type: String,
    required: true,
  },
  province: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("District", DistrictSchema);
