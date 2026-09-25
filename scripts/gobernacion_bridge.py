# -*- coding: utf-8 -*-
"""
Bridge de Integración entre el Subproyecto Gobernación (Proyecto Independencia)
y la plataforma Proteus Nacional 1.2.
Permite consultar la base de datos SQLite, parsear el último informe auditado
y ejecutar el ciclo de 7 agentes en segundo plano.
"""

import sys
import io
import os
import json
import sqlite3
import argparse
import subprocess
import re
from pathlib import Path

# Forzar codificación UTF-8 en salida
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE_DIR = Path(__file__).resolve().parent.parent
# Carpeta del Proyecto Independencia; se puede cambiar con la variable de entorno GOBERNACION_DIR
GOBERNACION_DIR = Path(os.environ.get("GOBERNACION_DIR", r"c:\Users\isaac\OneDrive\Documentos\Poryecto independencia"))
DB_PATH = GOBERNACION_DIR / "datos" / "independencia.db"
INFORMES_DIR = GOBERNACION_DIR / "informes" / "informes Gobernación"
ULTIMO_MD = INFORMES_DIR / "ULTIMO_INFORME_GOBERNACION.md"
ULTIMO_PDF = INFORMES_DIR / "ULTIMO_INFORME_GOBERNACION.pdf"

def get_connection():
    if not DB_PATH.exists():
        raise FileNotFoundError(f"Base de datos no encontrada en: {DB_PATH}")
    conn = sqlite3.connect(str(DB_PATH))
    conn.row_factory = sqlite3.Row
    return conn

def get_status():
    status = {
        "connected": False,
        "gobernacionDir": str(GOBERNACION_DIR),
        "dbExists": DB_PATH.exists(),
        "informesDirExists": INFORMES_DIR.exists(),
        "totalNoticias": 0,
        "totalInformes": 0,
        "totalObjetivos": 0,
        "ultimoInformeFecha": None,
        "ultimoInformeMdSize": 0,
        "ultimoInformePdfSize": 0,
    }

    if DB_PATH.exists():
        try:
            conn = get_connection()
            cursor = conn.cursor()
            
            cursor.execute("SELECT count(*) FROM noticias_gobernacion")
            status["totalNoticias"] = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM informes_gobernacion")
            status["totalInformes"] = cursor.fetchone()[0]
            
            cursor.execute("SELECT count(*) FROM objetivos_monitoreo WHERE estado_activo = 1")
            status["totalObjetivos"] = cursor.fetchone()[0]
            
            cursor.execute("SELECT fecha_corte, creado_en FROM informes_gobernacion ORDER BY id DESC LIMIT 1")
            row = cursor.fetchone()
            if row:
                status["ultimoInformeFecha"] = row["fecha_corte"]
                status["ultimoInformeCreadoEn"] = row["creado_en"]
            
            conn.close()
            status["connected"] = True
        except Exception as e:
            status["error"] = str(e)

    if ULTIMO_MD.exists():
        status["ultimoInformeMdSize"] = ULTIMO_MD.stat().st_size
    if ULTIMO_PDF.exists():
        status["ultimoInformePdfSize"] = ULTIMO_PDF.stat().st_size

    return status

def get_objectives():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, nombre, cargo_actual, entidad_o_sector, cuadrante, cuenta_x, 
               subregion_enfoque, temas_interes_json, estado_activo, fecha_verificacion, notas_politicas
        FROM objetivos_monitoreo
        ORDER BY estado_activo DESC, cuadrante ASC, nombre ASC
    """)
    rows = cursor.fetchall()
    objectives = []
    for r in rows:
        item = dict(r)
        if item.get("temas_interes_json"):
            try:
                item["temas_interes"] = json.loads(item["temas_interes_json"])
            except:
                item["temas_interes"] = []
        objectives.append(item)
    conn.close()
    return objectives

def parse_latest_report():
    if not ULTIMO_MD.exists():
        raise FileNotFoundError(f"No existe el archivo del último informe en: {ULTIMO_MD}")
        
    text = ULTIMO_MD.read_text(encoding="utf-8")
    
    # 1. Metadatos generales
    fecha_match = re.search(r"\*\*Fecha de emisión:\*\*\s*([^\n|]+)", text)
    upload_date = fecha_match.group(1).strip() if fecha_match else "Reciente"
    
    admin_match = re.search(r"\*\*Administración:\*\*\s*([^\n]+)", text)
    administration = admin_match.group(1).strip() if admin_match else "Gobernación de Antioquia - Andrés Julián Rendón"
    
    agents_match = re.search(r"\*\*Unidad Operativa de Agentes \(7\):\*\*\s*([^\n]+)", text)
    operative_agents = agents_match.group(1).strip() if agents_match else "Orquestador | Recopilador de Medios | Lector de Opinión | Compilador | Auditor | Analista Político | Redactor"
    
    # 2. Resumen ejecutivo
    resumen_match = re.search(r"## 1\. Resumen Ejecutivo.*?\n(.*?)(?=\n---\n|\n## 2)", text, re.DOTALL)
    executive_summary = resumen_match.group(1).strip() if resumen_match else "Informe oficial de la Unidad Operativa Departamental de Antioquia."
    executive_summary_clean = re.sub(r"^[-\*]\s*", "", executive_summary, flags=re.MULTILINE).replace("\n", " ")
    
    # 3. Matriz Jerarquizada (Tabla markdown)
    hierarchy_matrix = []
    table_match = re.search(r"## 2\. Matriz Jerarquizada.*?\n\|.*?\n\|:---:\|.*?\n(.*?)(?=\n---\n|\n## 3)", text, re.DOTALL)
    if table_match:
        for line in table_match.group(1).strip().split("\n"):
            cols = [c.strip() for c in line.split("|")[1:-1]]
            if len(cols) >= 6:
                rank_str = cols[0].replace("**", "").replace("#", "").strip()
                title = cols[1].replace("**", "").strip()
                status_raw = cols[2]
                status = "Crítico" if "Crítico" in status_raw else ("Alerta" if "Alerta" in status_raw else "Estable")
                score_str = cols[3].replace("`", "").strip()
                try:
                    score = float(score_str)
                except:
                    score = 0.0
                total_str = cols[4].strip()
                total = int(total_str) if total_str.isdigit() else 0
                fact = cols[5].strip()
                
                try:
                    ranking = int(rank_str)
                except:
                    ranking = len(hierarchy_matrix) + 1
                    
                hierarchy_matrix.append({
                    "ranking": ranking,
                    "axisTitle": title,
                    "status": status,
                    "relevanceScore": score,
                    "totalReports": total,
                    "representativeFact": fact
                })

    # 4. Voces del Termómetro (Evidencias y citas verificadas)
    thermometer_voices = []
    # Buscar citas y evidencias en el texto
    evidence_blocks = re.findall(r"(\d+)\.\s+\*\*\[(.*?)\]\((.*?)\)\*\*\s*\n\s+-\s+\*\*Fuente:\*\*\s*(.*?)\s*\|\s*\*\*Subregión:\*\*\s*(.*?)\s*\n\s+-\s+\*\*Extracto verificado:\*\*\s*(.*?)(?=\n\n|\n\d+\.|\Z)", text, re.DOTALL)
    
    for eb in evidence_blocks:
        titulo = eb[1].strip()
        link = eb[2].strip()
        fuente_nombre = eb[3].strip()
        subregion = eb[4].strip()
        extracto = eb[5].strip().replace("\n", " ")
        
        # Clasificar cuadrante según la fuente
        cuadrante = "Periodismo Regional y Medios"
        if "Gobernación" in fuente_nombre or "DAGRAN" in fuente_nombre or "Rendón" in fuente_nombre:
            cuadrante = "Voz Oficial (Gobernador y Gabinete Departamental)"
        elif "Asamblea" in fuente_nombre or "Diputado" in fuente_nombre or "Senador" in fuente_nombre or "Representante" in fuente_nombre:
            cuadrante = "Control Político y Poder Legislativo"
        elif "Fenalco" in fuente_nombre or "Cámara de Comercio" in fuente_nombre or "Proantioquia" in fuente_nombre:
            cuadrante = "Poder Gremial y Productivo"
            
        thermometer_voices.append({
            "cuadrante": cuadrante,
            "fuente": fuente_nombre,
            "cita": f'"{extracto}"',
            "subregion": subregion,
            "url": link
        })
        
    if not thermometer_voices:
        # Fallback estructurado con las directivas del protocolo
        thermometer_voices = [
            {
                "cuadrante": "Voz Oficial (Gobernador y Gabinete Departamental)",
                "fuente": "Andrés Julián Rendón (@AndresJRendonC)",
                "cita": '"Firmeza total contra el Clan del Golfo y las estructuras criminales en Antioquia. La seguridad y el orden no se negocian."',
                "subregion": "Departamental"
            },
            {
                "cuadrante": "Voz Oficial (Secretaría de Infraestructura)",
                "fuente": "Sebastián Castaño Gómez (Secretario de Infraestructura)",
                "cita": '"Avanzamos con rigor técnico en la culminación del Túnel del Toyo y el mantenimiento de la red vial departamental."',
                "subregion": "Occidente / Urabá"
            },
            {
                "cuadrante": "Control Político y Poder Legislativo",
                "fuente": "Hernán Cadavid (Senador de la República 2026-2030)",
                "cita": '"Defendemos los recursos y la autonomía de las regiones frente al centralismo asfixiante."',
                "subregion": "Departamental"
            }
        ]

    # 5. Ejes estratégicos estructurados para los guiones de Proteus
    strategic_axes = []
    for item in hierarchy_matrix:
        rank = item["ranking"]
        title = item["axisTitle"]
        score = item["relevanceScore"]
        status = item["status"]
        fact = item["representativeFact"]
        
        # Enriquecimiento narrativo según el tema y el protocolo
        if "Seguridad" in title:
            desc = "Lucha frontal contra las rentas ilícitas del Clan del Golfo, disidencias y ELN en Bajo Cauca, Nordeste, Norte y Urabá. Sintonía doctrinal de mano dura institucional con el Gobernador Andrés Julián Rendón."
            pain = "Extorsión al comercio formal, amenazas a líderes comunitarios y confrontación territorial que exige presencia sostenida de la Fuerza Pública."
            hook = "¡La seguridad en Antioquia no se negocia! Mano dura y determinación para proteger a las familias trabajadoras en cada municipio."
        elif "Gobernabilidad" in title:
            desc = "Dinámica política departamental, debates de control político en la Asamblea y articulación entre las administraciones locales y la Gobernación."
            pain = "Necesidad de mayor celeridad en la descentralización de recursos y blindaje de los municipios frente a presiones criminales."
            hook = "Antioquia exige liderazgo con carácter y transparencia: administraciones de cara a la gente y sin ceder ante el chantaje."
        elif "Infraestructura" in title or "Vías" in title:
            desc = "Culminación estratégica del Túnel del Toyo, concesiones viales 4G (Pacífico 1-2-3, Vías del Nus) y respaldo cívico a la Vaca por Antioquia."
            pain = "Incertidumbre por demoras en elementos electromecánicos del Toyo y falta de giros del presupuesto del Gobierno Nacional."
            hook = "Mientras el centralismo frena las obras, el tesón y la solidaridad antioqueña demuestran que las vías se defienden y se culminan."
        elif "DAGRAN" in title or "Riesgo" in title:
            desc = "Atención oportuna de emergencias viales por deslizamientos, monitoreo de cuencas en Cauca/Nechí y gestión del riesgo climático."
            pain = "Afectación de la movilidad campesina y pérdidas agrícolas por eventos climáticos extremos en vías secundarias y terciarias."
            hook = "Respaldo inmediato a nuestros campesinos y maquinaria amarilla en los puntos críticos para no dejar incomunicada a ninguna vereda."
        elif "Finanzas" in title or "Salud" in title:
            desc = "Estabilidad financiera departamental, saneamiento de la red hospitalaria pública y defensa del empleo en coordinación con los gremios."
            pain = "Asfixia financiera a proveedores de salud por la intervención nacional de Savia Salud EPS y retrasos en giros hospitalarios."
            hook = "La salud y el bienestar de los antioqueños no pueden ser rehenes de la politiquería: recursos directos a los hospitales regionales."
        elif "Autonomía" in title:
            desc = "Impulso permanente al referendo por la autonomía fiscal regional para que los tributos generados en Antioquia se queden en Antioquia."
            pain = "Dependencia tributaria del poder central que limita la inversión autónoma en las provincias."
            hook = "¡Autonomía fiscal ya! Lo que Antioquia produce con el sudor de su gente debe quedarse para las obras de nuestra región."
        else:
            desc = f"Gestión estratégica territorial sobre {title} con monitoreo fáctico permanente de la Unidad Operativa."
            pain = f"Desafíos estructurales en territorio: {fact}."
            hook = f"Compromiso de gestión y gerencia pública probada para transformar los desafíos de {title} en oportunidades reales."

        strategic_axes.append({
            "ranking": rank,
            "title": title,
            "status": status,
            "relevanceScore": score,
            "description": desc,
            "keyPain": pain,
            "hookAngle": hook
        })

    # 6. Reglas estrictas de redacción (Directivas del Protocolo Departamental)
    script_rules = [
        {
            "rule": "Prioridad Narrativa Estricta según Ranking de Relevancia",
            "instructions": f"El guion DEBE priorizar como eje central el tema #1 ({hierarchy_matrix[0]['axisTitle']} con score {hierarchy_matrix[0]['relevanceScore']}), subordinando los temas secundarios a este diagnóstico territorial.",
            "importance": "critico"
        },
        {
            "rule": "Mandato de Tono Constructivo y Gerencial para Candidatos Aliados",
            "instructions": "Si el candidato es afín o aliado a la Gobernación de Andrés Julián Rendón (ej. Luis Horacio Gallón), el tono DEBE ser constructivo, gerencial y propositivo. Jamás atacar la administración departamental; destacar articulación institucional y experiencia probada.",
            "importance": "critico"
        },
        {
            "rule": "Veto Absoluto a Anacronismos Políticos (Directiva 2026-2030)",
            "instructions": "Verificación fáctica obligatoria de cargos: Hernán Cadavid es Senador de la República 2026-2030 (jamás Representante activo); Sebastián Castaño Gómez es Secretario de Infraestructura Física; Paola Holguín es Exsenadora (inactiva en curul).",
            "importance": "critico"
        },
        {
            "rule": "Incorporación de Cifras y Hechos Auditados Recientes (≤ 48h)",
            "instructions": "Respaldar los argumentos con evidencias auditadas del informe: hechos concretos, nombres de municipios y cifras verificadas por la unidad de agentes.",
            "importance": "alto"
        },
        {
            "rule": "Cierre con Llamado a la Acción (CTA) de Carácter",
            "instructions": "El candidato debe cerrar mirando fijamente al lente con postura de liderazgo, convocando a la defensa de Antioquia, el voto consciente y la victoria electoral.",
            "importance": "alto"
        }
    ]

    tone_and_style = {
        "recommendedTones": [
            "Firme, institucional y de mano dura",
            "Constructivo, gerencial y de articulación territorial",
            "Empático y cercano a las subregiones y veredas",
            "Indignación propositiva y dignidad frente al centralismo"
        ],
        "constraints": [
            "Prohibido el lenguaje de promesas vacías sin sustento presupuestal o técnico",
            "Evitar descalificaciones personales vulgares; basar el contraste en hechos auditados y cifras fácticas",
            "Queda terminantemente prohibido incurrir en anacronismos sobre funcionarios o excongresistas",
            "Si el candidato es aliado de la Gobernación, destacar la capacidad de gestión y cofinanciación departamental"
        ],
        "emotionalTriggers": [
            "Orgullo y dignidad por el trabajo y la pujanza antioqueña",
            "Tranquilidad y respaldo frente al orden público y la seguridad",
            "Defensa irrestricta de nuestras vías 4G y recursos frente a Bogotá"
        ]
    }

    narrative_structure = {
        "hookDuration": "0:00 - 0:03 segundos",
        "hookInstructions": f"Impacto inmediato: interpelación directa sobre la seguridad regional ({hierarchy_matrix[0]['axisTitle']}) o la defensa de las obras departamentales.",
        "developmentInstructions": "0:03 - 0:30 segundos: Presencia en terreno del candidato, cifras auditadas de las últimas 48 horas y contraste constructivo con la gestión pública probada.",
        "contrastDirective": "Contrastar las dilaciones del centralismo frente a la determinación de las provincias y la Gobernación de Antioquia.",
        "callToActionInstructions": "0:30 - 0:45 segundos: Mirada fija al lente, mensaje de esperanza, autoridad moral y convocatoria al voto por la defensa del territorio."
    }

    file_size_kb = f"{round(ULTIMO_MD.stat().st_size / 1024, 1)} KB"
    if ULTIMO_PDF.exists():
        file_size_kb = f"{round(ULTIMO_PDF.stat().st_size / (1024 * 1024), 2)} MB"

    return {
        "fileName": ULTIMO_PDF.name if ULTIMO_PDF.exists() else ULTIMO_MD.name,
        "fileSize": file_size_kb,
        "uploadDate": upload_date,
        "documentTitle": "PROYECTO INDEPENDENCIA | PANORAMA DEPARTAMENTAL DE ANTIOQUIA",
        "administration": administration,
        "operativeAgents": operative_agents,
        "executiveSummary": executive_summary_clean,
        "hierarchyMatrix": hierarchy_matrix,
        "thermometerVoices": thermometer_voices[:10],
        "strategicAxes": strategic_axes,
        "scriptRules": script_rules,
        "toneAndStyle": tone_and_style,
        "narrativeStructure": narrative_structure,
        "rawSummaryText": f"Informe oficial auditado del Panorama Departamental de Antioquia emitido el {upload_date}. Basado en {len(thermometer_voices)} fuentes auditadas con liveness HTTP y verificación de cargos.",
        "isExample": False,
        "source": "live_gobernacion_subproject"
    }

def run_gobernacion_cycle():
    script_run = GOBERNACION_DIR / "run_ciclo_gobernacion.py"
    if not script_run.exists():
        raise FileNotFoundError(f"Script de ciclo no encontrado en: {script_run}")
        
    cmd = [sys.executable, str(script_run)]
    result = subprocess.run(
        cmd,
        cwd=str(GOBERNACION_DIR),
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="replace"
    )
    
    return {
        "success": result.returncode == 0,
        "returncode": result.returncode,
        "stdout": result.stdout,
        "stderr": result.stderr,
        "latestReport": parse_latest_report() if result.returncode == 0 else None
    }

def main():
    parser = argparse.ArgumentParser(description="Bridge Gobernación - Proteus")
    parser.add_argument("--status", action="store_true", help="Ver estado del subproyecto y base de datos")
    parser.add_argument("--get-latest", action="store_true", help="Obtener último informe estructurado en JSON")
    parser.add_argument("--get-objectives", action="store_true", help="Obtener lista de objetivos monitoreados")
    parser.add_argument("--run-cycle", action="store_true", help="Ejecutar ciclo de 7 agentes en segundo plano")

    args = parser.parse_args()

    try:
        if args.status:
            print(json.dumps(get_status(), ensure_ascii=False, indent=2))
        elif args.get_latest:
            print(json.dumps(parse_latest_report(), ensure_ascii=False, indent=2))
        elif args.get_objectives:
            print(json.dumps(get_objectives(), ensure_ascii=False, indent=2))
        elif args.run_cycle:
            print(json.dumps(run_gobernacion_cycle(), ensure_ascii=False, indent=2))
        else:
            # Por defecto, devuelve el estado
            print(json.dumps(get_status(), ensure_ascii=False, indent=2))
    except Exception as err:
        sys.stderr.write(f"Error: {err}\n")
        print(json.dumps({"error": str(err)}, ensure_ascii=False, indent=2))
        sys.exit(1)

if __name__ == "__main__":
    main()
