import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'
import formRoutes from './routes/form.js'

dotenv.config()

const app = express()
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,https://company-react-view.vercel.app')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean)
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/profile-portal'

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))

const requireDatabase = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      success: false,
      message: 'Database is not connected. Check MONGODB_URI and MongoDB Atlas network access.'
    })
  }

  next()
}

// Routes
app.use('/api/auth', requireDatabase, authRoutes)
app.use('/api/user', requireDatabase, userRoutes)
app.use('/api/form', requireDatabase, formRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const PORT = process.env.PORT || 5000
mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 10000
})
  .then(() => {
    console.log('MongoDB connected')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  })
