# Profile Portal - Full Setup & Testing Guide

## 📋 Project Overview

A full-stack application for user authentication and form submission with MongoDB database.

**Tech Stack:**
- **Frontend:** React 18, Vite, TailwindCSS, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs
- **Database:** MongoDB

## 📁 Project Structure

```
profile-portal-frontend/
├── frontend/                 # React application
│   ├── src/
│   │   ├── pages/           # Page components
│   │   ├── App.jsx          # Main app with routing
│   │   └── index.css        # Global styles
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js/Express server
│   ├── models/              # MongoDB schemas
│   ├── controllers/         # Route handlers
│   ├── routes/              # API routes
│   ├── middleware/          # Auth middleware
│   ├── server.js            # Entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started - Phase by Phase

### Phase 1: Setup & Installation

#### 1.1 Frontend Setup

```powershell
cd frontend
npm install
```

#### 1.2 Backend Setup

```powershell
cd backend
npm install
```

#### 1.3 MongoDB Setup

You have 3 options:

**Option A: Local MongoDB (Recommended for Development)**

1. Download and install from: https://www.mongodb.com/try/download/community
2. Start MongoDB service:
   ```powershell
   mongod
   ```
3. The default URI `mongodb://localhost:27017/profile-portal` will work

**Option B: MongoDB Community Edition via Chocolatey (Windows)**

```powershell
choco install mongodb-community
mongod
```

**Option C: MongoDB Atlas (Cloud)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account and cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/profile-portal
   ```

### Phase 2: Running Locally

#### Terminal 1 - Start MongoDB (if using local)

```powershell
mongod
```

#### Terminal 2 - Start Backend Server

```powershell
cd backend
npm run dev
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

#### Terminal 3 - Start Frontend Development Server

```powershell
cd frontend
npm run dev
```

Expected output:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Phase 3: Testing the Application

#### Test 1: Signup Flow

1. Open browser: `http://localhost:5173`
2. Click "Sign Up"
3. Fill in the form:
   - Name: `John Doe`
   - Email: `john@example.com`
   - Phone: `+1234567890`
   - Company: `Tech Corp`
   - Experience: `5`
   - Note: (optional)
4. Click "Sign Up"
5. Should redirect to Form page with data pre-filled

#### Test 2: Login Flow

1. On Form page, click "Logout"
2. Click "Log in"
3. Login with:
   - Email: `john@example.com`
   - Password: `Tech Corp0` (company name + last 4 digits of phone)
4. Should redirect to Form page with data pre-filled

#### Test 3: Form Submission

1. Logged in on Form page
2. Fill additional information:
   - Position: `Senior Developer`
   - Project Description: `Web application for...`
   - Budget: (optional)
   - Timeline: (optional)
3. Click "Submit Form"
4. Should show "Thank You" page
5. Can click "View Your Application" (feature for later implementation)
6. Click "Logout" to return to login

### Phase 4: API Testing with Postman/cURL

#### Test Signup

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+9876543210",
    "company": "Innovation Inc",
    "experience": 8,
    "note": "Full-stack developer"
  }'
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGc...",
  "user": {
    "id": "507f...",
    "name": "Jane Smith",
    "email": "jane@example.com"
  }
}
```

#### Test Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "Innovation Inc0"
  }'
```

#### Test Get User

```bash
curl -X GET http://localhost:5000/api/user/jane@example.com
```

#### Test Submit Form (with token from login response)

```bash
curl -X POST http://localhost:5000/api/form/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "position": "Lead Developer",
    "projectDescription": "Building a mobile app",
    "budget": "$50,000",
    "timeline": "6 months"
  }'
```

### Phase 5: Troubleshooting

#### Frontend Issues

| Issue | Solution |
|-------|----------|
| Port 5173 already in use | Kill process or change port in `vite.config.js` |
| API calls failing | Check backend is running on port 5000 |
| Components not showing | Check browser console for errors (F12) |
| Styling not applied | Clear browser cache (Ctrl+Shift+Delete) |

#### Backend Issues

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Ensure MongoDB service is running (`mongod`) |
| Port 5000 already in use | Change PORT in `.env` or kill process |
| CORS errors | Check frontend URL matches in `server.js` |
| Token issues | Ensure JWT_SECRET is set in `.env` |

#### Database Issues

| Issue | Solution |
|-------|----------|
| Database empty after restart | Check MongoDB data persistence |
| Duplicate email error | Clear database and restart: `mongo` → `use profile-portal` → `db.dropDatabase()` |

### Phase 6: Before Deployment

#### Security Checklist

- [ ] Change `JWT_SECRET` in `.env` (use a strong random string)
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Review all validation in controllers
- [ ] Add rate limiting (optional)
- [ ] Add input sanitization (optional)

#### Performance Optimization

- [ ] Run `npm run build` in frontend
- [ ] Minimize database queries
- [ ] Add indexes to MongoDB (optional)
- [ ] Enable caching headers (optional)

## 📱 Features Implemented

### ✅ Authentication
- User signup with comprehensive form
- User login with email/password
- JWT token-based authentication
- Password hashing with bcryptjs
- Logout functionality

### ✅ Form Management
- Auto-filled form with signup data
- Additional form fields for project details
- Form submission to database
- Thank you confirmation page

### ✅ Data Management
- MongoDB database for persistence
- User profile management
- Application form storage

## 🌐 Next Steps: Deployment to Vercel

(Will implement after local testing)

1. Push frontend to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy frontend
5. Deploy backend (use Heroku/Render/Railway)
6. Update API URLs in frontend

## 📚 Useful Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/)
- [Vercel Deployment](https://vercel.com/docs)

## 🤝 Support

If you encounter any issues:

1. Check the Troubleshooting section above
2. Review console logs (browser F12 for frontend, terminal for backend)
3. Verify all services are running (MongoDB, Backend, Frontend)
4. Ensure correct port numbers are used
5. Check network connectivity

---

**Good luck! 🎉 Now let's test this locally before deployment.**
