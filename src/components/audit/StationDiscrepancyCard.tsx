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
  Scale, 
  ShieldAlert
} from 'lucide-react';

interface StationDiscrepancyCardProps {
  station: PollingStationRecord;
  onGenerateReclamation: (table: PollingTableRecord, station: PollingStationRecord) => void;
}

const RISK_BADGES: { [key in AnomalySeverity]: { label: string; bg: string; text: string; border: string } } = {
  BAJO: { label: 'Riesgo Bajo', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  MEDIO: { label: 'Riesgo Medio', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' },
  ALTO: { label: 'Riesgo Alto', bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30' },
  CRITICO: { label: '¡Riesgo Crítico!', bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/50' }
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
    <div className={`bg-slate-900/60 backdrop-blur-xl border rounded-2xl p-5 shadow-xl transition duration-300 ${
      station.riskLevel === 'CRITICO' 
        ? 'border-rose-500/40 hover:border-rose-400/60' 
        : 'border-white/10 hover:border-white/20'
    }`}>
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-sky-400 shrink-0" />
            <h4 className="text-base font-black text-white">{station.stationName}</h4>
            <span className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}>
              {badge.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {station.municipality} • {station.zone}
            </span>
            <span className="text-slate-500">|</span>
            <span>{station.address}</span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-slate-300">Censo: {station.electoralCensus.toLocaleString()} votantes</span>
          </div>
        </div>

        {/* Action / Metrics */}
        <div className="flex items-center gap-3">
          {totalVotesLostOrDisputed > 0 && (
            <div className="bg-rose-950/40 border border-rose-500/30 px-3 py-1.5 rounded-xl text-right">
              <span className="text-[10px] uppercase font-mono text-rose-300 block">Votos en Disputa</span>
              <span className="text-sm font-mono font-black text-rose-400">{totalVotesLostOrDisputed} votos</span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-xl text-slate-300 transition flex items-center gap-1 text-xs"
          >
            <span>{expanded ? 'Ocultar Mesas' : `Ver ${station.tables.length} Mesas`}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Quick Summary Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 pb-1 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>Participación: <b className="text-white font-mono">{station.turnoutPercentage}%</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>Mesas con descuadre: <b className="text-rose-400 font-mono">{tablesWithDiscrepancy.length}</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <ShieldAlert className="w-3.5 h-3.5 text-purple-400" />
          <span>Benford χ²: <b className="text-white font-mono">{station.benfordChiSquare.toFixed(1)}</b></span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span>Dominancia: <b className="text-slate-200">{station.historicalDominantParty}</b></span>
        </div>
      </div>

      {/* Expanded Table List */}
      {expanded && (
        <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
          <div className="text-xs font-bold text-slate-300 uppercase font-mono tracking-wider flex items-center justify-between">
            <span>Mesas Auditadas (E-14 Claveros vs E-24 Comisión Escrutadora)</span>
            <span className="text-[10px] text-slate-500 font-normal">Reclamaciones conforme al Art. 192 Código Electoral</span>
          </div>

          <div className="space-y-2">
            {station.tables.map((table) => {
              const hasDiff = table.discrepancy !== 0;
              return (
                <div
                  key={table.tableNumber}
                  className={`p-3.5 rounded-xl border transition ${
                    hasDiff
                      ? 'bg-rose-950/20 border-rose-500/40'
                      : 'bg-white/5 border-white/5'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-white bg-black/40 px-2 py-0.5 rounded border border-white/10">
                          Mesa #{table.tableNumber}
                        </span>
                        {hasDiff ? (
                          <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            Discrepancia: {table.discrepancy > 0 ? `+${table.discrepancy}` : table.discrepancy} votos
                          </span>
                        ) : (
                          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Exacto
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400">
                          (Censo Mesa: {table.census} | Votantes E-11: {table.votersInE11})
                        </span>
                      </div>

                      {/* Vote comparison bar */}
                      <div className="flex flex-wrap items-center gap-x-4 text-xs font-mono text-slate-300 pt-1">
                        <span>E-14 Claveros: <strong className="text-cyan-400">{table.votesE14Claveros}</strong></span>
                        <span>E-24 Comisión: <strong className={hasDiff ? 'text-rose-400' : 'text-emerald-400'}>{table.votesE24Comision}</strong></span>
                        <span>Nulos: {table.nullVotes}</span>
                        <span>Blancos: {table.blankVotes}</span>
                      </div>

                      {/* Anomaly Tags */}
                      {table.anomalyTags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1.5">
                          {table.anomalyTags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded"
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
                          className="px-3.5 py-1.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-1.5 group cursor-pointer"
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
