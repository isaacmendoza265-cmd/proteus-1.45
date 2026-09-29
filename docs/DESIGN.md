# Diseño de Proteus: decisiones y su porqué

Estilo "sobrio cívico": papel, tinta, un solo acento granate, Newsreader para títulos y cifras, Public Sans para
el texto. Tokens `--c-*` en `src/index.css`. Propuesta completa y auditoría del 29-sep-2026:
https://claude.ai/artifact/A3EjhbQh7wooxdSqNQpfog («Cada cifra con su sello»).

Si una decisión de aquí te parece mala, **mide antes de cambiarla**: casi todas nacieron de una medición.

## Decisiones (con fecha)

**Dos tokens de borde, no uno (29-sep-2026).** `--c-border` es el divisor decorativo entre filas y no tiene
umbral de contraste. `--c-border-campo` es el contorno de campos y controles y exige 3:1 (WCAG 1.4.11). Con un
solo token para los dos trabajos, los campos daban 1,24–1,38:1: no se veía dónde escribir. No volver a unirlos.

**Anillo de foco propio, `--c-foco` (29-sep-2026).** En oscuro el granate `#A3243A` daba 2,29–2,52:1 como
anillo; el foco usa el rosa de `--c-accent-text` (7:1). El granate sigue siendo el fondo de los botones (el texto
blanco encima da 7,32:1).

**El contraste lo vigila un test, no una lista (29-sep-2026).** `src/theme/contraste-tokens.test.ts` lee
`index.css` real y comprueba cada par en los dos temas. Al añadir un token de color, añadir su par.

**Tamaño mínimo de lectura: 12 px (29-sep-2026).** Las vistas anteriores usaban 8–11 px en ~1.175 sitios (75 %
del texto de Municipios). `index.css` los sube a 12 px mientras se migran. No escribir `text-[8-11px]` en código nuevo.

**En teléfono y tableta, barra inferior (29-sep-2026).** Por debajo de 1.024 px el menú lateral se oculta y los
seis módulos pasan a una barra abajo (`BarraModulos` en `SidebarNav.tsx`). Con el menú lateral, un teléfono de
390 px dejaba 150 px de contenido. "Cerrar sesión" en el teléfono está en Ajustes › Usuarios y acceso.
No recortar desbordes con `overflow-x: hidden`: se corrige la causa (una tira ancha va en su propio contenedor
desplazable, como las pestañas).

**Solo `main` se desplaza, nunca la página (29-sep-2026).** `main` es `relative` para que todo elemento absoluto de
dentro quede contenido en él. Sin eso, un `<span class="sr-only">` de una tabla de Territorio se posicionaba respecto
a la página, la estiraba a 2.412 px en una ventana de 950 y la rueda sobre el menú desplazaba la app entera (menú y
barra superior fuera de la vista). No quitar el `relative`.

**Herramientas de desarrollador solo para administradores (decisión de Jose, 29-sep-2026).** "Ingestar datos" y
"Copiar contexto Gemini" (Territorio › Municipios) se quedan en su pantalla porque actúan sobre el municipio que
se está viendo, pero solo las ve el rol `ADMIN`.

**Un solo acento: el granate (decisión de Jose, 29-sep-2026).** Verde, ámbar y azul significan algo (Oficial,
Estimado/atención, información) y no se usan como decoración. Los módulos viejos que compiten con cuatro acentos
se migran en la Fase 2.

**El sello de procedencia es la firma de Proteus (decisión de Jose, 29-sep-2026; Fase 1, pendiente).** Ninguna
cifra sin su sello Oficial / Estimado / Sin información, que se abre para decir fuente, fecha o método. Tres
formas además de tres colores (lleno, discontinuo, punteado) para quien no distingue el verde del ámbar. Primero
donde hoy se presenta una estimación como dato: Segmentos («Votos proyectados en urnas» es un modelo de pesos fijos).

## Fuera del sistema, a propósito

| Fuera | Motivo |
|---|---|
| Colores de partido en el mapa y las gráficas | Son dato: identifican al partido |
| Escalas de color de las capas (censo, NBI, resultados) | Codifican magnitud; tienen su propia escala |
| PDF de guiones y documentos para imprimir | Se leen en papel, en blanco y negro |

## Estado de la migración

- **Fase 0 (hecha, 29-sep-2026):** tokens de campo y foco, test de contraste, barra inferior, mínimo de 12 px,
  herramientas de desarrollador solo para admin. Medido: 0 desbordes a 390 px y 0 textos por debajo de 11,5 px
  en las 10 pantallas principales (antes: las 10 desbordaban; Municipios tenía 533 de 708 textos diminutos).
- **Fase 1 (pendiente):** primitivas (Cifra + Sello, Chip, Filtro, Pestañas, Botón, Ayuda) y página `/estilos`.
- **Fase 2 (pendiente):** migrar las 49 pantallas viejas. Termina cuando se borre la capa "TRADUCCIÓN" de
  `index.css`; mientras exista, el trabajo no está terminado.
