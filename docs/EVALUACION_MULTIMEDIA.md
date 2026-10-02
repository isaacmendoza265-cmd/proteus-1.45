# Evaluación: Multimedia (imagen, video y guía semiótica)

- **Fecha:** 2-oct-2026.
- **Autor:** Claude, en una sesión de Cowork.
- **Decisión de Isaac:** las herramientas no se retiran; se evalúa cómo se comportan y se corrigen.
- **Archivos:**
  - `src/modules/multimedia/CandidateMultimediaStudioView.tsx`
  - `src/components/CandidateVideoAnalyzer.tsx`
  - la colorimetría del perfil en `src/components/CandidateProfileManager.tsx`

## 1. Cómo se comportaban

| Pestaña | Qué hacía | Problema |
|---|---|---|
| Imagen y colorimetría (estudio) | Pedía a Gemini fototipo, estación cromática y 5 colores HEX con el nombre, la edad ("35-50 años" por defecto) y el tono. Usaba búsqueda web. | **No le enviaba ninguna imagen.** Respondía de memoria lo mismo para cualquier candidato y lo guardaba en el perfil. |
| Analista de video | Con un enlace, Gemini recibía la URL **como texto**. Con un archivo, recibía 3 fotogramas sin audio. Aun así se le pedían dicción, palabras por minuto, muletillas y calidad de audio. | **No veía ni oía el video.** Si faltaba un campo, se rellenaba con valores fijos presentados como resultado: puntajes 84/87/79, "130 ppm", muletillas "ehh, digamos" y una paleta fija. Tenía ejemplos con enlaces falsos o ajenos. |
| Guía semiótica de 4 semanas | Texto fijo con el rótulo "Calibrado para {candidato}". | Es una guía general: no se calibra con nada. |
| Colorimetría del perfil | Sí enviaba las fotos. | **No respetaba** Identidad › Privacidad › "Enviar imágenes a Gemini". Si la respuesta no era JSON, ponía sexo "Masculino" por defecto y adivinaba la edad del texto. |

## 2. Cómo quedan

**Colorimetría del estudio**

- Exige la foto del perfil; sin foto, el botón está desactivado.
- Mide la foto en el navegador con el mismo código del análisis de piezas (`medirImagen`):
  - paleta dominante;
  - tonalidad, temperatura y contraste;
  - composición;
  - adherencia a la paleta de marca de la identidad.
- La foto va a Gemini **solo** si la identidad lo permite.
  - Sin permiso, Gemini recibe solo las mediciones, no opina del rostro y lo dice al principio.
- La pantalla separa "Medido en la foto" de "Interpretación de la IA".
- La llamada lleva las tres macrofuentes con la tarea `evaluar`: el marco, la identidad con su imagen y vestuario, y los datos del territorio.

**Analista de video**

- **YouTube:** Gemini recibe el video completo (`fileData`), con imagen y audio.
- **Archivo:**
  - exige el permiso "Enviar videos" de la identidad;
  - se mide en el navegador (`medirVideo`: paleta, tonalidad, cortes por minuto);
  - el video va completo, inline si pesa hasta 9 MB o, si pesa más, por `/api/piezas/subir`.
- **Instagram y TikTok por enlace:** se rechazan con la explicación. Gemini no puede abrirlos; hay que subir el archivo.
- **Campos faltantes:** quedan "Sin dato". Los puntajes son `null` si Gemini no los justifica.
- **Rótulos:**
  - los puntajes dicen "Puntajes de la IA (juicio de Gemini, no medición)";
  - la paleta dice "medida en el archivo" o "descrita por la IA";
  - el resultado indica qué vio Gemini.
- **Ejemplos:** se quitaron los que tenían enlaces falsos.
- **Macrofuentes:** la llamada lleva las tres, con la tarea `evaluar`.

**Guía semiótica:** rotulada "Guía general · texto fijo".

**Colorimetría del perfil**

- Respeta la privacidad.
- Usa marco y perfil, sin datos de territorio (tarea `evaluar`).
- Ya no deduce sexo ni edad cuando no entiende la respuesta.

## 3. Lo que sigue

- **Solapamiento con Análisis de piezas.** El Analista de video y el Análisis de piezas analizan videos. Ahora usan el mismo envío y las mismas mediciones, pero son dos pantallas. Una opción es que el Analista de video sea la vista de "video propio del candidato" del Análisis de piezas. Decide Isaac.
- **Estación cromática y fototipo.** Son una interpretación sobre la foto, no una medición. Si se quiere una medida, hace falta una foto con carta de color o balance de blancos controlado.
- **Muletillas y palabras por minuto.** Con el video completo, Gemini puede contarlas. Una medida exacta exige transcribir el audio, por ejemplo con un endpoint de transcripción, y contar en el texto.
