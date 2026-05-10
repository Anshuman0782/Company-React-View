import { useNavigate } from 'react-router-dom'

export default function ThankYouPage({ userEmail, onLogout }) {
  const navigate = useNavigate()

  const handleViewApplication = () => {
    navigate('/applications')
  }

  const handleLogoutClick = () => {
    onLogout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md bg-white rounded-lg shadow-md p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="bg-green-100 rounded-full p-6">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h2>
        <p className="text-gray-600 mb-2">Your application has been submitted successfully.</p>
        <p className="text-gray-500 text-sm mb-6">
          We have received your information and will review it shortly.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleViewApplication}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            View Your Application
          </button>
          
          <button
            onClick={handleLogoutClick}
            className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>

        <p className="mt-6 text-xs text-gray-500">
          Email sent to: <span className="font-medium">{userEmail}</span>
        </p>
      </div>
    </div>
  )
}
