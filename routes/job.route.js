import { Router } from 'express'
import {
  getAllJobs,
  getJob,
  createJobs,
  updateJobs,
  deleteJobs,
} from '../controllers/job.controller.js'

const router = Router()

router.route('/').get(getAllJobs).post(createJobs)
router.route('/:id').get(getJob).put(updateJobs).delete(deleteJobs)

export default router
