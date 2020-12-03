const Employees = require("../models/employee.model");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const schema = Joi.object().keys({
  fname: Joi.string().min(3).max(30).required(),
  lname: Joi.string().min(3).max(30).required(),
  gender: Joi.string().min(4).max(6).required(),
  phone: Joi.string().min(10).max(14).required(),
  district: Joi.string().min(24).max(24).required(),
  sector: Joi.string().min(24).max(24).required(),
  employee_type: Joi.string().min(24).max(24).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string().min(10).max(14).required(),
  profile: Joi.string().min(20).max(50),
});

exports.create = async (req, res) => {
  console.log(req.body);
  var employee = await Employees.findOne({
    email: req.body.email,
  });
  if (employee) {
    return res.send("Email exists").status(400);
  }
  //Admin validation
  const validator = schema.validate(req.body);
  if (validator.error) {
    console.log(validator.error.details[0].message);
    return res.status(200).send({
      message: validator.error.details[0].message,
    });
  }
  req.body.password = await bcrypt.hash(req.body.password, 12);
  const create_one = new Employees({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    profile: req.body.profile,
    district: req.body.district,
    sector: req.body.province,
  });

  await create_one
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("error occurred while creating the employee");
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the employee.",
      });
    });
};

exports.findAll = async (req, res) => {
  await Employees.find()
    .then((employees) => {
      res.send(employees);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving employees.",
      });
    });
};

exports.findOne = async (req, res) => {
  await Employees.findById(req.params.id)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "employee not found with id " + req.params.id,
        });
      }
      res.send(employee);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "employee not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving employee with id " + req.params.id,
      });
    });
};

exports.update = async (req, res) => {
  const existingemployee = await Employees.findOne({
    _id: req.params.id,
  });
  if (!existingemployee) {
    return res.send({ message: "employee not found" });
  }
  //validate employee
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(404).send({
      message: validator.error.details[0].message,
    });
  const sameemployee = await Category.findOne({
    _id: {
      $ne: req.params.id,
    },
    email: req.body.email,
  });
  if (sameemployee) {
    return res.send({
      message: `employee with ${req.body.email} (same email) arleady exists`,
    });
  }

  existingemployee.email = req.body.email;
  existingemployee.fname = req.body.fname;
  existingemployee.lname = req.body.lname;
  existingemployee.phone = req.body.phone;
  existingemployee.district = req.body.district;
  existingemployee.province = req.body.province;
  existingemployee.gender = req.body.gender;
  existingemployee.password = req.body.password;
  const updatedemployee = await existingemployee.save();
  res.send(updatedemployee);
};

exports.delete = async (req, res) => {
  await Employees.findByIdAndRemove(req.params.id)
    .then((employee) => {
      if (!employee) {
        return res.status(404).send({
          message: "employee not found with id " + req.params.id,
        });
      }
      res.send({ message: "employee deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "employee not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete employee with id " + req.params.id,
      });
    });
};

exports.login = async (req, res) => {
  var employee = await Employees.findOne({
    $or: {
      email: req.body.email,
    },
  });
  if (!employee) {
    return res.send({ message: "invalid credentials" }).status(400);
  }

  const isEqual = await bcrypt.compare(req.body.password, employee.password);

  if (!isEqual) {
    return res.send({ message: "invalid credentials" }).status(400);
  }

  const token = jwt.sign(
    {
      employeeId: employee._id.toString(),
      email: employee.email,
    },
    "jwtencryptionkey",
    { expiresIn: "1h" }
  );
  console.log(token);
  return { token: token };
};
