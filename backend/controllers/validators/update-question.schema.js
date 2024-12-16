const Joi = require('joi');

// Define the validation schema
const updateQuestionSchema = Joi.object({
    question: Joi.string().trim().optional(),
    answer: Joi.string().trim().optional(),
    updatedBy: Joi.string().email().required(),
    assignee: Joi.string().email().allow(null, ).optional(),
    properties: Joi.array()
        .items(Joi.string().optional())
        .optional(),
    tags: Joi.array()
        .items(Joi.string().optional())
        .optional(),
    description: Joi.string().optional(),
});

module.exports = updateQuestionSchema;
