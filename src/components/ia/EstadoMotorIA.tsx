/**
 * Transparencia del motor de análisis: qué recibió Gemini en la última llamada (tarea, unidad, tamaño de cada
 * macrofuente) y la cobertura de las fuentes registradas para esa unidad (con datos / sin datos / no aplica).
 * Sirve para ver, mientras se siguen subiendo datos y bloques del marco, qué entra y qué falta.
 */
import React, { useEffect, useState } from 'react';
import { alLlamar, ultimaLlamada, type RegistroLlamada } from '../../services/ia/registroLlamadas';

const mil = (n: number) => `${Math.round(n / 1000).toLocaleString('es-CO')} mil`;

export const EstadoMotorIA: React.FC<{ cobertura?: RegistroLlamada['cobertura'] }> = ({ cobertura }) => {
  const [r, setR] = useState<RegistroLlamada | null>(ultimaLlamada());
  useEffect(() => alLlamar(setR), []);
  const cob = cobertura ?? r?.cobertura ?? [];
  const con = cob.filter((c) => c.estado === 'con datos');
  const sin = cob.filter((c) => c.estado === 'sin datos');

  return (
    <details className="text-xs">
      <summary className="cursor-pointer font-semibold text-[var(--c-muted)]">
        Motor de análisis {r ? `· última llamada: ${r.tarea}, ${r.territorio}` : '· sin llamadas todavía'}
      </summary>
      <div className="mt-1 flex flex-col gap-2 text-[var(--c-ink)]">
        {r && (
          <p className="m-0">
            Gemini recibió las tres macrofuentes completas: marco {mil(r.caracteres.marco)} caracteres, perfil {mil(r.caracteres.perfil)}, datos {mil(r.caracteres.datos)}
            {' '}({new Date(r.cuando).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}).
          </p>
        )}
        {cob.length > 0 && (
          <div>
            <p className="m-0 font-semibold">Fuentes del motor para esta unidad: {con.length} con datos, {sin.length} sin datos, {cob.length - con.length - sin.length} no aplican.</p>
            <ul className="m-0 pl-4 flex flex-col gap-0.5">
              {cob.filter((c) => c.estado !== 'no aplica').map((c) => (
                <li key={c.id}>
                  <span className={c.estado === 'con datos' ? 'text-[var(--c-ok)]' : 'text-[var(--c-muted)]'}>{c.estado === 'con datos' ? '●' : '○'}</span>{' '}
                  {c.titulo} <span className="text-[var(--c-muted)]">({c.nivel}{c.estado === 'con datos' ? `, ${c.datos} datos` : ', sin datos para esta unidad'})</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="m-0 text-[var(--c-muted)]">
          Un JSON nuevo en src/data/motor/, una fuente registrada en el motor, un bloque nuevo del marco o un cambio del perfil entran en la siguiente llamada.
        </p>
      </div>
    </details>
  );
};

export default EstadoMotorIA;
