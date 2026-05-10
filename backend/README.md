# Backend Setup

This is the Node.js/Express backend for the Profile Portal application with MongoDB integration.

## Prerequisites

- Node.js (v14+)
- MongoDB (running locally or remote)
- npm or yarn

## Installation & Running

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

Create a `.env` file in the backend folder (use `.env.example` as reference):

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
- `MONGODB_URI`: Your MongoDB connection string (default: `mongodb://localhost:27017/profile-portal`)
- `JWT_SECRET`: Your JWT secret key
- `PORT`: Server port (default: 5000)

### 3. Start Development Server

```bash
npm run dev
```

Or for production:

```bash
npm start
```

The server will run at `http://localhost:5000`

## MongoDB Setup (Local)

If you don't have MongoDB installed locally, you can:

1. **Install MongoDB Community Edition**: https://www.mongodb.com/try/download/community
2. **Or use MongoDB Atlas (Cloud)**:
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a cluster
   - Get your connection string
   - Update `MONGODB_URI` in `.env`

### Quick MongoDB Setup on Windows

```powershell
# Download and install MongoDB from the official website
# Or use Chocolatey:
choco install mongodb-community

# Start MongoDB service
mongod

# Verify connection
mongo
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login

### User
- `GET /api/user/:email` - Get user by email (public)
- `GET /api/user` - Get current user (protected)

### Form
- `POST /api/form/submit` - Submit application form (protected)
- `GET /api/form` - Get user's applications (protected)
- `GET /api/form/:id` - Get specific application (protected)

### Health
- `GET /api/health` - Server health check

## Database Models

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  phone: String,
  company: String,
  experience: Number,
  note: String,
  createdAt: Date
}
```

### ApplicationForm Schema
```javascript
{
  user: ObjectId (ref: User),
  position: String,
  projectDescription: String,
  budget: String,
  timeline: String,
  status: String (pending|reviewed|approved|rejected),
  submittedAt: Date
}
```

## Testing with cURL

### Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Tech Corp",
    "experience": 5,
    "note": "Interested in backend development",
    "password": "MySecurePassword123"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "MySecurePassword123"
  }'
```

## Notes

- Passwords are hashed using bcryptjs
- JWT tokens are used for authentication
- Users set their own password during signup (minimum 6 characters)
- CORS is configured to accept requests from `http://localhost:5173` (React dev server)
