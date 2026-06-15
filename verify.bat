@echo off
REM Deployment Verification Script for AI Learn Platform (Windows)
REM Run this script to verify your installation is ready for deployment

echo.
echo 🔍 AI Learn Platform - Deployment Verification
echo ================================================
echo.

REM Check Node.js
echo ✓ Checking Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Node.js not found. Please install Node.js 18.0.0 or higher
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo   Node.js version: %NODE_VERSION%

REM Check npm
echo ✓ Checking npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ✗ npm not found
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo   npm version: %NPM_VERSION%

REM Check backend
echo.
echo ✓ Checking backend...
if not exist "backend\package.json" (
    echo ✗ backend\package.json not found
    pause
    exit /b 1
)

cd backend

REM Install dependencies
echo   Installing dependencies...
call npm install --silent

REM Check syntax
echo   Checking syntax...
node --check server.js
if %ERRORLEVEL% NEQ 0 (
    echo ✗ Syntax error in server.js
    pause
    exit /b 1
)

REM Check .env
if not exist ".env" (
    if exist ".env.example" (
        echo   Creating .env from .env.example...
        copy .env.example .env
        echo   ⚠ WARNING: Please edit .env with your configuration
    ) else (
        echo ✗ .env.example not found
        pause
        exit /b 1
    )
)

cd ..

REM Check frontend
echo.
echo ✓ Checking frontend...
if not exist "frontend\index.html" (
    echo ✗ frontend\index.html not found
    pause
    exit /b 1
)

REM Check required frontend files
setlocal enabledelayedexpansion
for %%F in (api.js auth.js dashboard.js style.css dashboard.css) do (
    if not exist "frontend\%%F" (
        echo ✗ frontend\%%F not found
        pause
        exit /b 1
    )
)

REM Check for data directory
if not exist "backend\data" (
    echo   Creating data directory...
    mkdir backend\data
)

echo.
echo ✅ All checks passed! Your installation is ready for deployment.
echo.
echo 📋 Next steps:
echo   1. Review and configure backend\.env with your settings
echo   2. Run: cd backend ^&^& npm start (or npm run dev for development)
echo   3. Serve frontend files (see SETUP.md for options)
echo   4. Access http://localhost:5500 (or your frontend port)
echo.
echo 📚 For more information, see SETUP.md
echo.
pause
