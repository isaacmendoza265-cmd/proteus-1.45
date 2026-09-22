import React, { useState } from 'react';
import { 
  AdvertisingResonanceProfile 
} from '../../data/advertising/adTargetingModelData';
import { GeneratedCreativeSet } from '../../services/adTargetingOptimizerService';
import { 
  Smartphone, 
  MessageSquare, 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Zap, 
  Music, 
  Share2, 
  Eye
} from 'lucide-react';

interface AdCreativeVariantCardProps {
  profile: AdvertisingResonanceProfile;
  creativeSet: GeneratedCreativeSet;
  candidateName: string;
}

export const AdCreativeVariantCard: React.FC<AdCreativeVariantCardProps> = ({
  profile,
  creativeSet,
  candidateName
}) => {
  const [activeTab, setActiveTab] = useState<'video' | 'whatsapp' | 'billboard'>('video');
  const [framingMode, setFramingMode] = useState<'gain' | 'loss'>('gain');
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleCopy = (text: string, formatName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(formatName);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="bg-slate-900/70 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-5">
      {/* Header with Framing Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-base font-black text-white">
              Creatividades Publicitarias Adaptadas
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
              {profile.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Formatos optimizados para el canal primario: <strong className="text-amber-300">{profile.primaryChannel}</strong>
          </p>
        </div>

        {/* Framing Selector (Gain vs Loss) */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 text-xs font-mono">
          <button
            type="button"
            onClick={() => setFramingMode('gain')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
              framingMode === 'gain'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Ganancia (Esperanza)</span>
          </button>
          <button
            type="button"
            onClick={() => setFramingMode('loss')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
              framingMode === 'loss'
                ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white font-bold shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Pérdida (Protección)</span>
          </button>
        </div>
      </div>

      {/* Cognitive Angle Banner */}
      <div className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${
        framingMode === 'gain'
          ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
          : 'bg-rose-950/20 border-rose-500/30 text-rose-200'
      }`}>
        <Zap className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold uppercase tracking-wider block text-[10px]">
            {framingMode === 'gain' ? 'Marco de Ganancia (Kahneman & Tversky)' : 'Marco de Aversión a la Pérdida (Kahneman & Tversky)'}:
          </span>
          <p className="mt-0.5 leading-relaxed">
            {framingMode === 'gain' ? profile.gainFramingAngle : profile.lossFramingAngle}
          </p>
        </div>
      </div>

      {/* Format Switcher */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('video')}
          className={`pb-2 px-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'video'
              ? 'border-sky-400 text-sky-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>Video Vertical (TikTok / Reels 15s)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('whatsapp')}
          className={`pb-2 px-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'whatsapp'
              ? 'border-emerald-400 text-emerald-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Micro-Copy WhatsApp P2P</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('billboard')}
          className={`pb-2 px-3 text-xs font-bold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'billboard'
              ? 'border-purple-400 text-purple-300'
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Valla Exterior / Volante Barrial</span>
        </button>
      </div>

      {/* TAB CONTENT: VIDEO REEL */}
      {activeTab === 'video' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Mockup Screen */}
          <div className="md:col-span-5 bg-black rounded-2xl border-2 border-slate-700 p-4 relative overflow-hidden shadow-2xl flex flex-col justify-between aspect-[9/14]">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                15s Publicidad
              </span>
              <span>@isaacmendozacol</span>
            </div>

            {/* Central On-Screen Text */}
            <div className="my-auto text-center space-y-2">
              <span className="inline-block px-2.5 py-1 rounded bg-amber-500/90 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg">
                {creativeSet.videoReel.hookSeconds0to2}
              </span>
              <div className="text-white font-extrabold text-sm leading-snug drop-shadow-md px-2">
                "{creativeSet.videoReel.onScreenText}"
              </div>
            </div>

            {/* Bottom Overlay */}
            <div className="space-y-1.5 text-left bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-4 pb-1">
              <p className="text-xs text-white font-semibold line-clamp-2">
                {creativeSet.videoReel.coreMessageSeconds3to10}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-amber-300 font-bold">
                <span>👉 {creativeSet.videoReel.callToActionSeconds11to15}</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                <Music className="w-3 h-3 text-sky-400" />
                <span className="truncate">{creativeSet.videoReel.audioMoodSuggestion}</span>
              </div>
            </div>
          </div>

          {/* Detailed Script & Action */}
          <div className="md:col-span-7 space-y-3">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-sky-400 font-bold">0:00 - 0:02 | Gancho Visual y Voz</span>
                <span className="text-[10px] text-slate-400">Detención de scroll</span>
              </div>
              <p className="font-bold text-white text-sm">
                "{creativeSet.videoReel.hookSeconds0to2}"
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold">0:03 - 0:10 | Núcleo del Mensaje & Propuesta</span>
                <span className="text-[10px] text-slate-400">Identidad de {candidateName}</span>
              </div>
              <p className="text-slate-200 leading-relaxed">
                {creativeSet.videoReel.coreMessageSeconds3to10}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase text-amber-400 font-bold">0:11 - 0:15 | Llamado a la Acción (CTA)</span>
                <span className="text-[10px] text-slate-400">Conversión a voto</span>
              </div>
              <p className="text-amber-200 font-bold">
                {creativeSet.videoReel.callToActionSeconds11to15}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleCopy(
                `GANCHO (0-2s): ${creativeSet.videoReel.hookSeconds0to2}\nMENSAJE (3-10s): ${creativeSet.videoReel.coreMessageSeconds3to10}\nCTA (11-15s): ${creativeSet.videoReel.callToActionSeconds11to15}\nTEXTO EN PANTALLA: ${creativeSet.videoReel.onScreenText}\nAUDIO: ${creativeSet.videoReel.audioMoodSuggestion}`,
                'video'
              )}
              className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedFormat === 'video' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedFormat === 'video' ? '¡Guion de Video Copiado!' : 'Copiar Guion Completo de Video'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: WHATSAPP P2P */}
      {activeTab === 'whatsapp' && (
        <div className="space-y-4">
          <div className="bg-[#0b141a] border border-[#202c33] rounded-2xl p-4 shadow-xl max-w-xl mx-auto space-y-3">
            <div className="bg-[#005c4b] text-slate-100 rounded-2xl rounded-tl-none p-4 text-xs font-sans leading-relaxed shadow space-y-2">
              <p className="font-semibold text-emerald-200">{creativeSet.whatsAppP2P.senderGreeting}</p>
              <p className="whitespace-pre-line text-white">{creativeSet.whatsAppP2P.bodyText}</p>
              <div className="pt-2 border-t border-emerald-600/40 text-[11px] text-emerald-100 flex items-center justify-between">
                <span>📲 {creativeSet.whatsAppP2P.sharePrompt}</span>
                <span className="text-[9px] text-emerald-300">12:30 p.m. ✓✓</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleCopy(
                `${creativeSet.whatsAppP2P.senderGreeting}\n\n${creativeSet.whatsAppP2P.bodyText}\n\n${creativeSet.whatsAppP2P.sharePrompt}`,
                'whatsapp'
              )}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              {copiedFormat === 'whatsapp' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedFormat === 'whatsapp' ? '¡Texto WhatsApp Copiado!' : 'Copiar Mensaje para Difusión en WhatsApp'}</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BILLBOARD / FLYER */}
      {activeTab === 'billboard' && (
        <div className="space-y-4">
          {/* Billboard Frame */}
          <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-indigo-950 border-4 border-slate-700 rounded-2xl p-6 shadow-2xl text-center space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-sky-400 font-bold block">
              Valla de Gran Formato / Volante Hiperlocal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-lg">
              "{creativeSet.outdoorBillboard.headlineMax7Words}"
            </h2>
            <p className="text-sm font-semibold text-amber-300 max-w-lg mx-auto">
              {creativeSet.outdoorBillboard.subheadline}
            </p>
            <div className="pt-3 text-[11px] font-mono text-slate-400 border-t border-white/10 max-w-md mx-auto">
              <Eye className="w-3.5 h-3.5 inline mr-1 text-slate-500" />
              Dirección de Arte: {creativeSet.outdoorBillboard.visualArtDirection}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => handleCopy(
                `TITULAR: ${creativeSet.outdoorBillboard.headlineMax7Words}\nBAJADA: ${creativeSet.outdoorBillboard.subheadline}\nDIRECCIÓN DE ARTE: ${creativeSet.outdoorBillboard.visualArtDirection}`,
                'billboard'
              )}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              {copiedFormat === 'billboard' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copiedFormat === 'billboard' ? '¡Titular de Valla Copiado!' : 'Copiar Texto para Valla o Volante'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
