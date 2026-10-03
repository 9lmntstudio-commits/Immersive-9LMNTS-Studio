import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Compass, Maximize2, Radio } from 'lucide-react';
import { HotspotModal, StationData } from './HotspotModal';
import { GateOSModal } from './GateOSModal';
import { MusicPlayer } from './MusicPlayer';

interface StudioWorkstationProps {
  onNavigate: (page: string, plan?: string) => void;
}

export const StudioWorkstation: React.FC<StudioWorkstationProps> = ({ onNavigate }) => {
  const [activeStation, setActiveStation] = useState<StationData | null>(null);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [isMusicOpen, setIsMusicOpen] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cyber Web Audio SFX synthesize
  const playSfx = (freq1 = 440, freq2 = 880, duration = 0.08) => {
    if (!sfxEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq1, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq2, ctx.currentTime + duration);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio not permitted without interaction
    }
  };

  // 9 Canonical Unified Hotspot Stations (01 to 09)
  const stations: Record<string, StationData> = {
    '01': {
      id: '01',
      number: '01',
      title: 'Project LOA // The Awakening of Ptah',
      badges: ['Unreal Engine 5.7', 'Sci-Fi Action RPG & Anime'],
      summary: '3026 Neo-Ottawa cyber-industrial dystopia. Follow Damian Kane (amnesiac incarnation of Ptah) mastering Wing Chun and Capoeira Blink-Strike mechanics against corrupted AI entity LOA.',
      metrics: [
        'Seed Target: $20,000 CAD Vertical Slice',
        'Lead Characters: Damian Kane, LOA Entity, Lucius Kray, KJ Kane',
        'Backer Tiers: 5-Tier Reward Matrix ($25 to $2,500 CAD)',
      ],
      accentColor: 'purple',
      exploreLabel: 'Explore LOA Universe',
      demoLabel: 'Alpha Interactive Hub ↗',
      onExplore: () => onNavigate('loa'),
      onDemo: () => onNavigate('loa'),
    },
    '02': {
      id: '02',
      number: '02',
      title: 'Original Audio Vault & Stem Deck',
      badges: ['Lossless Streaming', 'Stem Licensing'],
      summary: 'High-fidelity audio player with interactive waveform visualizer and multitrack WAV stems. Featuring original Suno productions "You Could Have Been" and "Raise Another Banner".',
      metrics: [
        'Audio Master: 48kHz / 24-Bit Uncompressed WAV',
        'Multitrack Isolation: Drums, Bass, Synth, Vox',
        'Commercial Sync: $250 CAD Instant License',
      ],
      accentColor: 'cyan',
      exploreLabel: 'Sync License Terms',
      demoLabel: 'Launch Stem Player ↗',
      onExplore: () => onNavigate('pricing'),
      onDemo: () => setIsMusicOpen(true),
    },
    '03': {
      id: '03',
      number: '03',
      title: '9LMNTS Studio // Productized Agency Sprints',
      badges: ['7-Day Turnkey MVP', 'Web 2.5 Architecture'],
      summary: 'Rapid production agency builds delivering custom full-stack web applications, scannable WebAR activations, and autonomous Supabase/n8n workflows.',
      metrics: [
        'Starter Sprint: $1,500 CAD Turnkey',
        'Pro Custom Sprint: $2,500 – $3,500 CAD',
        'Enterprise Build: $5,000 CAD',
        'Monthly Retainers: $1,500 – $3,500/mo',
      ],
      accentColor: 'orange',
      exploreLabel: 'View Agency Services',
      demoLabel: 'Project Intake Wizard ↗',
      onExplore: () => onNavigate('services'),
      onDemo: () => onNavigate('start-project'),
    },
    '04': {
      id: '04',
      number: '04',
      title: 'AI Voice Operator // Gemini Live API',
      badges: ['Real-Time Audio', 'Autonomous Intel'],
      summary: 'Interactive conversational AI operator trained on 9LMNTS Studio service offerings, sprint timelines, pricing structures, and live arena deployments.',
      metrics: [
        'Audio Latency: Sub-300ms Native Voice-to-Voice',
        'Model Backbone: Gemini 2.0 Flash / Live Stream',
        'DM Keywords: DEV, CLASH, ARTIST (ManyChat Sync)',
      ],
      accentColor: 'cyan',
      exploreLabel: 'Agency Knowledge Base',
      demoLabel: 'Activate Voice Operator ↗',
      onExplore: () => onNavigate('services'),
      onDemo: () => {
        // Trigger voice assistant
        const voiceBtn = document.querySelector('[data-voice-trigger]') as HTMLButtonElement | null;
        if (voiceBtn) voiceBtn.click();
        else onNavigate('services');
      },
    },
    '05': {
      id: '05',
      number: '05',
      title: 'Event OS // 2-Screen Competition Engine',
      badges: ['Dual Telemetry', 'Multi-Vertical'],
      summary: 'Full-stack tournament infrastructure syncing View 1 (Mobile Spectator Arena) and View 2 (Organizer Command Console / Jumbotron Sync) via WebSockets.',
      metrics: [
        'Sync Engine: Sub-50ms WebSocket Broadcast',
        'Supported: Sound Clash, Sports (3v3), Bars (Battle Rap)',
        'Licensing: $500 Base + 5% Event Revenue Share',
      ],
      accentColor: 'orange',
      exploreLabel: 'Licensing Terms',
      demoLabel: 'Launch 2-Screen Demo ↗',
      onExplore: () => onNavigate('pricing'),
      onDemo: () => onNavigate('event-os-demo'),
    },
    '06': {
      id: '06',
      number: '06',
      title: 'Darnley Sanon // Founder & Creative Director',
      badges: ['UI/UX Architect', 'Operator Command'],
      summary: 'Executive dossier, decade-long design standard combining Hip-Hop culture with AI automation, and live studio telemetry hub. Initialized at true Day-1 zero-state.',
      metrics: [
        'Active Status: Booking Q4 2026 & 2027 Sprints',
        'Pipeline Standard: Day-1 Zero-State ($0.00 CAD Active)',
        'Protected Gate: Operator Admin & Supabase CRM',
      ],
      accentColor: 'emerald',
      exploreLabel: 'About Darnley / Story',
      demoLabel: 'Admin Cockpit HUD ↗',
      onExplore: () => onNavigate('about'),
      onDemo: () => onNavigate('admin'),
    },
    '07': {
      id: '07',
      number: '07',
      title: 'Sound Clash OS // Live Arena Engine',
      badges: ['8-Contender Tree', 'Dynamic Pot Surge'],
      summary: 'Real-time head-to-head live DJ battle engine. Crowd vote telemetry with animated hype meters (#FF5500 vs #00D2FF), live Jumbotron mirroring, and automated 70/30 winner prize pot surges.',
      metrics: [
        'Monetization: 4-Box In-Venue Cashless Grid',
        'Flagship Event: Bronson Centre Halloween Battle (Oct 31)',
        'Live Endpoint: clash.9lmntsstudio.com',
      ],
      accentColor: 'cyan',
      exploreLabel: 'Event Revenue Breakdown',
      demoLabel: 'Clash.9lmntsstudio.com ↗',
      onExplore: () => onNavigate('pricing'),
      onDemo: () => window.open('https://clash.9lmntsstudio.com', '_blank', 'noopener,noreferrer'),
    },
    '08': {
      id: '08',
      number: '08',
      title: 'Live Events, Tours & Residencies',
      badges: ['Bronson Centre', 'Gate OS Cashless'],
      summary: 'Official event showcase featuring the Culture Clash promotional trailer reel, partner arenas (Sectors 01-06, Arenas Alpha-Gamma), and upcoming tour calendar.',
      metrics: [
        'Flagship Date: October 31, 2026 // Bronson Centre',
        'Arena Capacity: 850 Max Venue Synced Spectators',
        'Cashless Engine: PayPal E-Commerce Services',
      ],
      accentColor: 'orange',
      exploreLabel: 'Tour Calendar & Tiers',
      demoLabel: 'Buy Gate OS Pass ↗',
      onExplore: () => onNavigate('pricing'),
      onDemo: () => setIsGateOpen(true),
    },
    '09': {
      id: '09',
      number: '09',
      title: 'Artist OS // 24/7 Creator Digital HQ',
      badges: ['Commission-Free', 'Stem Vault & Royalties'],
      summary: 'Permanent Web 2.5 infrastructure for recording artists and producers. Uncompressed 24-bit WAV stem downloads, direct fan tipping jar (80/20 creator split), EPK press pass generator, and automated catalog yield ledgers.',
      metrics: [
        'Fan Tipping: 0% Platform Take (80/20 Direct)',
        'Royalties: DSP Yield Ledger & Web3 Vault',
        'Deployment: Free Beta, Pro ($500), Elite ($1,500)',
      ],
      accentColor: 'cyan',
      exploreLabel: 'Creator Suite Specs',
      demoLabel: 'Artist.9lmntsstudio.com ↗',
      onExplore: () => onNavigate('pricing'),
      onDemo: () => window.open('https://artist.9lmntsstudio.com', '_blank', 'noopener,noreferrer'),
    },
  };

  // Pin Coordinate Positions (Exact percentage match to media_1791046884322.jpg)
  const pinCoordinates: Record<string, { top: string; left: string; color: string; label: string }> = {
    '01': { top: '35%', left: '15.5%', color: '#b026ff', label: '01: Project LOA' },
    '02': { top: '68%', left: '28.5%', color: '#00f0ff', label: '02: Audio Stem Vault' },
    '03': { top: '41.5%', left: '50%', color: '#ff5500', label: '03: Core Services' },
    '04': { top: '51.5%', left: '71.5%', color: '#00f0ff', label: '04: AI Voice Operator' },
    '05': { top: '30%', left: '88%', color: '#ff5500', label: '05: Event OS Poster' },
    '06': { top: '72%', left: '45%', color: '#10b981', label: '06: The Helm / Darnley' },
    '07': { top: '59%', left: '88%', color: '#00f0ff', label: '07: Sound Clash OS' },
    '08': { top: '68%', left: '71.5%', color: '#ff5500', label: '08: Tour Calendar' },
    '09': { top: '59%', left: '15%', color: '#00f0ff', label: '09: Artist OS DAW' },
  };

  const handleOpenPin = (id: string) => {
    playSfx(520, 1040, 0.08);
    setActiveStation(stations[id]);
  };

  return (
    <section className="relative w-full h-[calc(100vh-4rem)] min-h-[640px] max-h-[960px] bg-black overflow-hidden select-none border-b border-white/10">
      {/* Floating System HUD Telemetry Header Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0b10]/90 backdrop-blur-md border border-[#ff5500]/30 text-[11px] font-mono text-slate-300 pointer-events-auto shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>SYS_ONLINE: 99.98%</span>
          <span className="text-slate-600">|</span>
          <span className="text-[#00f0ff]">NODE 09 // PRODUCTION</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-400 hidden sm:inline">DAY-1 ZERO-STATE</span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          {/* SFX Toggle */}
          <button
            onClick={() => setSfxEnabled(!sfxEnabled)}
            className="px-3 py-1.5 rounded-full bg-[#0a0b10]/90 backdrop-blur-md border border-white/15 hover:border-[#00f0ff] text-slate-300 font-mono text-[11px] flex items-center gap-1.5 transition"
            title="Toggle Synthesizer Sound Effects"
          >
            {sfxEnabled ? <Volume2 size={13} className="text-[#00f0ff]" /> : <VolumeX size={13} className="text-slate-500" />}
            <span className="hidden sm:inline">SFX:</span>
            <span className={sfxEnabled ? 'text-[#00f0ff] font-bold' : 'text-slate-500'}>
              {sfxEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Direct Edge URL Badge */}
          <div className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0a0b10]/90 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-400">
            <span>EDGE: 9LMNTSSTUDIO.COM</span>
          </div>
        </div>
      </div>

      {/* Master 4K Interactive Workstation Canvas */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black cursor-crosshair"
      >
        {/* Master Studio Plate Image (media_1791046884322.jpg) */}
        <picture className="absolute inset-0 w-full h-full">
          <source srcSet="/assets/studio/cyber-cypher-4k.webp" type="image/webp" />
          <img
            src="/assets/studio/cyber-cypher-4k.jpg"
            alt="9LMNTS Studio Cyber Cypher Master Workstation"
            className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700"
            style={{ transform: `scale(${zoomLevel})` }}
          />
        </picture>

        {/* Ambient CRT Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

        {/* ================= 9 CANONICAL HOTSPOT PINS (01 TO 09) ================= */}
        {Object.entries(pinCoordinates).map(([id, pin]) => {
          const station = stations[id];
          if (!station) return null;

          return (
            <button
              key={id}
              onClick={() => handleOpenPin(id)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 z-20 focus:outline-none focus:ring-2 focus:ring-[#ff5500] rounded-full"
              style={{ top: pin.top, left: pin.left }}
              aria-label={`Open Station ${id}: ${station.title}`}
            >
              {/* Radar Ping Animation */}
              <span 
                className="absolute inset-0 rounded-full animate-ping opacity-75 pointer-events-none"
                style={{ backgroundColor: pin.color }}
              />

              {/* Central Radar Node Disc */}
              <div 
                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#07080b]/95 border-2 flex items-center justify-center group-hover:scale-125 transition-transform duration-300 shadow-xl"
                style={{ 
                  borderColor: pin.color,
                  boxShadow: `0 0 20px ${pin.color}80`
                }}
              >
                <span 
                  className="font-mono text-[10px] sm:text-xs font-black"
                  style={{ color: pin.color }}
                >
                  {id}
                </span>
              </div>

              {/* Station Tooltip Hover Badge */}
              <div 
                className="absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md bg-[#07080b]/95 border text-[10px] sm:text-[11px] font-mono whitespace-nowrap shadow-2xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition pointer-events-none z-30"
                style={{ borderColor: `${pin.color}90`, color: pin.color }}
              >
                {pin.label} ↗
              </div>
            </button>
          );
        })}

        {/* Spatial Cypher Bottom Navigation Bar / Instructions */}
        <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-center justify-between gap-3 pointer-events-none z-30">
          <div className="px-4 py-2 rounded-xl bg-[#0a0b10]/90 backdrop-blur-md border border-[#ff5500]/30 flex items-center gap-3 text-xs font-mono text-slate-300 pointer-events-auto shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5500] animate-ping" />
            <span>Click any radar pin (01–09) to open Station Dossier & Demos</span>
          </div>

          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => onNavigate('pricing')}
              className="px-4 py-2 rounded-xl bg-[#0a0b10]/90 backdrop-blur-md border border-white/15 hover:border-[#ff5500] text-xs font-mono text-[#ff5500] hover:brightness-110 transition shadow-lg"
            >
              Explore Agency Sprint Rates →
            </button>
          </div>
        </div>
      </div>

      {/* Two-Step Preview Modal */}
      <HotspotModal
        station={activeStation}
        onClose={() => setActiveStation(null)}
      />

      {/* Cashless Pass Purchasing Modal */}
      <GateOSModal
        isOpen={isGateOpen}
        onClose={() => setIsGateOpen(false)}
      />

      {/* Audio Stem Player Modal */}
      <MusicPlayer
        isOpen={isMusicOpen}
        onClose={() => setIsMusicOpen(false)}
        onLicense={() => onNavigate('pricing')}
      />
    </section>
  );
};
