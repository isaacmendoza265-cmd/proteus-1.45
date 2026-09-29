# Despliegue de Proteus en Coolify

Proteus se publica como **una sola app**: el mismo proceso Node (`dist/server.cjs`) sirve la SPA
compilada y las rutas `/api/*` (proxy de Gemini). No usa base de datos ni volúmenes.

## Configuración de la app en Coolify

| Campo | Valor |
|---|---|
| Repositorio / rama | `isaacmendoza265-cmd/proteus-1.45` · `main` |
| Build pack | **Dockerfile** (`/Dockerfile`, en la raíz) |
| Puerto | **3000** |
| Healthcheck | `GET /api/health` · intervalo 30 s · timeout 10 s (entra sin credenciales) |
| Dominio | el dominio comprado, en `http://` (el TLS lo termina Cloudflare Tunnel) |

## Variables de entorno

| Variable | Obligatoria | Para qué |
|---|---|---|
| `GEMINI_API_KEY` | sí | Clave de Gemini. Solo vive en el servidor; nunca va al bundle |
| `PROTEUS_USUARIO` | **sí en internet** | Usuario del acceso (HTTP Basic) |
| `PROTEUS_CLAVE` | **sí en internet** | Clave del acceso |

⚠️ **No publicar sin `PROTEUS_USUARIO`/`PROTEUS_CLAVE`.** La app no tiene login propio: sin ellas,
cualquiera puede usar `/api/gemini/generar` y `/api/piezas/subir` con la clave de Gemini del
servidor. Con ellas, todo (menos `/api/health`) pide usuario y clave; en local, sin definirlas, no
cambia nada. La lógica está en `src/server/acceso.ts` con sus pruebas.

No hacen falta `PORT` ni `NODE_ENV`: el `Dockerfile` los fija (3000 y `production`).

## Limitaciones conocidas en el servidor

- **Gobernación** (`/api/gobernacion/*`): depende de Python y de la carpeta local del Proyecto
  Independencia (`GOBERNACION_DIR`) en el PC de Isaac. En el servidor responde un error claro
  ("No se encontró Python"); el resto de la app no se ve afectado.
- **Subida de videos** (`/api/piezas/subir`): Cloudflare corta los cuerpos de más de **100 MB** en el
  plan gratuito. Videos más grandes: usar el enlace de YouTube.
- **Auto-deploy**: el webhook de GitHub hacia Coolify requiere permisos de administrador del repositorio
  (los tiene Isaac). Sin él, cada versión se despliega a mano desde Coolify.

## Verificación tras desplegar

```bash
curl -s https://<dominio>/api/health                                  # 200 {"status":"ok"}
curl -s -o /dev/null -w "%{http_code}\n" https://<dominio>/            # 401 (pide credenciales)
curl -s -o /dev/null -w "%{http_code}\n" -u '<usuario>:<clave>' https://<dominio>/   # 200
```

Y probar la función, no solo el código HTTP: abrir el mapa de Antioquia y generar una pieza con Gemini.
