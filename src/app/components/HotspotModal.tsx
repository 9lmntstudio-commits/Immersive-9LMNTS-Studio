import React from 'react';
import { X, ExternalLink, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export interface StationData {
  id: string;
  number: string;
  title: string;
  badges: string[];
  summary: string;
  metrics: string[];
  accentColor: 'orange' | 'cyan' | 'purple' | 'emerald';
  exploreLabel: string;
  demoLabel: string;
  onExplore: () => void;
  onDemo: () => void;
  externalDemo?: boolean;
}

interface HotspotModalProps {
  station: StationData | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ station, onClose }) => {
  if (!station) return null;

  const colorStyles = {
    orange: {
      border: 'border-[#ff5500]/40',
      shadow: 'shadow-[0_0_40px_rgba(255,85,0,0.35)]',
      badge: 'bg-[#ff5500]/15 text-[#ff5500] border-[#ff5500]/40',
      btnPrimary: 'bg-gradient-to-r from-[#ff5500] to-amber-500 text-black hover:brightness-110 shadow-[0_0_20px_rgba(255,85,0,0.5)]',
      btnSecondary: 'border-[#ff5500]/40 text-[#ff5500] hover:bg-[#ff5500]/10',
      accentText: 'text-[#ff5500]',
    },
    cyan: {
      border: 'border-[#00f0ff]/40',
      shadow: 'shadow-[0_0_40px_rgba(0,240,255,0.35)]',
      badge: 'bg-[#00f0ff]/15 text-[#00f0ff] border-[#00f0ff]/40',
      btnPrimary: 'bg-gradient-to-r from-[#00f0ff] to-cyan-400 text-black hover:brightness-110 shadow-[0_0_20px_rgba(0,240,255,0.5)]',
      btnSecondary: 'border-[#00f0ff]/40 text-[#00f0ff] hover:bg-[#00f0ff]/10',
      accentText: 'text-[#00f0ff]',
    },
    purple: {
      border: 'border-[#b026ff]/40',
      shadow: 'shadow-[0_0_40px_rgba(176,38,255,0.35)]',
      badge: 'bg-[#b026ff]/15 text-[#b026ff] border-[#b026ff]/40',
      btnPrimary: 'bg-gradient-to-r from-[#b026ff] to-fuchsia-500 text-white hover:brightness-110 shadow-[0_0_20px_rgba(176,38,255,0.5)]',
      btnSecondary: 'border-[#b026ff]/40 text-[#b026ff] hover:bg-[#b026ff]/10',
      accentText: 'text-[#b026ff]',
    },
    emerald: {
      border: 'border-[#10b981]/40',
      shadow: 'shadow-[0_0_40px_rgba(16,185,129,0.35)]',
      badge: 'bg-[#10b981]/15 text-[#10b981] border-[#10b981]/40',
      btnPrimary: 'bg-gradient-to-r from-[#10b981] to-emerald-400 text-black hover:brightness-110 shadow-[0_0_20px_rgba(16,185,129,0.5)]',
      btnSecondary: 'border-[#10b981]/40 text-[#10b981] hover:bg-[#10b981]/10',
      accentText: 'text-[#10b981]',
    },
  }[station.accentColor];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-xl rounded-3xl bg-[#0a0b10] border ${colorStyles.border} ${colorStyles.shadow} p-6 sm:p-8 space-y-6 overflow-hidden transform transition-all animate-scale-up`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top ambient glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header Section */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold tracking-widest border ${colorStyles.badge}`}>
              STATION {station.number}
            </span>
            {station.badges.map((badge, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 text-slate-300 border border-white/10 uppercase">
                {badge}
              </span>
            ))}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            {station.title}
          </h2>
        </div>

        {/* Summary Description */}
        <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
          {station.summary}
        </p>

        {/* Technical Specs & Metrics Matrix */}
        <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-white/10 pb-2">
            <Sparkles size={12} className={colorStyles.accentText} />
            <span>Capability & Telemetry Matrix</span>
          </div>
          <ul className="space-y-1.5 text-xs font-mono text-slate-300">
            {station.metrics.map((m, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={colorStyles.accentText}>▸</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Two-Step Action Buttons Pattern (Step 2A and Step 2B) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {/* Step 2A: Explore More */}
          <button
            onClick={() => {
              onClose();
              station.onExplore();
            }}
            className={`w-full py-3.5 px-4 rounded-xl border ${colorStyles.btnSecondary} font-mono text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 active:scale-95`}
          >
            <span>{station.exploreLabel}</span>
            <ArrowRight size={14} />
          </button>

          {/* Step 2B: Launch / Live Demo */}
          <button
            onClick={() => {
              onClose();
              station.onDemo();
            }}
            className={`w-full py-3.5 px-4 rounded-xl ${colorStyles.btnPrimary} font-mono text-xs font-bold uppercase tracking-wider transition flex items-center justify-center gap-2 active:scale-95`}
          >
            <span>{station.demoLabel}</span>
            <ExternalLink size={14} />
          </button>
        </div>

        {/* Footer Guarantee */}
        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-white/5">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={12} className="text-emerald-400" />
            <span>9LMNTS OS Architecture Certified</span>
          </span>
          <span>Node 09 // Day-1 Ready</span>
        </div>
      </div>
    </div>
  );
};
