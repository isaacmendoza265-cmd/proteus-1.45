# =====================================================================
#           PROYECTO PROTEUS 1.2 - ASISTENTE DE SUBIDA A GITHUB (PowerShell)
# =====================================================================

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "          PROYECTO PROTEUS 1.2 - ASISTENTE DE SUBIDA A GITHUB        " -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

$gitCmd = Get-Command git -ErrorAction SilentlyContinue
if (-not $gitCmd) {
    Write-Host "[ERROR] Git no está instalado o no se encuentra en el PATH del sistema." -ForegroundColor Red
    Write-Host "Por favor instala Git desde https://git-scm.com/ e intenta nuevamente." -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "[1/4] Inicializando repositorio Git local..." -ForegroundColor Green
git init

Write-Host "[2/4] Agregando todos los archivos limpios del proyecto..." -ForegroundColor Green
git add .

Write-Host "[3/4] Creando commit inicial..." -ForegroundColor Green
git commit -m "feat: Lanzamiento Proyecto Proteus 1.2 - Centro Estrategico y Multi-Agente IA"
git branch -M main

$repoUrl = Read-Host "Pega la URL de tu repositorio vacío en GitHub (ej. https://github.com/usuario/proyecto-proteus.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "No ingresaste ninguna URL. Tu repositorio local está listo con el commit creado." -ForegroundColor Yellow
    Write-Host "Puedes vincular el remoto más adelante con:" -ForegroundColor White
    Write-Host "  git remote add origin TU_URL" -ForegroundColor Cyan
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
    Read-Host "Presiona Enter para finalizar"
    exit 0
}

Write-Host "[4/4] Vinculando remoto y subiendo cambios a GitHub..." -ForegroundColor Green
git remote remove origin 2>$null
git remote add origin $repoUrl
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Green
    Write-Host "   ¡ÉXITO! El proyecto ha sido subido correctamente a tu GitHub.     " -ForegroundColor Green
    Write-Host "=====================================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "[AVISO] Ocurrió un error al subir los cambios a GitHub." -ForegroundColor Red
    Write-Host "Verifica que tengas permisos de escritura y que el repositorio esté vacío." -ForegroundColor Yellow
}

Read-Host "Presiona Enter para finalizar"
