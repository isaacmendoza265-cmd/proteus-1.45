@echo off
chcp 65001 > nul
echo =====================================================================
echo           PROYECTO PROTEUS 1.2 - ASISTENTE DE SUBIDA A GITHUB
echo =====================================================================
echo.

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git no esta instalado o no se encuentra en el PATH del sistema.
    echo Por favor instala Git desde https://git-scm.com/ e intenta nuevamente.
    echo.
    pause
    exit /b 1
)

echo [1/4] Inicializando repositorio Git local...
git init
echo.

echo [2/4] Agregando todos los archivos limpios del proyecto...
git add .
echo.

echo [3/4] Creando commit inicial...
git commit -m "feat: Lanzamiento Proyecto Proteus 1.2 - Centro Estrategico y Multi-Agente IA"
git branch -M main
echo.

set /p REPO_URL="Pega la URL de tu repositorio vacio en GitHub (ej. https://github.com/usuario/proyecto-proteus.git): "

if "%REPO_URL%"=="" (
    echo No ingresaste ninguna URL. Tu repositorio local esta listo con el commit creado.
    echo Puedes vincular el remoto mas adelante con:
    echo   git remote add origin TU_URL
    echo   git push -u origin main
    echo.
    pause
    exit /b 0
)

echo.
echo [4/4] Vinculando remoto y subiendo cambios a GitHub...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo =====================================================================
    echo   ¡EXITO! El proyecto ha sido subido correctamente a tu GitHub.
    echo =====================================================================
) else (
    echo.
    echo [AVISO] Ocurrio un error al subir los cambios.
    echo Verifica que tengas permisos de escritura y que el repositorio este vacio.
)

echo.
pause
