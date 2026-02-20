import { Router } from 'express';
import { createAnswer, getAnswers, getAnswerById, updateAnswer, deleteAnswer } from '../controllers/answerFeedback.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { createInterviewAnswerSchema, updateInterviewAnswerSchema } from '../utils/validation';

const router = Router();

router.use(authMiddleware);

router.post('/', validate(createInterviewAnswerSchema), createAnswer);
router.get('/', getAnswers);
router.get('/:id', getAnswerById);
router.patch('/:id', validate(updateInterviewAnswerSchema), updateAnswer);
router.delete('/:id', deleteAnswer);

export default router;
