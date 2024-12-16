const Joi = require('joi');

// Define the validation schema
const createQuestionSchema = Joi.object({
  companyId: Joi.number().integer().required(),
  question: Joi.string().trim().required(),
  answer: Joi.string().trim().allow(null, '').optional(),
  createdBy: Joi.string().email().required(),
  updatedAt: Joi.date().iso().optional(),
  updatedBy: Joi.string().email().optional(),
  assignee: Joi.string().email().allow(null, '').optional(),
  properties: Joi.array().items(Joi.string().optional()).optional(),
  tags: Joi.array().items(Joi.string().optional()).optional(),
  description: Joi.string().allow(null, '').optional(),
});

module.exports = createQuestionSchema;
