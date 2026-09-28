# Proteus — estado del proyecto (memoria compartida entre agentes)

Última actualización: 28-sep-2026 (Claude Opus: `main` = Inicio nuevo + encuestas 2026 fusionadas). **Todo agente debe actualizar este archivo al terminar.**
Repositorio local: `C:\Users\isaac\OneDrive\Documentos\Proyecto Proteus`. Remoto: github.com/isaacmendoza265-cmd/proteus-1.45.
Ramas `codex/navegacion-mapa`, `claude/inicio` y `claude/encuestas-2026` ya fusionadas en `main` (28-sep). No subir bundles a GitHub por la web: se aplican con `git fetch <bundle>`.
Entorno Windows: Node 24 está en `C:\Program Files\nodejs` pero no siempre en el PATH de los agentes
(`$env:Path = "C:\Program Files\nodejs;" + $env:Path`). `npx tsc` también revisa las carpetas locales ignoradas
(`_archivo/`, `_originales/`, `SUBIR_A_GITHUB/`) y da 24 errores ahí: no cuentan, `src/` está limpio.

## 1. Qué está hecho en Antioquia (125 municipios)
- **Cartografía**: 46 municipios > 20.000 votantes con comunas/barrios y veredas; 79 municipios ≤ 20.000
  solo con cabecera + veredas. Medellín con Altavista y Palmitas; Bello con 12 comunas + 19 veredas + sector Ovejas.
- **Demografía y economía por manzana (CNPV 2018)**: estrato, sexo, edad, vivienda, IPM, vulnerabilidad,
  unidades económicas; NBI municipal; pirámide sexo × edad 2026 (proyección DANE).
- **Resultados por puesto (22 elecciones)**: 2026 Senado, Cámara, Presidencia 1.ª/2.ª; 2023 Alcaldía,
  Concejo, Gobernación, Asamblea; 2022 Senado, Cámara, Presidencia; 2019 y 2015 territoriales; 2018 Presidencia.
  Fuente: escrutinio mesa a mesa (MMV) de la Registraduría. Congreso 2018 no existe mesa a mesa.
  Ubicación de puestos históricos: 2015 90 %, 2018 85 %, 2019 93 %, 2022 95 %.
- **Puestos 2026**: 1.280 en Antioquia; 57 sin ubicar (22 en los grandes, 35 rurales en los pequeños).
  Coordenadas: Divipole 2023 → dirección → lugar → OpenStreetMap (validado: urbano mediana 40 m) →
  cabecera/centro poblado/vereda (aproximada).
- **App**: ficha de territorio con selector de año, panel y ficha de puesto, visor E-24 de Medellín con
  datos reales, estética "sobrio cívico" en todas las vistas.
- **Mapa** (27-sep): clic en comuna → sus barrios; clic en barrio → ficha; comunas y municipios vecinos
  clicables alrededor (sin volver a la subregión); barra lateral ocultable con territorio, capa y puestos.
  Capas Electoral (año + tipo; puestos de esa elección), Demográfica y Económica (`mapColorService.ts`).
- **Encuestas 2026** (27-sep, rama `claude/encuestas-2026`): módulo `<voto-correlaciones>` 0.3.0 (proyecto
  voto-demografia-2026: 43 encuestas y acumulados del Registro Nacional de Encuestas del CNE, solo agregados, n < 30
  suprimido) en `public/modulos/voto-correlaciones/`. Vista Electorado › Encuestas 2026 con la estética cívica
  (tema claro/oscuro) y, debajo del mapa, "Encuestas y urnas": acumulado de la fase previa a cada elección
  (Senado, 1.ª y 2.ª vuelta) frente al resultado oficial del municipio o de Antioquia, con IC 95 %.
- Verificación al último commit (`f0b3769`): tsc limpio en `src/`, 211 pruebas, build OK.

## 2. Decisiones de Isaac (respetarlas)
- Seguridad y etapa 2 (social listening, encuestas propias): aplazados.
- 27-sep: integrar el módulo de encuestas CNE 2026 (`voto-correlaciones`, de la aplicación modular de encuestas)
  "de forma orgánica y útil" (libertad de diseño). Encuestas CNE a municipio o departamento, nunca a barrio (reglamento v1.2).
- 27-sep: **marco metodológico** en marcha (antes aplazado). 4 capas (interpretación/publicidad × general/local),
  subido por bloques. Bloque 1: reglamento de interpretación v1.2 + dossier Familia 4 (arrastre). El reglamento
  vigente prevalece sobre cualquier salida de la aplicación (ver `docs/marco/README.md`).
- 27-sep: listas de puestos y de actores de la ficha, desplegables.
- 27-sep: **el mapa es el filtro de todo**: el usuario navega por el mapa y cada herramienta (ficha, puestos,
  generador de contenido, análisis narrativo) sigue el área elegida. Subregión: primer clic la elige, el
  segundo abre el municipio.
- 27-sep: análisis narrativo (Valle de Aburrá + 30 municipios de mayor censo; Medellín por comuna) generado
  sin Gemini, determinista a partir de datos con fuente. Isaac no ha dicho si quiere ampliar la lista de
  municipios o si prefiere que se redacte con Gemini una vez la clave funcione (hoy sigue en 403).
- Estrato: se mantiene CNPV 2018 hasta encontrar la estratificación vigente (cada municipio tiene la suya;
  luego investigar por municipio, de los más grandes a los más pequeños).
- Pobreza monetaria: rescindida (no existe por municipio). Usar NBI.
- Valor agregado DANE: se evalúa reemplazarlo por presupuesto de la alcaldía.
- Sin predicción de votos por dinero; sin Ley de Benford (ver `protocolos_de_automejora/DECISION_*`).
- Municipios ≤ 20.000 votantes: sin barrios, solo cabecera y veredas; ubicar puestos aunque sea aproximado.
- Puestos 2026 que no existían en 2015: normal, no es error.
- Descargas: pedir permiso por lote (archivo, fuente, tamaño).
- 27-sep: navegación del mapa por clic (comuna → barrio; barrio directo si el municipio no tiene comunas;
  cambiar de comuna o municipio sin retroceder). Recuadros del mapa en barra lateral ocultable. La ficha de
  puesto se cierra al hacer clic en otra cosa.
- 27-sep: el mapa colorea territorios y puestos según la capa: electoral (año; tipo de elección),
  demográfica y económica. Capas NBI y Riesgo quitadas como botones (NBI dentro de la económica; Riesgo sin fuente).

- 27-sep: el mapa y el panel derecho muestran la misma selección (elección y capa); el mapa lleva un
  generador de contenido con Gemini 3.8 (territorio del mapa, red o medio, tipo de pieza).
- 28-sep: Inicio = página de presentación en esquema (fuentes, proceso, organización, salidas), diseño aprobado en
  el lienzo "Proteus — página de inicio" de claude.ai. Siempre oscura, con figuras 3D de mapas reales.

## 3. Pendientes (en orden sugerido)
000. **Marco metodológico, bloques siguientes**: Isaac los subirá por partes. Capa 1: dossiers de las familias
   1 (temporal), 2 (mismo ciclo) y 3 (ecológica); capas 2, 3 y 4 vacías. Ingesta: `scripts/ingestar_marco.mjs`.
   Reglas del reglamento v1.2 que la app aún no cumple del todo (a revisar con Isaac): regla 5 (los puestos con
   ubicación aproximada hoy colorean el barrio igual que los exactos), reglas 1/13/17 (tabla de correlaciones y
   arrastre por recorte: módulo por construir), regla 6/14 (fichas B de casas con tipo_fuente, vigente_al, estado).
00. **Clave de Gemini**: la de `.env` recibe 403 "Your project has been denied access". Isaac debe revisarla en
   Google AI Studio; sin eso el generador no produce texto (la interfaz muestra el motivo).
0. **Datos simulados en pantalla (hallados el 27-sep, sin corregir)**: "Día E" muestra actas E-14/E-24 mesa a
   mesa escritas a mano (`src/data/electoralAudit/electoralAuditMasterData.ts`); "Contenido" usa 2.650.000
   habitantes fijos para Medellín (`activeTerritoryContextService.ts`, `antioquiaSubregionesData.ts`,
   `antioquia125MunicipalitiesMasterData.ts`); "Electorado" muestra "votos proyectados" sin método
   (`voterDemographicsService.ts`). Isaac no ha decidido si van antes de P4.
1. **P4 — Presupuesto de alcaldía** (lo más rápido): CUIPO en datos.gov.co, API Socrata:
   "OVCF - CUIPO - Programación de Gastos" (`d9mu-h6ar`) y "Ejecución de Gastos" (`4f7r-epif`).
   Filtrar Antioquia, vigencia 2025/2026; mostrar total y por habitante. Pendiente de aprobación de Isaac.
2. **P4 — Estratificación vigente**: proxy = suscriptores residenciales de energía por estrato y municipio (SUI,
   Superservicios). Por barrio solo con el decreto/capa de cada alcaldía.
3. **P4 — Casas políticas**: base curada "sin verificar". Cruzar ganadores 2015-2023 con Cuentas Claras (CNE);
   cada vínculo necesita fuente citada y revisión humana. Protocolo PA-009.
4. **57 puestos sin ubicar**: probar capa de sedes educativas georreferenciadas (Gobernación/MEN), con permiso.
5. **Barrios con nombre** en Girardota, El Retiro, La Unión, Nechí, Zaragoza, San Pedro de los Milagros,
   Santa Fe de Antioquia, Amagá y El Santuario: no hay capa pública; pedir a las alcaldías.
6. Bello: nombre de la comuna 12 (El Pinar); componentes con datos a mano (BelloInteractiveMap.tsx,
   analystOtherMunisData.ts).
7. Deuda técnica: clave de Gemini en el cliente; Google Drive simulado; JSX monolítico.
8. Séptimo de "los 7 puntos de la app" (26-sep): Isaac no lo ha aclarado.
9. Después de Antioquia: resto del país (fases D y E).

## 4. Mapa de scripts (regenerar datos)
- Cartografía: `build_cartografia_fase_b.py`, `completar_bello_ovejas.py`, `agregar_manzanas.py`.
- Puestos: `build_puestos_20k.py` (nacional, > 20.000), `build_puestos_fase_c_antioquia.py` (79 pequeños),
  `geocodificar_puestos_osm_antioquia.py` (OSM; crudos en `_originales/osm/`).
- Resultados: `build_resultados_puesto_2023.py`, `build_resultados_historicos.py <2015|2018|2019|2022>`,
  `build_presidencial_2026.py`, `indice_resultados_puesto.py`, `indice_ganadores.py`, `build_e24_medellin_zonas.py`.
- Demografía: `build_censo_electoral.mjs`, `build_proyeccion_sexo_edad.py`.
- Servicios clave: `src/services/pollingStationsService.ts`, `electionResultsService.ts`, `winnersService.ts`,
  `territoryProfileService.ts`; ficha: `src/components/territorio/`.

## 5. Bitácora (agregar arriba lo más reciente)
- 28-sep (Claude Opus, rama `claude/inicio`): nueva página de Inicio "noche cívica" en forma de esquema (fuentes →
  proceso → organización → qué ofrece), con dos figuras 3D de geometría real: Antioquia con una columna por municipio
  (altura = censo 2026) y las capas del territorio apiladas. `src/modules/inicio/InicioView.tsx`; figuras con
  `scripts/build_figuras_inicio.py` → `src/assets/inicio/*.svg` + `src/data/inicio/figuras.json`. Números leídos
  de los servicios (censo, puestos, elecciones). Día E y Red de poder llevan aviso (datos de ejemplo / en verificación).
  Reemplaza el Inicio anterior (KPI + "continuar" + estado de datos). 232 pruebas, build OK.
- 27-sep (Opus, `claude/encuestas-2026`): integración de `<voto-correlaciones>` 0.3.0. `scripts/importar_voto_correlaciones.py`
  copia el paquete (dist o .zip) a `public/modulos/voto-correlaciones/`; `encuestasService.ts` (estimación por
  municipio/departamento con n efectivo de Kish e IC de Wilson, igual que el módulo; cruce con el escrutinio de la
  Registraduría; emparejamiento de nombres); `VotoCorrelaciones.tsx` (envoltorio React, tokens --c-* → --vc-*);
  `Encuestas2026View.tsx`; `EncuestasTerritorio.tsx` bajo el mapa, con botón que abre la evolución del mismo
  territorio. Hallazgo: en 1.ª vuelta las encuestas (9-mar a 31-may) subestimaron a De la Espriella en ~25 pts en
  Medellín y Antioquia y sobreestimaron a Paloma Valencia en ~20; Cepeda cayó dentro del intervalo.
  Verificado: tsc limpio, 236 pruebas, build OK, capturas claro/oscuro.
- 27-sep (Opus, `codex/navegacion-mapa`) `1187a79`: análisis narrativo debajo del mapa (Valle de Aburrá + 30
  municipios de mayor censo; Medellín por comuna). 4 familias de correlación calculadas (Regla 17), verbos
  epistémicos y cita de fuente por oración (`municipioNarrativeService.ts`, sin Gemini, determinista).
- 27-sep (Opus, `codex/navegacion-mapa`) `25ac50b`: panel de puestos como ventana desplegable filtrada por el mapa
  (departamento › subregión › municipio › comuna › barrio); subregiones seleccionables en la vista de subregiones.
- 27-sep (Opus, `codex/navegacion-mapa`) `93d3108`: censo por comuna/zona del panel de puestos en lista desplegable;
  el contorno de Medellín se quedaba con los 27 puestos (135.063 habilitados) de los 5 corregimientos: corregido.
- 27-sep (Opus, `codex/navegacion-mapa`) `efde46a`: marco metodológico (ingesta por bloques, 4 capas, bloque 1:
  diagrama, reglamento v1.2 y dossier Familia 4; vista Ajustes › Marco metodológico; piso 3 en el generador);
  listas desplegables en la ficha.
- 27-sep (Opus, `codex/navegacion-mapa`) `d0df840`: mapa y ficha comparten elección y capa→sección; generador
  de contenido (subregión › municipio › comuna › barrio, medio y tipo de pieza) con gemini-3.8-flash vía
  `POST /api/contenido/generar` (clave en el servidor). La clave de `.env` da 403 PERMISSION_DENIED.
- 27-sep (Opus, `codex/navegacion-mapa`) `c55ef86`: el mapa se ajusta cuando cambia su contenedor (ResizeObserver →
  invalidateSize); antes quedaban franjas grises y la capa cortada al abrir/cerrar la ficha.
- 27-sep (Opus, `codex/navegacion-mapa`) `95acefc`: Gobernación coloreada por candidato (sus coaliciones no tienen
  color propio y todo Antioquia salía igual); la vista de Antioquia abre en 125 municipios.
- 27-sep (Opus, `codex/navegacion-mapa`) `26f6b57`: puestos coloreados también en Valle de Aburrá y Antioquia
  (resultados por puesto de cada municipio visible; valor del municipio en demografía/economía) y radio según
  el zoom. Municipios del Valle sin código DANE: se buscan por nombre.
- 27-sep (Opus, `codex/navegacion-mapa`) `f0b3769`: color por capa (electoral año+tipo con los puestos de cada
  elección; demográfica y económica con CNPV 2018 por manzana, proyección 2026 y NBI); corregimientos de
  Medellín con el color de la capa.
- 27-sep (Opus, `codex/navegacion-mapa`) `33020c4`: la capa de puestos (canvas) y el contorno de Medellín se
  quedaban con los clics; comuna → sus barrios; comunas y municipios vecinos clicables; barra lateral
  ocultable; la ficha de puesto se cierra con clic fuera o Esc; límite de 30 s a la prueba de los 125 municipios.
- 27-sep (Opus) `1968fd5`: puestos sin coordenadas ubicados con OpenStreetMap (111 → 57 sin ubicar).
- 27-sep (Opus) `aa5f6c3`: Altavista/Palmitas, sector Ovejas, sexo × edad 2026, puestos rurales aproximados.
- 27-sep (Opus) `7610f3c`, `e3de622`: serie histórica 2015-2022 por puesto; visor E-24 real; Concejo 2023 corregido.
- 27-sep (Opus) `6c99bd7`: municipios ≤ 20.000 solo cabecera y veredas; sus puestos en el mapa.
- 26/27-sep (Sonnet): fase C (79 municipios), restyle de vistas, "7 puntos" de la app.
