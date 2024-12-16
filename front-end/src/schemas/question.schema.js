import Joi from 'joi';

export const questionSchema = Joi.object({
  question: Joi.string().trim().required().label('Question'),
  answer: Joi.string().allow(null, '').optional().trim().label('Answer'),
  assignee: Joi.string()
    .email({ tlds: false })
    .allow(null, '')
    .optional()
    .label('Assigned To'),
  properties: Joi.array()
    .items(Joi.string().optional())
    .allow(null, '')
    .optional()
    .label('Properties'),
  tags: Joi.array()
    .items(Joi.string().optional())
    .allow(null, '')
    .optional()
    .label('Tags'),
  description: Joi.string().allow(null, '').optional().label('Description'),
});
