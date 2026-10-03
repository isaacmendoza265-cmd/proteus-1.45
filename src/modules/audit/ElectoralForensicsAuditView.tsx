import React, { useState, useMemo } from 'react';
import { POLLING_STATIONS_MASTER_DATA } from '../../data/electoralAudit/electoralAuditMasterData';
import { 
  PollingStationRecord, 
  PollingTableRecord, 
  ElectoralReclamationDraft
} from '../../data/schemas/electoralMicrodata';
import { ElectoralForensicsService } from '../../services/electoralForensicsService';
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

  // Macro KPIs
  const totalAuditStations = filteredStations.length;
  const totalAuditTables = filteredStations.reduce((acc, st) => acc + st.tables.length, 0);
  const tablesWithDiscrepancy = filteredStations.reduce((acc, st) => {
    return acc + st.tables.filter(t => t.discrepancy !== 0).length;
  }, 0);
  const totalDisputedVotes = filteredStations.reduce((acc, st) => {
    return acc + st.tables.reduce((sum, t) => sum + Math.abs(t.discrepancy), 0);
  }, 0);

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

    navigator.clipboard.writeText(`[MINUTA DE EJEMPLO: datos de mesa escritos a mano, no son actas reales. No radicar.]\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="proteus-civico space-y-4">
      {/* Cabecera */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-5">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-[var(--c-accent-soft)] text-[var(--c-accent-text)] text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" /> Día E
            </span>
          </div>
          <h1 className="font-titulo m-0 text-xl sm:text-2xl leading-tight font-medium flex items-center gap-2.5 flex-wrap">
            Auditoría Forense Electoral &amp; Escrutinios
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-[var(--c-warn-soft)] text-[var(--c-warn)] border border-[var(--c-warn-solid)]">
              E-14 vs E-24
            </span>
          </h1>
          <p className="m-0 text-xs sm:text-sm text-[var(--c-muted)] max-w-3xl">
            Control de mesas, detección de alteraciones matemáticas entre actas E-14 y E-24 y generación inmediata de minutas de reclamación legal para el escrutinio de {candidateName}.
          </p>
          <p role="note" className="m-0 px-3 py-2 rounded-lg text-xs max-w-3xl bg-[var(--c-warn-soft)] text-[var(--c-warn)] border border-[var(--c-warn-solid)]">
            <strong>Datos de ejemplo.</strong> Los puestos, mesas y votos de esta pantalla están escritos a mano para mostrar cómo funciona la auditoría; no son actas reales. Las minutas que genera son de ejemplo y no deben radicarse. El Día E se cargarán los E-14 y E-24 reales.
          </p>
        </div>

        {onNavigateToView && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToView('national-candidates')}
              className="min-h-9 px-3 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-xs font-semibold"
            >
              Volver al Perfil
            </button>
          </div>
        )}
      </div>

      {/* Macro KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4">
          <div className="flex items-center justify-between text-[var(--c-muted)] mb-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--c-muted)]">Puestos Auditados</span>
            <Building2 className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold tabular-nums">{totalAuditStations}</div>
          <div className="text-xs text-[var(--c-muted)] mt-1">{totalAuditTables} mesas muestreadas</div>
        </div>

        <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4">
          <div className="flex items-center justify-between text-[var(--c-warn)] mb-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--c-muted)]">Mesas con Descuadre</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-[var(--c-warn)]">{tablesWithDiscrepancy}</div>
          <div className="text-xs text-[var(--c-muted)] mt-1">E-14 Claveros ≠ E-24 Comisión</div>
        </div>

        <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-4">
          <div className="flex items-center justify-between text-[var(--c-accent)] mb-1">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--c-muted)]">Votos en Disputa</span>
            <Scale className="w-4 h-4" />
          </div>
          <div className="text-2xl font-bold tabular-nums text-[var(--c-accent)]">{totalDisputedVotes}</div>
          <div className="text-xs text-[var(--c-muted)] mt-1">Votos recuperables por escrutinio</div>
        </div>

      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] p-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-[var(--c-muted)] font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Municipio:
          </span>
          {['TODOS', 'Medellín', 'Bello', 'Itagüí', 'Envigado'].map((muni) => (
            <button
              key={muni}
              type="button"
              onClick={() => setSelectedMuni(muni)}
              className={`min-h-8 px-3 rounded-md border text-xs font-semibold ${
                selectedMuni === muni
                  ? 'bg-[var(--c-accent-soft)] border-[var(--c-accent)] text-[var(--c-accent-text)]'
                  : 'border-[var(--c-border)] bg-[var(--c-surface)]'
              }`}
            >
              {muni}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-[var(--c-ink)] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAnomalous}
              onChange={(e) => setOnlyAnomalous(e.target.checked)}
              className="w-4 h-4"
            />
            <span>Solo anomalías críticas</span>
          </label>

          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[var(--c-muted)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar puesto o zona..."
              className="pl-8 pr-3 py-1.5 text-xs w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Stations and Tables Audit Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-[var(--c-accent)]" />
            <h3 className="text-base font-bold">
              Puestos de Votación &amp; Mesas en Escrutinio ({filteredStations.length})
            </h3>
          </div>
          <span className="text-xs text-[var(--c-muted)]">
            Haz clic en &quot;Generar Reclamación CNE&quot; sobre cualquier mesa con descuadre
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
            <div className="p-8 text-center rounded-2xl border border-[var(--c-border)] bg-[var(--c-sunken)] text-[var(--c-muted)] text-sm">
              No se encontraron puestos que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>

      {/* Reclamation Document Modal */}
      {activeReclamation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--c-scrim)]">
          <div className="rounded-2xl border border-[var(--c-border)] bg-[var(--c-surface)] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-[var(--c-border)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <FileText className="w-5 h-5 text-[var(--c-accent)]" />
                <div>
                  <h3 className="text-base font-bold">Minuta Formal de Reclamación Electoral</h3>
                  <p className="text-xs text-[var(--c-muted)]">
                    {activeReclamation.causalCodigoElectoral} • {activeReclamation.municipality}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveReclamation(null)}
                className="p-1.5 rounded-lg border border-[var(--c-border)] bg-[var(--c-surface)] text-[var(--c-muted)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs font-mono leading-relaxed bg-[var(--c-sunken)] select-text">
              <div className="p-3 rounded-xl bg-[var(--c-warn-soft)] border border-[var(--c-warn-solid)] text-[var(--c-warn)] text-xs">
                <strong>Minuta de ejemplo:</strong> se arma con datos de mesa escritos a mano, no con actas reales. No la radiques: sirve para ver el formato de la reclamación (Art. 192 del Código Electoral) que se presentará con los E-14 y E-24 reales.
              </div>

              <div className="space-y-1">
                <p className="font-bold uppercase">{activeReclamation.commissionName}</p>
                <p className="text-[var(--c-muted)]">CIUDAD</p>
              </div>

              <div className="p-3 bg-[var(--c-surface)] rounded-xl border border-[var(--c-border)] space-y-1">
                <p><strong>REFERENCIA:</strong> Reclamación en Audiencia de Escrutinio (Art. 192 Código Electoral)</p>
                <p><strong>MESA DE VOTACIÓN:</strong> Nº {activeReclamation.tableNumber}</p>
                <p><strong>PUESTO:</strong> {activeReclamation.stationName} ({activeReclamation.municipality})</p>
                <p><strong>CANDIDATO BENEFICIARIO:</strong> {activeReclamation.candidateName}</p>
                <p className="text-[var(--c-warn)]"><strong>DAÑO DEMOSTRADO:</strong> {activeReclamation.cuantificacionPerdida} votos legítimos alterados o suprimidos</p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[var(--c-accent)]">I. HECHOS:</p>
                {activeReclamation.descripcionHechos.map((h, i) => (
                  <p key={i} className="pl-2 border-l border-[var(--c-border)]">{h}</p>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[var(--c-warn)]">II. PRETENSIONES:</p>
                <p className="pl-2 border-l border-[var(--c-border)]">
                  {activeReclamation.pretensiones}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[var(--c-info)]">III. FUNDAMENTO JURÍDICO:</p>
                <p className="pl-2 border-l border-[var(--c-border)]">
                  {activeReclamation.fundamentoJuridico}
                </p>
              </div>

              <div className="space-y-2">
                <p className="font-bold text-[var(--c-ok)]">IV. PRUEBAS APORTADAS:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  {activeReclamation.pruebasAportadas.map((pr, i) => (
                    <li key={i}>{pr}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 border-t border-[var(--c-border)] text-[var(--c-muted)]">
                <p>Suscribe,</p>
                <p className="font-bold text-[var(--c-ink)] mt-1">TESTIGO ELECTORAL Y APODERADO DE {activeReclamation.candidateName}</p>
                <p className="text-[11px]">C.C. ___________________ | T.P. ___________________ C.S.J.</p>
                <p className="text-[11px] mt-1">Fecha y Hora de Radicación: {activeReclamation.timestamp}</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--c-border)] flex items-center justify-between">
              <span className="text-xs text-[var(--c-muted)]">
                ID de Reclamación: {activeReclamation.id}
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyReclamation}
                  className={`min-h-9 px-4 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    copied
                      ? 'bg-[var(--c-ok)] text-white'
                      : 'bg-[var(--c-accent)] text-white'
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
