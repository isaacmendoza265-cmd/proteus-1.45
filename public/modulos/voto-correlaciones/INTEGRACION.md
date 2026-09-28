# Guía de integración — `<voto-correlaciones>`

Módulo para explorar correlaciones entre variables demográficas, territoriales y de comportamiento político y la
intención de voto del ciclo electoral colombiano 2026 (presidencia 1.ª y 2.ª vuelta, **Senado 2026**, aprobación y
evaluación del Gobierno), a partir de los microdatos anonimizados que las firmas encuestadoras publican en el CNE
(Ley 2494 de 2025, art. 12).

- **Sin dependencias**: un archivo JavaScript (Web Component estándar) + un JSON de datos.
- Funciona en cualquier stack: HTML plano, React, Vue, Angular, Svelte, WordPress, Django/Rails templates.
- **Solo recibe agregados** ponderados (Σw, Σw², n por celda). Los grupos con n < 30 se suprimen antes de
  generar el JSON. Nunca se publican microdatos.

## Contenido del paquete

```
voto-correlaciones.js       el componente
data/agregados.json         los datos (≈ 4 MB; se sirve comprimido con gzip ≈ 10× menos)
data/territorial/           territorio × variable × pregunta: index.json + un archivo por combinación
                            (nivel|variable|pregunta, ≤ 1,4 MB cada uno). El componente descarga solo el que necesita
                            la vista abierta ("Evolución territorial" desagregada o "Cruce de preguntas" por territorio)
index.html                  demostración completa
ejemplos/basico.html        integración mínima
ejemplos/mapa-divipola.html integración con una capa territorial de la anfitriona
manifest.json               versión, fecha de los datos, sha256 de cada archivo
esquema_armonizado.md       definición de cada variable y pregunta
integracion_app_anfitriona.md  unión con datos DANE por manzana / barrio / municipio
```

## 1. Integración mínima

```html
<script src="/ruta/voto-correlaciones.js"></script>
<voto-correlaciones src="/ruta/data/agregados.json"></voto-correlaciones>
```

El JSON debe servirse desde el mismo origen o con CORS habilitado. No abrir los HTML con `file://`
(los navegadores bloquean `fetch` local): usar cualquier servidor estático.

## 2. Atributos

| atributo | valores | efecto |
|---|---|---|
| `src` | URL | JSON de agregados |
| `src-territorial` | URL de carpeta | tablas territoriales (por defecto, la carpeta `territorial/` junto a `src`) |
| `theme` | `auto` (defecto) · `light` · `dark` | tema; `auto` sigue al sistema operativo |
| `vista` | `explorar` · `comparar` · `evolucion` · `cruce` · `catalogo` | pestaña inicial |
| `vistas` | lista separada por comas | pestañas visibles; con una sola se oculta la barra |
| `encuesta` | id, p. ej. `2026-61-atlas-intel` | encuesta inicial (por defecto, la nacional más reciente) |
| `pregunta` | `voto_1v` · `voto_2v` · `voto_senado` · `aprobacion` · `evaluacion` | pregunta inicial |
| `variable` | clave canónica (ver esquema), p. ej. `departamento` | variable de cruce inicial |
| `opcion` | texto de la opción, p. ej. `Pacto Histórico` | opción inicial en el gráfico de puntos |
| `sin-encabezado` | (booleano) | oculta título y descripción |

## 3. API de JavaScript

```js
const el = document.querySelector('voto-correlaciones');

el.datos = objeto;                 // entregar los agregados sin URL (p. ej. desde el backend de la anfitriona)
el.cargadorTerritorial = async clave => ({ [idEncuesta]: filas });
                                   // opcional: la anfitriona sirve las tablas territoriales a su manera
                                   // (clave = 'municipio|voto_senado|voto_1v'); si no, se descargan de territorial/
el.seleccionar({ vista, encuesta, pregunta, variable, opcion });
el.seleccion;                      // { vista, encuesta, pregunta, variable, opcion }
el.tablaActual();                  // [{ grupo, codigo, n, n_efectivo, opciones: { 'Iván Cepeda': { p, lo, hi }, … } }]
el.encuestas;                      // metadatos: firma, fechas, ámbito, n, ponderada, preguntas, variables, notas…
```

## 4. Eventos

| evento | `detail` |
|---|---|
| `vc-ready` | `{ encuestas }` — datos cargados |
| `vc-error` | `{ mensaje }` — no se pudieron cargar o validar los datos |
| `vc-change` | `{ encuesta, variable, pregunta, opcion, territorio? }` — cada cambio de selección |

Cuando la variable de cruce es `departamento` o `municipio`, `territorio` trae los datos listos para una capa de mapa:

```js
el.addEventListener('vc-change', ({ detail }) => {
  if (!detail.territorio) return;
  // detail.territorio = { nivel: 'departamento' | 'municipio',
  //                       datos: [{ codigo: '05', nombre: 'Antioquia', p: .71, lo: .61, hi: .80, n: 470, n_efectivo: 86 }] }
  miCapa.setData(detail.territorio.datos.map(d => ({ divipola: d.codigo, valor: d.p })));
});
```

En las vistas nuevas, `vc-change` describe la selección y, en la línea de tiempo, entrega las series:

```js
// Evolución territorial
{ vista: 'evolucion', nivel: 'departamento', territorio: 'Antioquia', codigo: '05', pregunta: 'voto_2v',
  opcion: 'Iván Cepeda', variable: 'sexo' | null, firma: null,
  series: [{ grupo: 'Mujer', puntos: [{ encuesta, firma, fecha: '2026-05-21', p, lo, hi, n, n_efectivo }] }] }
// Cruce de preguntas
{ vista: 'cruce', encuesta: '2026-61-atlas-intel', fila: 'voto_senado', columna: 'voto_1v',
  nivel: 'municipio', territorio: 'Medellín (Antioquia)', codigo: '05001', modo: 'fila' | 'columna' }
```

`codigo` es DIVIPOLA (DANE): 2 dígitos para departamento, 5 para municipio, siempre como texto con ceros a la izquierda.

## 4 bis. Vistas

| vista | qué muestra |
|---|---|
| **Explorar una encuesta** | cruce ponderado de una pregunta por una variable, con IC 95 %, V de Cramér y tabla |
| **Comparar encuestas** | una opción a lo largo de todas las encuestas, filtrable por un grupo armonizado |
| **Evolución territorial** | línea de tiempo nacional, por departamento o por municipio de una opción (p. ej. Cepeda en 2.ª vuelta), opcionalmente desagregada por sexo, edad, educación, estrato, zona, ideología, voto 2022, probabilidad de votar u otra pregunta; con hitos electorales y filtro por firma |
| **Cruce de preguntas** | matriz entre dos preguntas de una encuesta (p. ej. **voto Senado por partido × candidato presidencial**), en % por fila o por columna, para toda la muestra, un departamento o un municipio |
| **Catálogo** | las 62 encuestas del registro CNE 2026, con su estado y el motivo de exclusión |

En territorios pequeños muchas celdas quedan por debajo de n = 30 y se suprimen: la vista lo indica.

## 4 ter. Acumulados de encuestas (más casos por territorio y grupo)

Una encuesta suelta rara vez alcanza n = 30 en un municipio × grupo (p. ej. en Bogotá, el cruce Senado × presidencia
de una encuesta tiene n ≈ 100). Por eso el módulo incluye **encuestas virtuales acumuladas**, calculadas desde los
microdatos armonizados (no sumando agregados, que ya perdieron las celdas pequeñas):

| id | ventana (por fecha final de campo) |
|---|---|
| `acum-2026-01` … `acum-2026-06` | cada mes |
| `acum-fase-1` | precampaña, hasta el 8 de marzo (Senado = intención) |
| `acum-fase-2` | del 9 de marzo a la 1.ª vuelta (31 de mayo) (Senado = voto declarado) |
| `acum-fase-3` | entre vueltas (1 al 21 de junio) |
| `acum-ciclo` | todo el ciclo |

Reglas: solo encuestas con factor de expansión; cada una pesa según su **n efectivo de Kish** (no su n bruto, para que
una encuesta con efecto de diseño alto no domine); solo variables armonizadas; totales y cruces no territoriales con
encuestas nacionales, cruces por departamento y municipio con todas (incluidas regionales); supresión n < 30
**después** de acumular. Los acumulados tienen `tipo: 'acumulado'`, `ventana`, `componentes` y sus `notas`.

Aparecen en todos los selectores de encuesta ("Acumulados por fase / del ciclo / mensuales") y como **fuente** en
*Comparar* y *Evolución territorial* (`Encuestas individuales` · `Acumulado mensual` · `Acumulado por fase`).
Advertencias que muestra la ficha: supone opinión estable dentro de la ventana; mezcla firmas con métodos distintos
(efectos de casa); en 1.ª vuelta mezcla escenarios con listas de candidatos distintas; en Senado, `acum-ciclo` y
marzo mezclan intención y voto declarado.
Ver `integracion_app_anfitriona.md` para bajar a barrio / manzana mediante posestratificación (nunca cruzando
encuestas directamente a esa escala).

### React

```jsx
import { useEffect, useRef } from 'react';
import '/vendor/voto-correlaciones.js';          // registra el custom element una vez

export function VotoCorrelaciones({ onTerritorio, ...attrs }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const h = e => e.detail.territorio && onTerritorio?.(e.detail.territorio);
    el.addEventListener('vc-change', h);
    return () => el.removeEventListener('vc-change', h);
  }, [onTerritorio]);
  return <voto-correlaciones ref={ref} src="/data/agregados.json" {...attrs} />;
}
```

### iframe (aislamiento total)

```html
<iframe src="/voto-correlaciones/index.html" style="width:100%;height:1400px;border:0"></iframe>
```

## 5. Tema

Todas las variables visuales se pueden sobrescribir desde la anfitriona:

```css
voto-correlaciones {
  --vc-accent: #0b5cad;     /* pestaña activa, enlaces */
  --vc-plane: transparent;  /* fondo */
  --vc-surface: #fff;       /* tarjetas */
  --vc-ink: #111; --vc-ink-2: #555; --vc-muted: #888; --vc-grid: #e5e5e5; --vc-border: rgba(0,0,0,.1);
  /* paleta categórica (candidatos/partidos, en orden de peso global): --vc-s1 … --vc-s8 */
}
```

Los candidatos y partidos conservan su color en todas las encuestas; las respuestas no sustantivas
(NS/NR, blanco, ninguno, otro) van en gris.

## 6. Actualizar los datos

Los datos se regeneran desde el repositorio con un solo comando (armoniza, agrega, prueba y empaqueta):

```
.venv\Scripts\python construir.py
```

Si una prueba de regresión falla (un dato dejó de reproducir el informe oficial de la firma), no se genera el paquete.
Para añadir una encuesta nueva: descargar sus anexos (`scripts/02_descargar_anexos_cne.ps1`), escribir su mapeo
`harmonizacion/encuestas/<id>.json` (ver `esquema_armonizado.md`), validar con `harmonizacion/motor.py <id>` y
agregar sus cifras publicadas a `tests/test_agregados.py`.

## 7. Uso responsable (mostrar siempre)

- Asociación no es causalidad. Los IC ignoran estratos y conglomerados que las firmas no publican.
- Las firmas difieren en método (presencial, telefónico, digital), universo (votantes probables vs. adultos) y
  redacción; la vista *Comparar* lo advierte.
- Tempo y Cámara de Comercio de Valledupar no publicaron factor de expansión: resultados sin ponderar (se marca).
- Veda electoral: la normativa restringe la difusión de encuestas en los días previos a una elección; la anfitriona
  debe desactivar la publicación del módulo en esos periodos.
- Citar: firma, fecha de campo, n y enlace al registro del CNE (la ficha de cada encuesta los muestra).
