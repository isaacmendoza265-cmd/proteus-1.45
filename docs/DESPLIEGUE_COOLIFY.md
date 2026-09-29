# Despliegue de Proteus en Coolify

Publicado en **https://polimetrics.app** (Coolify del data center de Network IA Solutions, proyecto
EMPRESA, app `proteus`, desde el 2026-09-29).

Proteus es **una sola app**: el mismo proceso Node (`dist/server.cjs`) sirve la SPA compilada y las
rutas `/api/*`. Tiene una base **PostgreSQL** solo para lo que produce el equipo; los datos electorales
y geográficos siguen siendo archivos del repo generados por `scripts/`.

## Qué guarda la base

| Tabla | Qué es |
|---|---|
| `Usuario`, `Sesion` | Login con roles (`ADMIN` gestiona usuarios, `EQUIPO` usa los módulos) |
| `PerfilCandidato` | Perfil del candidato activo, con su identidad (antes en el `localStorage` de cada navegador) |
| `PiezaAnalizada` | Historial del análisis de piezas (antes en `localStorage`) |
| `ArchivoGuardado` | Lo que los módulos guardan con «Guardar» (antes un "Google Drive" simulado en `localStorage`) |

La primera vez que un navegador entra, lo que tenía en `localStorage` se sube a la base (si la base
aún está vacía) y se borra la copia local.

## Configuración de la app en Coolify

| Campo | Valor |
|---|---|
| Repositorio / rama | `isaacmendoza265-cmd/proteus-1.45` · `main` |
| Build pack | **Dockerfile** (`/Dockerfile`, en la raíz) |
| Puerto | **3000** |
| Healthcheck | `GET /api/health` · intervalo 30 s · timeout 10 s (público) |
| Listo con base | `GET /api/health/ready` (hace `SELECT 1`; público) |
| Dominio | `http://polimetrics.app,http://www.polimetrics.app` (el TLS lo termina Cloudflare) |
| Base de datos | PostgreSQL 18 como recurso de Coolify en el mismo proyecto |

Las **migraciones se aplican solas al arrancar el contenedor** (`prisma migrate deploy` en el `CMD`).
Si una falla, el contenedor no arranca y Coolify conserva la versión anterior.

## Variables de entorno

| Variable | Obligatoria | Para qué |
|---|---|---|
| `DATABASE_URL` | sí | URL interna del Postgres de Coolify |
| `JWT_SECRET` | sí | Firma de las sesiones; ≥ 32 caracteres aleatorios |
| `ADMIN_EMAIL` / `ADMIN_CLAVE` | la primera vez | Crean el primer administrador si la base no tiene usuarios. Después no se usan |
| `GEMINI_API_KEY` | para la IA | Clave de Gemini. Solo vive en el servidor |

No hacen falta `PORT` ni `NODE_ENV`: el `Dockerfile` los fija (3000 y `production`).

## Sesiones y seguridad

- Login propio (pantalla servida por el servidor). Todo exige sesión salvo `/api/health`,
  `/api/health/ready` y `/api/auth/login`: sin sesión, la API responde `401` y la web muestra el login.
- JWT de acceso (15 min) + refresh (7 días, rotado, solo su hash en la base) en cookies `httpOnly`,
  `Secure`, `SameSite=Lax`. El refresco es transparente en el servidor.
- Claves con `scrypt`. 5 intentos fallidos bloquean la cuenta 15 minutos; el login admite 10
  peticiones por minuto por IP.
- Quien entra por `http://` se redirige a `https://` (cabecera `cf-visitor` de Cloudflare).
- Rutas de IA: 20 peticiones por minuto por cliente y lista cerrada de modelos (`MODELOS_PERMITIDOS`).

## Desarrollo local

Hace falta un PostgreSQL. Con `DATABASE_URL`, `JWT_SECRET`, `ADMIN_EMAIL` y `ADMIN_CLAVE` en `.env`:

```bash
npx prisma migrate deploy   # crea las tablas
npm run dev                 # entra con ADMIN_EMAIL / ADMIN_CLAVE
```

Cambiar el esquema: editar `prisma/schema.prisma` y `npx prisma migrate dev --name <cambio>`.
Pruebas de integración: `TEST_DATABASE_URL=<base desechable> npm test`.

## Limitaciones conocidas en el servidor

- **Gobernación** (`/api/gobernacion/*`): depende de Python y de la SQLite del Proyecto Independencia en
  el PC de Isaac. En el servidor responde un error claro; el resto de la app no se ve afectado.
- **Subida de videos** (`/api/piezas/subir`): Cloudflare corta los cuerpos de más de **100 MB**.
- **Auto-deploy**: el webhook de GitHub hacia Coolify requiere admin del repositorio (Isaac).

## Verificación tras desplegar

```bash
curl -s https://polimetrics.app/api/health/ready                      # {"status":"ok","db":"ok"}
curl -s -o /dev/null -w "%{http_code}\n" https://polimetrics.app/api/datos/perfil   # 401
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" http://polimetrics.app/     # 301 → https
```

Y probar la función: entrar, abrir el mapa, guardar un archivo y verlo desde otro usuario.
