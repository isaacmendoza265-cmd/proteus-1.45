# Pendientes de Proteus

**Actualizado:** 3 de octubre de 2026 (tareas cortas: código muerto, comuna 12 de Bello, aplicación de Claude).

Esta es la lista consolidada. El detalle histórico está en `docs/ESTADO_PROYECTO.md` (secciones 3 y 5) y el estado de cada herramienta, en `docs/AUDITORIA_FINAL_HERRAMIENTAS.md`.

## 1. Lo que se hizo hoy (2-oct-2026)

| Tema | Resultado | Commit |
|---|---|---|
| Tres macrofuentes | Toda llamada a Gemini lleva datos de la unidad, perfil del candidato y marco; las posturas son la semilla del marco | `c06bfb5`, `7437f1e` |
| Auditoría de datos auxiliares | 49 archivos y 4 tablas cruzados con DANE y Registraduría; 337 cédulas retiradas | `4e893ef` |
| Mapa como consola | La unidad elegida es el territorio activo de toda la app, con una columna de herramientas; el menú izquierdo se puede ocultar | `a865637` |
| Decisiones de Isaac | Registradas en `ESTADO_PROYECTO.md` §2 | `077eef9` |
| Análisis del territorio | Calculado para los 125 municipios y sus unidades, con "Redactar con Gemini" | `ba36d9b` |
| Fuentes nuevas verificadas | Población de la Alcaldía de Medellín y fuentes de seguridad (`FUENTES_SEGURIDAD_Y_POBLACION.md`) | `a1d654d` |
| Proyección del Distrito de Medellín 2018-2030 | Sexo y edad de 351 unidades; Segmentos de Medellín pasa a "Oficial" y muestra 2030 | `e9fe190` |
| Seguridad: Policía y MinDefensa | 7 delitos por municipio 2018-2026, tasas y comparación de enero a agosto | `e9fe190` |
| Seguridad: Defensoría | 46 alertas tempranas que tocan Antioquia, separadas en específicas y generales | `e9fe190` |
| Corrección del dossier | Fallaba en Alejandría, Briceño, Cáceres, Maceo y Tarso | `e9fe190` |
| Motor de personalización | Fotos reducidas al subirlas; tope de 95 MB para videos | `ba1db16` |
| Noticias por unidad | Búsqueda de Google desde Gemini, bajo demanda, guardada y usada como fuente auxiliar de todos los análisis | `68616fa` |
| Auditoría final de las 19 herramientas | 0 errores en el navegador; el Día E ahora dice que sus datos son de ejemplo | `99f08cf` |
| Seguridad: Fiscalía | Delitos electorales, extorsión, desplazamiento, reclutamiento o uso de menores, y víctimas defensoras de DD. HH. o periodistas, por municipio, 2018-2026 | ver bitácora |
| Estudios académicos | Indepaz (balance 2025) e IPA (gobernanza criminal en Medellín), como fuente auxiliar con cita y página | ver bitácora |

## 2. Bloqueantes de producción

1. ~~**Clave de Gemini válida en Coolify**~~: el 3-oct producción ya respondió `503 high demand` en vez de 403, así que Google acepta la clave. Para la saturación se añadió la cadena de respaldo 3.8 → 3.7 → 3.6 → 3.5 (`0e9b1cc`).
2. **Redesplegar en Coolify** el último `main`. El contenedor aplica solo la migración `noticias_unidad`. Responsable: Jose.
3. **Al tener clave:**
   - probar una llamada de cada tipo: análisis, generador, analista, segmentos, piezas, multimedia, noticias, subregiones, país y revisores;
   - validar el análisis de piezas con 3 o 4 piezas reales;
   - confirmar la tarifa de la búsqueda de Google desde Gemini.

## 3. Pendientes de Isaac

- **Capa 2 del marco**: la compila Isaac.
- **Dossiers de las familias 1, 2 y 3 y Capa 3**: en producción; se cargan cuando estén. Las reglas de la Capa 3 se integran luego al libro de reglas de piezas.
- **Respaldo de modelos** ante saturación de Gemini: dentro de Gemini ya está la cadena 3.8 → 3.5 (3-oct). Falta decidir si se añade otro proveedor (opción: DeepSeek) por si cae todo Gemini.
- **GitHub, como dueño del repositorio:**
  - crear el webhook de auto-deploy.
- **Privacidad de la identidad:** activar "Enviar imágenes/videos a Gemini" si se quiere que la IA vea fotos y videos del candidato.
- **Estudios académicos adicionales:** elegir si se agregan otros, además de los cargados hoy.
- **Reglas del reglamento v1.2 que la app aún no cumple del todo**, a revisar con Isaac:
  - regla 5: los puestos con ubicación aproximada colorean igual que los exactos;
  - reglas 1, 13 y 17: tabla de correlaciones y arrastre por recorte;
  - reglas 6 y 14: fichas B de casas.

## 4. Pendientes de Jose (Network IA Solutions)

1. **Multi-tenant (prioritario).** Hoy es un solo inquilino y todos los usuarios ven todo. Implica:
   - modelo `Organizacion` y filtrado por inquilino en el servidor;
   - pruebas de aislamiento;
   - rol de plataforma;
   - decidir qué datos son comunes y cuáles de cada cliente.
2. **Login con landing page** (prompt maestro de Casa Korea, skill `construyendo-landings-premium`).
3. **Rediseño de los módulos que conservan el estilo oscuro** (propuesta "Cada cifra con su sello", fases 0 a 2).
4. **Operación:**
   - cambiar la clave del admin `kali@kali.com`;
   - verificar que `proteus-db` aparece en la copia diaria;
   - pulir la redirección de `www`.

## 5. Datos y fuentes

### Seguridad
- **MOE: pendiente.** El mapa de riesgo electoral de las territoriales 2027 aún no se publica; el de 2026 (elecciones nacionales) solo existe en PDF.
  - Cuando salga el de 2027: transcribir por municipio el riesgo por fraude, por violencia y el consolidado, rotulado como fuente identificable de la sociedad civil.
  - Mientras tanto, se puede decidir si se transcribe el de 2026, rotulado "elecciones nacionales 2026".
- **Tesis de la U. de Antioquia sobre gobernanza criminal en el Bajo Cauca (García, 2024): pendiente.**
  - El repositorio responde con una verificación anti-robots; hay que descargarla a mano.
  - El archivo va en `_originales/estudios/`; luego se transcriben sus hallazgos en `scripts/importar_estudios.py`.
- **SISC Medellín** (homicidios y delitos por comuna y barrio): confirmar si hay conjunto abierto en MEData.
- **Medicina Legal** (lesiones fatales): opcional, como contraste de la cifra de la Policía.
- **Noticias:** hoy son bajo demanda. Un barrido programado (opción B) queda para cuando la clave funcione y se conozca la tarifa.

### Electoral y territorio
- **Día E:** cargar las actas E-14 y E-24 reales cuando existan y retirar las de ejemplo.
- **P4, presupuesto de alcaldía (CUIPO):** pendiente de aprobación de Isaac.
- **P4, estratificación vigente:**
  - Medellín: bajar la capa oficial.
  - Los otros 8 del Valle de Aburrá: pedirla a cada oficina de estratificación.
- **P4, casas políticas:** cruzar los ganadores 2015-2023 con Cuentas Claras; cada vínculo con fuente citada y revisión humana.
- **57 puestos sin ubicar:** probar con la capa de sedes educativas georreferenciadas (con permiso).
- **Barrios con nombre** en Girardota, El Retiro, La Unión, Nechí, Zaragoza, San Pedro de los Milagros, Santa Fe de Antioquia, Amagá y El Santuario: pedirlos a las alcaldías.
- **Bello:** componentes con datos a mano (`BelloInteractiveMap.tsx`, `analystOtherMunisData.ts`).
- **Gobernación a PostgreSQL:** hoy es una SQLite en el PC de Isaac; en el servidor da un error controlado.

## 6. Deuda técnica

- Componentes JSX monolíticos (Gobernación, Subregiones, Contenido) y módulos con el estilo oscuro anterior.
- Pruebas lentas por carga de JSON grandes (`electionResultsService`, `municipalDivisions`, `faseB`).

## 7. Cerrados hoy (ya no son pendientes)

- Clave de Gemini en el bundle del cliente: `vite.config.ts` ya no la inyecta (verificado en el build).
- Ampliar el análisis narrativo a todo Antioquia y redactarlo con Gemini: hecho.
- Población de Medellín por comuna (serie vieja de 2.650.662): reemplazada por la proyección del Distrito, que coincide con el DANE.
- "Votos proyectados" sin método en Segmentos: retirados (`b9c8140`).
- Día E sin rótulo de ejemplo en su propia vista: rotulado.
- Seguridad (Policía, Defensoría, Fiscalía y estudios): cargada, salvo la MOE y la tesis de la U. de Antioquia.
- Séptimo de "los 7 puntos de la app": error humano, cerrado.

## 8. Cerrados el 3-oct-2026

- Aplicación de Claude instalada en el repositorio: las sesiones en la nube ya empujan a `main` sin bundles.
- Código muerto retirado: `HomePageStructure.tsx` y `CandidateProfileManager.tsx` entero (nadie lo renderizaba; el paso de Google Drive simulado iba dentro). El tipo `CandidateProfile` y el perfil por defecto pasan a `src/types/candidateProfile.ts`.
- Bello, comuna 12: **no tiene nombre oficial** (el plano del POT 2009 la numera sin nombre y la Registraduría llama "Comuna 12" al corregimiento San Félix). Se queda como "Comuna 12"; su único barrio es el asentamiento El Pinar, y un actor anclado en "El Pinar" ya cae en ella. Ojo: la Alcaldía tramita una modificación excepcional del POT para formalizar Granizal como comuna 12 (El Colombiano); si se aprueba, hay que rehacer la capa con el nuevo plano.
