import React, { useState, useEffect } from 'react';
import { 
  X, 
  HardDrive, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Trash2, 
  FolderSync, 
  Sparkles,
  Database,
  FileText,
  Clock,
  Shield,
  Upload
} from 'lucide-react';
import { googleDriveService, GoogleDriveAccount, DriveSavedItem } from '../../services/googleDriveService';

interface GoogleDriveSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GoogleDriveSyncModal: React.FC<GoogleDriveSyncModalProps> = ({
  isOpen,
  onClose
}) => {
  const [account, setAccount] = useState<GoogleDriveAccount>(googleDriveService.getAccount());
  const [savedFiles, setSavedFiles] = useState<DriveSavedItem[]>(googleDriveService.getSavedFiles());
  const [inputEmail, setInputEmail] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setAccount(googleDriveService.getAccount());
      setSavedFiles(googleDriveService.getSavedFiles());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputEmail || !inputEmail.includes('@')) {
      setStatusMsg('Por favor ingresa un correo electrónico válido de Google Drive.');
      return;
    }

    setIsConnecting(true);
    setStatusMsg(null);

    setTimeout(() => {
      const updated = googleDriveService.connectAccount(inputEmail);
      setAccount(updated);
      setSavedFiles(googleDriveService.getSavedFiles());
      setIsConnecting(false);
      setStatusMsg('¡Cuenta enlazada exitosamente! Todos los análisis se respaldarán en tu Drive.');
    }, 1000);
  };

  const handleDisconnect = () => {
    googleDriveService.disconnectAccount();
    setAccount(googleDriveService.getAccount());
    setSavedFiles([]);
    setStatusMsg('Cuenta de Google Drive desvinculada.');
  };

  const handleDeleteFile = (id: string) => {
    googleDriveService.deleteItem(id);
    setSavedFiles(googleDriveService.getSavedFiles());
    setAccount(googleDriveService.getAccount());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl bg-slate-950/90 border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1.5px_2px_rgba(255,255,255,0.4)] text-white flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-white/15 flex items-center justify-between bg-gradient-to-r from-sky-500/20 via-indigo-500/15 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-sky-500/20 border border-sky-400/40 text-sky-300">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase text-sky-400 font-bold tracking-wider">
                Integración en la Nube
              </div>
              <h2 className="text-lg font-black text-white">
                Enlace con Cuenta de Google Drive
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-slate-300 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
          {/* Account Status Card */}
          {account.isConnected ? (
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/15 via-sky-500/10 to-transparent border border-emerald-400/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Google Drive Conectado Activamente</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                  Activo
                </span>
              </div>
              <div className="space-y-1 text-slate-200">
                <div>
                  <strong>Cuenta enlazada:</strong> <span className="font-mono text-white">{account.email}</span>
                </div>
                <div>
                  <strong>Carpeta Principal:</strong> <span className="font-mono text-sky-300">/{account.rootFolderName}/</span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Archivos respaldados: <strong>{savedFiles.length}</strong> | Almacenamiento: <strong>{(account.storageUsedBytes / 1024).toFixed(1)} KB</strong>
                </div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleDisconnect}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/30 font-bold transition"
                >
                  Desvincular Cuenta
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-white/05 border border-white/15 space-y-3">
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Shield className="w-4 h-4 text-sky-400" />
                <span>Enlaza tu cuenta de Google Drive</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Conecta tu cuenta única de Google Drive para mantener guardados los análisis territoriales, perfiles psicográficos de votantes, briefs de campaña y lógicas del candidato.
              </p>
              <form onSubmit={handleConnect} className="flex flex-col sm:flex-row gap-2 pt-2">
                <input
                  type="email"
                  value={inputEmail}
                  onChange={(e) => setInputEmail(e.target.value)}
                  placeholder="ejemplo@gmail.com"
                  className="flex-1 px-3.5 py-2 rounded-xl bg-black/40 border border-white/20 text-white text-xs font-medium focus:outline-none focus:border-sky-400"
                  required
                />
                <button
                  type="submit"
                  disabled={isConnecting}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-xs transition shadow-[0_0_15px_rgba(56,189,248,0.4)] disabled:opacity-50 shrink-0"
                >
                  {isConnecting ? 'Conectando...' : 'Enlazar Google Drive'}
                </button>
              </form>
            </div>
          )}

          {statusMsg && (
            <div className="p-3 rounded-xl bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs">
              {statusMsg}
            </div>
          )}

          {/* Saved Files List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase text-slate-300 font-bold flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-amber-400" />
                Archivos y Análisis Respaldados en Drive ({savedFiles.length})
              </h3>
            </div>

            {savedFiles.length === 0 ? (
              <div className="p-8 rounded-2xl bg-black/20 border border-white/10 text-center text-slate-400 space-y-1">
                <FolderSync className="w-8 h-8 text-white/20 mx-auto" />
                <div className="font-bold text-slate-300">Sin archivos sincronizados aún</div>
                <div className="text-[11px]">
                  Cuando generes briefs, perfiles de votantes o análisis en la aplicación, haz clic en "Guardar en Drive" para verlos aquí.
                </div>
              </div>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {savedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="p-3 rounded-2xl bg-white/05 hover:bg-white/10 border border-white/10 transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div className="p-2 rounded-xl bg-sky-500/15 text-sky-300 shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-white text-xs truncate">
                          {file.name}
                        </div>
                        <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{file.candidateName}</span>
                          <span>•</span>
                          <span>{(file.sizeBytes / 1024).toFixed(1)} KB</span>
                          <span>•</span>
                          <span>{new Date(file.uploadedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={file.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-sky-300 hover:text-white transition"
                        title="Ver en Google Drive"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDeleteFile(file.id)}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 transition"
                        title="Eliminar registro"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/15 flex items-center justify-between bg-black/40 text-[11px] text-slate-400">
          <span>Protocolo seguro de persistencia para Google Drive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
