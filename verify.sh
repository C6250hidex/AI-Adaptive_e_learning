#!/bin/bash
# Deployment Verification Script for AI Learn Platform
# Run this script to verify your installation is ready for deployment

set -e

echo "[INFO] AI Learn Platform - Deployment Verification"
echo "================================================"
echo ""

# Check Node.js
echo "[OK] Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js not found. Please install Node.js 18.0.0 or higher"
    exit 1
fi
NODE_VERSION=$(node --version)
echo "  Node.js version: $NODE_VERSION"

# Check npm
echo "[OK] Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "[ERROR] npm not found"
    exit 1
fi
NPM_VERSION=$(npm --version)
echo "  npm version: $NPM_VERSION"

# Check backend
echo ""
echo "[OK] Checking backend..."
if [ ! -f "backend/package.json" ]; then
    echo "[ERROR] backend/package.json not found"
    exit 1
fi

cd backend

# Install dependencies
echo "  Installing dependencies..."
npm install --silent

# Check syntax
echo "  Checking syntax..."
if ! node --check server.js; then
    echo "[ERROR] Syntax error in server.js"
    exit 1
fi

# Check .env
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        echo "  Creating .env from .env.example..."
        cp .env.example .env
        echo "  [WARN] Please edit .env with your configuration"
    else
        echo "[ERROR] .env.example not found"
        exit 1
    fi
fi

cd ..

# Check frontend
echo ""
echo "[OK] Checking frontend..."
if [ ! -f "frontend/index.html" ]; then
    echo "[ERROR] frontend/index.html not found"
    exit 1
fi

# Check required frontend files
for file in "frontend/api.js" "frontend/auth.js" "frontend/dashboard.js" "frontend/style.css" "frontend/dashboard.css"; do
    if [ ! -f "$file" ]; then
        echo "[ERROR] $file not found"
        exit 1
    fi
done

# Check for data directory
if [ ! -d "backend/data" ]; then
    echo "  Creating data directory..."
    mkdir -p backend/data
fi

echo ""
echo "[OK] All checks passed! Your installation is ready for deployment."
echo ""
echo "Next steps:"
echo "  1. Review and configure backend/.env with your settings"
echo "  2. Run: cd backend && npm start (or npm run dev for development)"
echo "  3. Serve frontend files (see SETUP.md for options)"
echo "  4. Access http://localhost:5500 (or your frontend port)"
echo ""
echo "For more information, see SETUP.md"
