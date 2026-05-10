import User from '../models/User.js'

// Get user by email
export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params

    const user = await User.findOne({ email }).select('-password')
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        experience: user.experience,
        note: user.note
      }
    })
  } catch (error) {
    console.error('Get user error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user'
    })
  }
}

// Get current user (authenticated)
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        company: user.company,
        experience: user.experience,
        note: user.note
      }
    })
  } catch (error) {
    console.error('Get current user error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching user'
    })
  }
}
