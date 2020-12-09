const Users = require("../models/user.model");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const schema = Joi.object().keys({
  fname: Joi.string().min(3).max(30).required(),
  lname: Joi.string().min(3).max(30).required(),
  gender: Joi.string().min(4).max(6).required(),
  phone: Joi.string().min(10).max(14).required(),
  district: Joi.string().min(3).max(30).required(),
  sector: Joi.string().min(24).max(24).required(),
  policy: Joi.boolean(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(10).max(14).required(),
  profile: Joi.string().min(20).max(50),
});

exports.create = async (req, res) => {
  console.log(req.body);
  var user = await Users.findOne({
    email: req.body.email,
  });
  if (user) {
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
  const create_one = new Users({
    fname: req.body.fname,
    lname: req.body.lname,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    profile: req.body.profile,
    district: req.body.district,
    sector: req.body.sector,
  });

  await create_one
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("error occurred while creating the user");
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};

exports.findAll = async (req, res) => {
  await Users.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

exports.findOne = async (req, res) => {
  await Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving User with id " + req.params.id,
      });
    });
};

exports.update = async (req, res) => {
  const existingUser = await Users.findOne({
    _id: req.params.id,
  });
  if (!existingUser) {
    return res.send({ message: "User not found" });
  }
  //validate user
  const validator = schema.validate(req.body);
  if (validator.error)
    return res.status(404).send({
      message: validator.error.details[0].message,
    });
  const sameUser = await Users.findOne({
    _id: {
      $ne: req.params.id,
    },
    email: req.body.email,
  });
  if (sameUser) {
    return res.send({
      message: `User with ${req.body.email} (same email) arleady exists`,
    });
  }

  existingUser.email = req.body.email;
  existingUser.fname = req.body.fname;
  existingUser.lname = req.body.lname;
  existingUser.phone = req.body.phone;
  existingUser.district = req.body.district;
  existingUser.province = req.body.province;
  existingUser.gender = req.body.gender;
  existingUser.password = req.body.password;
  const updatedUser = await existingUser.save();
  res.send(updatedUser);
};

exports.delete = async (req, res) => {
  await Users.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      res.send({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "user not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id,
      });
    });
};

exports.login = async (req, res) => {
  console.log(req.body);
  var user = await Users.findOne({
    email: req.body.email,
  });
  if (!user) {
    return res.send({ message: "invalid credentials" }).status(400);
  }

  const isEqual = await bcrypt.compare(req.body.password, user.password);

  if (!isEqual) {
    return res.send({ message: "invalid password" }).status(400);
  }

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
    },
    "jwtencryptionkey",
    { expiresIn: "1h" }
  );
  return res.send({ user: user, token: token }).status(200);
};
