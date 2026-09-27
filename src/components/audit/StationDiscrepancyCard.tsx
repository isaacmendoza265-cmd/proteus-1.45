import React, { useState } from 'react';
import { PollingStationRecord, PollingTableRecord, AnomalySeverity } from '../../data/schemas/electoralMicrodata';
import {
  Building2,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ChevronDown,
  ChevronUp,
  Scale
} from 'lucide-react';

interface StationDiscrepancyCardProps {
  station: PollingStationRecord;
  onGenerateReclamation: (table: PollingTableRecord, station: PollingStationRecord) => void;
}

const RISK_BADGES: { [key in AnomalySeverity]: { label: string; bg: string; text: string; border: string } } = {
  BAJO: { label: 'Riesgo Bajo', bg: 'bg-[var(--c-ok-soft)]', text: 'text-[var(--c-ok)]', border: 'border-transparent' },
  MEDIO: { label: 'Riesgo Medio', bg: 'bg-[var(--c-warn-soft)]', text: 'text-[var(--c-warn)]', border: 'border-transparent' },
  ALTO: { label: 'Riesgo Alto', bg: 'bg-[var(--c-warn-soft)]', text: 'text-[var(--c-warn)]', border: 'border-[var(--c-warn-solid)]' },
  CRITICO: { label: '¡Riesgo Crítico!', bg: 'bg-[var(--c-warn-soft)]', text: 'text-[var(--c-warn)]', border: 'border-[var(--c-warn-solid)]' }
};

export const StationDiscrepancyCard: React.FC<StationDiscrepancyCardProps> = ({
  station,
  onGenerateReclamation
}) => {
  const [expanded, setExpanded] = useState<boolean>(station.riskLevel === 'CRITICO' || station.riskLevel === 'ALTO');

  const badge = RISK_BADGES[station.riskLevel];
  const tablesWithDiscrepancy = station.tables.filter(t => t.discrepancy !== 0);
  const totalVotesLostOrDisputed = station.tables.reduce((acc, t) => acc + Math.abs(t.discrepancy), 0);

  return (
    <div className={`proteus-civico rounded-2xl border p-5 transition duration-300 bg-[var(--c-surface)] ${
      station.riskLevel === 'CRITICO'
        ? 'border-[var(--c-warn-solid)]'
        : 'border-[var(--c-border)]'
    }`}>
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-[var(--c-border)]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[var(--c-accent)] shrink-0" />
            <h4 className="font-titulo text-base font-bold text-[var(--c-ink)]">{station.stationName}</h4>
            <span className={`px-2.5 py-0.5 text-xs font-bold uppercase rounded-md border ${badge.bg} ${badge.text} ${badge.border}`}>
              {badge.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--c-muted)]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[var(--c-muted)]" />
              {station.municipality} • {station.zone}
            </span>
            <span className="text-[var(--c-border)]">|</span>
            <span>{station.address}</span>
            <span className="text-[var(--c-border)]">|</span>
            <span className="font-mono text-[var(--c-ink)]">Censo: {station.electoralCensus.toLocaleString()} votantes</span>
          </div>
        </div>

        {/* Action / Metrics */}
        <div className="flex items-center gap-3">
          {totalVotesLostOrDisputed > 0 && (
            <div className="bg-[var(--c-warn-soft)] border border-[var(--c-warn-solid)] px-3 py-1.5 rounded-xl text-right">
              <span className="text-xs uppercase font-mono text-[var(--c-warn)] block">Votos en Disputa</span>
              <span className="text-sm font-mono font-bold text-[var(--c-warn)]">{totalVotesLostOrDisputed} votos</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-2 border border-[var(--c-border)] bg-[var(--c-surface)] hover:border-[var(--c-accent)] rounded-xl text-[var(--c-muted)] transition flex items-center gap-1 text-xs"
          >
            <span>{expanded ? 'Ocultar Mesas' : `Ver ${station.tables.length} Mesas`}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 pb-1 text-xs">
        <div className="flex items-center gap-1.5 text-[var(--c-muted)]">
          <Users className="w-3.5 h-3.5 text-[var(--c-accent)]" />
          <span>Participación: <b className="text-[var(--c-ink)] font-mono">{station.turnoutPercentage}%</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--c-muted)]">
          <Scale className="w-3.5 h-3.5 text-[var(--c-warn)]" />
          <span>Mesas con descuadre: <b className="text-[var(--c-warn)] font-mono">{tablesWithDiscrepancy.length}</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-[var(--c-muted)]">
          <span>Dominancia: <b className="text-[var(--c-ink)]">{station.historicalDominantParty}</b></span>
        </div>
      </div>

      {/* Expanded Table List */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-[var(--c-border)] space-y-3">
          <div className="text-xs font-bold text-[var(--c-muted)] uppercase flex items-center justify-between">
            <span>Mesas Auditadas (E-14 Claveros vs E-24 Comisión Escrutadora)</span>
            <span className="text-xs text-[var(--c-muted)] font-normal normal-case">Reclamaciones conforme al Art. 192 Código Electoral</span>
          </div>

          <div className="space-y-2">
            {station.tables.map((table) => {
              const hasDiff = table.discrepancy !== 0;
              return (
                <div
                  key={table.tableNumber}
                  className={`p-3.5 rounded-xl border transition ${
                    hasDiff
                      ? 'bg-[var(--c-warn-soft)] border-[var(--c-warn-solid)]'
                      : 'bg-[var(--c-sunken)] border-[var(--c-border)]'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--c-ink)] bg-[var(--c-surface)] px-2 py-0.5 rounded border border-[var(--c-border)]">
                          Mesa #{table.tableNumber}
                        </span>
                        {hasDiff ? (
                          <span className="text-xs font-bold text-[var(--c-warn)] flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Discrepancia: {table.discrepancy > 0 ? `+${table.discrepancy}` : table.discrepancy} votos
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-[var(--c-ok)] flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Exacto
                          </span>
                        )}
                        <span className="text-xs text-[var(--c-muted)]">
                          (Censo Mesa: {table.census} | Votantes E-11: {table.votersInE11})
                        </span>
                      </div>

                      {/* Vote comparison bar */}
                      <div className="flex flex-wrap items-center gap-x-4 text-xs font-mono text-[var(--c-muted)] pt-1">
                        <span>E-14 Claveros: <strong className="text-[var(--c-accent)]">{table.votesE14Claveros}</strong></span>
                        <span>E-24 Comisión: <strong className={hasDiff ? 'text-[var(--c-warn)]' : 'text-[var(--c-ok)]'}>{table.votesE24Comision}</strong></span>
                        <span>Nulos: {table.nullVotes}</span>
                        <span>Blancos: {table.blankVotes}</span>
                      </div>

                      {/* Anomaly Tags */}
                      {table.anomalyTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {table.anomalyTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-xs font-mono bg-[var(--c-warn-soft)] text-[var(--c-warn)] border border-[var(--c-warn-solid)] rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div>
                      {hasDiff && (
                        <button
                          type="button"
                          onClick={() => onGenerateReclamation(table, station)}
                          className="px-3.5 py-1.5 bg-[var(--c-accent)] hover:opacity-90 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Generar Reclamación CNE</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
