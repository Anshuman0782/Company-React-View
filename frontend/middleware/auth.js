import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this route' 
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_this_in_production')
    req.userId = decoded.id
    req.userEmail = decoded.email
    next()
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Not authorized to access this route' 
    })
  }
}

export default protect
