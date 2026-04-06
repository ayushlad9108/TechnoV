@echo off
echo ========================================
echo  CLEARING CACHE AND RESTARTING SERVER
echo ========================================
echo.

echo Step 1: Killing any running Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo Step 2: Clearing Vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo Vite cache cleared!
) else (
    echo No Vite cache found.
)

echo Step 3: Clearing dist folder...
if exist "dist" (
    rmdir /s /q "dist"
    echo Dist folder cleared!
) else (
    echo No dist folder found.
)

echo.
echo ========================================
echo  CACHE CLEARED! 
echo ========================================
echo.
echo NOW DO THESE STEPS:
echo.
echo 1. Close ALL browser tabs with localhost:5173
echo 2. Press Ctrl+Shift+Delete in your browser
echo 3. Select "Cached images and files"
echo 4. Click "Clear data"
echo 5. Run: npm run dev
echo 6. Open http://localhost:5173/products in NEW tab
echo.
echo ========================================
pause
