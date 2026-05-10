import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

export default function ApplicationsPage({ userEmail, onLogout }) {
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const response = await api.get('/api/form')

      if (response.data.success) {
        setApplications(response.data.applications)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login')
  }

  const handleViewApplication = (applicationId) => {
    navigate(`/application/${applicationId}`)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'reviewed':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <p className="text-gray-600">Loading applications...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Applications</h1>
            <p className="text-gray-600 mt-1">View all your submitted applications</p>
          </div>
          <button
            onClick={handleLogoutClick}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Applications Yet</h3>
            <p className="text-gray-600 mb-6">You haven't submitted any applications yet.</p>
            <button
              onClick={() => navigate('/form')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Submit New Application
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div key={app._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{app.position}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      Submitted on {new Date(app.submittedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                    {getStatusLabel(app.status)}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 line-clamp-2">
                  {app.projectDescription}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  {app.budget && (
                    <div>
                      <p className="text-gray-500">Budget</p>
                      <p className="text-gray-900 font-medium">{app.budget}</p>
                    </div>
                  )}
                  {app.timeline && (
                    <div>
                      <p className="text-gray-500">Timeline</p>
                      <p className="text-gray-900 font-medium">{app.timeline}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleViewApplication(app._id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Submit New Application Button */}
        {applications.length > 0 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/form')}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
            >
              Submit New Application
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
