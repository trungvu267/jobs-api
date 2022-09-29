import { Router } from 'express'
import {
  getAllJobs,
  getJobs,
  createJobs,
  updateJobs,
  deleteJobs,
} from '../controllers/job.controller.js'

const router = Router()

router.get('/get-all-jobs', getAllJobs)
router.get('/get-job', getJobs)
router.post('/create-job', createJobs)
router.put('/update-job', updateJobs)
router.delete('/delete-job', deleteJobs)

export default router
