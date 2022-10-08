import mongoose from 'mongoose'
import User from './user.model.js'

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide company name'],
      maxLength: 50,
    },
    position: {
      type: String,
      required: [true, 'Please provide position name'],
      maxLength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: User,
      required: [true, 'please provide user'],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Job', JobSchema)
