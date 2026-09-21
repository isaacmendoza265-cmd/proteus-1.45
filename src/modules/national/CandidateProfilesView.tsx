import React, { useState } from 'react';
import { Users, Sparkles, UserCheck } from 'lucide-react';
import { 
  CandidateProfileManager, 
  CandidateProfile 
} from '../../components/CandidateProfileManager';
import { CandidateProfileModal } from '../../components/CandidateProfileModal';
import { Button } from '../../components/ui/Button';

interface CandidateProfilesViewProps {
  candidateProfile: CandidateProfile;
  onSaveProfile: (profile: CandidateProfile) => void;
}

export const CandidateProfilesView: React.FC<CandidateProfilesViewProps> = ({
  candidateProfile,
  onSaveProfile
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Glass Header */}
      <div className="bg-slate-900/50 backdrop-blur-2xl border border-sky-400/30 rounded-3xl p-6 shadow-2xl shadow-[inset_0_1px_1px_0_rgba(56,189,248,0.25),0_20px_40px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-72 h-72 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full bg-sky-950/50 border border-sky-400/50 text-sky-300 text-xs font-mono font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(56,189,248,0.3)]">
                Ámbito Nacional
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Gestor de Identidad y Perfil Político
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Perfiles Estratégicos de Candidatos
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              Configura y audita la identidad discursiva, paleta cromática, ejes de campaña y trayectoria del candidato. Permite importar directamente perfiles desde los 28 actores de la Gobernación de Antioquia.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setModalOpen(true)}
            leftIcon={<Sparkles className="w-4 h-4 mr-1 text-amber-300" />}
            className="shrink-0 self-start md:self-auto"
          >
            Editar Perfil Rápido
          </Button>
        </div>
      </div>

      {/* Candidate Profile Manager */}
      <CandidateProfileManager
        candidateProfile={candidateProfile}
        onSaveProfile={onSaveProfile}
        onSelectCandidateProfile={(prof) => onSaveProfile(prof)}
      />

      {/* Quick Modal Editor */}
      {modalOpen && (
        <CandidateProfileModal
          isOpen={modalOpen}
          candidateProfile={candidateProfile}
          onSaveProfile={(prof) => {
            onSaveProfile(prof);
            setModalOpen(false);
          }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
