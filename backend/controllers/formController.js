import ApplicationForm from '../models/ApplicationForm.js'
import User from '../models/User.js'

// Submit form
export const submitForm = async (req, res) => {
  try {
    const { position, projectDescription, budget, timeline } = req.body

    // Validate required fields
    if (!position || !projectDescription) {
      return res.status(400).json({
        success: false,
        message: 'Please provide position and project description'
      })
    }

    // Get user from database
    const user = await User.findById(req.userId)
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    // Create form submission
    const applicationForm = await ApplicationForm.create({
      user: req.userId,
      position,
      projectDescription,
      budget: budget || '',
      timeline: timeline || ''
    })

    res.status(201).json({
      success: true,
      message: 'Form submitted successfully',
      applicationForm: {
        id: applicationForm._id,
        status: applicationForm.status,
        submittedAt: applicationForm.submittedAt
      }
    })
  } catch (error) {
    console.error('Form submission error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error submitting form'
    })
  }
}

// Get user's applications
export const getUserApplications = async (req, res) => {
  try {
    const applications = await ApplicationForm.find({ user: req.userId })
      .sort({ submittedAt: -1 })

    res.status(200).json({
      success: true,
      applications
    })
  } catch (error) {
    console.error('Get applications error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching applications'
    })
  }
}

// Get specific application
export const getApplicationById = async (req, res) => {
  try {
    const { id } = req.params

    const application = await ApplicationForm.findById(id).populate('user', '-password')

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      })
    }

    // Check if user owns this application
    if (application.user._id.toString() !== req.userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this application'
      })
    }

    res.status(200).json({
      success: true,
      application
    })
  } catch (error) {
    console.error('Get application error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching application'
    })
  }
}
