import React, { useState, useMemo } from 'react';
import { POLLING_STATIONS_MASTER_DATA } from '../../data/electoralAudit/electoralAuditMasterData';
import { 
  PollingStationRecord, 
  PollingTableRecord, 
  ElectoralReclamationDraft,
  BenfordTestResult 
} from '../../data/schemas/electoralMicrodata';
import { ElectoralForensicsService } from '../../services/electoralForensicsService';
import { BenfordDistributionChart } from '../../components/audit/BenfordDistributionChart';
import { StationDiscrepancyCard } from '../../components/audit/StationDiscrepancyCard';
import { CandidateProfile } from '../../components/CandidateProfileManager';
import { 
  ShieldAlert, 
  Building2, 
  AlertTriangle, 
  Scale, 
  Copy, 
  Check, 
  X, 
  FileText, 
  Search,
  Filter,
  CheckCircle2,
  TrendingUp,
  Download
} from 'lucide-react';

interface ElectoralForensicsAuditViewProps {
  candidateProfile?: CandidateProfile;
  onNavigateToView?: (viewId: string) => void;
}

export const ElectoralForensicsAuditView: React.FC<ElectoralForensicsAuditViewProps> = ({
  candidateProfile,
  onNavigateToView
}) => {
  const candidateName = candidateProfile?.nombre || 'Isaac Mendoza';

  // Filters
  const [selectedMuni, setSelectedMuni] = useState<string>('TODOS');
  const [onlyAnomalous, setOnlyAnomalous] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [benfordDigit, setBenfordDigit] = useState<1 | 2>(2);

  // Active Reclamation Modal
  const [activeReclamation, setActiveReclamation] = useState<ElectoralReclamationDraft | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Filtered stations
  const filteredStations = useMemo(() => {
    return POLLING_STATIONS_MASTER_DATA.filter(st => {
      if (selectedMuni !== 'TODOS' && st.municipality !== selectedMuni) return false;
      if (onlyAnomalous && st.riskLevel !== 'CRITICO' && st.riskLevel !== 'ALTO') return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = st.stationName.toLowerCase().includes(query);
        const matchZone = st.zone.toLowerCase().includes(query);
        const matchMuni = st.municipality.toLowerCase().includes(query);
        if (!matchName && !matchZone && !matchMuni) return false;
      }
      return true;
    });
  }, [selectedMuni, onlyAnomalous, searchQuery]);

  // Aggregate numbers for Benford test based on current selection
  const aggregatedBenfordTest: BenfordTestResult = useMemo(() => {
    const allNumbers: number[] = [];
    filteredStations.forEach(st => {
      const numbers = ElectoralForensicsService.extractVotesVectorFromStation(st);
      allNumbers.push(...numbers);
    });
    return ElectoralForensicsService.calculateBenfordDistribution(allNumbers, benfordDigit);
  }, [filteredStations, benfordDigit]);

  // Macro KPIs
  const totalAuditStations = filteredStations.length;
  const totalAuditTables = filteredStations.reduce((acc, st) => acc + st.tables.length, 0);
  const tablesWithDiscrepancy = filteredStations.reduce((acc, st) => {
    return acc + st.tables.filter(t => t.discrepancy !== 0).length;
  }, 0);
  const totalDisputedVotes = filteredStations.reduce((acc, st) => {
    return acc + st.tables.reduce((sum, t) => sum + Math.abs(t.discrepancy), 0);
  }, 0);
  const stationsWithBenfordAlert = filteredStations.filter(st => st.isBenfordAnomalous).length;

  const handleOpenReclamation = (table: PollingTableRecord, station: PollingStationRecord) => {
    const draft = ElectoralForensicsService.generateReclamationDraft(table, station, candidateName);
    setActiveReclamation(draft);
    setCopied(false);
  };

  const handleCopyReclamation = () => {
    if (!activeReclamation) return;
    const text = `
${activeReclamation.commissionName}
CIUDAD

REFERENCIA: RECLAMACIÓN EN AUDIENCIA DE ESCRUTINIO (ARTÍCULO 192 DEL CÓDIGO ELECTORAL)
MESA DE VOTACIÓN Nº: ${activeReclamation.tableNumber}
PUESTO: ${activeReclamation.stationName} (${activeReclamation.municipality})
CANDIDATO BENEFICIARIO: ${activeReclamation.candidateName}
CAUSAL INVOCADA: ${activeReclamation.causalCodigoElectoral}

HECHOS:
${activeReclamation.descripcionHechos.join('\n')}

CUANTIFICACIÓN DEL PERJUICIO: ${activeReclamation.cuantificacionPerdida} votos legítimos sin computar o distorsionados.

PRETENSIONES:
${activeReclamation.pretensiones}

FUNDAMENTO JURÍDICO:
${activeReclamation.fundamentoJuridico}

PRUEBAS APORTADAS:
${activeReclamation.pruebasAportadas.map(p => `- ${p}`).join('\n')}

Suscribe atentamente,
TESTIGO ELECTORAL Y APODERADO DE ${activeReclamation.candidateName}
Fecha y Hora de Radicación: ${activeReclamation.timestamp}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950 border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400">
            <Scale className="w-4 h-4" />
            <span>Protocolo PA-002 • Unidad de Automejora</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
            Auditoría Forense Electoral & Escrutinios
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              E-14 vs E-24
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            Control de mesas, detección de alteraciones matemáticas mediante la <strong>Ley de Benford (2º Dígito - Walter Mebane)</strong> y generación inmediata de minutas de reclamación legal para el escrutinio de {candidateName}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {onNavigateToView && (
            <button
              type="button"
              onClick={() => onNavigateToView('national-candidates')}
              className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-300 transition"
            >
              Volver al Perfil
            </button>
          )}
        </div>
      </div>

      {/* Macro KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-sky-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Puestos Auditados</span>
            <Building2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-white">{totalAuditStations}</div>
          <div className="text-[10px] text-slate-400 mt-1">{totalAuditTables} mesas muestreadas</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-rose-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Mesas con Descuadre</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-rose-400">{tablesWithDiscrepancy}</div>
          <div className="text-[10px] text-rose-300 mt-1">E-14 Claveros ≠ E-24 Comisión</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-amber-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Votos en Disputa</span>
            <Scale className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-300">{totalDisputedVotes}</div>
          <div className="text-[10px] text-slate-400 mt-1">Votos recuperables por escrutinio</div>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-xl">
          <div className="flex items-center justify-between text-purple-400 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Alertas Benford</span>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div className="text-2xl font-black font-mono text-purple-300">{stationsWithBenfordAlert}</div>
          <div className="text-[10px] text-slate-400 mt-1">Puestos con χ² anómalo (p &lt; 0.05)</div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/40 p-3 rounded-2xl border border-white/10">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" /> Municipio:
          </span>
          {['TODOS', 'Medellín', 'Bello', 'Itagüí', 'Envigado'].map((muni) => (
            <button
              key={muni}
              type="button"
              onClick={() => setSelectedMuni(muni)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedMuni === muni
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
            >
              {muni}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAnomalous}
              onChange={(e) => setOnlyAnomalous(e.target.checked)}
              className="rounded border-white/20 bg-slate-800 text-rose-500 focus:ring-rose-400 w-4 h-4"
            />
            <span>Solo anomalías críticas</span>
          </label>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar puesto o zona..."
              className="bg-black/40 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Benford Law Section */}
      <BenfordDistributionChart
        testResult={aggregatedBenfordTest}
        onToggleDigitPosition={(pos) => setBenfordDigit(pos)}
      />

      {/* Stations and Tables Audit Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white tracking-wide">
              Puestos de Votación & Mesas en Escrutinio ({filteredStations.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Haz clic en "Generar Reclamación CNE" sobre cualquier mesa con descuadre
          </span>
        </div>

        <div className="space-y-4">
          {filteredStations.map((station) => (
            <StationDiscrepancyCard
              key={station.id}
              station={station}
              onGenerateReclamation={handleOpenReclamation}
            />
          ))}

          {filteredStations.length === 0 && (
            <div className="p-8 text-center bg-slate-900/40 rounded-2xl border border-white/10 text-slate-400 text-sm">
              No se encontraron puestos que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>

      {/* Reclamation Document Modal */}
      {activeReclamation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-white/20 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="text-base font-bold text-white">Minuta Formal de Reclamación Electoral</h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {activeReclamation.causalCodigoElectoral} • {activeReclamation.municipality}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveReclamation(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono leading-relaxed text-slate-200 bg-slate-950/40 select-text">
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs">
                <strong>Fundamentación Legal Verificada:</strong> Esta minuta está redactada para ser radicada inmediatamente ante la Comisión Escrutadora antes del cierre formal del acta E-26.
              </div>

              <div className="space-y-1">
                <p className="font-bold text-white uppercase">{activeReclamation.commissionName}</p>
                <p className="text-slate-400">CIUDAD</p>
              </div>

              <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1 text-slate-300">
                <p><strong>REFERENCIA:</strong> Reclamación en Audiencia de Escrutinio (Art. 192 Código Electoral)</p>
                <p><strong>MESA DE VOTACIÓN:</strong> Nº {activeReclamation.tableNumber}</p>
                <p><strong>PUESTO:</strong> {activeReclamation.stationName} ({activeReclamation.municipality})</p>
                <p><strong>CANDIDATO BENEFICIARIO:</strong> {activeReclamation.candidateName}</p>
                <p className="text-rose-400"><strong>DAÑO DEMOSTRADO:</strong> {activeReclamation.cuantificacionPerdida} votos legítimos alterados o suprimidos</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-sky-400">I. HECHOS:</p>
                {activeReclamation.descripcionHechos.map((h, i) => (
                  <p key={i} className="text-slate-300 pl-2 border-l border-sky-500/30">{h}</p>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-bold text-amber-400">II. PRETENSIONES:</p>
                <p className="text-slate-300 pl-2 border-l border-amber-500/30">
                  {activeReclamation.pretensiones}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-purple-400">III. FUNDAMENTO JURÍDICO:</p>
                <p className="text-slate-300 pl-2 border-l border-purple-500/30">
                  {activeReclamation.fundamentoJuridico}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-emerald-400">IV. PRUEBAS APORTADAS:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
                  {activeReclamation.pruebasAportadas.map((pr, i) => (
                    <li key={i}>{pr}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-white/10 text-slate-400">
                <p>Suscribe,</p>
                <p className="font-bold text-white mt-1">TESTIGO ELECTORAL Y APODERADO DE {activeReclamation.candidateName}</p>
                <p className="text-[10px]">C.C. ___________________ | T.P. ___________________ C.S.J.</p>
                <p className="text-[10px] mt-1">Fecha y Hora de Radicación: {activeReclamation.timestamp}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-white/10 flex items-center justify-between bg-slate-950/80">
              <span className="text-[11px] text-slate-400 font-mono">
                ID de Reclamación: {activeReclamation.id}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyReclamation}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-lg ${
                    copied 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? '¡Minuta Copiada al Portapapeles!' : 'Copiar Minuta Completa'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
