import React, { useState, useRef } from 'react';
import { Sparkles, ArrowRight, X, Sliders, BarChart3, Radio, Music } from 'lucide-react';

interface ZoneHotspot {
  id: string;
  x: number; // percentage horizontally
  y: number; // percentage vertically
  title: string;
  subtitle: string;
  description: string;
  type: 'artist-os' | 'master-console' | 'sound-clash' | 'admin-dash';
  actionLabel: string;
}

const STUDIO_HOTSPOTS: ZoneHotspot[] = [
  {
    id: 'hs-artist-screen',
    x: 21,
    y: 60,
    title: 'ArtistOS Screen (Left Monitor)',
    subtitle: 'MUSIC PRODUCTION & AUDIO STEM VAULT',
    description: 'Interactive DAW interface showing live audio waveform tracks, stem downloads, unreleased catalog playback, and direct fan tipping.',
    type: 'artist-os',
    actionLabel: 'EXPLORE ARTIST OS'
  },
  {
    id: 'hs-master-desk',
    x: 50,
    y: 72,
    title: 'The Master Console & Darnley',
    subtitle: '9LMNTS STUDIO // THE CYBER CYPHER',
    description: 'Darnley at the production helm. Interactive console faders, tactile buttons, and agency creative sprint deployments ($1,500 - $5,000 CAD).',
    type: 'master-console',
    actionLabel: 'VIEW CREATIVE SPRINTS'
  },
  {
    id: 'hs-admin-wall',
    x: 50,
    y: 40,
    title: 'Artist OS Admin Telemetry (Center Wall)',
    subtitle: 'MANAGEMENT & REVENUE ANALYTICS',
    description: 'Live performance metrics, 30-day fan growth, Day-1 Zero-State client-ready telemetry, and active tour residency booking intake.',
    type: 'admin-dash',
    actionLabel: 'OPEN ADMIN DASHBOARD'
  },
  {
    id: 'hs-clash-screen',
    x: 79,
    y: 60,
    title: 'Sound Clash OS Screen (Right Monitor)',
    subtitle: 'LIVE DJ BATTLE TOURNAMENT ARENA',
    description: 'Universal 8-DJ bracket arena with real-time crowd voting telemetry, SoundCloud set embeds, and surging prize pot counter ($500 base rising to $1,500+).',
    type: 'sound-clash',
    actionLabel: 'LAUNCH SOUND CLASH ARENA'
  }
];

interface StudioMobileHorizonProps {
  onNavigate?: (page: string) => void;
  studioImageSrc?: string;
  adminImageSrc?: string;
}

export const StudioMobileHorizon: React.FC<StudioMobileHorizonProps> = ({ 
  onNavigate,
  studioImageSrc = '/assets/studio/cyber-cypher-front.jpg',
  adminImageSrc = '/assets/dashboards/admin-dashboard.png'
}) => {
  const [activeHotspot, setActiveHotspot] = useState<ZoneHotspot | null>(null);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (showOverlay) setShowOverlay(false);
  };

  const handleHotspotClick = (hs: ZoneHotspot) => {
    if (hs.type === 'admin-dash') {
      setShowAdminModal(true);
    } else {
      setActiveHotspot(hs);
    }
  };

  return (
    <div className="relative w-full h-[85vh] bg-[#050505] overflow-hidden font-sans text-white border-b border-white/10 md:hidden select-none">
      {/* Swipe Guide Indicator Overlay */}
      {showOverlay && (
        <div 
          onClick={() => setShowOverlay(false)}
          className="absolute inset-0 z-30 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-opacity"
        >
          <div className="w-14 h-14 border-2 border-[#FF5500] rounded-full flex items-center justify-center animate-bounce mb-4 shadow-[0_0_25px_rgba(255,85,0,0.5)]">
            <span className="text-[#FF5500] text-2xl font-bold">⇄</span>
          </div>
          <p className="text-[#FF5500] font-mono text-xs tracking-widest uppercase font-bold mb-2">
            STROLL ACROSS THE STUDIO
          </p>
          <p className="text-gray-300 text-xs max-w-xs leading-relaxed">
            Drag left and right across the console to see the floating screens. Tap glowing buttons to interact directly with the studio.
          </p>
          <span className="mt-4 text-[10px] text-gray-500 font-mono">[ TAP ANYWHERE TO ENTER ]</span>
        </div>
      )}

      {/* Panoramic Horizontal Scroll Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-full h-full overflow-x-auto overflow-y-hidden no-scrollbar relative"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {/* Wide Studio Panoramic Wrapper (250% screen width to allow smooth strolling across the front-facing console) */}
        <div className="relative h-full w-[250vw] min-w-[250vw] flex items-center justify-center">
          <img 
            src={studioImageSrc} 
            alt="9LMNTS Studio - The Cyber Cypher Front-Facing Workstation" 
            className="w-full h-full object-cover object-center pointer-events-none"
          />

          {/* Subtle Ambient Scanline Grid */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,85,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,85,0,0.03)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

          {/* Station Badges at Specific Width Offsets */}
          <div className="absolute top-6 left-[8vw] z-10 bg-black/70 border border-white/10 px-3 py-1.5 rounded">
            <span className="text-[10px] font-mono text-[#00D4FF] block">LEFT MONITOR</span>
            <span className="text-xs font-bold text-white uppercase">ArtistOS Audio Tools</span>
          </div>

          <div className="absolute top-6 left-[110vw] z-10 bg-black/70 border border-[#FF5500]/40 px-3 py-1.5 rounded text-center">
            <span className="text-[10px] font-mono text-[#FF5500] block">CENTER STAGE</span>
            <span className="text-xs font-bold text-white uppercase">Darnley // Cyber Cypher</span>
          </div>

          <div className="absolute top-6 left-[200vw] z-10 bg-black/70 border border-white/10 px-3 py-1.5 rounded">
            <span className="text-[10px] font-mono text-[#00FF9D] block">RIGHT MONITOR</span>
            <span className="text-xs font-bold text-white uppercase">Sound Clash OS Arena</span>
          </div>

          {/* Interactive Glowing Hotspots positioned on the exact console & screens */}
          {STUDIO_HOTSPOTS.map((hs) => (
            <button
              key={hs.id}
              onClick={() => handleHotspotClick(hs)}
              style={{ top: `${hs.y}%`, left: `${hs.x}%` }}
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 p-2 group cursor-pointer"
              aria-label={hs.title}
            >
              <span className="relative flex h-9 w-9 items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5500] opacity-80" />
                <span className="relative inline-flex rounded-full h-8 w-8 bg-[#FF5500] border-2 border-white shadow-[0_0_18px_#FF5500] items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </span>
              </span>
              <span className="mt-1 block px-2.5 py-0.5 bg-black/90 border border-[#FF5500]/60 rounded text-[9px] font-mono text-white font-bold whitespace-nowrap shadow-lg">
                PRESS BUTTON
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 85vh Glassmorphic Drawer for Feature Interactions */}
      {activeHotspot && (
        <div className="absolute inset-x-0 bottom-0 z-40 h-[85vh] bg-[#0A0B10]/95 backdrop-blur-xl border-t border-[#FF5500]/40 rounded-t-3xl p-6 transition-transform duration-300 ease-out flex flex-col justify-between shadow-2xl">
          <div>
            <div className="w-12 h-1 bg-gray-600 rounded-full mx-auto mb-4" />
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-mono text-[#FF5500] font-bold tracking-wider">
                {activeHotspot.subtitle}
              </span>
              <button 
                onClick={() => setActiveHotspot(null)}
                className="p-1 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
              {activeHotspot.title}
            </h3>
            <p className="text-gray-300 text-xs leading-relaxed mb-6 font-sans">
              {activeHotspot.description}
            </p>

            {/* In-Drawer Action Card Preview */}
            <div className="p-4 bg-white/5 border border-white/10 rounded-xl mb-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider block mb-2">
                Connected Module Architecture:
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-black/50 border border-white/10 rounded">
                  <span className="text-[#00D4FF] font-mono block text-[10px]">MONITOR 01</span>
                  <span className="font-bold text-white">Artist OS Audio Stems</span>
                </div>
                <div className="p-2.5 bg-black/50 border border-white/10 rounded">
                  <span className="text-[#FF5500] font-mono block text-[10px]">CENTER DESK</span>
                  <span className="font-bold text-white">Creative Sprints</span>
                </div>
                <div className="p-2.5 bg-black/50 border border-white/10 rounded">
                  <span className="text-[#00FF9D] font-mono block text-[10px]">MONITOR 02</span>
                  <span className="font-bold text-white">Sound Clash Arena</span>
                </div>
                <div className="p-2.5 bg-black/50 border border-[#FF5500]/40 rounded">
                  <span className="text-[#FF5500] font-mono block text-[10px]">CHECKOUT</span>
                  <span className="font-bold text-white">PayPal Pay Later</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button
              onClick={() => {
                setActiveHotspot(null);
                if (onNavigate) {
                  onNavigate(activeHotspot.type === 'sound-clash' ? 'event-os-demo' : 'services');
                }
              }}
              className="w-full py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-widest rounded transition-all shadow-lg shadow-[#FF5500]/30 flex items-center justify-center gap-2"
            >
              <span>{activeHotspot.actionLabel}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Dedicated Admin Dashboard Modal (Opens Canonical Image 2) */}
      {showAdminModal && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="text-[10px] font-mono text-[#00D4FF] block">CANONICAL IMAGE 02</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                Artist OS // Admin Dashboard
              </h4>
            </div>
            <button 
              onClick={() => setShowAdminModal(false)}
              className="p-1.5 bg-white/10 rounded-full text-gray-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-zinc-950">
            <img 
              src={adminImageSrc} 
              alt="Artist OS Admin Dashboard" 
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="mt-3 flex justify-between items-center text-[11px] font-mono text-gray-400">
            <span>REVENUE • TOURS • CRM • SPONSORSHIPS</span>
            <button 
              onClick={() => setShowAdminModal(false)}
              className="px-3 py-1 bg-[#FF5500] text-white rounded font-bold uppercase text-[10px]"
            >
              Close View
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
