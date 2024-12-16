const Joi = require('joi');

// Define the validation schema
const createPropertySchema = Joi.object({
  key: Joi.string().trim().required(),
  value: Joi.string().trim().required(),
});

module.exports = createPropertySchema;
