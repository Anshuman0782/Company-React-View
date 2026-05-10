# 🚀 Quick Start Testing Guide

## What's Built ✅

### Frontend (React + Vite)
- ✅ Signup page (collects: name, email, phone, company, experience, note)
- ✅ Login page (email + password)
- ✅ Application form with auto-filled user data
- ✅ Thank you confirmation page
- ✅ Logout functionality
- ✅ Route protection (auth redirects)

### Backend (Node.js + Express)
- ✅ MongoDB integration
- ✅ User signup & login with JWT
- ✅ Password hashing (bcryptjs)
- ✅ Protected routes with JWT middleware
- ✅ User data retrieval
- ✅ Form submission

### Database (MongoDB)
- ✅ User collection with all signup data
- ✅ ApplicationForm collection for submissions

---

## 🧪 Local Testing - Step by Step

### Prerequisites Check

```powershell
# Check Node.js installed
node --version  # Should be v14+

# Check npm installed
npm --version   # Should be v6+
```

### Step 1: Setup & Install Dependencies

**Terminal 1 - Frontend Setup:**
```powershell
cd d:\profile-portal-frontend\frontend
npm install
```

Expected: Should complete without errors

**Terminal 2 - Backend Setup:**
```powershell
cd d:\profile-portal-frontend\backend
npm install
```

Expected: Should complete without errors

### Step 2: Start MongoDB

**Terminal 3 - MongoDB:**
```powershell
mongod
```

Expected output:
```
[initandlisten] Waiting for connections on port 27017
```

If MongoDB not installed:
1. Download from: https://www.mongodb.com/try/download/community
2. Install and run
3. Or use MongoDB Atlas (cloud version)

### Step 3: Start Backend Server

**Terminal 2 (after npm install):**
```powershell
npm run dev
```

Expected output:
```
✅ MongoDB connected
🚀 Server running on http://localhost:5000
```

### Step 4: Start Frontend Dev Server

**Terminal 1 (after npm install):**
```powershell
npm run dev
```

Expected output:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
```

### Step 5: Open in Browser

Navigate to: **http://localhost:5173**

---

## 📝 Test Flows

### Test 1: Signup & Form Submission

1. **Open signup page** (should be default)
   - URL: http://localhost:5173/signup

2. **Fill signup form:**
   ```
   Name: John Developer
   Email: john@company.com
   Phone: +1-555-123-4567
   Company: Tech Innovations
   Experience: 5
   Note: Interested in full-stack development
   Password: MyPassword123
   Confirm Password: MyPassword123
   ```

3. **Click Sign Up**
   - ✓ Success: Redirects to form page
   - ✓ Form should have pre-filled data (Name, Email, Phone, Company, Experience, Note)
   - Fields should be disabled (read-only)

4. **Fill additional form fields:**
   ```
   Position: Senior React Developer
   Project Description: Building an e-commerce platform with React, Node.js, and MongoDB
   Budget: $50,000
   Timeline: 4 months
   ```

5. **Click Submit Form**
   - ✓ Success: Shows "Thank You!" page
   - ✓ Message: "Your application has been submitted successfully"
   - ✓ Shows email address

6. **Click "View Your Application"**
   - Currently shows alert (feature for Phase 2)

7. **Click Logout**
   - ✓ Redirects to login page
   - ✓ All auth data cleared

---

### Test 2: Login with Existing Account

1. **Go to login page**
   - URL: http://localhost:5173/login

2. **Login with credentials from previous signup:**
   ```
   Email: john@company.com
   Password: MyPassword123
   ```

3. **Click Sign In**
   - ✓ Success: Redirects to form page
   - ✓ Form shows same pre-filled data as before

4. **Review auto-filled data**
   - ✓ All user information is present and correct
   - Additional fields should be empty

5. **Click Logout**
   - ✓ Clears session and redirects to login

---

### Test 3: Create Multiple Users

1. **Signup with different email:**
   ```
   Email: jane@startup.com
   ```

2. **Complete process**

3. **Logout and login with this new account**

4. **Verify each user's data is isolated**

---

## 🔍 Verification Checklist

### Frontend
- [ ] Pages load correctly (no console errors)
- [ ] Routing works (can navigate between pages)
- [ ] Forms accept input
- [ ] Buttons are functional
- [ ] Error messages appear when needed
- [ ] Styling looks clean (TailwindCSS applied)
- [ ] Pre-filled fields are read-only

### Backend
- [ ] Server starts without errors
- [ ] MongoDB connection successful
- [ ] API endpoints respond to requests
- [ ] No CORS errors in console
- [ ] Tokens are generated on signup/login

### Database
- [ ] Data is saved to MongoDB
- [ ] Can verify in MongoDB Compass or CLI
  ```powershell
  mongo
  > use profile-portal
  > db.users.find()
  > db.applicationforms.find()
  ```

---

## 🐛 Troubleshooting

### "Cannot find module" error
```powershell
# Clean install
rm -r node_modules package-lock.json
npm install
```

### "Port already in use" error
- Frontend: Change port in vite.config.js
- Backend: Change PORT in .env file

### MongoDB connection fails
```powershell
# Check MongoDB is running
mongod

# If not installed, install via:
choco install mongodb-community
```

### CORS error in console
- Backend CORS should allow http://localhost:5173
- Check server.js has correct origin

### API calls return 404
- Backend must be running on http://localhost:5000
- Check frontend calls use correct API URLs

### Form not auto-filling
- Login with correct password
- Check browser Network tab (F12)
- Ensure backend returns user data

---

## 📊 Expected Database Structure

After running tests, your MongoDB should contain:

**Users Collection:**
```json
{
  "_id": ObjectId,
  "name": "John Developer",
  "email": "john@company.com",
  "password": "hashed_password_bcrypt",
  "phone": "+1-555-123-4567",
  "company": "Tech Innovations",
  "experience": 5,
  "note": "Interested in full-stack development",
  "createdAt": ISODate
}
```

**ApplicationForms Collection:**
```json
{
  "_id": ObjectId,
  "user": ObjectId,
  "position": "Senior React Developer",
  "projectDescription": "Building an e-commerce platform...",
  "budget": "$50,000",
  "timeline": "4 months",
  "status": "pending",
  "submittedAt": ISODate
}
```

---

## ✨ Next Steps After Testing

Once local testing is successful:

1. ✅ Push code to GitHub
2. ✅ Deploy frontend to Vercel
3. ✅ Deploy backend to Heroku/Render/Railway
4. ✅ Update API URLs
5. ✅ Set environment variables on hosting
6. ✅ Test on production

---

## 🎯 Success Indicators

You'll know everything is working when:

✅ Can signup without errors
✅ Data appears in MongoDB
✅ Can login with generated password
✅ Form page auto-fills correctly
✅ Can submit form without errors
✅ Thank you page appears
✅ Can logout and start fresh
✅ Can login again with same credentials

---

**Ready to test? Start with Step 1 above!** 🎉

If you hit any issues, check the troubleshooting section or review the detailed SETUP_GUIDE.md file.
