import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || ''

if (import.meta.env.PROD && !API_URL) {
  console.error('Missing VITE_API_URL. Set it to your deployed backend URL and redeploy the frontend.')
}

const api = axios.create({
  baseURL: API_URL.replace(/\/$/, '')
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
