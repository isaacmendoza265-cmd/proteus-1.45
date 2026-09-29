# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Proteus: inteligencia electoral de Colombia (React + TypeScript + Vite + Leaflet, servidor Express, PostgreSQL).
Foco actual: Antioquia (125 municipios). Producto en **español de Colombia**.

**Antes de nada, cada sesión:**
- **`AGENTS.md`**: reglas de datos no negociables (honestidad Oficial/Estimado/Sin información, nada de
  cédulas, crudos en `_originales/`, umbral de 20.000 votantes, puestos cruzados por nombre, marco
  metodológico). No se repiten aquí y **prevalecen** sobre cualquier otra cosa.
- **`docs/ESTADO_PROYECTO.md`**: memoria del proyecto (hecho, decisiones de Isaac con fecha, pendientes).
  Se actualiza al terminar cada tarea, con el hash del commit.

**El repo no es nuestro.** Dueño: Isaac (`isaacmendoza265-cmd/proteus-1.45`, público). Network IA Solutions
(Jose) lo despliega y lo mejora con permiso de escritura, sin admin.

## Comandos

```bash
npm run dev          # tsx server.ts: Express + Vite en modo middleware (http://localhost:3000)
npm run build        # vite build + esbuild de server.ts → dist/server.cjs
npm start            # producción local: node dist/server.cjs (con NODE_ENV=production)
npm run ci:local     # LA verificación: lo mismo que la CI de GitHub, en paralelo (ver abajo)

npx vitest run src/server/api.integracion      # pruebas de un archivo (acepta rutas o trozos de ruta)
npx vitest run -t "bloquean la cuenta"         # por nombre de prueba
npx tsc --noEmit -p .   ·   npm run lint

npx prisma migrate dev --name <cambio>         # nueva migración (contra proteus_dev)
npx prisma migrate deploy                      # aplicar migraciones a la base de DATABASE_URL
```

**Entorno local** (`.env` en la raíz, ignorado por git; plantilla comentada en `.env.example`):

| Variable | En este PC |
|---|---|
| `DATABASE_URL` | `postgresql://matriarca@localhost:55432/proteus_dev`: Postgres de desarrollo en `D:\pgsql` |
| `TEST_DATABASE_URL` | `postgresql://matriarca@localhost:55433/proteus_test`: cluster **desechable** del NVMe (`C:\pgsql-test`) |
| `JWT_SECRET`, `ADMIN_EMAIL`, `ADMIN_CLAVE` | secreto aleatorio y primer admin (solo se crea si la base no tiene usuarios) |

- Las bases de desarrollo **nunca** van al cluster del NVMe (fsync apagado, datos desechables), y las de prueba
  no van a `D:`. Toda base nueva: `ALTER DATABASE … SET timezone TO 'UTC'` (producción y CI están en UTC).
- `vitest.config.ts` carga `TEST_*` del `.env`. **Sin `TEST_DATABASE_URL`, las 8 pruebas de integración con
  Postgres (`src/server/api.integracion.test.ts`) salen "skipped"**: si las ves omitidas, falta esa variable.
  Esas pruebas hacen `TRUNCATE`: jamás apuntarlas a una base con datos.
- `prisma migrate reset` está bloqueado para agentes (pide consentimiento humano explícito). Para rehacer una
  base desechable, crear otra con nombre nuevo en vez de forzarlo.
- Desde Git Bash en Windows, `python -c "print(...)"` añade `\r`: al meter su salida en URLs o `for`,
  pasarla por `tr -d '\r'`.

## CI: se corre en local, antes de cada push

**`npm run ci:local` es la verificación de este repo** (`scripts/ci_local.mjs`). Hace lo mismo que
`.github/workflows/ci.yml`: aplica migraciones y comprueba que el esquema no tenga cambios sin migrar; luego,
**en paralelo**, tipos (`tsc` incremental), lint (`eslint` con caché), pruebas y build. Usa
`TEST_DATABASE_URL` o, si no está, el cluster del NVMe.

- Medido el 2026-09-29: GitHub tarda 76–117 s; los mismos pasos en serie en local, 81 s; `ci:local`, **44 s en
  frío y 34–38 s con caché**. Se corre **antes de cada push y antes de abrir o actualizar un PR**, y en verde:
  no se empuja "para que lo valide GitHub".
- Aquí es al revés que en Casa Korea o Matriarca (donde la suite completa va a la CI): la suite de Proteus es
  corta y la máquina local la corre en menos de la mitad del tiempo.
- **Postgres no es el cuello** (suite completa: HDD 10,7 s vs NVMe 10,1 s). Las pruebas lentas son las que
  cargan los JSON de datos (`electionResultsService`, `municipalDivisions`, `faseB`, 3–5 s cada una).
- La CI de GitHub sigue corriendo en cada PR con **runners de GitHub, nunca el self-hosted de Guarne**: el repo
  es público y un runner propio ejecutaría en nuestro servidor el código de cualquier PR externo.
- Después del bucle automático, **probar el flujo tocado en el navegador** (Playwright MCP) contra
  `npm run dev` o contra el build (`npm run build && NODE_ENV=production npm start`), y decir qué se probó.

## Flujo con Git

**Se trabaja directo en `main`** (decisión de Jose, 2026-09-29): commits en español (qué y por qué) →
`git pull` → **`npm run ci:local` en verde** → push. Sin ramas ni PR de por medio: un push a `main` no
despliega nada (no hay auto-deploy), así que el punto de control es `ci:local`, no la revisión de un PR.

- Rama + PR solo si Jose lo pide, o para un cambio grande que convenga que Isaac vea antes (p. ej. el
  multi-tenant). Ante la duda en algo de auth, sesión o migraciones que transformen datos, preguntar.
- **Nunca** `git push --force`, `reset --hard` ni borrar trabajo ajeno: Codex, Antigravity, Isaac y otras
  sesiones también commitean aquí. Agregar los archivos propios **por nombre** (nada de `git add -A`).
- Si `ci:local` no está en verde, no se pushea. Si algo roto llega a `main`, se deshace con `git revert`.
- Tras pushear código desplegable: desplegar en Coolify y verificar (abajo); luego actualizar
  `docs/ESTADO_PROYECTO.md`.

## Arquitectura

**Un solo proceso Node** (`server.ts`) sirve la SPA y la API. En desarrollo monta Vite como middleware; en
producción sirve `dist/`. esbuild empaqueta el servidor con `--packages=external`, así que en runtime necesita
las dependencias de producción (por eso `vite`, `prisma` y `@prisma/client` están en `dependencies`).

**Todo exige sesión** salvo `/api/health`, `/api/health/ready` y `/api/auth/login`. El guardia
(`src/server/sesion.ts`) va antes que cualquier ruta o estático: sin sesión, una navegación recibe la
**página de login inline** (`PAGINA_LOGIN`, HTML servido por el servidor, no por React), `/api/*` da `401` y los
estáticos también. Sesión = JWT de acceso 15 min + refresh 7 días rotado (hash en la tabla `Sesion`, 30 s de
gracia para peticiones en paralelo), en cookies `httpOnly`; el refresco ocurre en el propio servidor. En el
cliente, `instalarGuardiaSesion()` (`src/services/sesionCliente.ts`) recarga la página ante un `401` de `/api`.
Roles: `ADMIN` (gestiona usuarios en Ajustes › Usuarios y acceso) y `EQUIPO`.

| Módulo del servidor (`src/server/`) | Qué hace |
|---|---|
| `sesion.ts` | login, logout, `/yo`, cambio de clave, guardia, página de login, `asegurarAdmin` |
| `usuarios.ts` | CRUD de usuarios (solo ADMIN); nunca deja el sistema sin admin activo |
| `datos.ts` | perfil del candidato, piezas analizadas, archivos guardados |
| `limite.ts` | límite de peticiones en memoria (una sola réplica) y `MODELOS_PERMITIDOS` de Gemini |
| `claves.ts` | hash `scrypt` de la librería estándar (sin módulos nativos que compilar en Alpine) |

**Gemini solo desde el servidor.** El navegador llama a `/api/gemini/generar` (genérico, vía
`src/services/geminiService.ts`), `/api/contenido/generar`, `/api/piezas/*` y `/api/antigravity/*`; la clave
vive en `GEMINI_API_KEY` del servidor. Nunca definir la clave en `vite.config.ts` (acabaría en el bundle). Un
modelo nuevo hay que añadirlo a `MODELOS_PERMITIDOS` o el servidor lo rechaza con `400`.

**Dos clases de datos, con reglas distintas:**
1. **Datos oficiales y geográficos** (Registraduría, DANE, GeoJSON, censo, resultados por puesto): **archivos
   del repo**, generados por `scripts/` (Python y `.mjs`, cada uno con docstring de fuente y uso). Viven en
   `src/data/` (importados en el bundle; los grandes por municipio, cargados bajo demanda) y `public/data/`
   (`fetch`). No van a la base. `public/modulos/voto-correlaciones/` lo genera
   `scripts/importar_voto_correlaciones.py` y **no se edita a mano** (por eso está fuera del lint).
2. **Lo que produce el equipo**: PostgreSQL con Prisma (`prisma/schema.prisma`). `PerfilCandidato` (clave
   `activo`, incluye la identidad del candidato), `PiezaAnalizada`, `ArchivoGuardado`, `Usuario`, `Sesion`.
   Los datos van como JSON para conservar los tipos del cliente. Lo que un navegador tenía en `localStorage`
   se sube solo la primera vez (`leerLocal`/`borrarLocal`). **Hoy es un solo inquilino**: todos los usuarios
   ven todo (el multi-tenant está en los pendientes de `ESTADO_PROYECTO.md`).

**Frontend sin router.** `App.tsx` guarda la vista actual en estado (`NavViewId`) y carga cada vista con
`lazy`. La navegación (5 módulos + Ajustes, con pestañas) está en `src/components/layout/navigation.ts`. Vista
nueva = añadir su id a `NavViewId`, ponerla en un módulo de `MODULES` y renderizarla en `App.tsx`.

**Territorio activo compartido**: `activeTerritoryContextService` es el puente entre el mapa (Territorio) y los
demás módulos (contenido, segmentos): lo que se elige en el mapa alimenta a todos. Tema, paneles y territorio
activo siguen en `localStorage` a propósito (son preferencias de pantalla).

**Marco metodológico** (4 capas): los `.docx` de Isaac se ingestan con `scripts/ingestar_marco.mjs` hacia
`src/data/marco/` (`registro.json` + un `.md` por bloque; ver `docs/marco/README.md`). `marcoService.ts` los
lee sin tocar código; el reglamento vigente (`capa1/reglamento-*.md`) rige todo contenido generado (sus reglas
del "piso 3" van en el sistema del generador de contenido y del análisis de piezas).

**Gobernación** (`/api/gobernacion/*`): lanza `scripts/gobernacion_bridge.py` contra una SQLite en el PC de
Isaac (`GOBERNACION_DIR`). En el servidor no hay Python: responde un error claro y el resto sigue.

**Estilo**: "sobrio cívico", tokens `--c-*` en `src/index.css` (claro/oscuro con `data-tema`). **Las decisiones de diseño y su porqué están en `docs/DESIGN.md`** (dos tokens de borde, foco, mínimo 12 px, barra inferior en teléfono, sello de procedencia); `src/theme/contraste-tokens.test.ts` mide el contraste leyendo el CSS real. Varios módulos
viejos conservan el estilo oscuro/cristal anterior; no reescribirlos, unificarlos poco a poco.

**Código muerto conocido** (no imitarlo): `HomePageStructure.tsx`, y en `CandidateProfileManager.tsx` el paso
"Conexión a Google Drive" (era un Drive simulado; hoy lo reemplazan los Archivos guardados reales). El
componente se conserva porque de él salen el tipo `CandidateProfile` y el perfil por defecto.

## Producción

**https://polimetrics.app**: Coolify del data center de Guarne, proyecto EMPRESA, app `proteus`
(`d4y08fa3m5uhwvpmba5le0h3`), build pack Dockerfile, puerto 3000; base `proteus-db` (`postgres:18`,
`g40hrdg3ty3lvpb6ez010vds`). Detalle y verificación en `docs/DESPLIEGUE_COOLIFY.md` y en el bloque
`guarne-deploy` de `AGENTS.md`; accesos y bitácora del data center en `G:\Mi unidad\Servidores\Servidores Guarne\`.

- **No hay auto-deploy** hasta que Isaac cree el webhook (requiere admin del repo): tras cada merge se despliega
  a mano (`POST /api/v1/deploy` de Coolify o desde el panel).
- El contenedor aplica `prisma migrate deploy` al arrancar; si una migración falla, no arranca y Coolify
  conserva la versión anterior. Al terminar un despliegue sale `unhealthy` unos segundos mientras migra: normal.
- **Verificar la función, no el código HTTP**: `/api/health/ready` con `db: ok`, `/api/datos/perfil` sin sesión →
  `401`, `http://` → `301` a https, y en el navegador: entrar, abrir el mapa y guardar algo. Cloudflare da `403`
  a peticiones sin `User-Agent` de navegador: usar `curl -A "Mozilla/5.0"`.
- Imagen Alpine: el healthcheck de Coolify usa `wget` contra `localhost`, que resuelve a IPv6. Por eso el
  servidor escucha sin host fijo (IPv4 e IPv6); no volver a `app.listen(PORT, '0.0.0.0')`.
- Límites: Cloudflare corta cuerpos de más de 100 MB (videos grandes → enlace de YouTube); el límite de
  peticiones es en memoria, así que **una sola réplica**.

## Herramientas

- **`codebase-memory-mcp` primero para explorar código**: proyecto `D-Network-IA-Solutions-Clientes-proteus-1.45`
  (raíz `D:/Network IA Solutions/Clientes/proteus-1.45`). Re-indexar tras cambios grandes con
  `index_repository` (`mode="moderate"` y ese `name`, o se duplica). Grep/Read para datos, docs y configs.
- Librerías (Prisma, Express, Vite, React, Leaflet, `@google/genai`) → **context7**, no de memoria.
  Pantallas → **Playwright MCP**. Rediseños de módulos existentes → skill `redisenando-interfaces-en-produccion`;
  landing/login → skill `construyendo-landings-premium`.

### Cuándo delegar y reparto de modelos

La sesión principal edita directo cuando el cambio toca ≤ 2 archivos, es UI/copy/config o un bug localizado,
o es un ajuste sobre trabajo de la misma sesión. Delegar solo con ≥ 3 unidades de trabajo independientes o
para explorar código que no está en contexto. Al delegar: `model: "sonnet"` explícito siempre (sin él hereda el
de la sesión, el más caro). Revisión con `model: "opus"` solo para la revisión final de una rama grande y para
diffs de auth/sesión, datos de usuarios o aislamiento multi-tenant. A los subagentes: que corran **solo su
archivo de prueba** (su Bash corta a los 120 s) y que usen el grafo antes de leer archivos.
