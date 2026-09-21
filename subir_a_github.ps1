# Script de PowerShell para subir Proyecto Proteus 1.2 a GitHub
$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

$gitExe = "C:\Users\isaac\AppData\Local\Programs\Git\cmd\git.exe"
if (-not (Test-Path $gitExe)) { $gitExe = "$env:LOCALAPPDATA\Programs\Git\cmd\git.exe" }
$ghExe = "C:\Users\isaac\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin\gh.exe"

$env:Path = "C:\Users\isaac\AppData\Local\Programs\Git\cmd;C:\Users\isaac\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;" + $env:Path

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "          PROYECTO PROTEUS 1.2 - SUBIDA DIRECTA A GITHUB" -ForegroundColor Yellow
Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host ""

if (-not (Test-Path $gitExe)) {
    Write-Host "[ERROR] Git no fue encontrado en: $gitExe" -ForegroundColor Red
    pause
    exit 1
}

Write-Host "[1/3] Verificando repositorio y 135 archivos locales..." -ForegroundColor Green
& $gitExe init | Out-Null
& $gitExe branch -M main | Out-Null
& $gitExe add .
& $gitExe commit -m "feat: Lanzamiento Proyecto Proteus 1.2 - Centro Estrategico y Multi-Agente IA" 2>$null

$repoUrl = "https://github.com/isaacmendoza265-cmd/proteus-1.45.git"
Write-Host ""
Write-Host "[2/3] Configurando enlace remoto..." -ForegroundColor Green
Write-Host "Repositorio: $repoUrl" -ForegroundColor White

& $gitExe remote remove origin 2>$null
& $gitExe remote add origin $repoUrl

Write-Host ""
Write-Host "[3/3] Subiendo proyecto a GitHub..." -ForegroundColor Cyan

if (Test-Path $ghExe) {
    & $ghExe auth setup-git 2>$null
}

& $gitExe push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Green
    Write-Host "  ¡ÉXITO TOTAL! Todo el proyecto Proteus 1.2 ha sido subido a GitHub." -ForegroundColor Green
    Write-Host "  Recarga tu navegador en: $repoUrl" -ForegroundColor White
    Write-Host "=====================================================================" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "=====================================================================" -ForegroundColor Yellow
    Write-Host "  [AUTENTICACIÓN REQUERIDA]" -ForegroundColor Yellow
    Write-Host "  Vamos a iniciar sesion en el navegador para autorizar la subida." -ForegroundColor White
    Write-Host "=====================================================================" -ForegroundColor Yellow
    if (Test-Path $ghExe) {
        & $ghExe auth login --web -h github.com -p https
        & $ghExe auth setup-git
        Write-Host "Reintentando subida..." -ForegroundColor Cyan
        & $gitExe push -u origin main
    }
}

Write-Host ""
pause
