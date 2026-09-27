# Proteus — estado del proyecto (memoria compartida entre agentes)

Última actualización: 27-sep-2026 (Claude Opus, rama `codex/navegacion-mapa`). **Todo agente debe actualizar este archivo al terminar.**
Repositorio local: `C:\Users\isaac\OneDrive\Documentos\Proyecto Proteus`. Remoto: github.com/isaacmendoza265-cmd/proteus-1.45.
`main` local: `14db9bf` (GitHub tiene `1968fd5`). Rama `codex/navegacion-mapa` con `33020c4`, `f0b3769` y `26f6b57`, sin subir ni fusionar.
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
- Verificación al último commit (`f0b3769`): tsc limpio en `src/`, 211 pruebas, build OK.

## 2. Decisiones de Isaac (respetarlas)
- Seguridad, marco teórico y etapa 2 (social listening, encuestas): aplazados.
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

## 3. Pendientes (en orden sugerido)
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
