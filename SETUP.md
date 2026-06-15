# AI Learn Platform - Setup & Deployment Guide

## Project Overview

AI Learn is an interactive programming learning platform with:

- Multi-language support (Python, JavaScript, Java, C++, Go)
- AI-powered tutoring using Google Gemini API
- Interactive code playground with code execution
- Quiz system with confidence tracking
- Real-time code fixing and explanation

## Prerequisites

### Required

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)

### Optional (for code execution)

- **Python 3.10+** - For running Python code examples
- **Java Development Kit (JDK)** - For running Java code
- **C++ Compiler** - LLVM, GCC, or Visual Studio Build Tools
- **Go** - For running Go code examples

### For AI Features

- **Google Gemini API Key** - [Get free API key](https://aistudio.google.com/app/apikey)

## Installation

### 1. Backend Setup

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

```ini
# Server
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=your-secure-random-key-here-min-32-chars

# AI Service (Optional - but required for AI features)
GEMINI_API_KEY=your-google-gemini-api-key

# CORS
CLIENT_ORIGIN=http://localhost:3000,http://localhost:5173

# Code Execution
CODE_TIMEOUT_MS=8000
MAX_CODE_BYTES=20000
```

### 3. Start Backend Server

**Development:**

```bash
cd backend
npm run dev
```

**Production:**

```bash
cd backend
npm start
```

The server runs on `http://localhost:5000` by default.

## Running the Frontend

### Option 1: Using Static Server

```bash
# Navigate to frontend folder
cd frontend

# Using Python
python -m http.server 5500

# Or using Node.js http-server
npx http-server -p 5500
```

### Option 2: Using Live Server (VS Code)

- Install "Live Server" extension
- Right-click on `index.html` → "Open with Live Server"

### Option 3: Production Build

Copy the `frontend` folder to your web server (Apache, Nginx, etc.)

## First Run Checklist

- [ ] Backend installed and .env configured
- [ ] Backend server running on port 5000
- [ ] Frontend accessible on port 5500 (or your chosen port)
- [ ] Can access `http://localhost:5500/index.html`
- [ ] Can create account at signup.html
- [ ] Can login and access dashboard.html
- [ ] Code execution works (at least for JavaScript which uses Node.js)
- [ ] AI features work (if GEMINI_API_KEY is set)

## Deployment

### Option 1: Heroku

```bash
cd backend
heroku create your-app-name
heroku config:set GEMINI_API_KEY=your-key
git push heroku main
```

### Option 2: Vercel

1. Fork/clone the repository
2. Connect to Vercel
3. Set environment variables
4. Deploy

### Option 3: Docker

Create `Dockerfile` in backend:

```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

### Option 4: Traditional Server

1. Upload both backend and frontend to your server
2. Install Node.js on server
3. Run `npm install` in backend directory
4. Configure environment variables
5. Start server (use PM2 for process management)

## Troubleshooting

### Issue: "Cannot find module 'express'"

```bash
cd backend
npm install
```

### Issue: Port 5000 already in use

```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Or change port in .env: PORT=5001
```

### Issue: "CORS blocked origin"

Update `CLIENT_ORIGIN` in `.env` to include your frontend URL:

```ini
CLIENT_ORIGIN=http://localhost:3000,http://localhost:5500,https://yoursite.com
```

### Issue: AI features not working

- Verify `GEMINI_API_KEY` is set in `.env`
- Check Google API key is active and has Gemini API enabled
- Try without GEMINI_API_KEY (basic features still work)

### Issue: Code execution not working

- Python: Install Python 3.10+ and add to PATH
- Java: Install JDK and set JAVA_HOME
- C++: Install a C++ compiler (LLVM, GCC, or MSVC)
- Go: Install Go and add to PATH

## API Endpoints

### Authentication

- `POST /signup` - Create new account
- `POST /login` - Login with credentials
- `GET /me` - Get current user info

### Code Execution

- `POST /run-code` - Execute code
- `POST /explain` - Explain code with AI
- `POST /fix` - Fix code with AI

### AI Tutor

- `POST /chat` - Chat with AI tutor

### Health

- `GET /health` - Server status

## File Structure

```
.
├── backend/
│   ├── package.json
│   ├── server.js
│   ├── server.test.js
│   ├── .env.example
│   └── data/
│       └── users.json
└── frontend/
    ├── index.html
    ├── login.html
    ├── signup.html
    ├── dashboard.html
    ├── api.js
    ├── auth.js
    ├── dashboard.js
    ├── style.css
    └── dashboard.css
```

## Testing

Run backend tests:

```bash
cd backend
npm test
```

## Security Notes

- **Change JWT_SECRET** in production - use a strong random string
- **Keep GEMINI_API_KEY private** - never commit to git
- **Use HTTPS** in production
- **Validate all inputs** on backend
- **Rate limiting** is enabled by default
- **CORS** is configured - adjust `CLIENT_ORIGIN` as needed

## Performance Tips

- Enable compression on your web server
- Use CDN for static assets
- Cache lesson data in browser localStorage
- Optimize images and code snippets
- Monitor and log server errors

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review console errors (F12 in browser)
3. Check server logs
4. Review `.env` configuration
