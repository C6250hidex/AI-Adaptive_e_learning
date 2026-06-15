# Quick Start Guide - AI Learn Platform

## 1-Minute Setup (Development)

### Windows Users

```bash
# 1. Navigate to project
cd "c:\Users\CHIDEX GLOBAL\Desktop\Ai Driven E-Learning Platform"

# 2. Run verification
verify.bat

# 3. Start backend (open new terminal)
cd backend
npm start

# 4. Start frontend (in another terminal)
cd frontend
python -m http.server 5500
# OR use Python from Start menu: python -m http.server 5500 in frontend folder
```

### macOS/Linux Users

```bash
# 1. Navigate to project
cd ~/Desktop/"Ai Driven E-Learning Platform"

# 2. Run verification
bash verify.sh

# 3. Start backend (open new terminal)
cd backend
npm start

# 4. Start frontend (in another terminal)
cd frontend
python3 -m http.server 5500
```

### Both Platforms

3. Open browser → `http://localhost:5500`
4. Create account, login, and start learning!

## Testing Checklist

After starting both servers, verify:

- [ ] Homepage loads (http://localhost:5500)
- [ ] Can navigate to signup
- [ ] Can create new account
- [ ] Can login
- [ ] Dashboard loads with lessons
- [ ] Code execution works
  - [ ] Run JavaScript code
  - [ ] See output
- [ ] Can switch between languages
- [ ] Can take quiz
- [ ] Can logout
- [ ] Navigation redirects properly

## Troubleshooting

### Issue: "Port 5000 already in use"

```bash
# Find and kill process
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>

# OR use different port
PORT=5001 npm start
```

### Issue: "Cannot find module 'express'"

```bash
cd backend
npm install
```

### Issue: Frontend shows "Cannot connect to server"

- Ensure backend is running on port 5000
- Check .env file has correct settings
- Verify CORS is configured: `CLIENT_ORIGIN=http://localhost:5500`

### Issue: "AI features not available"

- Add `GEMINI_API_KEY` to backend/.env
- Restart backend server
- This is optional - app works without it

### Issue: Code execution not working

- JavaScript should work (uses Node.js)
- For other languages, install:
  - Python 3.10+
  - Java JDK
  - C++ compiler (GCC/LLVM)
  - Go

## File Structure Reference

```
Project/
├── backend/
│   ├── server.js          ← Main API server
│   ├── package.json       ← Dependencies
│   ├── .env               ← Configuration (create from .env.example)
│   └── data/
│       └── users.json     ← User accounts
├── frontend/
│   ├── index.html         ← Landing page
│   ├── signup.html        ← Registration
│   ├── login.html         ← Login
│   ├── dashboard.html     ← Main learning interface
│   ├── api.js             ← API client
│   ├── auth.js            ← Auth logic
│   ├── dashboard.js       ← Dashboard logic
│   └── *.css              ← Styles
└── docs/
    ├── README.md          ← Project info
    ├── SETUP.md           ← Detailed setup
    └── DEPLOYMENT_CHECKLIST.md
```

## Environment (.env) Example

```ini
# Required for backend to run
PORT=5000
NODE_ENV=development

# Optional but recommended
GEMINI_API_KEY=your-google-gemini-key
JWT_SECRET=your-random-secret-string

# Frontend connection
CLIENT_ORIGIN=http://localhost:5500
```

## Key Commands

```bash
# Backend development
cd backend
npm run dev          # Run with auto-reload
npm start            # Run normally
npm test             # Run tests
npm run check        # Check syntax
npm audit fix        # Fix vulnerabilities

# Frontend development
cd frontend
npx http-server -p 5500  # Start simple server
```

## Common Tasks

### Reset User Data

```bash
cd backend
rm data/users.json
npm start
# New data/users.json will be created on first signup
```

### Change Server Port

Edit backend/.env:

```ini
PORT=5001
```

### Enable AI Features

Edit backend/.env and add:

```ini
GEMINI_API_KEY=your-key-here
```

Get free key: https://aistudio.google.com/app/apikey

### Create Test User Manually

Edit `backend/data/users.json`:

```json
[
  {
    "id": "test-id-123",
    "username": "testuser",
    "email": "test@example.com",
    "passwordHash": "pbkdf2_sha256$120000$abc123$xyz789",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

_Note: This is for testing only. Use signup form for production._

## Next Steps

1. ✅ Get it running (you're here!)
2. → Customize the platform
   - Edit lessons in dashboard.js
   - Customize styling in \*.css
   - Change branding in index.html
3. → Add your domain
4. → Deploy to production (see SETUP.md)
5. → Monitor and maintain

## Getting Help

1. **Check Docs**
   - README.md - Project overview
   - SETUP.md - Detailed setup guide
   - DEPLOYMENT_CHECKLIST.md - Pre-deployment checklist

2. **Server Logs**
   - Check terminal where backend is running
   - Look for error messages

3. **Browser Console**
   - Press F12 in browser
   - Check Console tab for errors
   - Check Network tab for API failures

4. **Common Issues**
   - Port already in use → Use different port
   - Module not found → Run `npm install`
   - CORS errors → Check CLIENT_ORIGIN in .env
   - API key errors → Set GEMINI_API_KEY

## Performance Tips

- Clear browser cache (F12 → Storage → Clear)
- Disable browser extensions
- Use Chrome/Firefox for best compatibility
- Test on different network speeds (F12 → Throttling)

## What's Included

✅ Full-stack application ready to run
✅ Database-less (uses JSON file)
✅ No complex setup required
✅ Security best practices built-in
✅ Multiple programming languages
✅ AI integration ready
✅ Mobile responsive design
✅ Production-ready code

---

**Congratulations!** You now have a fully functional AI-powered learning platform running locally.

Next: Deploy to production (see SETUP.md) or customize for your needs!
