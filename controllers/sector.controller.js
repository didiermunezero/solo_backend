const Sectors = require("../models/sector.model");
const Joi = require("joi");

const schema = Joi.object().keys({
  sector: Joi.string().max(20).min(4).required(),
  district: Joi.string().max(4).min(15).required(true),
});

exports.create = async (req, res) => {
  const validator = schema.validate(req.body);
  if (validator.error) {
    return res.status(200).send({
      message: validator.error.details[0].message,
    });
  }
  const exists = await Sectors.findOne({
    sector: req.body.name,
    district: req.body.district,
  });
  if (exists) {
    res.status(200).send({ message: "Sector exists already" });
  }

  const create_one = new Sectors(req.body);

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
  await Sectors.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};

exports.findByDistrict = async (req, res) => {
  await Sectors.find({ district: req.params.district })
    .then((data) => {
      res.status(200).send(data);
    })
    .then((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};

exports.findOne = async (res, req) => {
  await Sectors.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};

exports.delete = async (req, res) => {
  await Sectors.findByIdAndRemove(req.params.id)
    .then((sector) => {
      if (!sector) {
        res.status(200).send({ message: "Sector removed" });
      }
    })
    .catch((err) => {
      res.status(200).send({ message: "Error Occurred" });
    });
};
