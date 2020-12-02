const mongoose = require("mongoose")


const EmployeeSchema = mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    ,
    profile:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    province:{
        type: String,
        required: true
    },
    district:{
        type: String,
        required: true
    },
    employee_type:{
        type: mongoose.Types.ObjectId,
        ref: "Type"
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)
EmployeeSchema.virtual("type", {
    ref: "Type",
    localField: "employee_type",
    foreignField: "_id",
    justOne: true,
  });

module.exports = mongoose.model("Employee", EmployeeSchema);
