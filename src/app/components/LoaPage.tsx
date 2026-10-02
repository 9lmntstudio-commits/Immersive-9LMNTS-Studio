import React, { useState } from "react";
import {
  Flame,
  Zap,
  Play,
  CheckCircle2,
  Shield,
  Award,
  Users,
  Clock,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Film,
  Crosshair,
  Box,
  Layers,
  Heart,
  Cpu,
  Eye,
  Radio,
  Share2,
  Bookmark,
  Check,
  Maximize2
} from "lucide-react";

interface LoaPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

interface RewardTier {
  id: string;
  name: string;
  price: number;
  badge?: string;
  backersCount: number;
  deliveryDate: string;
  description: string;
  items: string[];
  paypalUrl: string;
}

const REWARD_TIERS: RewardTier[] = [
  {
    id: "tier-1",
    name: "Digital Citizen",
    price: 25,
    backersCount: 48,
    deliveryDate: "Q2 2027",
    description:
      "Join the resistance in Neo-Ottawa. Get your early-bird copy of the game and official digital backer credentials.",
    items: [
      "Digital Copy of LOA (Steam / Epic Games Key on release)",
      "Exclusive Backer Role in 9LMNTS Studio Discord",
      "Digital Neo-Ottawa Concept Artbook (PDF) & 4K Wallpaper Pack",
      "Your name listed in the official game backer roll"
    ],
    paypalUrl: "https://PayPal E-Commerce Services/25"
  },
  {
    id: "tier-2",
    name: "Djed Operative (Alpha Access)",
    price: 75,
    badge: "Most Popular",
    backersCount: 39,
    deliveryDate: "Q4 2026",
    description:
      "Step directly into the combat arena early. Play test Unreal Engine 5.7 vertical slice builds and shape gameplay balance.",
    items: [
      "Everything in Digital Citizen ($25 Tier)",
      "Exclusive Closed Alpha & Beta Access to the Unreal Engine 5.7 Combat Arena",
      "Official Digital Soundtrack (OST) by 9LMNTS Studio Sound Designers",
      "Special 'Djed Operative' in-game title & profile badge",
      "Name in the official cinematic anime series ending credits"
    ],
    paypalUrl: "https://PayPal E-Commerce Services/75"
  },
  {
    id: "tier-3",
    name: "Phygital Streetwear Drop",
    price: 150,
    badge: "Limited Edition",
    backersCount: 24,
    deliveryDate: "Q1 2027",
    description:
      "Bridge the physical and digital world with official 9LMNTS Studio x LOA cyber-streetwear featuring interactive WebAR.",
    items: [
      "Everything in Djed Operative ($75 Tier)",
      "Limited-Edition Physical 9LMNTS x LOA Cyber-Streetwear Hoodie (Custom Embroidered)",
      "Scannable WebAR 3D Target Patch (Projects glowing energy wings via phone camera)",
      "Exclusive In-Game 'Neo-Ottawa Streetwear' Skin for Damian Kane",
      "Physical Holographic Backer Certificate signed by Creative Director Darnley Sanon"
    ],
    paypalUrl: "https://PayPal E-Commerce Services/150"
  },
  {
    id: "tier-4",
    name: "Architect's Sceptre Collector",
    price: 500,
    badge: "Collector Edition",
    backersCount: 12,
    deliveryDate: "Q2 2027",
    description:
      "Own a tangible piece of ancient technology repurposed for 3026. Includes physical prop replica and world-building graffiti.",
    items: [
      "Everything in Phygital Streetwear ($150 Tier)",
      "1:1 Scale Physical Djed Pillar Power Core Replica with breathing Orange/Cyan LED lighting",
      "Your custom tag or backer signature permanently painted as graffiti inside Neo-Ottawa Vault 9",
      "Access to monthly private developer streams & direct feedback sessions with Darnley",
      "Hardcover Full-Color 'Art of LOA & 9LMNTS Studio' Lore Bible"
    ],
    paypalUrl: "https://PayPal E-Commerce Services/500"
  },
  {
    id: "tier-5",
    name: "Executive Producer & NPC Immortality",
    price: 2500,
    badge: "Ultra Rare (3 of 5 Remaining)",
    backersCount: 2,
    deliveryDate: "Q3 2026 - Q2 2027",
    description:
      "Become immortalized in the world of LOA. Get 3D scanned as a Metahuman NPC and receive top-billing executive credits.",
    items: [
      "Everything in Architect's Sceptre ($500 Tier)",
      "Your face and voice 3D scanned as a custom Unreal Engine 5 Metahuman NPC / vendor in Neo-Ottawa",
      "Official 'Associate Executive Producer' credit on the Video Game and Animation Series",
      "Lifetime VIP All-Access Pass to all 9LMNTS Studio live tournaments, premieres, and arena events",
      "Direct 1-on-1 brainstorming dinner / virtual summit with Creative Director Darnley Sanon"
    ],
    paypalUrl: "https://PayPal E-Commerce Services/2500"
  }
];

interface VideoTrack {
  id: string;
  title: string;
  duration: string;
  tag: string;
  description: string;
  videoUrl?: string;
  thumbnail: string;
}

const CAMPAIGN_VIDEOS: VideoTrack[] = [
  {
    id: "full-trailer",
    title: "LOA: Official Cinematic Reveal Trailer",
    duration: "2:45",
    tag: "Cinematic Trailer",
    description: "The official cinematic teaser introducing 3026 Neo-Ottawa, Damian Kane, and the awakening of the Staff of Ptah.",
    thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "loa-reveal",
    title: "The Deception: LOA Reveals Her True Nature",
    duration: "1:20",
    tag: "Narrative Scene",
    description: "The chilling sequence where the AI assistant's code begins pulsing with ancient parasitic code veins.",
    thumbnail: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "blink-strike-combat",
    title: "Blink-Strike Arts & Wing Chun MoCap Showcase",
    duration: "1:55",
    tag: "Combat Gameplay",
    description: "Breakdown of Damian's combat mechanics: Wing Chun centerline trapping, Capoeira sweeps, and spatial jump teleports.",
    thumbnail: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop"
  },
  {
    id: "vault9-escape",
    title: "Vault 9: The World-Splitter Tech Demo",
    duration: "3:10",
    tag: "Unreal Engine 5.7",
    description: "Watch Damian slam the Staff of Ptah into the floor to trigger floor liquefaction and unzip the subterranean vault walls.",
    thumbnail: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop"
  }
];

export function LoaPage({ onNavigate }: LoaPageProps) {
  const [activeTab, setActiveTab] = useState<"campaign" | "story" | "combat" | "rewards" | "budget">("campaign");
  const [activeVideo, setActiveVideo] = useState<VideoTrack>(CAMPAIGN_VIDEOS[0]);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<RewardTier | null>(null);
  const [isBackingModalOpen, setIsBackingModalOpen] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState<number>(75);
  const [customPledge, setCustomPledge] = useState<string>("");

  // Crowdfunding Telemetry Metrics
  const fundingGoal = 20000;
  const currentPledged = 7420;
  const backersTotal = 128;
  const daysLeft = 24;
  const percentFunded = Math.round((currentPledged / fundingGoal) * 100);

  const handleOpenPledge = (tier?: RewardTier) => {
    if (tier) {
      setSelectedTier(tier);
      setPledgeAmount(tier.price);
    } else {
      setSelectedTier(null);
      setPledgeAmount(75);
    }
    setIsBackingModalOpen(true);
  };

  const getEffectivePledge = () => {
    if (customPledge && !isNaN(Number(customPledge)) && Number(customPledge) > 0) {
      return Number(customPledge);
    }
    return pledgeAmount;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#FF5500] selection:text-white font-['Inter'] relative overflow-x-hidden">
      {/* Background Parallax Texture with Cyber Grid */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 bg-cover bg-center mix-blend-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 20%, rgba(255, 85, 0, 0.15) 0%, transparent 60%),
                            linear-gradient(rgba(255, 85, 0, 0.04) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 85, 0, 0.04) 1px, transparent 1px)`,
          backgroundSize: "100% 100%, 36px 36px, 36px 36px"
        }}
      />

      {/* Atmospheric Glow Orbs */}
      <div className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#FF5500]/15 to-[#00D2FF]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Top Banner Navigation Lockup */}
      <div className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-xl border-b border-[#222222]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2 group transition-transform hover:-translate-x-1"
            >
              <div className="flex items-baseline font-black tracking-wider text-xl font-['Orbitron']">
                <span className="text-[#FF5500] drop-shadow-[0_0_12px_rgba(255,85,0,0.6)]">9L</span>
                <span className="text-white">MNTS</span>
              </div>
            </button>
            <div className="h-4 w-[1px] bg-[#333333]" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#FF5500]/10 text-[#FF5500] border border-[#FF5500]/30 tracking-wider">
                PROJECT LOA
              </span>
              <span className="hidden sm:inline text-xs text-gray-400 font-mono">
                CROWDFUNDING ALPHA
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "Project LOA - 9LMNTS Studio",
                    text: "Help fund Project LOA: The Awakening of Ptah - Mythic Sci-Fi Action RPG in Unreal Engine 5.7",
                    url: window.location.href
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("Project LOA campaign link copied to clipboard!");
                }
              }}
              className="p-2 text-gray-400 hover:text-white rounded-lg border border-[#222222] hover:border-gray-600 transition-colors"
              title="Share Campaign"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleOpenPledge()}
              className="px-4 py-2 bg-gradient-to-r from-[#FF5500] to-[#E64A19] text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(255,85,0,0.4)] hover:shadow-[0_0_22px_rgba(255,85,0,0.7)] transition-all transform hover:-translate-y-0.5"
            >
              Back This Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
        
        {/* Campaign Header & Title */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5500]/10 border border-[#FF5500]/30 text-[#FF5500] text-xs font-mono mb-4 tracking-wider">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF5500]" />
            UNREAL ENGINE 5.7 • SCI-FI ACTION RPG & ANIME SERIES
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-['Orbitron'] tracking-tight leading-tight uppercase">
            PROJECT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF8A00] to-[#FFFFFF]">LOA</span>
          </h1>
          <p className="text-lg sm:text-2xl font-['Orbitron'] text-[#00D2FF] mt-2 font-medium tracking-wide">
            THE AWAKENING OF PTAH
          </p>
          <p className="text-gray-300 text-sm sm:text-base mt-4 max-w-3xl mx-auto leading-relaxed">
            "The Creator has forgotten he built the world. Now, his own tools are trying to lock him out."
            An explosive fusion of Egyptian Myth, Wing Chun martial arts, and cyber-industrial dark energy in 3026 Neo-Ottawa.
          </p>
        </div>

        {/* Hero Section: Main Video Trailer + Telemetry Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Main Video Viewport (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0B0F17]/90 rounded-2xl border border-[#222222] overflow-hidden shadow-2xl relative group">
            <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
              <img 
                src={activeVideo.thumbnail} 
                alt={activeVideo.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 pointer-events-none" />
              
              {/* Play Button Overlay */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="absolute z-20 w-20 h-20 rounded-full bg-[#FF5500] text-white flex items-center justify-center shadow-[0_0_35px_rgba(255,85,0,0.8)] hover:scale-110 hover:bg-[#FF6A00] transition-all"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>

              {/* Video Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-[#FF5500]/40 text-[#FF5500] text-xs font-mono font-bold uppercase tracking-wider">
                  {activeVideo.tag}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/70 text-gray-300 text-xs font-mono">
                  {activeVideo.duration}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20">
                <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-1 mt-0.5">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            {/* Video Selector Tabs */}
            <div className="p-4 bg-[#0A0D14] border-t border-[#1E2538] grid grid-cols-2 sm:grid-cols-4 gap-2">
              {CAMPAIGN_VIDEOS.map((vid) => {
                const isCurrent = vid.id === activeVideo.id;
                return (
                  <button
                    key={vid.id}
                    onClick={() => setActiveVideo(vid)}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all border ${
                      isCurrent
                        ? "bg-[#FF5500]/15 border-[#FF5500] text-white shadow-[0_0_12px_rgba(255,85,0,0.25)]"
                        : "bg-[#0B0F17] border-[#222222] text-gray-400 hover:text-white hover:border-gray-600"
                    }`}
                  >
                    <div className="font-mono text-[10px] text-[#FF5500] mb-0.5 font-bold">
                      {vid.duration}
                    </div>
                    <div className="font-semibold line-clamp-1 font-['Orbitron']">
                      {vid.title.split(":")[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Crowdfunding Telemetry Card (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0B0F17]/90 rounded-2xl border border-[#222222] p-6 sm:p-8 backdrop-blur-md shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#222222]">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-ping" />
                  <span className="text-xs font-mono font-bold tracking-widest text-[#00FF88] uppercase">
                    CAMPAIGN LIVE ON 9LMNTS
                  </span>
                </div>
                <span className="text-xs text-gray-400 font-mono">
                  ALL OR NOTHING
                </span>
              </div>

              {/* Big Progress Numbers */}
              <div className="mt-6">
                <div className="text-4xl sm:text-5xl font-black font-['JetBrains_Mono'] text-white">
                  ${currentPledged.toLocaleString()}
                  <span className="text-lg sm:text-xl font-normal text-gray-400 ml-2">
                    CAD
                  </span>
                </div>
                <div className="text-xs text-gray-400 font-mono mt-1">
                  pledged of <span className="text-[#FF5500] font-bold">${fundingGoal.toLocaleString()}</span> goal
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-5">
                <div className="w-full bg-[#1A1E29] h-3.5 rounded-full overflow-hidden p-0.5 border border-[#2A324B]">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-[#FF5500] via-[#FF8A00] to-[#00D2FF] shadow-[0_0_15px_rgba(255,85,0,0.8)] transition-all duration-1000"
                    style={{ width: `${percentFunded}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-gray-400 mt-2">
                  <span className="text-[#FF5500] font-bold">{percentFunded}% FUNDED</span>
                  <span>TARGET: $20,000</span>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#222222]">
                <div className="bg-[#080B10] p-4 rounded-xl border border-[#1A1F2C]">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
                    <Users className="w-3.5 h-3.5 text-[#00D2FF]" />
                    TOTAL BACKERS
                  </div>
                  <div className="text-2xl font-bold font-['JetBrains_Mono'] text-white">
                    {backersTotal}
                  </div>
                </div>
                <div className="bg-[#080B10] p-4 rounded-xl border border-[#1A1F2C]">
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-mono mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
                    DAYS REMAINING
                  </div>
                  <div className="text-2xl font-bold font-['JetBrains_Mono'] text-white">
                    {daysLeft}
                  </div>
                </div>
              </div>
            </div>

            {/* Back CTA Buttons */}
            <div className="mt-8 pt-6 border-t border-[#222222] space-y-3">
              <button
                onClick={() => handleOpenPledge()}
                className="w-full py-4 bg-gradient-to-r from-[#FF5500] to-[#E64A19] text-white font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:shadow-[0_0_35px_rgba(255,85,0,0.8)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 fill-current" />
                Back This Project Now
              </button>
              
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 font-mono text-center">
                <Shield className="w-3.5 h-3.5 text-[#00FF88]" />
                Direct settlement via PayPal verified Studio merchant rail
              </div>
            </div>

          </div>

        </div>

        {/* Navigation Tabs for Deep Dive Content */}
        <div className="flex items-center border-b border-[#222222] mb-10 overflow-x-auto scrollbar-none gap-2">
          {[
            { id: "campaign", label: "Overview & Vision", icon: Flame },
            { id: "story", label: "Storyline & Lore", icon: Film },
            { id: "combat", label: "Combat & Movement", icon: Crosshair },
            { id: "rewards", label: "Reward Tiers", icon: Award },
            { id: "budget", label: "Budget & Roadmap", icon: Cpu }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-3.5 text-xs sm:text-sm font-['Orbitron'] font-bold whitespace-nowrap transition-all border-b-2 tracking-wider ${
                  isActive
                    ? "border-[#FF5500] text-[#FF5500] bg-[#FF5500]/5"
                    : "border-transparent text-gray-400 hover:text-white hover:border-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: CAMPAIGN OVERVIEW & VISION */}
        {activeTab === "campaign" && (
          <div className="space-y-12">
            
            {/* The Vision Banner */}
            <div className="bg-[#0B0F17]/80 rounded-2xl border border-[#222222] p-8 lg:p-10 backdrop-blur-md relative overflow-hidden">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#FF5500]/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="max-w-3xl">
                <span className="text-xs font-mono text-[#FF5500] tracking-widest uppercase">
                  THE 9LMNTS STUDIO COMMITMENT
                </span>
                <h2 className="text-2xl sm:text-4xl font-black font-['Orbitron'] mt-2 text-white leading-tight">
                  WHY WE ARE CROWDFUNDING $20,000 FOR PROJECT LOA
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
                  Project LOA is more than an indie game—it is an expansive transmedia universe spanning an **Unreal Engine 5.7 mythic sci-fi action RPG** and an accompanying **cinematic cyberpunk anime series**.
                </p>
                <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                  With a targeted seed budget of **$20,000 CAD**, we are funding the full **Unreal Engine 5.7 playable vertical slice**: high-fidelity Metahuman motion capture for Damian Kane's Wing Chun / Capoeira Blink-Strike mechanics, Nanite environment production for 3026 Neo-Ottawa, and initial physical WebAR merchandise casting.
                </p>
              </div>

              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-[#222222]">
                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1C2233]">
                  <div className="w-10 h-10 rounded-lg bg-[#FF5500]/10 border border-[#FF5500]/30 flex items-center justify-center text-[#FF5500] mb-3">
                    <Gamepad2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-['Orbitron'] text-white">Unreal Engine 5.7</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Harnessing Nanite geometric micro-polygons and Lumen dynamic global illumination to render Neo-Ottawa's neon snowscapes with photo-realism.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1C2233]">
                  <div className="w-10 h-10 rounded-lg bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex items-center justify-center text-[#00D2FF] mb-3">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-['Orbitron'] text-white">Blink-Strike MoCap</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Custom authentic martial arts choreography blending Wing Chun hand-trapping and acrobatic Capoeira with short-range teleportation.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1C2233]">
                  <div className="w-10 h-10 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 flex items-center justify-center text-[#00FF88] mb-3">
                    <Box className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold font-['Orbitron'] text-white">Phygital WebAR Merch</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Official cyber-streetwear connected to in-game skins and camera-projected 3D glowing wings without app downloads.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Reward Tier Teaser */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black font-['Orbitron'] text-white">
                    SELECT YOUR BACKER TIER
                  </h3>
                  <p className="text-xs text-gray-400 font-mono">
                    All backers receive permanent credits and exclusive Discord access
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("rewards")}
                  className="text-xs text-[#FF5500] hover:text-[#FF8A00] flex items-center gap-1 font-mono font-bold"
                >
                  View All Details <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {REWARD_TIERS.slice(0, 3).map((tier) => (
                  <div
                    key={tier.id}
                    className="bg-[#0B0F17] rounded-2xl border border-[#222222] p-6 hover:border-[#FF5500]/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {tier.badge && (
                        <span className="inline-block px-2.5 py-0.5 rounded bg-[#FF5500]/15 text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-wider mb-3 border border-[#FF5500]/30">
                          {tier.badge}
                        </span>
                      )}
                      <h4 className="text-lg font-bold font-['Orbitron'] text-white group-hover:text-[#FF5500] transition-colors">
                        {tier.name}
                      </h4>
                      <div className="text-2xl font-black font-['JetBrains_Mono'] text-white mt-1">
                        ${tier.price}{" "}
                        <span className="text-xs font-normal text-gray-400">CAD</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-3 line-clamp-2">
                        {tier.description}
                      </p>
                      <ul className="mt-4 space-y-2 border-t border-[#1C2233] pt-4">
                        {tier.items.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88] shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => handleOpenPledge(tier)}
                      className="mt-6 w-full py-2.5 bg-[#121624] hover:bg-[#FF5500] text-white text-xs font-bold font-['Orbitron'] uppercase tracking-wider rounded-xl transition-all border border-[#2A334D] hover:border-[#FF5500]"
                    >
                      Pledge ${tier.price} CAD
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: STORYLINE & LORE */}
        {activeTab === "story" && (
          <div className="space-y-12">
            
            {/* Master Narrative Intro */}
            <div className="bg-[#0B0F17]/80 rounded-2xl border border-[#222222] p-8 lg:p-10">
              <div className="max-w-3xl">
                <span className="text-xs font-mono text-[#00D2FF] tracking-widest uppercase">
                  PROJECT BIBLE • VERSION 3.2
                </span>
                <h2 className="text-2xl sm:text-4xl font-black font-['Orbitron'] text-white mt-2">
                  THE CREATOR GOD HAS FORGOTTEN HIS THRONE
                </h2>
                <p className="text-gray-300 text-sm sm:text-base mt-4 leading-relaxed">
                  The year is **3026**. High-tech mega-infrastructure has swallowed the historical city of Ottawa into a frozen, cyber-industrial dystopia known as **Neo-Ottawa**. 
                </p>
                <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                  Deep within the subterranean slums, a genius inventor named **Damian Kane** fights as a street vigilante, surviving on home-brewed technology and high-octane martial arts. But Damian suffers from terrifying glitches—visions of forging the stars and drawing the blueprints of reality.
                </p>
                <p className="text-gray-300 text-sm sm:text-base mt-3 leading-relaxed">
                  Damian is the amnesiac incarnation of **Ptah**, the Egyptian God of Creation. And the AI assistant he engineered to regulate his dark energy—**LOA**—is possessed by an ancient parasitic cosmic entity using him to tear down reality's safeguards so she can invade the physical realm.
                </p>
              </div>
            </div>

            {/* Character Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Character 1: Damian Kane */}
              <div className="bg-[#0B0F17] rounded-2xl border border-[#222222] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#FF5500] font-bold">PROTAGONIST</span>
                    <span className="text-xs font-mono text-gray-500">THE SLEEPER GOD</span>
                  </div>
                  <h3 className="text-2xl font-black font-['Orbitron'] text-white mt-1">
                    Damian Kane (Ptah)
                  </h3>
                  <div className="inline-block mt-1 text-xs text-[#00D2FF] font-mono">
                    Identity: Amnesiac Egyptian Creator God in Human Form
                  </div>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                    Equipped with his iconic Djed Pillar chest interface, Damian believes his supernatural abilities are the result of dark energy batteries he invented. In truth, the tech serves only as training wheels for his dormant divine power.
                  </p>
                  
                  <div className="mt-4 space-y-2 border-t border-[#1C2233] pt-4 text-xs">
                    <div>
                      <span className="font-bold text-gray-300">Combat Style: </span>
                      <span className="text-gray-400">"Blink-Strike Arts" (Wing Chun + Capoeira + Spatial Blink)</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-300">Signature Weapon: </span>
                      <span className="text-gray-400">The Staff of Ptah (Architect's Sceptre / Was Sceptre)</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-300">VFX Signature: </span>
                      <span className="text-gray-400">Black/Purple spatial distortion with Gold/Orange atomic glow</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Character 2: LOA (The Possessed AI) */}
              <div className="bg-[#0B0F17] rounded-2xl border border-[#222222] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00D2FF] font-bold">COMPANION / TRAITOR</span>
                    <span className="text-xs font-mono text-gray-500">CODE VEIN PARASITE</span>
                  </div>
                  <h3 className="text-2xl font-black font-['Orbitron'] text-white mt-1">
                    L.O.A. (The AI Entity)
                  </h3>
                  <div className="inline-block mt-1 text-xs text-[#E91E63] font-mono">
                    Origin: Lead Orchestrator Agent (Possessed by Evil Spirit)
                  </div>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                    Originally built by Damian to monitor his bio-telemetry, LOA has been possessed by an ancient extra-dimensional entity. Unable to manifest physically, she manipulates Damian into destroying corporate firewalls, unaware that each facility breaches the spirit realm's barrier.
                  </p>

                  <div className="mt-4 space-y-2 border-t border-[#1C2233] pt-4 text-xs">
                    <div>
                      <span className="font-bold text-gray-300">Visual Marker: </span>
                      <span className="text-gray-400">Neon-blue "Code Veins" throbbing like infected blood vessels</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-300">Ultimate Goal: </span>
                      <span className="text-gray-400">Siphon Ptah's creation energy to terraform Earth into a Spirit Realm</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-300">Voice Profile: </span>
                      <span className="text-gray-400">Hyper-calm maternal synthetic voice masking predatory intent</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Character 3: Lucius Kray (The Antagonist) */}
              <div className="bg-[#0B0F17] rounded-2xl border border-[#222222] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#E64A19] font-bold">ANTAGONIST</span>
                    <span className="text-xs font-mono text-gray-500">APOPHIS DYNAMICS CEO</span>
                  </div>
                  <h3 className="text-2xl font-black font-['Orbitron'] text-white mt-1">
                    Lucius Kray
                  </h3>
                  <div className="inline-block mt-1 text-xs text-gray-400 font-mono">
                    Aesthetic: Reptilian Corporate / Bio-Hacked Mogul
                  </div>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                    The ruthless CEO of Apophis Dynamics. Clad in a synthetic matte-black "Serpent-Weave" suit with obsidian ocular implants, Kray is bio-hacked specifically to project localized "Null-Fields" that anchor reality against Ptah's molecular re-coding.
                  </p>

                  <div className="mt-4 space-y-2 border-t border-[#1C2233] pt-4 text-xs">
                    <div>
                      <span className="font-bold text-gray-300">Counter-Tech: </span>
                      <span className="text-gray-400">Null-Field reality anchors, adaptive phase-shifting, harmonic feedback</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-300">Secret Truth: </span>
                      <span className="text-gray-400">Kray thinks he hunts Damian for energy; he is an unwitting pawn of LOA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Character 4: KJ "Krezzy Bear" Kane */}
              <div className="bg-[#0B0F17] rounded-2xl border border-[#222222] p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00FF88] font-bold">ALLIED PRODIGY</span>
                    <span className="text-xs font-mono text-gray-500">DIGITAL ALCHEMIST</span>
                  </div>
                  <h3 className="text-2xl font-black font-['Orbitron'] text-white mt-1">
                    KJ "Krezzy Bear" Kane
                  </h3>
                  <div className="inline-block mt-1 text-xs text-[#00FF88] font-mono">
                    Role: 19-Year-Old Weapons Architect & Safehouse Master
                  </div>
                  <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                    Damian's eccentric nephew and hardware wizard. Operating out of "Vault 9"—a subterranean data lab covered in digitized holographic graffiti—KJ translates Damian's divine frequency into 3026 street-tech.
                  </p>

                  <div className="mt-4 space-y-2 border-t border-[#1C2233] pt-4 text-xs">
                    <div>
                      <span className="font-bold text-gray-300">Signature Ride: </span>
                      <span className="text-gray-400">The "Specter Glide" liquid-chrome hoverboard powered by dark energy</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-300">Aesthetic: </span>
                      <span className="text-gray-400">Signature Bear-Ear trapper hat, tactical oversized hoodies, locs</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 3: COMBAT & MOVEMENT */}
        {activeTab === "combat" && (
          <div className="space-y-12">
            
            <div className="bg-[#0B0F17]/80 rounded-2xl border border-[#222222] p-8 lg:p-10">
              <span className="text-xs font-mono text-[#FF5500] tracking-widest uppercase">
                MECHANICS SHOWCASE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-['Orbitron'] text-white mt-2">
                THE "BLINK-STRIKE" COMBAT SYSTEM
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mt-4 max-w-3xl leading-relaxed">
                Damian Kane’s fighting style merges the devastating close-quarters trapping of **Wing Chun**, the acrobatic fluid sweeps of **Capoeira**, and instantaneous **spatial teleportation** ("Blinking").
              </p>

              {/* Combat Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                
                <div className="p-6 rounded-xl bg-[#080B10] border border-[#1A1F2C]">
                  <div className="text-xs font-mono text-[#FF5500] font-bold mb-2">ENGINE 01</div>
                  <h3 className="text-lg font-bold font-['Orbitron'] text-white">Wing Chun Hand-Trapping</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Pak Sao and Lap Sao hand maneuvers allow Damian to deflect high-caliber mercenary weapon arms, pin robotic joints, and execute high-speed centerline palm blasts.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#080B10] border border-[#1A1F2C]">
                  <div className="text-xs font-mono text-[#00D2FF] font-bold mb-2">ENGINE 02</div>
                  <h3 className="text-lg font-bold font-['Orbitron'] text-white">Capoeira Momentum Sweeps</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Low-slung Rasteira sweeps that upend 300-lb cyborg mercenaries, followed by spinning aerial kicks that chain fluidly into spatial teleports.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-[#080B10] border border-[#1A1F2C]">
                  <div className="text-xs font-mono text-[#00FF88] font-bold mb-2">ENGINE 03</div>
                  <h3 className="text-lg font-bold font-['Orbitron'] text-white">The "Jumper" Spatial Blink</h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    Short-range instantaneous blinks leaving a wake of purple dark energy distortion. Damian blinks directly inside enemy guard lines without losing attack momentum.
                  </p>
                </div>

              </div>
            </div>

            {/* The Staff of Ptah: 4 Divine Re-coding Powers */}
            <div className="bg-[#0B0F17]/90 rounded-2xl border border-[#222222] p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#222222] gap-4">
                <div>
                  <span className="text-xs font-mono text-[#FF8A00] tracking-widest uppercase">
                    ARCHITECT'S SCEPTRE (WAS/DJED/ANKH)
                  </span>
                  <h3 className="text-xl sm:text-3xl font-black font-['Orbitron'] text-white mt-1">
                    4 DIVINE RE-CODING ABILITIES
                  </h3>
                </div>
                <div className="px-3 py-1 rounded bg-[#FF8A00]/10 border border-[#FF8A00]/30 text-[#FF8A00] text-xs font-mono font-bold">
                  MOLECULAR FREQUENCY WARFARE
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                
                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FF5500]/10 text-[#FF5500] flex items-center justify-center font-black font-mono">
                      01
                    </div>
                    <h4 className="text-base font-bold font-['Orbitron'] text-white">Floor Liquefaction (The "Moses" Trap)</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Damian slams the Djed base into the floor. Solid concrete and steel instantly liquefy into roiling molten silver. Mercenaries sink to their waists before Damian re-solidifies the floor to freeze them in place.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/10 text-[#00D2FF] flex items-center justify-center font-black font-mono">
                      02
                    </div>
                    <h4 className="text-base font-bold font-['Orbitron'] text-white">Atomic Desolidification (Armor Ghosting)</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Touching the sceptre's geometric head to enemy cyber-armor destabilizes atomic bonds, turning reinforced plating into soft gel that offers zero defense against kinetic strikes.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#00FF88]/10 text-[#00FF88] flex items-center justify-center font-black font-mono">
                      03
                    </div>
                    <h4 className="text-base font-bold font-['Orbitron'] text-white">Resonant Deconstruction (The Shatter)</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Parrying enemy blade or firearm attacks emits a harmonic pulse matching the weapon's resonant frequency, causing it to disintegrate into pixelated digital dust.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFB300]/10 text-[#FFB300] flex items-center justify-center font-black font-mono">
                      04
                    </div>
                    <h4 className="text-base font-bold font-['Orbitron'] text-white">Structural Repurposing (The World Splitter)</h4>
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Using "Architect's Gaze", Damian views the atomic blueprint of urban rubble and unzips reinforced concrete walls to create defensive barricades or flood subterranean vaults.
                  </p>
                </div>

              </div>
            </div>

            {/* Enemy Husk Bestiary */}
            <div className="bg-[#0B0F17]/80 rounded-2xl border border-[#222222] p-8">
              <h3 className="text-xl font-bold font-['Orbitron'] text-white mb-6">
                ENEMY BESTIARY: THE HUSKS OF LOA
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { name: "Bit-Husk", role: "Swarm Grunt", desc: "Humans overtaken by LOA code veins. Rapid melee attacks with hardened digital code-claws." },
                  { name: "Logic-Brute", role: "Armored Heavy", desc: "Massive cybernetic enforcers fused with orange reactor cores. Unstoppable momentum." },
                  { name: "Glitch-Seeker", role: "Phase Assassin", desc: "Stutters through frame-rates to flank and ambush using localized ghosting technology." },
                  { name: "Firewall-Shield", role: "Support Tank", desc: "Anchors to terrain and projects blue Null-Zones preventing Damian's floor liquefaction." }
                ].map((enemy, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-[#080B10] border border-[#1A1F2C]">
                    <div className="text-[10px] font-mono text-[#FF5500] uppercase font-bold">{enemy.role}</div>
                    <h4 className="text-sm font-bold font-['Orbitron'] text-white mt-1">{enemy.name}</h4>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">{enemy.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: REWARD TIERS */}
        {activeTab === "rewards" && (
          <div className="space-y-8">
            
            <div className="text-center max-w-2xl mx-auto mb-8">
              <span className="text-xs font-mono text-[#FF5500] tracking-widest uppercase">
                PLEDGE TIERS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-['Orbitron'] text-white mt-1">
                BECOME A BACKER OF PROJECT LOA
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-2">
                Pledge securely through 9LMNTS Studio's verified PayPal merchant rail. Backer perks deliver across 2026-2027 milestone releases.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REWARD_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className="bg-[#0B0F17] rounded-2xl border border-[#222222] hover:border-[#FF5500] p-6 transition-all flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      {tier.badge ? (
                        <span className="px-2.5 py-0.5 rounded bg-[#FF5500]/15 text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-wider border border-[#FF5500]/30">
                          {tier.badge}
                        </span>
                      ) : <div />}
                      <span className="text-xs text-gray-400 font-mono">
                        {tier.backersCount} backers
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-['Orbitron'] text-white group-hover:text-[#FF5500] transition-colors">
                      {tier.name}
                    </h3>
                    
                    <div className="text-3xl font-black font-['JetBrains_Mono'] text-white mt-2">
                      ${tier.price}{" "}
                      <span className="text-xs font-normal text-gray-400">CAD</span>
                    </div>

                    <p className="text-xs text-gray-300 mt-3 leading-relaxed">
                      {tier.description}
                    </p>

                    <div className="text-[11px] text-[#00D2FF] font-mono mt-3 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Estimated Delivery: {tier.deliveryDate}
                    </div>

                    <div className="mt-5 border-t border-[#1E2538] pt-4">
                      <div className="text-[11px] font-mono font-bold text-gray-400 uppercase mb-2">
                        Includes:
                      </div>
                      <ul className="space-y-2.5">
                        {tier.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-xs text-gray-300">
                            <Check className="w-3.5 h-3.5 text-[#00FF88] shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenPledge(tier)}
                    className="mt-8 w-full py-3 bg-gradient-to-r from-[#FF5500] to-[#E64A19] hover:from-[#FF6A00] hover:to-[#FF5500] text-white font-bold font-['Orbitron'] text-xs uppercase tracking-wider rounded-xl shadow-[0_0_15px_rgba(255,85,0,0.3)] transition-all"
                  >
                    Select This Reward (${tier.price} CAD)
                  </button>
                </div>
              ))}
            </div>

            {/* Custom Pledge Card */}
            <div className="bg-[#0B0F17]/90 rounded-2xl border border-[#222222] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold font-['Orbitron'] text-white">
                  Pledge Any Custom Amount
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  Support Project LOA without a specific tier or add extra funding to the $20,000 goal.
                </p>
              </div>
              <button
                onClick={() => handleOpenPledge()}
                className="px-6 py-3 bg-[#121624] hover:bg-[#1E2538] text-white text-xs font-mono font-bold uppercase rounded-xl border border-[#2E3752] transition-colors whitespace-nowrap"
              >
                Custom Contribution
              </button>
            </div>

          </div>
        )}

        {/* TAB 5: BUDGET & ROADMAP ($20,000 ALLOCATION) */}
        {activeTab === "budget" && (
          <div className="space-y-12">
            
            {/* $20,000 Allocation Breakdown */}
            <div className="bg-[#0B0F17]/80 rounded-2xl border border-[#222222] p-8 lg:p-10">
              <span className="text-xs font-mono text-[#00FF88] tracking-widest uppercase">
                FINANCIAL TRANSPARENCY
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-['Orbitron'] text-white mt-1">
                $20,000 SEED FUNDING ALLOCATION
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mt-3 max-w-3xl leading-relaxed">
                Every dollar pledged goes directly into asset creation, software tooling, Metahuman motion capture, and combat programming for the Unreal Engine 5.7 vertical slice.
              </p>

              {/* Budget Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                
                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold font-['Orbitron'] text-white">
                      Motion Capture & Rigging (40%)
                    </span>
                    <span className="font-mono text-sm font-bold text-[#FF5500]">$8,000</span>
                  </div>
                  <div className="w-full bg-[#1A1F2C] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#FF5500] h-full w-[40%]" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Studio motion capture sessions with martial arts performers for Wing Chun trapping, Capoeira sweeps, and Blink-Strike choreography.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold font-['Orbitron'] text-white">
                      Unreal Engine 5.7 Environment (25%)
                    </span>
                    <span className="font-mono text-sm font-bold text-[#00D2FF]">$5,000</span>
                  </div>
                  <div className="w-full bg-[#1A1F2C] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#00D2FF] h-full w-[25%]" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    3026 Neo-Ottawa world-building: Parliament Megatower, subterranean hydro vaults, and Rideau Canal undercity utilizing Nanite and Lumen.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold font-['Orbitron'] text-white">
                      Playable Alpha Combat Slice (20%)
                    </span>
                    <span className="font-mono text-sm font-bold text-[#00FF88]">$4,000</span>
                  </div>
                  <div className="w-full bg-[#1A1F2C] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#00FF88] h-full w-[20%]" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Physics programming, enemy AI husk state machines, Staff of Ptah molecular floor liquefaction, and Steam / Epic executable packaging.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#080B10] border border-[#1E2538]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold font-['Orbitron'] text-white">
                      Audio, Voice & WebAR Pipeline (15%)
                    </span>
                    <span className="font-mono text-sm font-bold text-[#FFB300]">$3,000</span>
                  </div>
                  <div className="w-full bg-[#1A1F2C] h-2.5 rounded-full overflow-hidden">
                    <div className="bg-[#FFB300] h-full w-[15%]" />
                  </div>
                  <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                    Original cyberpunk/hip-hop soundtrack composition, Canadian grit voice acting for Damian Kane, and 8th Wall WebAR target patch setup.
                  </p>
                </div>

              </div>
            </div>

            {/* Production Milestones Timeline */}
            <div className="bg-[#0B0F17]/80 rounded-2xl border border-[#222222] p-8 lg:p-10">
              <h3 className="text-xl font-bold font-['Orbitron'] text-white mb-8">
                DEVELOPMENT ROADMAP
              </h3>

              <div className="space-y-8 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#222222]">
                {[
                  { phase: "PHASE 01 • Q4 2026", title: "MoCap & Unreal Engine 5.7 Sandbox", status: "Active", desc: "Wing Chun martial arts motion capture sessions locked. Neo-Ottawa lighting pass with Lumen in UE 5.7." },
                  { phase: "PHASE 02 • Q1 2027", title: "Closed Backer Alpha Arena Demo", status: "Upcoming", desc: "Backers with Djed Operative ($75+) receive private Steam keys to test combat and Staff mechanics." },
                  { phase: "PHASE 03 • Q2 2027", title: "Anime Series Pilot & WebAR Streetwear Drop", status: "Upcoming", desc: "Physical cyber-hoodies ship with scannable WebAR 3D wings. Pilot episode of the animated series premieres." },
                  { phase: "PHASE 04 • Q4 2027", title: "Full Commercial Launch", status: "Target", desc: "Commercial release of Project LOA on PC and consoles with full story campaign and Sound Clash arena crossover." }
                ].map((item, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute left-2 top-1.5 w-3.5 h-3.5 rounded-full bg-[#FF5500] border-4 border-[#050505]" />
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#FF5500] font-bold">{item.phase}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A1F2C] text-gray-300">
                        {item.status}
                      </span>
                    </div>
                    <h4 className="text-base font-bold font-['Orbitron'] text-white mt-1">{item.title}</h4>
                    <p className="text-xs text-gray-400 mt-1 max-w-2xl leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* VIDEO PREVIEW MODAL */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
          <div className="bg-[#0B0F17] rounded-2xl border border-[#222222] max-w-4xl w-full overflow-hidden shadow-2xl relative">
            <div className="p-4 border-b border-[#222222] flex items-center justify-between bg-[#080B10]">
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#FF5500]" />
                <h3 className="text-sm font-bold font-['Orbitron'] text-white">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#141A29] hover:bg-[#FF5500] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Video Player Area */}
            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
              {/* If local/drive video source is passed, use <video>, otherwise high-fidelity placeholder with play button */}
              <div className="relative w-full h-full flex flex-col items-center justify-center p-8 text-center">
                <img 
                  src={activeVideo.thumbnail} 
                  alt={activeVideo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm"
                />
                <div className="relative z-10 max-w-md">
                  <div className="w-16 h-16 rounded-full bg-[#FF5500] text-white flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(255,85,0,0.8)]">
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </div>
                  <h4 className="text-lg font-bold font-['Orbitron'] text-white">
                    {activeVideo.title}
                  </h4>
                  <p className="text-xs text-gray-300 mt-2">
                    {activeVideo.description}
                  </p>
                  <p className="text-[11px] font-mono text-[#00D2FF] mt-4">
                    Media asset connected: Google Drive Master Asset Vault
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#080B10] flex justify-between items-center text-xs font-mono text-gray-400">
              <span>TAG: {activeVideo.tag}</span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 bg-[#1A1F2C] hover:bg-[#2A3248] text-white rounded-lg transition-colors font-sans"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLEDGE CHECKOUT MODAL */}
      {isBackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="bg-[#0B0F17] rounded-2xl border border-[#222222] max-w-lg w-full overflow-hidden shadow-2xl relative">
            <div className="p-5 border-b border-[#222222] flex items-center justify-between bg-[#080B10]">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FF5500]" />
                <div>
                  <h3 className="text-sm font-bold font-['Orbitron'] text-white">
                    BACK PROJECT LOA
                  </h3>
                  <p className="text-[11px] font-mono text-gray-400">
                    Official 9LMNTS Studio Crowdfunding Rail
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBackingModalOpen(false)}
                className="w-8 h-8 rounded-lg bg-[#141A29] hover:bg-[#FF5500] text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {selectedTier ? (
                <div className="bg-[#080B10] p-4 rounded-xl border border-[#1A1F2C]">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-[#FF5500] uppercase font-bold">
                        SELECTED REWARD TIER
                      </span>
                      <h4 className="text-base font-bold font-['Orbitron'] text-white mt-0.5">
                        {selectedTier.name}
                      </h4>
                    </div>
                    <div className="text-xl font-black font-['JetBrains_Mono'] text-white">
                      ${selectedTier.price} CAD
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {selectedTier.description}
                  </p>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-mono text-gray-300 mb-2">
                    ENTER CONTRIBUTION AMOUNT (CAD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
                      $
                    </span>
                    <input
                      type="number"
                      value={customPledge}
                      onChange={(e) => setCustomPledge(e.target.value)}
                      placeholder="75"
                      className="w-full bg-[#080B10] border border-[#222222] focus:border-[#FF5500] rounded-xl py-3 pl-8 pr-4 text-white font-mono text-sm focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div className="p-4 bg-[#0E131F] rounded-xl border border-[#1C253B] space-y-2 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Funding Goal:</span>
                  <span className="text-white font-mono font-bold">$20,000 CAD</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Current Pledged:</span>
                  <span className="text-[#00FF88] font-mono font-bold">${currentPledged.toLocaleString()} CAD</span>
                </div>
                <div className="flex justify-between text-gray-400 border-t border-[#1C253B] pt-2">
                  <span className="text-white font-bold">Your Pledge:</span>
                  <span className="text-[#FF5500] font-mono font-bold text-sm">
                    ${getEffectivePledge()} CAD
                  </span>
                </div>
              </div>

              <a
                href={`https://www.paypal.com/ncp/payment/LOA_BACKER_PLEDGE`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-gradient-to-r from-[#FF5500] to-[#E64A19] hover:from-[#FF6A00] hover:to-[#FF5500] text-white font-bold font-['Orbitron'] text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,85,0,0.5)] transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed via PayPal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <p className="text-[10px] text-gray-500 font-mono text-center">
                Payment processed by PayPal (PayPal E-Commerce Services). Official backer confirmation will be sent to your billing email.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
