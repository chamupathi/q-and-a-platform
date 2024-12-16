const Joi = require('joi');

// Define the validation schema
const createTagSchema = Joi.object({
  name: Joi.string().trim().required(),
});

module.exports = createTagSchema;
