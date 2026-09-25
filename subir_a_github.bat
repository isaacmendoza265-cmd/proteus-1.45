@echo off
chcp 65001 >nul
REM ================================================================
REM  PROYECTO PROTEUS - Subir a GitHub los commits ya guardados
REM  No crea commits: solo envia los que ya existen (git push).
REM  La autenticacion la maneja GitHub CLI (gh), sin tokens en archivos.
REM ================================================================
cd /d "%~dp0"

set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%PATH%"
for /d %%D in ("%LOCALAPPDATA%\Microsoft\WinGet\Packages\GitHub.cli_*") do set "PATH=%%D\bin;%PATH%"

where git >nul 2>nul || (echo [ERROR] No se encontro Git. Instala Git para Windows. & pause & exit /b 1)

echo.
echo Cambios que se van a subir:
git log --oneline origin/main..HEAD
echo.

where gh >nul 2>nul && gh auth setup-git >nul 2>nul

git push origin main
if errorlevel 1 (
    echo.
    echo [AUTENTICACION] Se abrira el navegador para iniciar sesion en GitHub...
    where gh >nul 2>nul || (echo [ERROR] Falta GitHub CLI ^(gh^). & pause & exit /b 1)
    gh auth login --web -h github.com -p https
    gh auth setup-git
    git push origin main
)

echo.
echo Listo. Revisa: https://github.com/isaacmendoza265-cmd/proteus-1.45
pause
