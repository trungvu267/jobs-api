import { StatusCodes } from 'http-status-codes'
import Job from '../models/job.model.js'
const getAllJobs = async (req, res, next) => {
  const userId = req.user.userId
  const jobs = await Job.find({ createdBy: userId })
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getJob = async (req, res) => {
  const { userId } = req.user
  const { id: jobId } = req.params
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'Job not found' })
    return
  }
  res.status(200).json({ job })
}
const createJobs = async (req, res, next) => {
  req.body.createdBy = req.user.userId
  const job = await Job.create(req.body)
  res.status(StatusCodes.CREATED).json({ job })
}
const updateJobs = async (req, res, next) => {
  const { userId } = req.user
  const { id: jobId } = req.params
  const { company, position } = req.body
  if (company === '' || position === '') {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Company or Position fields cannot be empty' })
    return
  }
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: userId },
    { company, position },
    { new: true }
  )
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'Job not found' })
    return
  }
  res.status(200).json({ job })
}
const deleteJobs = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req
  const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId })
  if (!job) {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'Job not found' })
    return
  }
  res.status(200).json({ msg: 'delete completed' })
}
export { getAllJobs, getJob, createJobs, updateJobs, deleteJobs }
