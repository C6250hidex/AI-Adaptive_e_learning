# Pre-Deployment Checklist

Use this checklist before deploying your AI Learn Platform to ensure everything is properly configured and working.

## ✅ Development Environment

- [ ] Node.js 18.0.0 or higher installed
- [ ] npm or yarn installed
- [ ] Backend dependencies installed (`npm install` in backend/)
- [ ] No JavaScript syntax errors (`npm run check` in backend/)
- [ ] Environment variables configured (.env file created)

## ✅ Backend Configuration

- [ ] JWT_SECRET changed to a strong random string (minimum 32 characters)
- [ ] GEMINI_API_KEY set (if using AI features)
- [ ] NODE_ENV set to "production"
- [ ] PORT configured for your server
- [ ] CLIENT_ORIGIN updated to include all frontend URLs
- [ ] RATE_LIMIT_MAX and RATE_LIMIT_WINDOW_MS configured
- [ ] CODE_TIMEOUT_MS set appropriately
- [ ] MAX_CODE_BYTES limited reasonably

## ✅ Frontend Configuration

- [ ] All HTML files validate without errors
- [ ] CSS files load correctly
- [ ] JavaScript files have no console errors
- [ ] Responsive design works on mobile (test with F12)
- [ ] All assets and images load
- [ ] Navigation links point to correct pages
- [ ] Forms have proper validation

## ✅ Authentication

- [ ] User registration works
- [ ] User login works
- [ ] JWT tokens are generated correctly
- [ ] Tokens persist in localStorage
- [ ] Unauthenticated users redirected to login
- [ ] Dashboard requires authentication
- [ ] Logout clears session correctly
- [ ] Password hashing is working

## ✅ API Endpoints

- [ ] GET /health returns 200 status
- [ ] POST /signup creates users
- [ ] POST /login authenticates users
- [ ] GET /me returns user info (requires auth)
- [ ] POST /run-code executes JavaScript
- [ ] POST /explain works (if API key set)
- [ ] POST /fix works (if API key set)
- [ ] POST /chat works (if API key set)
- [ ] CORS headers are correct
- [ ] Rate limiting works

## ✅ Code Execution

- [ ] JavaScript execution works
- [ ] Python execution works (if Python installed)
- [ ] Java execution works (if JDK installed)
- [ ] C++ execution works (if compiler installed)
- [ ] Go execution works (if Go installed)
- [ ] Code timeout works (doesn't hang on infinite loops)
- [ ] Output limits work (doesn't crash on large output)

## ✅ AI Features (if enabled)

- [ ] GEMINI_API_KEY is valid
- [ ] Google API has Gemini enabled
- [ ] Chat endpoint works
- [ ] Explain endpoint works
- [ ] Fix endpoint works
- [ ] Error messages are user-friendly when API fails

## ✅ Database/Data Storage

- [ ] data/ directory exists
- [ ] users.json is writable
- [ ] Data persists across server restarts
- [ ] Backup strategy in place
- [ ] Data validation works

## ✅ Security

- [ ] JWT secret is strong and unique
- [ ] GEMINI_API_KEY never appears in frontend code
- [ ] CORS is properly configured
- [ ] Passwords are hashed, not stored plaintext
- [ ] Input validation on all endpoints
- [ ] No SQL injection vulnerabilities
- [ ] No XSS vulnerabilities in user data
- [ ] Rate limiting prevents abuse
- [ ] HTTPS configured (for production)

## ✅ Performance

- [ ] Backend responds in < 1 second
- [ ] Frontend loads in < 3 seconds
- [ ] Large code submissions don't crash
- [ ] Memory usage is stable
- [ ] CPU usage is reasonable

## ✅ Error Handling

- [ ] 404 errors show proper message
- [ ] 500 errors are logged
- [ ] User sees friendly error messages
- [ ] API errors include helpful hints
- [ ] Console has no unhandled promise rejections
- [ ] Network timeouts are handled

## ✅ Deployment Infrastructure

- [ ] Server has Node.js installed
- [ ] Server has required runtimes (Python, Java, C++, Go)
- [ ] Database directory is persistent
- [ ] Environment variables can be set securely
- [ ] Process manager configured (PM2, systemd, etc.)
- [ ] Logging configured
- [ ] Monitoring setup
- [ ] Backup strategy
- [ ] Rollback plan in place

## ✅ Testing

- [ ] Create new account
- [ ] Login with new account
- [ ] View dashboard
- [ ] Select different languages
- [ ] Run sample code
- [ ] Ask AI tutor question (if API key set)
- [ ] Take quiz
- [ ] Mark lessons complete
- [ ] Logout
- [ ] Test on different browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile device
- [ ] Test on slow network (F12 → Throttling)

## ✅ Documentation

- [ ] README.md is current
- [ ] SETUP.md has correct instructions
- [ ] API endpoints are documented
- [ ] Configuration options are documented
- [ ] Troubleshooting guide is accurate
- [ ] Deployment steps are clear

## ✅ Legal & Compliance

- [ ] Terms of Service prepared (if required)
- [ ] Privacy Policy prepared (if required)
- [ ] Copyright notices included
- [ ] License headers in code
- [ ] Third-party license compliance verified

## ✅ Final Steps

- [ ] Run `npm audit` for security vulnerabilities
- [ ] Minify and optimize frontend assets (optional)
- [ ] Enable gzip compression on server
- [ ] Set up SSL/TLS certificates
- [ ] Configure domain name
- [ ] Set up automated backups
- [ ] Create incident response plan
- [ ] Notify team of deployment
- [ ] Monitor first 24 hours closely

## 🚀 Deployment

**DO NOT DEPLOY if any items above are unchecked.**

Once everything is checked:

1. Double-check all configuration files
2. Backup current data
3. Deploy backend
4. Deploy frontend
5. Run verification script
6. Test thoroughly
7. Monitor for errors
8. Keep backup of previous version

## 📞 Post-Deployment

- [ ] Monitor server logs
- [ ] Check error tracking
- [ ] Monitor user feedback
- [ ] Verify analytics are working
- [ ] Confirm backups are running
- [ ] Set up alerts for failures
- [ ] Plan regular maintenance window

---

**Remember**: Security and user experience are paramount. Take time to verify everything works correctly before deploying to production.
