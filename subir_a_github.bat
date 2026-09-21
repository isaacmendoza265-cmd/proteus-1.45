@echo off
set "GIT_EXE=C:\Users\isaac\AppData\Local\Programs\Git\cmd\git.exe"
if not exist "%GIT_EXE%" set "GIT_EXE=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"
set "GH_EXE=C:\Users\isaac\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe"
set "PATH=C:\Users\isaac\AppData\Local\Programs\Git\cmd;C:\Users\isaac\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"

echo =====================================================================
echo           PROYECTO PROTEUS 1.2 - SUBIDA DIRECTA A GITHUB
echo =====================================================================
echo.

if not exist "%GIT_EXE%" (
    echo [ERROR] No se encontro git.exe en: %GIT_EXE%
    pause
    exit /b 1
)

echo [1/3] Verificando repositorio y 135 archivos locales...
"%GIT_EXE%" init
"%GIT_EXE%" branch -M main
"%GIT_EXE%" add .
"%GIT_EXE%" commit -m "feat: Lanzamiento Proyecto Proteus 1.2 - Centro Estrategico y Multi-Agente IA" 2>nul

echo.
echo [2/3] Configurando enlace remoto...
set "REPO_URL=https://github.com/isaacmendoza265-cmd/proteus-1.45.git"
echo Repositorio: %REPO_URL%
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin %REPO_URL%

echo.
echo [3/3] Subiendo proyecto a GitHub...
echo.

if exist "%GH_EXE%" (
    "%GH_EXE%" auth setup-git 2>nul
)

"%GIT_EXE%" push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo   EXITO TOTAL! Todo el proyecto Proteus 1.2 ha sido subido a GitHub.
    echo   Recarga tu navegador en:
    echo   https://github.com/isaacmendoza265-cmd/proteus-1.45
    echo =====================================================================
) else (
    echo.
    echo =====================================================================
    echo   [AUTENTICACION DE GITHUB REQUERIDA]
    echo   Para vincular tu cuenta con tu equipo, se abrira GitHub en tu
    echo   navegador para iniciar sesion y confirmar con un codigo.
    echo =====================================================================
    echo.
    if exist "%GH_EXE%" (
        "%GH_EXE%" auth login --web -h github.com -p https
        "%GH_EXE%" auth setup-git
        echo.
        echo Reintentando la subida a GitHub...
        "%GIT_EXE%" push -u origin main
    ) else (
        echo Por favor genera un Personal Access Token en GitHub para autenticar.
    )
)

echo.
pause
