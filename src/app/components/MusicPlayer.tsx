import React, { useState } from 'react';
import { X, Play, Pause, Volume2, Download, Disc, Sparkles, Sliders } from 'lucide-react';

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
  onLicense: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpen, onClose, onLicense }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [stemMutes, setStemMutes] = useState({
    drums: false,
    bass: false,
    synth: false,
    vox: false,
  });

  if (!isOpen) return null;

  const tracks = [
    {
      title: 'You Could Have Been',
      artist: 'Darnley / 9LMNTS Studio',
      bpm: '138 BPM',
      key: 'D Minor',
      duration: '3:24',
      stemsAvailable: 4,
    },
    {
      title: 'Raise Another Banner',
      artist: '9LMNTS Cyber Cypher',
      bpm: '142 BPM',
      key: 'F# Minor',
      duration: '2:58',
      stemsAvailable: 4,
    },
  ];

  const track = tracks[currentTrack];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0a0b10] border border-[#00f0ff]/40 shadow-[0_0_40px_rgba(0,240,255,0.3)] p-6 sm:p-8 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40">
              AUDIO STEM VAULT // 24-BIT LOSSLESS
            </span>
            <span className="text-[10px] font-mono text-emerald-400">48kHz MASTER OUT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
            Original Stems & Sync Deck
          </h2>
        </div>

        {/* Active Player Card */}
        <div className="p-5 rounded-2xl bg-black/80 border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-bold text-white text-lg">{track.title}</h3>
              <p className="text-xs font-mono text-slate-400">{track.artist}</p>
            </div>
            <div className="text-right font-mono text-xs text-[#00f0ff]">
              <div>{track.bpm}</div>
              <div className="text-[10px] text-slate-500">{track.key}</div>
            </div>
          </div>

          {/* Animated Waveform Visualizer */}
          <div className="h-16 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center px-4 gap-1 overflow-hidden">
            {Array.from({ length: 48 }).map((_, i) => {
              const height = isPlaying 
                ? `${Math.max(15, Math.sin(i * 0.4 + Date.now() * 0.002) * 45 + 50)}%`
                : `${(Math.sin(i * 0.5) * 0.5 + 0.5) * 60 + 15}%`;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPlaying ? 'bg-[#00f0ff]' : 'bg-slate-700'
                  }`}
                  style={{ height }}
                />
              );
            })}
          </div>

          {/* Playback Controls */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-5 py-2 rounded-xl bg-[#00f0ff] hover:brightness-110 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
              <span>{isPlaying ? 'Pause' : 'Stream Track'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentTrack((currentTrack + 1) % tracks.length)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs"
              >
                Next Cut →
              </button>
            </div>
          </div>
        </div>

        {/* Multitrack Stem Isolation Faders */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
            <span className="flex items-center gap-1.5">
              <Sliders size={12} className="text-[#00f0ff]" />
              <span>Stem Isolation Deck (Live Mute)</span>
            </span>
            <span className="text-slate-500">4 Separated Tracks</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {(['drums', 'bass', 'synth', 'vox'] as const).map((stem) => {
              const isMuted = stemMutes[stem];
              return (
                <button
                  key={stem}
                  onClick={() => setStemMutes({ ...stemMutes, [stem]: !isMuted })}
                  className={`p-3 rounded-xl border text-center transition ${
                    isMuted
                      ? 'bg-red-500/10 border-red-500/40 text-red-400'
                      : 'bg-white/5 border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff]/10'
                  }`}
                >
                  <div className="font-mono text-xs font-bold uppercase">{stem}</div>
                  <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                    {isMuted ? 'MUTED' : 'SOLO'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Commercial Licensing CTA */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#00f0ff]/10 to-transparent border border-[#00f0ff]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="font-bold text-white text-xs uppercase tracking-wide">
              Commercial Sync License ($250 CAD)
            </div>
            <p className="text-[11px] text-slate-400 font-sans">
              Instant clearance for YouTube, game soundtracks, film trailers, & TV commercials.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              onLicense();
            }}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00f0ff] to-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 whitespace-nowrap shadow-[0_0_15px_rgba(0,240,255,0.4)]"
          >
            Clear License
          </button>
        </div>
      </div>
    </div>
  );
};
