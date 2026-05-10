import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// Generate JWT Token
const generateToken = (id, email) => {
  return jwt.sign(
    { id, email },
    process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production',
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  )
}

// Signup
export const signup = async (req, res) => {
  try {
    const { name, email, phone, company, experience, note, password } = req.body

    // Validate required fields
    if (!name || !email || !phone || !company || experience === undefined || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields including password'
      })
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      })
    }

    // Check if user already exists
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Create user with provided password
    user = await User.create({
      name,
      email,
      phone,
      company,
      experience,
      note,
      password
    })

    // Generate token
    const token = generateToken(user._id, user.email)

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error in signup'
    })
  }
}

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      })
    }

    // Check for user (include password since it's select: false by default)
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Generate token
    const token = generateToken(user._id, user.email)

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error in login'
    })
  }
}
