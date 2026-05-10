import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import FormPage from './pages/FormPage'
import ThankYouPage from './pages/ThankYouPage'
import ApplicationsPage from './pages/ApplicationsPage'
import ApplicationDetailPage from './pages/ApplicationDetailPage'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Check if user is already logged in
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      setIsAuthenticated(true)
      setUserEmail(storedEmail)
    }
  }, [])

  const handleLoginSuccess = (email) => {
    setIsAuthenticated(true)
    setUserEmail(email)
    localStorage.setItem('userEmail', email)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserEmail('')
    localStorage.removeItem('userEmail')
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/form" />
            ) : (
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            )
          } 
        />
        <Route 
          path="/signup" 
          element={
            isAuthenticated ? (
              <Navigate to="/form" />
            ) : (
              <SignupPage onSignupSuccess={handleLoginSuccess} />
            )
          } 
        />
        <Route 
          path="/form" 
          element={
            isAuthenticated ? (
              <FormPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/thank-you" 
          element={
            isAuthenticated ? (
              <ThankYouPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/applications" 
          element={
            isAuthenticated ? (
              <ApplicationsPage userEmail={userEmail} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route 
          path="/application/:id" 
          element={
            isAuthenticated ? (
              <ApplicationDetailPage onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  )
}

export default App
