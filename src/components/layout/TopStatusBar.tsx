import React, { useEffect, useState } from 'react';
import { ShieldCheck, Cpu, Database, Activity, RefreshCw, HardDrive, User, CheckCircle2 } from 'lucide-react';
import { gobernacionService } from '../../services/gobernacionService';
import { googleDriveService } from '../../services/googleDriveService';

interface TopStatusBarProps {
  onOpenDriveModal?: () => void;
  candidateName?: string;
  onOpenCandidateModal?: () => void;
}

export const TopStatusBar: React.FC<TopStatusBarProps> = ({
  onOpenDriveModal,
  candidateName = 'Isaac Mendoza',
  onOpenCandidateModal
}) => {
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; totalNews: number }>({
    connected: false,
    totalNews: 0
  });
  const [loading, setLoading] = useState(false);
  const [driveAccount, setDriveAccount] = useState(googleDriveService.getAccount());

  const checkStatus = async () => {
    try {
      setLoading(true);
      const res = await gobernacionService.getStatus();
      setDbStatus({
        connected: res.status === 'online',
        totalNews: res.database?.total_news || 0
      });
      setDriveAccount(googleDriveService.getAccount());
    } catch {
      setDbStatus({ connected: false, totalNews: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-14 border-b border-white/15 bg-slate-950/40 backdrop-blur-2xl px-4 md:px-6 flex items-center justify-between z-30 sticky top-0 shadow-[inset_0_-1px_1px_0_rgba(255,255,255,0.15),0_4px_25px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.9)] animate-pulse" />
          <span className="text-xs font-mono font-black tracking-wider text-white">
            PROTEUS 1.2
          </span>
        </div>
        <span className="hidden sm:inline-block text-slate-500">|</span>
        
        {/* Active Candidate Badge / Switcher */}
        {onOpenCandidateModal ? (
          <button
            onClick={onOpenCandidateModal}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/40 hover:border-amber-400/60 text-[11px] font-mono text-amber-300 transition shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] cursor-pointer group"
            title="Clic para personalizar el perfil del candidato o buscar con Google Search"
          >
            <User className="w-3 h-3 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold truncate max-w-[150px]">{candidateName}</span>
            <span className="text-[9px] bg-amber-400/20 text-amber-200 px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
              Editar
            </span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-[11px] font-mono text-amber-300 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]">
            <User className="w-3 h-3 text-amber-400" />
            <span className="font-semibold truncate max-w-[140px]">{candidateName}</span>
          </div>
        )}

        <span className="hidden lg:inline-block text-slate-500">|</span>
        <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-[11px] font-mono text-emerald-300 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
          125 Municipios Conectados
        </span>
      </div>

      <div className="flex items-center gap-2.5 md:gap-3 text-xs font-mono">
        {/* Google Drive Status / Trigger */}
        {onOpenDriveModal && (
          <button
            onClick={onOpenDriveModal}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl backdrop-blur-xl border transition ${
              driveAccount.isConnected
                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/40 shadow-[0_0_10px_rgba(52,211,153,0.2)]'
                : 'bg-white/05 hover:bg-white/10 text-slate-300 border-white/15'
            }`}
            title="Sincronización con Google Drive"
          >
            <HardDrive className={`w-3.5 h-3.5 ${driveAccount.isConnected ? 'text-emerald-400' : 'text-sky-400'}`} />
            <span className="hidden md:inline font-semibold">
              {driveAccount.isConnected ? 'Drive Sincronizado' : 'Enlazar Drive'}
            </span>
            <span className={`w-1.5 h-1.5 rounded-full ${driveAccount.isConnected ? 'bg-emerald-400' : 'bg-slate-500'}`} />
          </button>
        )}

        {/* Gemini AI Status */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-slate-200 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25)]">
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden md:inline font-semibold">Gemini 3.8 Flash</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.9)]" />
        </div>

        {/* Refresh button */}
        <button
          onClick={checkStatus}
          disabled={loading}
          title="Verificar telemetría"
          className="p-1.5 rounded-xl text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 transition shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25)]"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-sky-400' : ''}`} />
        </button>
      </div>
    </header>
  );
};
