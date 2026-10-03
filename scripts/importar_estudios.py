#!/usr/bin/env python3
"""
Estudios académicos y de centros de pensamiento sobre violencia y gobernanza criminal en Antioquia, como fuente
AUXILIAR del motor de análisis (decisión de Isaac del 2-oct-2026: agregarlos). Son interpretaciones y registros de
terceros, no conteos oficiales: cada línea lleva su cita y página.

Originales en _originales/estudios/ (descargados el 2-oct-2026):
  Comunidades-en-medio-de-la-violencia-balance-2025-2_compressed.pdf
      Indepaz, Observatorio de Conflictividades y DD. HH., "Comunidades en medio de la violencia: balance 2025"
      (enero de 2026). Cifras de 2025 por departamento y algunos municipios.
  IPA-Gobernanza-Medellin-Colombia_Espanol.pdf
      Innovations for Poverty Action (Blattman, Duncan, Lessing y Tobón), "El impacto de intensificar la
      gobernabilidad municipal y comunitaria en la gobernanza criminal en Medellín, Colombia" (resumen del estudio).
PENDIENTE (no se pudo descargar: el repositorio de la U. de Antioquia responde con una verificación anti-robots):
  García, D. (2024), tesis sobre gobernanza criminal en el Bajo Cauca, Universidad de Antioquia
  https://bibliotecadigital.udea.edu.co/bitstream/10495/43867/5/GarciaDairo_2024_Gobernanza_Criminal_BajoCauca.pdf
  → descargarla a mano en _originales/estudios/ y transcribir sus hallazgos aquí (bloque BAJO_CAUCA).

Las cifras se transcribieron leyendo el texto extraído con pdftotext (páginas del PDF entre paréntesis).
Salida: src/data/motor/estudios-academicos.json
"""
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
INDEPAZ = 'Indepaz, "Comunidades en medio de la violencia: balance 2025" (2026)'
IPA = 'IPA, Blattman, Duncan, Lessing y Tobón, resumen del estudio sobre gobernanza criminal en Medellín'

departamento = [
    f'{INDEPAZ}, p. 8: Antioquia fue en 2025 el segundo departamento con más asesinatos de líderes sociales y defensores de DD. HH. (30 casos; Cauca 40, Valle del Cauca 17; 187 en el país).',
    f'{INDEPAZ}, p. 15: masacres en 2025: Antioquia 12 hechos con 40 víctimas, segundo después de Valle del Cauca (17 hechos); 78 masacres y 256 víctimas en el país. Indepaz las asocia en Antioquia a violencia urbana y control microterritorial.',
    f'{INDEPAZ}, p. 20: asesinatos de firmantes del acuerdo de paz en 2025: Antioquia 6, segundo después de Norte de Santander (7).',
    f'{INDEPAZ}, p. 24 (registros de Indepaz y Defensoría): desplazamiento en 2025: Antioquia 27 eventos con 5.487 víctimas, segundo departamento en número de eventos.',
    f'{INDEPAZ}, p. 34 (datos de la Defensoría del Pueblo): reclutamiento de niñas, niños y adolescentes en 2025: Antioquia 25 reportes, segundo después de Cauca (93), de 257 en el país; el informe advierte un subregistro alto (651 casos en 2024).',
    f'{INDEPAZ}, pp. 31-32 (datos de AICMA): Antioquia aparece entre los departamentos donde el patrón de minas antipersonales "apunta a zonas en disputa tras rupturas organizativas" (interpretación de Indepaz).',
]

municipios = {
    '05148': {'lineas': [f'{INDEPAZ}, p. 16: El Carmen de Viboral registró 2 masacres en 2025, entre los municipios con más masacres del país (Bogotá, Tibú y Cali 3 cada uno).']},
    '05893': {'lineas': [f'{INDEPAZ}, p. 16: Yondó registró 2 masacres en 2025, entre los municipios con más masacres del país (Bogotá, Tibú y Cali 3 cada uno).']},
    '05001': {'lineas': [
        f'{IPA}: la mayoría de los sectores de ingreso bajo y medio de Medellín son gobernados en distintas escalas por grupos criminales; entre 150 y 300 "combos", controlados por estructuras mayores ("razones"), resuelven disputas, proveen seguridad, regulan mercados y cobran "impuestos".',
        f'{IPA}: en las zonas centrales el Estado es relativamente fuerte; en zonas de la periferia la presencia estatal es débil y la de los grupos ilegales, fuerte. La Alcaldía identificó 80 sectores con gobierno fuerte de los combos (intervención 2018-2020 con "micro territoriales" en 40 de ellos); el resumen no publica la lista de sectores ni resultados.',
    ]},
}

motor = {
    'meta': {
        'titulo': 'Estudios sobre violencia y gobernanza criminal (Indepaz 2025, IPA Medellín)',
        'fuente': f'{INDEPAZ}; {IPA}',
        'nivel': 'auxiliar',
        'categoria': 'seguridad',
        'corte': '2026-01',
        'nota': ('Registros e interpretaciones de terceros, con cita y página: no son conteos oficiales. Lo que un estudio '
                 'dice de la presencia o el control de un grupo armado es la afirmación de ese estudio. Pendiente: la tesis '
                 'de la U. de Antioquia sobre el Bajo Cauca (no se pudo descargar)'),
    },
    'municipios': municipios,
    'departamento': {'lineas': departamento},
}
json.dump(motor, open(ROOT / 'src/data/motor/estudios-academicos.json', 'w'), ensure_ascii=False, indent=1)
print('estudios-academicos.json:', len(departamento), 'líneas departamentales y', len(municipios), 'municipios')
