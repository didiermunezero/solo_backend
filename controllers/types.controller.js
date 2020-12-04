const Types = require("../models/types.model");
const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().max(20).min(4).required(),
  title: Joi.string().min(2).max(4),
  description: Joi.string().max(10).min(50).required(true),
});

exports.create = async (req, res) => {
  const validator = schema.validate(req.body);
  if (validator.error) {
    return res.status(400).send({
      message: validator.error.details[0].message,
    });
  }
  const exists = await Types.findOne({
    name: req.body.name,
  });
  if (exists) {
    res.status(400).send({ message: "Type exists already" });
  }

  const create_one = new Types(req.body);

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
  await Types.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: "Error Occurred" });
    });
};

exports.findOne = async (res, req) => {
  await Types.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: "Error Occurred" });
    });
};

exports.delete = async (req, res) => {
  await Types.findByIdAndRemove(req.params.id)
    .then((type) => {
      if (!type) {
        res.status(200).send({ message: "Sector removed" });
      }
    })
    .catch((err) => {
      res.status(400).send({ message: "Error Occurred" });
    });
};

exports.update = async (req, res) => {
  const validator = schema.validate(req.body);
  if (validator.error) {
    return res.status(400).send({
      message: validator.error.details[0].message,
    });
  }
  if (mongooose.Types.ObjectId(req.params.id)) {
    res.status(400).send({ message: "Invalid Id" });
  }
  await Types.findByIdAndUpdate(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: "Error Occurred",
      });
    });
};
