import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

export default function ApplicationDetailPage({ onLogout }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [application, setApplication] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplicationDetail()
  }, [id])

  const fetchApplicationDetail = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`http://localhost:5000/api/form/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.data.success) {
        setApplication(response.data.application)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load application')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-600">Loading application...</p>
      </div>
    )
  }

  if (error || !application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-red-600 mb-6">{error || 'Application not found'}</p>
            <button
              onClick={() => navigate('/applications')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Back to Applications
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Application Details</h1>
          <button
            onClick={handleLogoutClick}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Status */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm mb-2">Status</p>
                <span className={`inline-block px-6 py-2 rounded-full text-sm font-bold border-2 ${getStatusColor(application.status)}`}>
                  {getStatusLabel(application.status)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-gray-600 text-sm mb-2">Submitted On</p>
                <p className="text-gray-900 font-medium">
                  {new Date(application.submittedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* User Information */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">User Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Name</p>
                <p className="text-gray-900 font-medium">{application.user.name}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Email</p>
                <p className="text-gray-900 font-medium">{application.user.email}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Phone</p>
                <p className="text-gray-900 font-medium">{application.user.phone}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Company</p>
                <p className="text-gray-900 font-medium">{application.user.company}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Experience</p>
                <p className="text-gray-900 font-medium">{application.user.experience} years</p>
              </div>
              {application.user.note && (
                <div>
                  <p className="text-gray-600 text-sm mb-1">Additional Notes</p>
                  <p className="text-gray-900 font-medium">{application.user.note}</p>
                </div>
              )}
            </div>
          </div>

          {/* Application Information */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Application Information</h2>
            
            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Position</p>
              <p className="text-gray-900 font-medium text-lg">{application.position}</p>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-2">Project Description</p>
              <p className="text-gray-900 whitespace-pre-wrap">{application.projectDescription}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {application.budget && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Budget</p>
                  <p className="text-gray-900 font-medium">{application.budget}</p>
                </div>
              )}
              {application.timeline && (
                <div>
                  <p className="text-gray-600 text-sm mb-2">Timeline</p>
                  <p className="text-gray-900 font-medium">{application.timeline}</p>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 pt-8 border-t border-gray-200">
            <button
              onClick={() => navigate('/applications')}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Applications
            </button>
            <button
              onClick={() => navigate('/form')}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Submit New Application
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
