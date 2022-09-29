const getAllJobs = async (req, res, next) => {
  res.status(200).json({ msg: 'get all jobs' })
}
const getJobs = async (req, res, next) => {
  res.status(200).json({ msg: 'get jobs' })
}
const createJobs = async (req, res, next) => {
  res.status(200).json({ msg: 'create job' })
}
const updateJobs = async (req, res, next) => {
  res.status(200).json({ msg: 'update jobs' })
}
const deleteJobs = async (req, res, next) => {
  res.status(200).json({ msg: 'delete jobs' })
}
export { getAllJobs, getJobs, createJobs, updateJobs, deleteJobs }
