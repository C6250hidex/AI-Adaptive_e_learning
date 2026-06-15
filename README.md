# AI Learn Platform

An interactive programming learning platform with AI-powered tutoring, real-time code execution, and interactive lessons across multiple languages.

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

### Installation

```bash
# Backend setup
cd backend
npm install

# Configure environment
cp .env.example .env
# Edit .env with your settings (especially GEMINI_API_KEY)
```

### Run Backend

```bash
npm start          # Production
# OR
npm run dev        # Development (recommended for testing)
```

### Run Frontend

```bash
# Option 1: Using Python HTTP server
cd ../frontend
python -m http.server 5500

# Option 2: Using Node.js http-server
npx http-server -p 5500

# Option 3: Using VS Code Live Server extension
# Right-click on index.html → "Open with Live Server"
```

### Access

- Frontend: `http://localhost:5500`
- Backend API: `http://localhost:5000`

## 📋 Verification

Run the deployment verification script:

```bash
# Windows
verify.bat

# macOS/Linux
bash verify.sh
```

## 🎓 Features

- **Multi-language Support**: Python, JavaScript, Java, C++, Go
- **Interactive Lessons**: Learn concepts with guided tutorials
- **Code Execution**: Run code directly in the browser
- **AI Tutoring**: Get help from AI-powered code tutor
- **Quiz System**: Test your knowledge with interactive quizzes
- **Progress Tracking**: Monitor your learning with confidence meter
- **Code Tools**: Explain and fix code with AI assistance

## 📁 Project Structure

```
.
├── backend/              # Express.js backend API
│   ├── server.js         # Main server file
│   ├── package.json      # Dependencies
│   ├── .env.example      # Environment template
│   └── data/             # User data storage
├── frontend/             # Static HTML/CSS/JS
│   ├── index.html        # Landing page
│   ├── dashboard.html    # Learning dashboard
│   ├── api.js            # API client helper
│   ├── auth.js           # Authentication logic
│   └── dashboard.js      # Dashboard functionality
└── SETUP.md              # Detailed setup guide
```

## 🔧 Configuration

Create `.env` in backend directory:

```ini
# Server
PORT=5000
NODE_ENV=production

# Security
JWT_SECRET=change-me-to-a-random-secure-string

# AI Service (optional, but required for AI features)
GEMINI_API_KEY=your-google-gemini-api-key

# CORS
CLIENT_ORIGIN=http://localhost:3000,http://localhost:5500

# Code Execution Limits
CODE_TIMEOUT_MS=8000
MAX_CODE_BYTES=20000
```

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Comprehensive setup and deployment guide
- **Backend API** - See server.js for endpoint documentation
- **Frontend** - Inline comments in HTML/CSS/JS files

## 🛠️ Technology Stack

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: JWT tokens
- **AI**: Google Gemini API
- **Code Execution**: Spawned child processes
- **Security**: CORS, rate limiting, input sanitization

### Frontend

- **HTML5** - Semantic markup
- **CSS3** - Modern styling
- **Vanilla JavaScript** - No frameworks
- **LocalStorage** - Client-side data persistence

## 🔐 Security Features

- JWT-based authentication
- Password hashing with PBKDF2-SHA256
- Input validation and sanitization
- CORS protection
- Rate limiting
- Secure session handling
- Code execution sandboxing
- No credentials in client code

## 🚨 Troubleshooting

### Backend won't start

```bash
# Check port isn't in use
lsof -i :5000              # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Try different port
PORT=5001 npm start
```

### Frontend can't connect to backend

```ini
# Update .env CORS setting
CLIENT_ORIGIN=http://localhost:5500,https://your-domain.com
```

### AI features not working

- Verify `GEMINI_API_KEY` is set in .env
- Check API key has Gemini API enabled
- API must be active and not rate-limited

### Code execution fails

- Python: Install Python 3.10+ and add to PATH
- Java: Install JDK and set JAVA_HOME
- C++: Install compiler (GCC, LLVM, or MSVC)
- Go: Install Go and add to PATH

## 📦 Deployment

See [SETUP.md](SETUP.md) for detailed deployment instructions for:

- Heroku
- Vercel
- Docker
- Traditional servers
- AWS/Azure/Google Cloud

## 📜 License

ISC

## 👤 Author

Designed by CEOxavier

## 🤝 Contributing

Contributions welcome! Please submit pull requests or issues.

## 📞 Support

For issues:

1. Check SETUP.md troubleshooting section
2. Review console errors (F12 in browser)
3. Check server logs
4. Review .env configuration

---

**Ready to deploy?** Run `verify.bat` (Windows) or `bash verify.sh` (macOS/Linux) to check your setup!
