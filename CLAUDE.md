# CLAUDE.md

Guía para Claude Code (y cualquier asistente de IA) al trabajar en este repositorio.

## 👤 Para quién trabajamos

El dueño del repo es **Isaac Mendoza**. Construyó Proteus con asistentes de IA y **no tiene
formación técnica**: no lee diffs ni sabe diagnosticar un build roto. Desde el 2026-09-24 un
equipo le ayuda a estabilizarlo. Consecuencias prácticas:

- **Todo lo que se le explique a Isaac va en español llano**, sin jerga: qué cambió, qué
  puede notar en pantalla y qué tiene que hacer él (si tiene que hacer algo). Nada de
  "refactor", "bundle" o "typecheck" sin traducirlo.
- **Isaac mergea los PRs**. La descripción de cada PR empieza con una sección
  **"Qué cambia para Isaac"** en 2-4 frases llanas, antes del detalle técnico.
- Una IA que dice "listo" sin haberlo comprobado le deja la app rota a alguien que no
  puede darse cuenta. Ver [No decir "listo" sin verificar](#-no-decir-listo-sin-verificar).

## 🎯 Proactividad: hallazgos que corrigen lo ya hecho

**Si aparece un dato que contradice o invalida trabajo ya entregado, actúa sobre él en el
momento**: impleméntalo, pruébalo y cuéntalo hecho. No lo dejes como "posible mejora" ni
preguntes si conviene. Nadie revisa el código línea a línea: un hallazgo que solo se
menciona no se convierte en corrección, y lo entregado se queda mal.

No es barra libre: aplica a lo que **corrige o completa el trabajo en curso**, no a abrir
frentes nuevos ni a refactors "ya que estoy".

Las decisiones que son **del usuario** se siguen preguntando: gastar dinero (cuotas de
Gemini incluidas), borrar o sobrescribir datos, publicar o enviar algo al exterior, y
cualquier cosa difícil de revertir.

Y proactividad **no significa traer buenas noticias**: un "esto no funciona y aquí está la
evidencia" vale más que un resultado bonito que no se sostiene.

## ⚡ Cuándo delegar y reparto de modelos

**Primero decide si delegar.** La sesión principal edita directo, sin subagentes, cuando:

- el cambio toca **≤ 2 archivos**, o es UI / copy / config / un bug localizado;
- es un ajuste sobre trabajo hecho en esta misma sesión;
- ya sabe qué archivos tocar sin explorar.

Delegar sólo si hay **≥ 3 unidades de trabajo independientes** paralelizables, o hace falta
explorar código que no está en contexto. Un subagente arranca en frío y relee todo.

**Modelos (sólo al delegar):** desarrollo y exploración → `model: "sonnet"`. Nunca despachar
un subagente sin `model` explícito: sin él hereda el de la sesión, el más caro. Revisión con
`model: "opus"` sólo para la revisión final de una rama grande o para diffs que tocan
seguridad (API keys, endpoints de `server.ts`) o datos personales.

---

## Qué es

Plataforma de inteligencia electoral y territorial para Colombia (foco en Antioquia y el
Valle de Aburrá): mapas en 5 escalas (nacional → barrio), repositorio municipal, segmentación
de votantes, generación de contenido de campaña con Gemini, simulador D'Hondt, auditoría
E-14/E-24 con Ley de Benford y grafos de casas políticas.

Nació en **Google AI Studio** (de ahí `metadata.json`, `DISABLE_HMR` en `vite.config.ts` y
`scripts/make_aistudio_zip.py`). El nombre del producto aparece como 1.2, 1.4.5 y 1.45 según
el archivo: el repo es `proteus-1.45`.

## Comandos

```bash
npm install          # instalar dependencias (hay package-lock.json: usar npm, no yarn/pnpm)
npm run dev          # servidor Express + Vite en http://localhost:3000
npx vite build       # build del frontend: ES LA PUERTA REAL (ver abajo)
npm run build        # build del frontend + bundle de server.ts en dist/server.cjs
npm start            # sirve dist/ en producción
npm run lint         # tsc --noEmit (hoy NO pasa: ver "Deuda de tipos")
```

No hay tests automáticos todavía.

## Arquitectura

- **Frontend:** React 19 + TypeScript + Vite 6 + Tailwind 4. SPA sin router: `src/App.tsx`
  cambia de vista según `currentView` (tipo `NavViewId` en
  `src/components/layout/SidebarNav.tsx`). Cada vista vive en `src/modules/<área>/`.
- **Componentes:** `src/components/`. Varios pasan de 2.000 líneas
  (`SubregionesStrategicDeepening`, `PdfScriptGenerator`, `SubregionesManager`,
  `CandidateProfileManager`). Al tocarlos, extraer piezas nuevas a archivos aparte en vez
  de engordarlos más.
- **Servicios:** `src/services/`. `geminiService.ts` centraliza las llamadas a Gemini (con
  `formatAiError` para mensajes de cuota), pero varios componentes crean su propio
  `new GoogleGenAI(...)`.
- **Datos:** todo está escrito a mano en `src/data/**/*.ts` (censos DANE, resultados E-24,
  alcaldes, concejales...). Los GeoJSON grandes están en `src/data/geojson/` como módulos TS
  (`colombiaDepartmentsGeoJson.ts` tiene 73.000 líneas) y también en `public/data/`.
- **Servidor:** `server.ts` (Express). En desarrollo monta Vite como middleware; en
  producción sirve `dist/`. Rutas:
  - `/api/antigravity/*`: proxy a Gemini con la key del servidor.
  - `/api/gobernacion/*`: ejecuta `scripts/gobernacion_bridge.py`, que lee una base SQLite
    en una **ruta fija del PC de Isaac** (`c:\Users\isaac\OneDrive\...`). Fuera de esa
    máquina esas rutas fallan, y la UI debe tolerarlo (la barra superior muestra
    "desconectado").
- **Persistencia:** sólo `localStorage` del navegador (perfil de candidato, sesión de
  Drive). No hay base de datos propia.

## Configuración / entorno

- `.env` (copiar de `.env.example`): `GEMINI_API_KEY`, `PORT`. Nota: `server.ts` ignora
  `PORT` y usa siempre 3000.
- 🔴 **La API key de Gemini termina en el JavaScript público.** `vite.config.ts` hace
  `define: { 'process.env.GEMINI_API_KEY': ... }`, así que la key queda incrustada en el
  bundle y cualquiera que abra la web puede copiarla. **No desplegar en público con una key
  real** hasta mover las llamadas a Gemini detrás de `server.ts` (prioridad 1 de la hoja de
  ruta).
- `server.ts` no tiene autenticación ni límite de peticiones, y acepta una key propia en la
  cabecera `x-gemini-api-key`.
- Los modelos usados son `gemini-3.8-flash` (repartidos por muchos archivos). Si cambia el
  modelo, buscar y reemplazar en todo `src/`.

---

## 🔴 Trampas conocidas (medidas, no supuestas)

Hallazgos del 2026-09-24, al encontrar la app rota:

1. **Tres commits seguidos rompieron el build y nadie lo notó.** Un `</button>` sin cerrar,
   una `const` declarada dos veces y un import de algo que no existía
   (`gobernacionService`). El editor de IA no compila antes de subir. **Siempre
   `npx vite build` antes de commitear.**
2. **Un build verde NO significa que la app abra.** Después de arreglar el build, la app
   seguía en blanco:
   - **Claves de datos que no coinciden.** Los GeoJSON buscan
     `METROPOLITAN_MUNICIPALITIES_DATA['la-estrella']` y `MEDELLIN_COMUNAS_DATA[...]` por
     clave literal. Si la clave del objeto de datos se escribe distinto (`la_estrella`), el
     acceso da `undefined`, `.population` explota **al importar el módulo** y cae toda la
     app, no solo ese mapa. Convención: **ids en kebab-case** (`la-estrella`,
     `med-correg-san-antonio`). Al renombrar un id, buscarlo en todo `src/`.
   - **`new GoogleGenAI({ apiKey: undefined })` lanza al cargar el módulo** y tumba la app
     entera si no hay key. Usar siempre `process.env.GEMINI_API_KEY || ''`.
   - **Un hook usado sin importar** (`useMemo`) solo falla al abrir esa vista.
3. **`tsc` tiene ~147 errores heredados**, por eso `npm run lint` no sirve hoy como puerta.
   Regla mientras se sanean: **un cambio no puede subir ese número**. Se mide así:
   `npx tsc --noEmit 2>&1 | grep -c "error TS"`.

## ✅ No decir "listo" sin verificar

Antes de decir "listo", "arreglado" o "funcionando":

1. `npx vite build` compila sin errores.
2. El número de errores de `tsc` no sube (ver trampa 3).
3. **La app abre y las vistas que tocaste renderizan sin errores en consola.** Con
   Playwright/Chromium: cargar `http://localhost:3000`, escuchar `pageerror` y pulsar cada
   botón de la barra lateral (`nav button, aside button`), recargando entre uno y otro.
   Una vista que falla deja el `body` casi vacío (~16 caracteres). El 2026-09-24 así se
   comprobaron las 18 vistas.
4. Si algo no se pudo comprobar (por ejemplo, llamadas reales a Gemini sin key), **decirlo
   tal cual**, no darlo por hecho.

## Flujo de trabajo

- **`main` es de Isaac.** El equipo trabaja en una rama por tanda de trabajo (una rama por
  frente, no una por cada arreglo) y abre un PR contra `main`. Isaac mergea.
- **Commits en español** con prefijo convencional, como el historial: `feat:`, `fix:`,
  `refactor:`, `docs:`, `chore:`.
- No subir binarios ni informes pesados nuevos a la raíz (ya hay PDF/HTML de informes ahí).
  Documentación nueva en `docs/`. Los protocolos de la "Unidad de Automejora" viven en
  `protocolos_de_automejora/`.
- `subir_a_github.bat` / `.ps1` son scripts personales de Isaac con rutas de su PC: no
  usarlos ni modificarlos como parte de un cambio.

## 🗺️ Hoja de ruta técnica (en este orden)

1. **Seguridad:** sacar `GEMINI_API_KEY` del bundle y mover todas las llamadas a Gemini
   detrás de rutas de `server.ts`, con un límite de peticiones básico.
2. **CI:** GitHub Action que corra `npx vite build` (y el conteo de `tsc`) en cada PR, para
   que un build roto no llegue a `main` nunca más.
3. **Tests:** Vitest para la lógica pura: simulador D'Hondt
   (`electoralSimulatorService.ts`), Benford (`electoralForensicsService.ts`), agregadores
   de subregiones, y un test que verifique que **toda clave usada por los GeoJSON existe
   en los datos** (la trampa 2).
4. **Rendimiento:** el JS pesa 6,1 MB (1,65 MB gzip). Pasar los GeoJSON a `public/data/`
   con `fetch` y cargar cada vista con `React.lazy`.
5. **Deuda de tipos:** bajar los errores de `tsc` a 0 y entonces sí usar `npm run lint`
   como puerta.
6. **Datos auditables:** pasar los datos de `src/data/` a JSON con fuente y fecha de cada
   cifra.

## ⚖️ Datos personales y cumplimiento

Proteus maneja perfiles de votantes, segmentación psicográfica y fichas de actores
políticos. En Colombia eso cae bajo la **Ley 1581 de 2012 (habeas data)** y las normas
electorales sobre publicidad. Al añadir datos de personas o segmentación nueva: dejar
anotada la fuente pública de cada dato, no incorporar datos personales de ciudadanos
particulares, y avisar al equipo si una función nueva podría requerir revisión legal.
