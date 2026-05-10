import mongoose from 'mongoose'

const applicationFormSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  position: {
    type: String,
    required: [true, 'Please provide your position']
  },
  projectDescription: {
    type: String,
    required: [true, 'Please provide project description']
  },
  budget: {
    type: String,
    default: ''
  },
  timeline: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved', 'rejected'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('ApplicationForm', applicationFormSchema)
