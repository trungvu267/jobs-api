import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { StatusCodes } from 'http-status-codes'

const authentication = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication Invalid' })
    return
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    req.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Authentication Invalid' })
  }
}

export default authentication
