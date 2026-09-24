# PROTOCOLO PA-012: INYECCIÓN DE MICRO-REDES DE CONCEJALES, RELEVOS INSTITUCIONALES Y COBERTURA UNIVERSAL EN LA PUBLICIDAD ELECTORAL
## UNIDAD DE AUTOMEJORA ESTRATÉGICA • PROYECTO PROTEUS v1.4.5
**Fecha de Emisión**: 24 de Septiembre de 2026  
**Derivado de**: Sesión Crítica Nº 009 (ODI-009)  
**Objetivo Operativo**: Traducir las micro-redes de concejales municipales, relevos de curules y departamentos de Colombia en parámetros de micro-targeting, ganchos de persuasión y multiplicadores de eficiencia publicitaria (IRPV).

---

## 1. REGLA FUNDAMENTAL DE MICRO-TARGETING POR CONCEJALES

En cada municipio, el electorado no es un bloque homogéneo. La distribución del voto en las corporaciones municipales refleja los feudos barriales reales:

$$\text{Poder Relativo de la Bancada } (PRB) = \frac{\text{Votos de Concejales de la Casa en el Municipio}}{\text{Censo Electoral Activo del Municipio}}$$

1. **Cuando el PRB es $> 40\%$ (Hegemonía Cerrada)**:
   - *Ejemplo*: Itagüí (Casa Trujillo con 6 concejales conservadores) o Envigado (Casa Londoño con 6 concejales liberales).
   - *Postura Publicitaria*: **Confrontación Directa o Alternativa Limpia**.
   - *Gancho Estratégico*: Apelar a la libertad del voto, meritocracia en la contratación municipal y protección de los programas sociales sin ataduras clientelares.
2. **Cuando el PRB es entre $20\%$ y $40\%$ (Escenario de Disputa / Pluralismo)**:
   - *Ejemplo*: Medellín (Creemos con 8 curules, Centro Democrático con 5 curules, Conservador con 2, Liberal con 1, Pacto Histórico con 1, Verde con 1).
   - *Postura Publicitaria*: **Capitalización de Relevos y Alianzas Temáticas**.
   - *Gancho Estratégico*: Destacar liderazgos técnicos en salud (Dr. Jorge Julián Osorio), seguridad (Milton Vasco y Andrés Rodríguez) y finanzas públicas.
3. **Cuando el PRB es $< 20\%$ (Territorio de Oposición Abierta o Dispersión)**:
   - *Ejemplo*: Envigado con Jhony Vélez (27.702 votos de oposición) o Sabaneta con Iván Alonso Montoya (13.836 votos de oposición).
   - *Postura Publicitaria*: **Cooptación de Votantes Descontentos**.
   - *Gancho Estratégico*: Respaldo explícito a las causas de control ciudadano y fiscalización territorial.

---

## 2. ESPECIFICACIÓN DEL MOTOR DE INTELIGENCIA PUBLICITARIA (`holisticAdvertisingIntelligenceService.ts`)

### 2.1. Ingesta de Datos:
- Conectar `GRAPH_NODES_DATA` para extraer dinámicamente los actores con `role: 'concejal'` pertenecientes al `municipality` activo.
- Mapear sus nombres, partidos, votación 2023 y status de reemplazo o curul activa.

### 2.2. Ganchos Automatizados por Municipio:
- **Medellín**: Pauta enfocada en el relevo institucional hacia la idoneidad técnica en salud pública y educación superior con el Dr. Jorge Julián Osorio, y en seguridad ciudadana y control del gasto con Milton Vasco y la bancada uribista.
- **Bello**: Pauta enfocada en el control político a la administración de Lorena González (Suárez Mira) a través de los concejales del CD (Duván Bedoya) y Liberal (Carlos Mosquera).
- **Itagüí**: Pauta dirigida a los votantes libres en Ditaires y San Pío que rechazan la maquinaria cerrada de Carlos Andrés Trujillo.
- **Envigado**: Pauta que canaliza el descontento de los más de 27.000 electores de Jhony Vélez frente a la hegemonía histórica liberal.
- **Sabaneta**: Pauta sobre el colapso del POT y la sobredensificación de vivienda vertical con Iván Montoya y el Centro Democrático.
- **Rionegro**: Pauta enfocada en el fortalecimiento del eje de desarrollo agroindustrial y tecnológico del Oriente, apalancando la bancada afín al Gobernador Andrés Julián Rendón.
- **Nivel Departamental / Nacional**: Para cualquiera de los 32 departamentos y Bogotá D.C., adaptar el mensaje a las prioridades regionales de infraestructura y desarrollo económico.

---

## 3. COMPROMISOS TÉCNICOS DE DESPLIEGUE

1. Actualizar `src/services/holisticAdvertisingIntelligenceService.ts`.
2. Actualizar `src/components/advertising/TerritoryIntelligenceBridgeCard.tsx`.
3. Validar con pruebas automatizadas (`test_cartography_and_graphs.py` y `verify_imports.py`).
4. Sincronizar con `SUBIR_A_GITHUB` y Git Push a `main`.
