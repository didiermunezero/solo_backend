const Districts = require("../models/district.model");
const Joi = require("joi");

const schema = Joi.object().keys({
  province: Joi.string().max(20).min(4).required(),
  district: Joi.string().max(15).min(4).required(true),
});

exports.create = async (req, res) => {
  const validator = schema.validate(req.body);
  if (validator.error) {
    res.send({
      message: validator.error.details[0].message,
    });
    return;
  }
  const exists = await Districts.findOne({
    district: req.body.district,
    province: req.body.province,
  });
  if (exists) {
    res.send({ message: "district exists already" });
    return;
  }

  const create_one = new Districts(req.body);

  await create_one
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("Error Occurred");
      res.status(500).send({
        message: err.message || "Error Occurred",
      });
    });
};

exports.findAll = async (req, res) => {
  await Districts.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};

exports.findByDistrict = async (req, res) => {
  await Districts.find({ district: req.params.district })
    .then((data) => {
      res.status(200).send(data);
    })
    .then((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};

exports.findOne = async (res, req) => {
  await Districts.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};

exports.delete = async (req, res) => {
  await Districts.findByIdAndRemove(req.params.id)
    .then((district) => {
      if (!district) {
        res.status(200).send({ message: "district removed" });
      }
    })
    .catch((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};
