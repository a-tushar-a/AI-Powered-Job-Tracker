import { Router } from 'express';
import { registerUser, loginUser, getMe } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getMe);

export default router;