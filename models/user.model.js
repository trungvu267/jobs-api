import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'you must be provide name '],
    minLength: 6,
    maxLength: 20,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'you must be provide password'],
    minlength: 6,
  },
})

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_TIME_LIFE }
  )
}
UserSchema.methods.comparePassword = async function (isComingPassword) {
  const isMatch = await bcrypt.compare(isComingPassword, this.password)
  return isMatch
}

export default model('User', UserSchema)
