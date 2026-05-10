import express from 'express'
import { getUserByEmail, getCurrentUser } from '../controllers/userController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Public route - get user by email
router.get('/:email', getUserByEmail)

// Protected routes
router.get('/', protect, getCurrentUser)

export default router
