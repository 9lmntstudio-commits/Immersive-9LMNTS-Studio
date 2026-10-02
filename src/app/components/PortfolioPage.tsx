import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Zap,
  Gamepad2,
  Radio,
  Scan,
  Trophy,
  Flame,
  Music,
  Users,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
  Layers,
  Box,
  Eye,
  CheckCircle2
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEO } from "./SEO";

// Image Imports with fallbacks
import sc1 from "../imports/sound-clash-1.png";
import sc2 from "../imports/sound-clash-2.png";
import sc3 from "../imports/sound-clash-3.png";
import clashBoardImg from "../imports/Clash_OS_image_2.png";
import gateImg from "../imports/Gate_OS_image-1.png";
import presentingImg from "../imports/PRESENTING.png";
import presenting2Img from "../imports/PRESENTING-2.png";
import wed1 from "../imports/wedding-1.png";
import wed2 from "../imports/wedding-2.png";
import corp1 from "../imports/corporate-1.png";
import corp2 from "../imports/corporate-2.png";
import corp3 from "../imports/corporate-3.png";

interface PortfolioPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  id: string;
  category: string;
  filterCategory: 'os-series' | 'loa-gaming' | 'ar-services';
  title: string;
  tagline: string;
  description: string;
  accentColor: string;
  badge: string;
  stats: ProjectStat[];
  features: string[];
  images: string[];
  primaryAction: {
    label: string;
    url?: string;
    targetRoute?: string;
    isExternal?: boolean;
  };
  secondaryAction?: {
    label: string;
    url?: string;
    targetRoute?: string;
    isExternal?: boolean;
  };
}

export function PortfolioPage({ onNavigate }: PortfolioPageProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'os-series' | 'loa-gaming' | 'ar-services'>('all');

  const projects: Project[] = [
    {
      id: "sound-clash",
      category: "9LMNTS OS SERIES • NIGHTLIFE & ARENAS",
      filterCategory: "os-series",
      title: "Sound Clash OS",
      tagline: "The Flagship 8-Contender Sound System & DJ Battle Arena",
      description:
        "Turns the crowd into the ultimate judge. A high-energy real-time tournament engine featuring live waveform hype meters, split duel contender stages, jumbotron sync, and the Universal 4-Box Monetization Grid with automated 70/30 winner prize pot surges.",
      accentColor: "#FF5500",
      badge: "FLAGSHIP LIVE ARENA",
      stats: [
        { label: "Live Crowd", value: "1,247+" },
        { label: "Pot Surge", value: "70/30 Split" },
        { label: "Contenders", value: "8-DJ Tree" },
        { label: "Payments", value: "PayPal E-Com" },
      ],
      features: [
        "Universal 8-Contender Single-Elimination Bracket Tree",
        "Dual-color animated vote hype gauges (#FF5500 vs #00D2FF)",
        "Universal 4-Box monetization: Cover ($20), Micro-tip ($10), Power Hype ($50), VIP Lounge ($150)",
        "Real-time Jumbotron broadcast line & round timer sync",
      ],
      images: [sc1, clashBoardImg, sc3, sc2],
      primaryAction: {
        label: "Launch Clash Arena",
        url: "https://clash.9lmntsstudio.com",
        isExternal: true,
      },
      secondaryAction: {
        label: "Test Event OS Demo",
        targetRoute: "event-os-demo",
      },
    },
    {
      id: "artist-os",
      category: "9LMNTS OS SERIES • CREATOR DIGITAL HQ",
      filterCategory: "os-series",
      title: "Artist OS & Creator Suite",
      tagline: "24/7 Always-On Creative Hub & Royalties Ledger",
      description:
        "Permanent Web 2.5 infrastructure for musical artists, producers, and creators. Moving talent from one-night event earners to continuous digital revenue with commission-free uncompressed stem vaults, tokenized catalog royalty ledgers, and direct fan tipping.",
      accentColor: "#00D2FF",
      badge: "24/7 CREATOR HQ",
      stats: [
        { label: "Tipping Split", value: "80% Creator" },
        { label: "Stem Vault", value: "0% Commission" },
        { label: "Deployment", value: "Zero Friction" },
        { label: "Support", value: "Autonomous AI" },
      ],
      features: [
        "Uncompressed WAV master stem vault & exclusive access paywalls",
        "Community shareholder catalog royalty breakdowns & yield calculator",
        "Direct fan tipping tiers ($1, $5, $10, $25) via PayPal Smart Buttons",
        "Tour calendar with native instant ticket RSVP & VIP checkout",
      ],
      images: [sc2, sc1, clashBoardImg],
      primaryAction: {
        label: "Launch Artist OS",
        url: "https://artist.9lmntsstudio.com",
        isExternal: true,
      },
      secondaryAction: {
        label: "View Creator Pricing",
        targetRoute: "pricing",
      },
    },
    {
      id: "loa-gaming",
      category: "PROJECT LOA GAMING • ESPORTS & UNIVERSE",
      filterCategory: "loa-gaming",
      title: "Project LOA: Legends of the Arena",
      tagline: "Cyber-Industrial Battle Rap & Martial Arts Fighting Game",
      description:
        "An expansive multimedia fighting game where Hip-Hop culture meets brutal martial arts in a dark-luxe dystopian universe. Featuring real-time rhythm cypher mechanics, dynamic Flow State meters, destructible underground venues, and national tournament esports circuits.",
      accentColor: "#FF5500",
      badge: "NEXT-GEN FIGHTING GAME",
      stats: [
        { label: "Engine", value: "Unreal Engine 5" },
        { label: "Combat", value: "Rhythm Cypher" },
        { label: "Pledge Tiers", value: "$25 – $1,500" },
        { label: "Circuit", value: "Esports Arena" },
      ],
      features: [
        "Lyrical Rhyme Strike & Flow State cypher combat mechanics",
        "Photorealistic dark-luxe stages: Bronson Underground, Velvet Vault, Tokyo Rooftops",
        "5-Tier backer reward system with exclusive skins and physical swag boxes",
        "Integrated tournament circuit syncing with Sound Clash OS brackets",
      ],
      images: [presentingImg, presenting2Img, clashBoardImg],
      primaryAction: {
        label: "Explore Project LOA Hub",
        targetRoute: "loa",
      },
      secondaryAction: {
        label: "Back the Project",
        targetRoute: "loa",
      },
    },
    {
      id: "webar-services",
      category: "WEBAR SERVICES • CREATIVE TECH & MERCH",
      filterCategory: "ar-services",
      title: "WebAR Target Tracking & Apparel",
      tagline: "Zero-Download Browser Augmented Reality & Smart Apparel",
      description:
        "High-contrast scannable QR targets with flame orange corner targets and 9LMNTS border bounding boxes. Scan festival apparel, VIP patches, and concert posters to instantly manifest 3D holographic stages, live voting portals, and interactive performers without installing any apps.",
      accentColor: "#00FF88",
      badge: "BROWSER WEBAR / WEBXR",
      stats: [
        { label: "App Download", value: "0 MB (Instant)" },
        { label: "Target Print", value: "300 DPI High-Res" },
        { label: "Compatibility", value: "iOS & Android" },
        { label: "Latency", value: "< 50ms Tracking" },
      ],
      features: [
        "Apparel target bounding boxes for streetwear, hoodies, and jackets",
        "Instant browser launch via WebXR & 8th Wall target detection",
        "Holographic 3D winner trophies & live vote leaderboards floating in mid-air",
        "NFC + WebAR hybrid event wristbands for instant VIP verification",
      ],
      images: [presenting2Img, presentingImg, gateImg],
      primaryAction: {
        label: "Book AR Sprint",
        targetRoute: "start-project",
      },
      secondaryAction: {
        label: "Explore All Services",
        targetRoute: "services",
      },
    },
    {
      id: "gate-os",
      category: "9LMNTS OS SERIES • ACCESS & TICKETING",
      filterCategory: "os-series",
      title: "Gate OS & Venue Control",
      tagline: "High-Throughput Mobile QR Ticketing & Table Management",
      description:
        "Industrial event ticketing and attendee management built for high-throughput club venues. Features real-time scanner verification across 147+ live events, VIP table bottle ordering, cashless door tickets, and gross revenue reconciliation.",
      accentColor: "#FFB300",
      badge: "TURNKEY VENUE GATE",
      stats: [
        { label: "Concurrent", value: "147+ Events" },
        { label: "Validation", value: "< 0.3s Scan" },
        { label: "Tables", value: "12 VIP Units" },
        { label: "Checkout", value: "PayPal Pay in 4" },
      ],
      features: [
        "Offline-capable QR ticket scanning with rapid duplicate detection",
        "VIP table bottle ordering & server call-bell telemetry",
        "Door ticketing with instant PayPal Pay Later / Pay in 4 support",
        "Real-time operator reconciliation and automated promoter splits",
      ],
      images: [gateImg, sc1, wed1],
      primaryAction: {
        label: "Launch Event OS Demo",
        targetRoute: "event-os-demo",
      },
      secondaryAction: {
        label: "Schedule Deployment",
        targetRoute: "start-project",
      },
    },
    {
      id: "corporate-clash",
      category: "9LMNTS OS SERIES • ENTERPRISE & PITCH",
      filterCategory: "os-series",
      title: "Corporate Clash & Pitch Battle OS",
      tagline: "Gamified Boardroom Battles & Startup Pitch Arenas",
      description:
        "Transforms corporate pitch events, angel investor town halls, and internal hackathons into high-engagement interactive arenas. Judges dial simulated capital, audience members upvote Q&As, and founders track term sheet allocations in real time.",
      accentColor: "#00D2FF",
      badge: "PITCH BATTLE ARENA",
      stats: [
        { label: "Sim Capital", value: "$500K+ Pool" },
        { label: "Audience Q&A", value: "Live Upvotes" },
        { label: "Format", value: "8-Founder Tree" },
        { label: "Analytics", value: "Post-Deck Export" },
      ],
      features: [
        "Interactive angel investor term sheet simulation dials",
        "Audience live Q&A upvoting queue with priority moderation",
        "Real-time leaderboard tracking founder valuation surges",
        "Sponsor branding takeovers and synchronized stage projection",
      ],
      images: [corp1, corp2, corp3],
      primaryAction: {
        label: "Deploy Pitch Arena",
        targetRoute: "start-project",
      },
      secondaryAction: {
        label: "View Pricing Tiers",
        targetRoute: "pricing",
      },
    },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.filterCategory === activeFilter);

  return (
    <div className="min-h-screen bg-[#050505] pt-20 pb-28 font-['Orbitron'] text-white">
      <SEO 
        title="Portfolio & OS Showcase | 9LMNTS Studio" 
        description="Explore 9LMNTS Studio proprietary operating systems, Project LOA battle rap gaming, and WebAR immersive experiences." 
      />

      {/* Hero Header */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 border-b border-[#222222] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(255, 85, 0, 0.25) 0%, transparent 60%), linear-gradient(rgba(255, 85, 0, 0.03) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 30px 30px'
          }}
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#121624] border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>9LMNTS Studio Master Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
            <span>SHOWCASE OF </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF6A00] to-[#00D2FF]">
              HIGH-TELEMETRY
            </span>
            <br />
            <span>DIGITAL WORLDS</span>
          </h1>

          <p className="text-base sm:text-xl text-[#8E9BAE] max-w-3xl mx-auto font-sans leading-relaxed mb-10">
            From the 8-contender live <strong className="text-white">9LMNTS OS Series</strong> to the cinematic <strong className="text-[#FF5500]">Project LOA Gaming</strong> universe and scannable <strong className="text-[#00FF88]">WebAR apparel</strong> — explore our production ecosystems.
          </p>

          {/* Category Filter Navigation */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 bg-[#0F0F0F] border border-[#222222] rounded-xl">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                activeFilter === 'all'
                  ? "bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.5)]"
                  : "text-[#8E9BAE] hover:text-white"
              }`}
            >
              All Builds ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter('os-series')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFilter === 'os-series'
                  ? "bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.5)]"
                  : "text-[#8E9BAE] hover:text-white"
              }`}
            >
              <Radio className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>9LMNTS OS Series</span>
            </button>
            <button
              onClick={() => setActiveFilter('loa-gaming')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFilter === 'loa-gaming'
                  ? "bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.5)]"
                  : "text-[#8E9BAE] hover:text-white"
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#FF5500]" />
              <span>Project LOA Gaming</span>
            </button>
            <button
              onClick={() => setActiveFilter('ar-services')}
              className={`px-4 sm:px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                activeFilter === 'ar-services'
                  ? "bg-[#FF5500] text-white shadow-[0_0_15px_rgba(255,85,0,0.5)]"
                  : "text-[#8E9BAE] hover:text-white"
              }`}
            >
              <Scan className="w-3.5 h-3.5 text-[#00FF88]" />
              <span>WebAR Services</span>
            </button>
          </div>
        </div>
      </section>

      {/* Projects Showcase Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        {filteredProjects.map((project, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <div
              key={project.id}
              className={`p-6 sm:p-10 rounded-2xl bg-[#0F0F0F] border border-[#222222] hover:border-[#FF5500]/50 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.6)] group relative overflow-hidden`}
            >
              {/* Glow Accent Overlay */}
              <div 
                className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none rounded-full blur-3xl"
                style={{ backgroundColor: project.accentColor }}
              />

              <div className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>
                
                {/* Visual Media Gallery Column */}
                <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : ''} space-y-4`}>
                  {/* Primary Feature Image */}
                  <div className="relative rounded-xl overflow-hidden border border-[#222222] bg-[#050505] shadow-2xl aspect-video group-hover:border-[#FF5500]/40 transition-all">
                    <ImageWithFallback
                      src={project.images[0]}
                      alt={project.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-white border border-[#222222] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
                      <span>{project.badge}</span>
                    </div>
                  </div>

                  {/* Thumbnail Previews */}
                  {project.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-3">
                      {project.images.slice(1, 4).map((img, thumbIdx) => (
                        <div 
                          key={thumbIdx} 
                          className="h-20 rounded-lg overflow-hidden border border-[#222222] bg-[#050505] opacity-80 hover:opacity-100 transition-opacity"
                        >
                          <ImageWithFallback
                            src={img}
                            alt={`${project.title} screenshot ${thumbIdx + 2}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Information Column */}
                <div className={`lg:col-span-6 ${!isEven ? 'lg:order-1' : ''} space-y-6`}>
                  <div>
                    <span 
                      className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full border inline-block mb-3"
                      style={{ 
                        color: project.accentColor, 
                        borderColor: `${project.accentColor}40`,
                        backgroundColor: `${project.accentColor}15`
                      }}
                    >
                      {project.category}
                    </span>
                    
                    <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-2">
                      {project.title}
                    </h2>
                    
                    <p className="text-sm font-['Syne'] font-bold text-[#FF5500]">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-[#8E9BAE] font-sans text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Feature Checkpoints */}
                  <div className="space-y-2 border-t border-[#222222] pt-4">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Project Telemetry Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-[#050505] border border-[#222222]">
                    {project.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="text-center p-2">
                        <div className="text-[10px] font-mono text-[#8E9BAE] uppercase mb-0.5">
                          {stat.label}
                        </div>
                        <div className="text-xs sm:text-sm font-bold font-mono text-white">
                          {stat.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    {project.primaryAction.isExternal ? (
                      <a
                        href={project.primaryAction.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(255,85,0,0.4)] transition-all flex items-center gap-2"
                      >
                        <span>{project.primaryAction.label}</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <button
                        onClick={() => project.primaryAction.targetRoute && onNavigate(project.primaryAction.targetRoute)}
                        className="px-6 py-3 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(255,85,0,0.4)] transition-all flex items-center gap-2"
                      >
                        <span>{project.primaryAction.label}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}

                    {project.secondaryAction && (
                      <button
                        onClick={() => project.secondaryAction?.targetRoute && onNavigate(project.secondaryAction.targetRoute)}
                        className="px-6 py-3 bg-[#121624] hover:bg-[#1A1D28] text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-[#222222] transition-colors"
                      >
                        <span>{project.secondaryAction.label}</span>
                      </button>
                    )}
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Conversion Banner: Custom Build or License */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#121624] to-[#0A0B10] border border-[#FF5500]/40 text-center relative overflow-hidden shadow-[0_0_40px_rgba(255,85,0,0.2)]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 animate-bounce" />
            <span>Ready To Build Your Arena or Creator Platform?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white mb-4">
            LET'S LAUNCH YOUR PROPRIETARY OS
          </h2>
          
          <p className="text-base text-[#8E9BAE] max-w-2xl mx-auto font-sans leading-relaxed mb-8">
            Deploy an 8-contender live tournament arena, license a 24/7 creator suite, or build high-impact WebAR streetwear patches for your brand. Direct settlement via <strong className="text-white">PayPal E-Commerce Services</strong> with native Pay in 4 installment payment plans.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={() => onNavigate("start-project")}
              className="px-8 py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.5)] transition-all flex items-center gap-2"
            >
              <span>Start Project Intake</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate("pricing")}
              className="px-8 py-4 bg-[#0F0F0F] hover:bg-[#1A1D28] text-white font-bold text-xs uppercase tracking-widest rounded-xl border border-[#222222] transition-colors"
            >
              <span>View Sprints & Retainers</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
