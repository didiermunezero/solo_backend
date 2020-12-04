const Sectors = require("../models/sector.model");
const Joi = require("joi");

const schema = Joi.object().keys({
  name: Joi.string().max(20).min(4).required(),
  district: Joi.string().max(24).min(24).required(true),
});

exports.create = async (req, res) => {
  const validator = schema.validate(req.body);
  if (validator.error) {
    return res.status(400).send({
      message: validator.error.details[0].message,
    });
  }
  const exists = await Sectors.findOne(name, req.body.name);
  if (exists) {
    res.status(400).send({ message: "Sector exists already" });
  }
};
