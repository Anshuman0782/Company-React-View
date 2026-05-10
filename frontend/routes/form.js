import express from 'express'
import { submitForm, getUserApplications, getApplicationById } from '../controllers/formController.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

// Protected routes
router.post('/submit', protect, submitForm)
router.get('/', protect, getUserApplications)
router.get('/:id', protect, getApplicationById)

export default router
