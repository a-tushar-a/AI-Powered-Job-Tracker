import { Router } from 'express';
import { getJobs, createJob, updateJob, deleteJob } from '../controllers/job.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect); // All job routes are protected

router.route('/')
  .get(getJobs)
  .post(createJob);

router.route('/:id')
  .put(updateJob)
  .delete(deleteJob);

export default router;
