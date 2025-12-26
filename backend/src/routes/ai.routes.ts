import { Router } from 'express';
import { analyzeResume, generateQuestions } from '../controllers/ai.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect); // All AI routes are protected

router.post('/analyze-resume/:jobId', analyzeResume);
router.post('/generate-questions', generateQuestions);

export default router;
