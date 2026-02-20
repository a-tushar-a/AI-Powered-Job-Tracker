import Joi from 'joi';

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const createInterviewAnswerSchema = Joi.object({
    jobId: Joi.string().uuid().required(),
    question: Joi.string().required(),
    answer: Joi.string().required(),
});

export const updateInterviewAnswerSchema = Joi.object({
    question: Joi.string(),
    answer: Joi.string(),
    feedback: Joi.string(),
    score: Joi.number(),
});
