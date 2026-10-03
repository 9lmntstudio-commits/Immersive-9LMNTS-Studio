import React, { useState } from "react";
import {
  Menu,
  X,
  ExternalLink,
  ChevronDown,
  Gamepad2,
  Radio,
  Music,
  Calendar,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import logoImg from "../imports/Main_website_logo_9lmnts_studio.png";

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user?: { name: string; email: string; role: string } | null;
  onLogout?: () => void;
}

export function Navbar({
  currentPage,
  onNavigate,
  user,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demosDropdownOpen, setDemosDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "9LMNTS OS", id: "event-os-demo" },
    { name: "LOA Game", id: "loa", isGame: true },
    { name: "Pricing", id: "pricing" },
    { name: "About", id: "about" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/95 backdrop-blur-md border-b border-[#222222] font-['Orbitron']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 group flex-shrink-0 text-left focus:outline-none"
          >
            <img
              src={logoImg}
              alt="9LMNTS Studio"
              className="h-8 sm:h-10 md:h-12 w-auto object-contain group-hover:opacity-90 transition-opacity"
            />
            <span className="hidden sm:inline-block ml-1 px-2 py-0.5 rounded text-[9px] font-mono uppercase bg-[#121624] text-[#8E9BAE] border border-[#222222]">
              OS Series
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative text-[11px] xl:text-xs uppercase tracking-[0.2em] font-bold transition-all py-1 ${
                  currentPage === link.id
                    ? "text-[#FF5500] drop-shadow-[0_0_8px_rgba(255,85,0,0.7)]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <span className="flex items-center gap-1.5">
                  {link.isGame && <Gamepad2 className="w-3.5 h-3.5 text-[#FF5500] animate-pulse" />}
                  {link.name}
                  {link.isGame && (
                    <span className="px-1.5 py-0.2 text-[8px] font-mono tracking-normal bg-[#FF5500]/20 text-[#FF5500] border border-[#FF5500]/40 rounded-full">
                      CYBER
                    </span>
                  )}
                </span>
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF5500] shadow-[0_0_8px_#FF5500]" />
                )}
              </button>
            ))}

            {/* Live Demos Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemosDropdownOpen(!demosDropdownOpen)}
                onBlur={() => setTimeout(() => setDemosDropdownOpen(false), 200)}
                className="flex items-center gap-1 text-[11px] xl:text-xs uppercase tracking-[0.2em] font-bold text-gray-300 hover:text-white transition-colors"
              >
                <Radio className="w-3 h-3 text-[#00D2FF] animate-pulse" />
                <span>Live Demos</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${demosDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {demosDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-[#0F0F0F] border border-[#222222] shadow-[0_10px_30px_rgba(0,0,0,0.8)] rounded-lg p-2 z-50">
                  <div className="text-[10px] font-mono text-[#8E9BAE] uppercase px-3 py-1.5 border-b border-[#222222]/80">
                    Proprietary OS Platforms
                  </div>
                  
                  <a
                    href="https://clash.9lmntsstudio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded hover:bg-[#121624] text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Music className="w-3.5 h-3.5 text-[#FF5500]" />
                      <div>
                        <div className="font-bold font-['Orbitron'] text-[11px]">Sound Clash OS</div>
                        <div className="text-[9px] text-[#8E9BAE] font-sans">8-DJ Bracket & Live Arena</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-[#8E9BAE] group-hover:text-[#FF5500] transition-colors" />
                  </a>

                  <a
                    href="https://artist.9lmntsstudio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-2.5 rounded hover:bg-[#121624] text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-[#00D2FF]" />
                      <div>
                        <div className="font-bold font-['Orbitron'] text-[11px]">Artist OS</div>
                        <div className="text-[9px] text-[#8E9BAE] font-sans">24/7 Creator Hub & Stems</div>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-[#8E9BAE] group-hover:text-[#00D2FF] transition-colors" />
                  </a>

                  <button
                    onClick={() => onNavigate("event-os-demo")}
                    className="w-full text-left flex items-center justify-between px-3 py-2.5 rounded hover:bg-[#121624] text-xs text-white transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#00FF88]" />
                      <div>
                        <div className="font-bold font-['Orbitron'] text-[11px]">In-App Event OS</div>
                        <div className="text-[9px] text-[#8E9BAE] font-sans">Live Venue Simulation</div>
                      </div>
                    </div>
                    <span className="text-[9px] font-mono text-[#00FF88]">LAUNCH</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Action: Start Project CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onNavigate("start-project")}
              className="px-5 py-2.5 bg-gradient-to-r from-[#FF5500] to-[#E64A19] hover:from-[#FF6A00] hover:to-[#FF5500] text-white text-xs font-bold uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(255,85,0,0.4)] transition-all flex items-center gap-2"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-[#121624] focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#050505] border-b border-[#222222] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs uppercase tracking-widest font-bold flex items-center justify-between ${
                currentPage === link.id
                  ? "bg-[#121624] text-[#FF5500]"
                  : "text-gray-300 hover:bg-[#0F0F0F]"
              }`}
            >
              <span>{link.name}</span>
              {link.isGame && (
                <span className="text-[9px] px-2 py-0.5 rounded bg-[#FF5500]/20 text-[#FF5500] font-mono">
                  NEW
                </span>
              )}
            </button>
          ))}

          <div className="pt-2 border-t border-[#222222]">
            <div className="px-3 py-1 text-[10px] font-mono text-[#8E9BAE] uppercase">
              External Live Arenas
            </div>
            <a
              href="https://clash.9lmntsstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-xs text-white hover:bg-[#121624] rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#FF5500]" />
                <span>Sound Clash OS (clash.9lmntsstudio.com)</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8E9BAE]" />
            </a>

            <a
              href="https://artist.9lmntsstudio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between px-3 py-2 text-xs text-white hover:bg-[#121624] rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#00D2FF]" />
                <span>Artist OS (artist.9lmntsstudio.com)</span>
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8E9BAE]" />
            </a>

            <button
              onClick={() => {
                onNavigate("event-os-demo");
                setMobileMenuOpen(false);
              }}
              className="w-full text-left flex items-center justify-between px-3 py-2 text-xs text-white hover:bg-[#121624] rounded-lg"
            >
              <span className="flex items-center gap-2">
                <Radio className="w-4 h-4 text-[#00FF88]" />
                <span>In-App Event OS Live Demo</span>
              </span>
              <span className="text-[10px] text-[#00FF88] font-mono">RUN</span>
            </button>
          </div>

          <div className="pt-3">
            <button
              onClick={() => {
                onNavigate("start-project");
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-gradient-to-r from-[#FF5500] to-[#E64A19] text-white font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-2"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
