import User from '../models/user.model.js'
import { StatusCodes } from 'http-status-codes'
const login = async (req, res, next) => {
  const { email, password } = req.body
  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Please, provide email and password!!!' })
    return
  }
  const user = await User.findOne({ email })
  if (!user) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Email was wrong' })
    return
  }
  const isCorrectPassword = await user.comparePassword(password)
  if (!isCorrectPassword) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Password was wrong' })
    return
  }
  const token = user.createJWT()
  res.status(200).json({ name: user.name, token })
}
const register = async (req, res, next) => {
  const user = await User.create(req.body)
  const token = user.createJWT()
  res.status(200).json({ user: { userName: user.name }, token })
}

export { login, register }
