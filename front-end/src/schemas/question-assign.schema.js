import Joi from 'joi';

export const questionAssignSchema = Joi.object({
  assignee: Joi.string().email({ tlds: false }).optional().label('Assigned To'),
});
