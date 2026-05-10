# Profile Portal Application

A full-stack application for user authentication and form submission with data auto-fill.

## Project Structure

```
profile-portal-frontend/
├── frontend/          # React application
├── backend/           # Node.js/Express server
└── README.md
```

## Features

1. **Authentication**
   - User signup with required fields: name, email, phone, company, experience
   - Optional note field
   - User login
   - Logout functionality

2. **Form Management**
   - Auto-fill form with user's signup data
   - Submit form with additional information
   - Thank you message after submission
   - View application option

3. **Database**
   - MongoDB for data storage

4. **Deployment**
   - Deploy to Vercel

## Build Phases

### Phase 1: Frontend Setup ✅
- Set up React with Vite
- Create signup/login page
- Create form component
- Set up state management and routing

### Phase 2: Backend Setup
- Set up Node.js/Express server
- Configure MongoDB connection
- Create authentication endpoints
- Create form submission endpoints

### Phase 3: Integration & Testing
- Connect frontend to backend APIs
- Test all features locally
- Bug fixes and optimization

### Phase 4: Deployment
- Deploy to Vercel

## Tech Stack

**Frontend:**
- React 18
- Vite
- React Router (navigation)
- Axios (API calls)
- TailwindCSS or CSS Modules (styling)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Getting Started

See individual README files in frontend/ and backend/ directories.
