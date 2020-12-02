const mongoose = require("mongoose")


const TypeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
},
{
    timestamps: true,
  }
)

module.exports = mongoose.model("Type", TypeSchema);
