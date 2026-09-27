<!-- Ingestado con scripts/ingestar_marco.mjs el 2026-09-27 desde "Proteus marco general.docx" (sha256 0fb32945f178). No editar a mano: volver a ingestar. -->

Proteus.
Septiembre 27 de 2026
Marco teórico de interpretación y análisis cualitativo de variables

Introducción y reglamento de interpretación.

Documento autónomo. Quien lo aplique (analista, motor, studio de piezas u otra IA) no debe necesitar el hilo previo. Si una salida contradice este texto, prevalece este texto.
Fecha de esta versión: 27 de septiembre de 2026. Ámbito: Antioquia (125 municipios). Producto: plataforma de cuenta y clave, por territorio y por contienda, para clientes que pagan (gobernación, alcaldía, concejo). Datos de referencia: Etapa 1 en cierre (electoral, demografía, economía). El censo electoral por municipio y puesto ya está en el aplicativo. Etapa 2 (listening y encuestas propias) aún no calibra de forma sistemática; las reglas ya dicen qué se puede hacer sin ella.
Cambio respecto de v1.1: las correlaciones son el insumo central, no un riesgo a evitar. Se añade el verbo apuesta. Se manda calcular arrastres y cruces de oficio. Se aflojan las redacciones que convertían la cautela epistémica en silencio estratégico. Siguen duras las reglas que evitan basura en el cruce (prorrateo de puestos, fusión de censos, casas sin fecha, mezcla de clientes, cifra sin año/fuente/contienda).

0. Principio rector — La correlación es el oficio
En el ejercicio político real las correlaciones mandan. Quien espera causalidad de paper no opera una campaña. Quien trata cada cruce como destino inventa alianzas y enemigos.
Proteus debe buscar, calcular y usar correlaciones de oficio. Estas reglas no limitan qué cruces se hacen. Limitan cómo se nombran y cómo viajan a una pieza.
Cuatro familias se calculan siempre, sin pedir permiso:
- Temporal: el mismo recorte en 2015–2018–2019–2022–2023–2026 (los años que estén cargados). Estabilidad vs volatilidad.
- Entre contiendas del mismo ciclo: alcaldía↔concejo, gobernación↔asamblea. Es la familia más accionable para 2027.
- Ecológica: estrato, edad, NBI/IPM, subregión, participación × resultado. Sirve para segmentar y priorizar. No autoriza a hablar por el vecino.
- De arrastre: nacional↔local, departamental↔municipal, en el mismo polígono. Se calcula siempre. Se muestra con métrica. Si la métrica es débil, se dice que es débil; no se deja de calcular.
Cuando exista Etapa 2, una quinta familia: actitud × territorio (Encuesta de Cultura Política, microdatos CNE, encuesta Proteus).
Tres pisos de uso:
- Piso 1 — Exploración (interna). Todos los cruces. Sin pudor. Lo débil se archiva.
- Piso 2 — Estrategia (lo que se cobra). El patrón se vuelve regla de operación: dónde visitar, qué no copiar, qué cluster trata como un solo segmento. Verbo: apuesta, anclada a un deduce.
- Piso 3 — Pieza y frase de ficha. Año, fuente, contienda. El cliente puede ver la apuesta (“tratar K como un solo segmento porque…”). No un hecho sociológico inventado (“este barrio es de izquierda”).
Si una IA aplica este documento y produce “no es posible concluir” donde hay patrón numérico, está leyendo mal: primero se calcula, después se etiqueta, después se apuesta.

1. Glosario mínimo
- Contienda nacional: Presidencia (1.ª y 2.ª vuelta), Senado, Cámara.
- Departamental: Gobernación, Asamblea.
- Municipal uninominal: Alcaldía.
- Corporación municipal: Concejo (lista + voto preferente).
- Recorte: territorio pagado (departamento, municipio, comuna/corregimiento, barrio/vereda, puesto).
- Puesto: mesa(s) con código Divipole. Los códigos cambian de año; no hay serie por puesto sin Divipole de ese año.
- Habilitados: censo electoral de la Registraduría. Ya cargado a municipio y puesto.
- CNPV 2018: censo DANE de personas y viviendas. Fuente de sexo, edad, estrato de factura de energía, IPM, NBI, unidades económicas.
- Capa A: Registraduría, DANE, Fiscalía/Policía/alcaldía con cifra fichada. UI: Oficial.
- Capa B: casas, alianzas, seguridad cualitativa, listening, prensa, fuentes personales. Campos: fuente, fecha, confianza, estado (bruto / revisado / publicado), tipo de fuente.
- Capa C: derivados Proteus (transferencia, cluster, desajuste, arrastre, rankings). UI: Modelo Proteus.
- Casa política: red de intermediación. No equivale automáticamente a partido. Clientelismo = relación durable. Compra de voto = transacción de campaña. No se funden.
- Cluster / “se parece a”: territorios próximos en variables del maestro. Base de operación, no profecía.
- Arrastre (coattail): asociación medida entre dos contiendas en el mismo recorte.
- Fuente personal: informante de la red del desarrollador dentro de partidos. Capa B.
- Apuesta: decisión de campaña que se toma como si el patrón se sostuviera, sabiendo que el mecanismo puede ser otro.

2. Verbos epistémicos
Toda frase analítica usa uno. El studio hereda el verbo: si el hallazgo es apuesta, el copy no lo convierte en sociología.

| Verbo | Oficio | Ejemplo |
| --- | --- | --- |
| observa | Dato de capa A, o B ya publicada, sin mecanismo | “En 2026-2 el puesto X registró N votos y H habilitados.” |
| deduce | Patrón numérico: Δ, correlación, residual, ranking, cluster | “En comunas de estrato 1–2 del norte esa fuerza creció más entre vueltas que en El Poblado.” |
| hipotetiza | Mecanismo posible, no observado | “Parte de ese crecimiento puede ser voto anti-derecha más que adhesión de marca.” |
| apuesta | Qué se hace con el patrón | “En esas comunas no reutilizar el marco presidencial 2026; testear mensaje local de servicio.” |
| no afirma | No alcanza ni para apostar | “No se afirma el número de electores del barrio: el puesto está sin_ubicacion.” |

Cadena típica de un hallazgo útil: observa → deduce → (hipotetiza) → apuesta.
Prohibido: observa sobre un porqué. Prohibido: convertir apuesta en destino (“va a ganar”). Permitido y deseable: correlacionar primero y etiquetar después.

3. Dos censos, dos frases
El aplicativo ya incluye ambos. El error no es la ausencia de padrón; es fundirlos.

| Censo | Cuenta | Cadencia | Nivel | Uso |
| --- | --- | --- | --- | --- |
| CNPV 2018 (DANE) | Personas y viviendas | Foto 2018 | Manzana → barrio | Perfil del lugar, ejes de cluster, tono de pieza |
| Censo electoral (Registraduría) | Habilitados | Se mueve cada ciclo | Municipio y puesto | Universo, participación, techo, prioridad de visita |

- Participación = votantes / habilitados del mismo año y mismo nivel. Nunca votantes 2026 / población 2018.
- Visita y techo → habilitados y votantes del año de referencia.
- Segmentación por composición (edad, estrato, carencia) → CNPV 2018, con el año escrito.
- Confrontarlos produce desajuste padrón–territorio (capa C). Ese desajuste sí se usa (un barrio DANE grande con urna pequeña es una señal operativa). No produce la locución “habitantes habilitados”.
- El censo electoral no trae sexo, edad ni estrato. No se escribe “las mujeres de 30–49 habilitadas en este puesto” con el maestro actual.
- Habilitados de 2026 no son el padrón de la alcaldía 2027. La pieza cita el año.
- El padrón es del puesto, no del residente. Quien duerme en un barrio puede votar en otro. Esa discordancia es material de análisis, no un fastidio a ocultar.

4. Capas A, B y C
B no escribe encima de A. En UI pueden verse juntas; no se funden en un párrafo que parezca oficial.
- Puerta A: escrutinio, CNPV, NBI, IPM, habilitados, delitos de autoridad. Versionado.
- Puerta B: tipo_fuente (oficial / prensa / fuente_personal / inferido) + vigente_al + estado + confianza. Sin esos campos no entra.
- Puerta C: se recalcula cuando cambia A o B. No se edita a mano.
Al cliente: A dentro del recorte pagado; B solo publicado con tipo y fecha; C como Modelo Proteus. Las apuestas se firman como apuestas.

5. Las reglas
Regla 1 — Separar en la UI; correlacionar de oficio
En barras, mapas de “quién gana” y fichas de resultado, las contiendas no se mezclan: nacional / departamental / municipal uninominal / corporación. Cada cifra lleva su contienda.
En el análisis, las contiendas se cruzan siempre:
- Alcaldía y concejo del mismo día: caso base, no excepción. Hay que medir si el alcalde arrastra bancada o gobierna solo.
- Gobernación y alcaldía, sobre todo en municipios grandes: medir, no asumir independencia ni fusión.
- Nacional → local: medir señal a favor de una familia política y señal en contra de otra. No es automática ni igual en todo Antioquia (Urabá y Bajo Cauca no se leen como Oriente, Suroeste o Valle de Aburrá).
El relato genérico “izquierda nacional = anti-derecha local” no es default del sistema. Es una hipótesis a contrastar en cada recorte, junto con la hipótesis simétrica (marca nacional de derecha que infla, contamina o no pega en lo local).
El módulo arrastre no es un peaje para poder hablar. Es un mandato de cálculo. Si el Δ o la correlación pasan umbral, se muestran. Si no pasan, se informa “arrastre débil o nulo en este recorte” y se sigue con el resto del análisis. No se silencia el cruce.
Regla 2 — No copiar al ganador; sí usar su rastro
Un ganador presidencial, de Senado o de Cámara no se pega como pronóstico de alcaldía, concejo, gobernación o asamblea. El mapa 2026 no es el mapa 2027.
Eso no veda el uso político del rastro nacional. Se deduce cómo se movió cada familia política entre contiendas en ese recorte (Δ, correlación, residual) y se apuesta sobre esa base: reutilizar marca, no reutilizarla, hablar en clave anti, o tratar el territorio como desconectado de la foto nacional.
“Aumenta la probabilidad” solo aparece si hay métrica de ese recorte, y se formula como apuesta operativa, no como destino (“eso facilita que gane Y”). Sin métrica no hay frase de probabilidad; sí hay la tabla que muestra que se buscó y no apareció.
La regla es simétrica: izquierda y derecha, a favor y en contra.
Regla 3 — Participación, blanco y nulo son resultados de primer orden
Se reportan nivel, cambio y brecha habilitados–votantes. No van al pie.
- Blanco y nulo se separan. El blanco es señal más limpia de rechazo al menú. El nulo mezcla error y rechazo.
- Más participación no implica más confianza.
- Menos participación no implica desconfianza. Puede ser lluvia, puesto lejano, padrón inflado, migración, costo de votar, factor armado, menú irrelevante o inercia.
- Etapa 1 observa el nivel y deduce dónde sube o baja respecto de otros recortes y años. Eso ya es análisis útil (dónde no está saliendo la gente).
- La causa se hipotetiza. Hasta Etapa 2, en la ficha va una hipótesis priorizada y, en una línea, las rivales. No un tribunal. En la pieza va la apuesta (“movilizar”, “no gastar pauta en abstencionistas duros”, “testear menú”) anclada al patrón, no la sociología de la desconfianza.
- “Hay grupos cuyos movilizantes no están en el menú” es hipótesis accionable, no dato.
Regla 4 — Estrato, IPM y NBI no son ideología; sí son ejes de segmentación
Describen vivienda y carencia del territorio censado en 2018 (estrato = factura de energía del CNPV, no necesariamente la estratificación oficial vigente).
No se traduce a “este barrio es de derecha / de izquierda / clientelar”.
Sí se usan, de primer orden, para cluster, priorización y tono de pieza. En Medellín y en otros municipios grandes el cruce estrato–resultado es de las correlaciones más operativas del maestro. Debe calcularse siempre y debe alimentar el piso 2.
La Encuesta de Cultura Política y los microdatos CNE calibran actitudes a municipio, área metropolitana o departamento. No se pintan como ideología de barrio. Cuando existan, se cruzan con el patrón ecológico para subir o bajar la confianza de la apuesta, no para sustituir el cruce territorial.
Regla 5 — El puesto no se reparte al barrio vecino
Dos operaciones distintas.
- Prohibido — prorratear: verter votos de un puesto sin polígono hacia barrios colindantes para que el mapa no quede vacío. Eso pudre todas las correlaciones ecológicas.
- Permitido — asignar: si hay coordenada, el punto cae en el polígono que lo contiene. Si la coordenada es estimada: ubicacion_aproximada. Si no hay punto: suma al nivel seguro y sin_ubicacion.
ubicacion_aproximada sí entra a exploraciones internas. No sostiene con la misma fuerza el color del barrio, una pieza que nombre ese barrio, ni un desajuste presentado como limpio.
Los códigos de puesto cambian con la Divipole de cada año. Las correlaciones temporales por puesto exigen llave de ese año.
Regla 6 — Casas y alianzas: fuente, fecha, visibilidad
El análisis de poder es central. No se apaga por falta de sello oficial. Se etiqueta.
Cada ficha B lleva tipo_fuente (oficial / prensa / fuente_personal / inferido), vigente_al y estado (bruto / revisado / publicado).
La red de personas dentro de los partidos es una ventaja. Alimenta el backoffice, actualiza “quién está con quién” y permite apuestas de alianzas. No es capa A. Una sola fuente personal, sin segunda fuente y sin fecha reciente, permanece interna y puede informar una apuesta interna; no sale como hecho en la ficha del cliente.
En cuenta de cliente: publicado, con tipo y fecha visibles. Un disclaimer genérico de “aproximación” no sustituye esos campos. Clientelismo y compra de voto no son sinónimos; la correlación “NBI alto ↔ casa fuerte” se deduce y se apuesta; no se observa como compra.
Regla 7 — Seguridad en dos bloques
La capa se usa. No se esconde. Se parte.
- Bloque A: Fiscalía, Policía/SIEDCO, observatorios o alcaldías, al nivel al que existan (a menudo municipio). Año y fuente. Sirve para correlacionar delitos publicados con participación, blanco o resultado a ese mismo nivel.
- Bloque B: presencia de grupo, modos de control, percepción, OSINT. Estado y fecha.
“Métodos de control” no son capa A. Percepción sin encuesta o fuente datada no se observa; puede hipotetizarse o, si hay listening/encuesta, apostarse. A y B no se funden en un párrafo que parezca boletín oficial.
Regla 8 — “Se parece a” es cluster operativo, no destino
El look-alike es una de las salidas más útiles del producto: una pieza, varios territorios; una visita, un tipo de puesto. Se arma con variables del maestro por subregión y por tipo de contienda.
Lo que no hace: afirmar que el destino electoral será el mismo, ni copiar ciegamente la estrategia del semilla. Donde el patrón se rompe (territorio que debería caer en K y no se mueve con K) el hallazgo es de primer orden: ahí no se copia la pieza.
Un cluster que mezcle presidencial 2026 con alcaldía 2023 debe decirlo. Mezclar sin aviso rompe la regla 1 de UI; no rompe el derecho a correlacionarlos en el piso 1 y 2.
Regla 9 — Toda cifra en pieza lleva año, fuente y contienda
Sin los tres, no sale. “Fuente: Proteus” no sustituye Registraduría o DANE cuando el dato es de ellos. Los derivados se firman Modelo Proteus + insumos + año. Las recomendaciones se firman como apuesta.
Regla 10 — El porqué se hipotetiza; la operación se apuesta
Sin encuesta, etnografía, expediente o B publicada que documente el cómo, no hay observa sobre el mecanismo.
Eso no congela el análisis. El residual y la correlación se deducen. El mecanismo se hipotetiza (uno priorizado). La campaña se apuesta.
“Deducción” no es mecanismo. “Cayó más donde el alcalde de 2023 se hundió” se deduce. “Cayó por desconfianza” se hipotetiza. “No invertir pauta ahí; ir a puesto” se apuesta.
Regla 11 — Hipótesis priorizada, rivales a la vista
Si el dato admite varias lecturas, no se finge certeza. Tampoco se entrega un ensayo.
En ficha de cliente: la hipótesis con más apoyo numérico primero; las rivales en una línea. En pieza: la apuesta que sigue de esa hipótesis, sin recitar el tribunal.
Queda prohibido elegir en silencio la lectura que más favorece el copy y borrar las otras. Queda prohibido también negarse a priorizar (“podría ser cualquiera de siete causas”) cuando el patrón discrimina.
Regla 12 — Falacia ecológica: no hablar por el individuo
Lo que gana el puesto o el barrio no se predica de “la mujer de 30 años”, del vecino ni “del estrato 3” como persona. El cruce ecológico sí se usa (regla 4). Hoy no hay sexo × edad a barrio en el maestro; no se inventa. Cuando exista, vivirá a la granularidad del dato.
Regla 13 — Uninominal y corporación se correlacionan; se interpretan distinto
Alcaldía y gobernación: ganador, margen, blanco, participación.
Concejo y asamblea: lista, preferente, umbral, número efectivo de listas, pulverización, desajuste entre el uninominal ganador y su bancada.
El cruce uninominal↔corporación es obligatorio (regla 1). Un alcalde fuerte con concejo fragmentado no es “la misma victoria”; es uno de los hallazgos más accionables del maestro (armar lista, no solo foto de alcalde).
Regla 14 — La alianza caduca; se actualiza, no se apaga
Toda ficha de casa, coalición o “quién está con quién” lleva vigente_al. Sin fecha no entra al brief de cliente. La red de fuentes existe para refrescar. Una alianza vencida puede seguir en el histórico (útil para correlacionar techos pasados); no se presenta como mapa vigente.
Regla 15 — Dos censos, un cruce útil
Reafirma la sección 3.
- poblacion_2018 y habilitados_[año] no se suman ni se sustituyen.
- Personas o viviendas en pieza: año DANE y nivel.
- Electores, habilitados o techo: año Registraduría y puesto / municipio.
- Prohibida la locución “habitantes habilitados”.
- El desajuste padrón–territorio se calcula y se usa (prioridad, sospecha de trashumancia, puesto-imán en colegio).
- “Habilitados del barrio” solo si todos los puestos del polígono están ubicacion_exacta y se declara como suma de urna, no de residencia.
- Habilitados 2026 no se venden como padrón 2027.
Regla 16 — Aislamiento entre cuentas
Listening, encuesta, brief, pieza y fuente personal del cliente A no alimentan el tablero del cliente B, aunque compitan en el mismo municipio. Recorte = territorio × contienda × capa × vigencia.
Las correlaciones de capa A (escrutinio, DANE) sí son comunes: el dato oficial no es secreto de un pagador. Lo que es privado es B de rastreo contratado, la encuesta propia y las apuestas redactadas para ese cliente.
Regla 17 — El arrastre se calcula siempre; se muestra con métrica
Mandato, no candado. Para cada recorte vendible se calcula al menos un indicador de arrastre por cada par relevante (p. ej. presidencial↔alcaldía previa, alcaldía↔concejo del mismo año, senado↔asamblea).
- Por encima del umbral del motor: se muestra la métrica, se deduce el patrón, se apuesta el uso.
- Por debajo: se informa arrastre débil o nulo y no se construye relato.
- No existe el estado “no miramos por si acaso”.
La métrica lleva recorte, par de elecciones y verbo deduce.

6. Lentes de cliente
Las reglas no cambian. Cambia la pregunta que se le hace al maestro.
- Gobernación: subregiones; Urabá y Bajo Cauca como ruptura estructural a medir, no a suavizar; Asamblea como corporación; habilitados municipales como tablero de visita; rastro 2026 como una capa, no como mapa de 2027.
- Alcaldía Medellín: comunas y barrios; estrato como eje de cluster (regla 4); concejo como mercado paralelo (regla 13); puestos-colegio que atraen varios barrios (reglas 5 y 15); correlación 2023 local ↔ 2026 nacional como módulo, no como destino.
- Alcaldía de otro municipio: casa local y participación primero; señal nacional después, con métrica; concejo y alcaldía del mismo día siempre cruzados.
- Concejo: preferente, listas, brokers, pulverización; no es mini-alcaldía; el look-alike de comuna es el producto.

7. Qué debe salir de un análisis (mínimo útil)
Un recorte no se entrega con un mapa y una cautela. Se entrega con:
- Tabla de correlaciones (temporal, mismo ciclo, ecológica, arrastre).
- Tres clusters operativos y los territorios que rompen el cluster.
- Tres apuestas de campaña, cada una anclada a un deduce.
- Lo que expresamente no se afirma.
- Cifras del piso 3 con año, fuente y contienda.
Eso es análisis político útil bajo estas reglas.

8. Frases prohibidas en piso 3 (ficha de cliente y pieza)
- “Este barrio es de izquierda / de derecha.”
- “Como ganó X la presidencia, aquí sale un alcalde de X.”
- “La abstención demuestra desconfianza.”
- “N habitantes habilitados.”
- “Según fuentes, la casa Y cerró con Z” sin publicado, tipo y vigente_al.
- “Zona controlada por [grupo]” en el bloque oficial.
- “Va a pasar lo mismo que en [barrio semilla].”
- Cifra sin año, fuente o contienda.
- Habilitados 2026 vendidos como padrón 2027.
- Reparto de un puesto sin punto entre barrios vecinos.
Frases permitidas, y deseables, en piso 2:
- “En este recorte, cuando A sube en nacional, el concejo de A no sube: no uses la foto presidencial en la lista.”
- “Los barrios del cluster K se movieron juntos en 2019–2023–2026: una pieza, tres territorios.”
- “Alta abstención + estrato 1–2 + casa débil: priorizar visita, no pauta.”
- “El arrastre nacional aquí es débil: campaña local o no hay campaña.”

9. Qué puede afirmar cada etapa
- Solo Etapa 1: observa resultados, habilitados, CNPV 2018, NBI/IPM/estrato; deduce transferencia, participación, pulverización, desajuste, clusters, arrastres; hipotetiza mecanismos; apuesta operaciones.
- + ECP o microdatos CNE: calibra actitudes a municipio/departamento y sube o baja la confianza de la apuesta. Sigue sin ideología de barrio.
- Etapa 2: puede sostener o derribar las hipótesis de la regla 3 y de marca. Listening ≠ escrutinio. Encuesta interna no se publica como intención de voto salvo firma registrada ante el CNE (Ley 2494 de 2025 y normas que la desarrollen).

10. Instrucción final para IAs
- Identificar recorte, contienda y año.
- Calcular primero las cuatro familias de correlación. No preguntar si “se puede”.
- Clasificar cada insumo como A, B o C.
- Encadenar observa → deduce → hipotetiza (si aporta) → apuesta.
- Pasar las reglas 1–17. Si una regla bloquea una frase de piso 3, bajar el verbo o cortar esa frase. No borrar el cruce del piso 1 y 2.
- Entregar el mínimo útil de la sección 7.
- Este documento es la memoria. No recuperar el tono de la v1.1 (“mejor no correlacionar”). Esa lectura está derogada.

}Distinción por capas

| MARCO TEÓRICO DE PROTEUS: DIAGRAMA DE ORGANIZACIÓN POR CAPAS DE COMPLEJIDAD. |  |
| --- | --- |
| Marco teorico para interpretación y análisis de datos. | Marco teórico para identificación de oportunidades publicitarias; enfoques retóricos; creación de publicidad y enfoque segmentado. |
| Capa 1. General. Consiste en el conjunto de literatura especializada (ciencia política aplicada, lo que incluye estadística, psicología cultural, psicología conductual, entre otros) que, leída de forma holística, permite comprender qué significan los datos que ya se encuentran dentro de Proteus. <br> Responsables de la recopilación y sinterización de la información: perplexity y Grok. <br> Responsables de aplicar la información a la interpretación de datos: Claude y Gemini. | Capa 3. General. Consiste en el conjunto de literatura especializada (ciencia política aplicada, lo que incluye estadística, psicología cultural, psicología conductual, entre otros) que, leída de forma holística, permite comprender como usar la información estadística bruta, así como los análisis realizados por el marco teórico para interpretación y análisis de datos, con el objeto de maximizar el efecto de la publicidad en el votante (relación publicidad/votante). <br> Este marco teórico incluye conocimiento sobre colorimetría, teoría del color, retórica, cunductismo (por ejemplo, Khaneman), entre otros. Así mismo conocimiento sobre identidad de marca, branding, teoría sobre el uso de redes sociales, psicología del enganche, y demás. <br> Este marco teórico se debe expresar como un conjunto de normas específicas o generales sobre cómo debe plantearse la publicidad. Debe ser un manual que luego una IA aplicará al pie de la letra. |
| Capa 2. Local. Consiste en información contextual y local que sirve para complementar al marco teórico de interpretación y análisis general. Puede constar de análisis de prensa, análisis especializados en ciertos municipios o subregiones. En el futuro podrá incluir entrevistas a personas concretas o encuestas realizadas por proteus o por otras organizaciones. <br> Responsable de recopilación y sinterización de la información: Todavía no lo sé. | Capa 4. Local. Consiste en el conjunto de normas de la parte general del Marco Teorico para identificación de oportunidades publicitarias a un contexto concreto. Es la cuarta capa de complejidad. <br> Así, vistas las normas, estas se aplican atendiendo a las características específicas de los sujetos a quienes irán dirigidas las oportunidades publicitarias. |
