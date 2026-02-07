@echo off
REM SAKHI HUB - Quick Start Script
REM Starts both backend and frontend servers

echo ========================================
echo    SAKHI HUB - Starting Servers
echo ========================================
echo.

REM Check if MongoDB is running
sc query MongoDB | find "RUNNING" >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting MongoDB service...
    net start MongoDB >nul 2>&1
    if %errorlevel% neq 0 (
        echo [WARNING] Could not start MongoDB service
        echo Make sure MongoDB is installed or use MongoDB Atlas
    )
)

echo [INFO] Starting Backend Server...
echo.

REM Start backend in new window
start "SAKHI HUB - Backend" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --reload --port 8000"

REM Wait a few seconds for backend to start
timeout /t 5 /nobreak >nul

echo [INFO] Starting Frontend Server...
echo.

REM Start frontend in new window
start "SAKHI HUB - Frontend" cmd /k "cd sakhi-web && npm run dev"

echo.
echo ========================================
echo Servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:3000
echo API Docs: http://localhost:8000/docs
echo.
echo Check the new terminal windows for server status.
echo.
echo Press any key to exit this window...
pause >nul
