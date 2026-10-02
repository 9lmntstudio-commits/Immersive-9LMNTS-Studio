import { useRef, useState, useEffect } from "react";
import {
  Paintbrush,
  Disc3,
  Mic2,
  Users,
  Radio,
  Sparkles,
  MessageSquare,
  DollarSign,
  Brain,
  Check,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Zap,
  ArrowRight,
  ChevronDown,
  ExternalLink
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEO } from "./SEO";
import { publicAnonKey, projectId } from "../utils/supabase/info";

const N8N_WEBHOOK_URL = "https://loabrain.app.n8n.cloud/webhook/9lmnts-leads";
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc`;

interface ServicesPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export const NINE_PILLARS = [
  {
    id: "graffiti-design",
    element: "01. Graffiti (Aerosol Art)",
    service: "Graphic Design, Brand Systems & Visual Identity",
    icon: Paintbrush,
    description: "Cyber-industrial brand marks, custom typography, album & tournament key art, vector assets, and brutalist high-contrast UI design systems.",
    features: [
      "Custom 9LMNTS cyber-industrial brand identity & logo design",
      "Vector tournament brackets, album art & digital key graphics",
      "Tailwind / CSS design token architecture & typography scales",
      "WebAR visual assets & 300 DPI high-contrast print markers",
      "Complete design guidelines & developer-ready handoff specs"
    ],
    image: "https://images.unsplash.com/photo-1749581134865-6b8255950548?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "djing-arena",
    element: "02. DJing (Turntablism)",
    service: "Live Battle Arenas & Audio Engineering",
    icon: Disc3,
    description: "Sound Clash OS deployment: 8-contender duel stages, real-time waveform hype meters, uncompressed master stem vaults, and jumbotron synchronization.",
    features: [
      "Turnkey 8-DJ single-elimination tournament state machines",
      "Real-time dual-color waveform hype meters (#FF5500 vs #00D2FF)",
      "Uncompressed 24-bit WAV master stem vault paywalls",
      "Jumbotron big-screen live broadcast output & round timer sync",
      "Live song request lines with audience crowd upvoting"
    ],
    image: "https://images.unsplash.com/photo-1718910259504-906abd8dc1ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "mcing-narrative",
    element: "03. MCing (Lyricism & Rap)",
    service: "Narrative Architecture, Brand Voice & Copywriting",
    icon: Mic2,
    description: "Battle rap competition rulebooks, campaign story bibles, investor pitch deck narratives, and culture-first high-impact copywriting.",
    features: [
      "Transmedia world-building & cinematic lore bibles (e.g. Project LOA)",
      "Battle rap tournament lyricism rules & stage emcee playbooks",
      "Investor pitch decks & executive commercial scripts",
      "Brand voice development trained on hip-hop culture & cyber noir",
      "High-conversion email campaigns & social outreach copy"
    ],
    image: "https://images.unsplash.com/photo-1753410642481-9306b48b45de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "breaking-motion",
    element: "04. Breakin' (B-Boying / Movement)",
    service: "Motion Design, Dynamic UI & Unreal Engine Staging",
    icon: Users,
    description: "Kinetic UI micro-interactions, Unreal Engine 5 fight choreography, 3D Metahuman rigging, and high-energy video commercials.",
    features: [
      "Kinetic UI animations & high-frame-rate interaction design",
      "Unreal Engine 5.7 environmental staging (Nanite & Lumen)",
      "3D Metahuman rigging & martial arts motion capture integration",
      "Dynamic 3D video trailers & commercial motion assets",
      "Hardware-accelerated mobile performance optimization"
    ],
    image: "https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "beatboxing-audio",
    element: "05. Beatboxing (Vocal Percussion)",
    service: "UI Sound FX & Spatial Audio Architecture",
    icon: Radio,
    description: "Interactive UI acoustic feedback, stadium audio stingers, sonic brand logos, and multi-channel spatial audio triggers for live venue spaces.",
    features: [
      "Interactive UI sound effects (button clicks, vote surges, timer alarms)",
      "Live event arena sound drops, countdown sirens & victory stings",
      "Spatial audio triggers for WebAR & in-venue zone activations",
      "Custom sonic branding marks & audio logos",
      "Lossless audio streaming engine integration"
    ],
    image: "https://images.unsplash.com/photo-1742477012583-804ba592b2c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "fashion-webar",
    element: "06. Street Fashion (Streetwear)",
    service: "Apparel Architecture & WebAR Smart Merch",
    icon: Sparkles,
    description: "Custom embroidered cyber-streetwear, NFC-enabled festival wristbands, and scannable 300 DPI WebAR target hoodies with 3D floating holograms.",
    features: [
      "Heavyweight streetwear apparel design (hoodies, tees, caps)",
      "Browser WebAR target tracking (zero app downloads required)",
      "3D holographic angel wings & floating championship trophies",
      "NFC + WebAR hybrid event credentials & VIP wristbands",
      "Shopify & PayPal E-Commerce merchandise drops"
    ],
    image: "https://images.unsplash.com/photo-1626908013351-800ddd734b8a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "language-funnels",
    element: "07. Street Language (Slang / Culture)",
    service: "Culture-First Marketing & Chatbot Funnels",
    icon: MessageSquare,
    description: "Direct-to-consumer conversational funnels, ManyChat DM automation, keyword triggers (DM 'DEV' / DM 'CLASH'), and viral social dispatch.",
    features: [
      "ManyChat automated DM keyword funnels (Instagram & WhatsApp)",
      "Instant lead qualification bots with under 30-second turnaround",
      "Culture-grounded copy that converts urban & tech audiences",
      "Community onboarding loops & automated pitch deck dispatch",
      "Multi-channel messaging integration (WhatsApp, Slack, Telegram)"
    ],
    image: "https://images.unsplash.com/photo-1771873679764-4e5503b69040?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "trade-monetization",
    element: "08. Street Entrepreneurialism (Trade)",
    service: "Web 2.5 In-Venue Monetization & Cashless Gates",
    icon: DollarSign,
    description: "Universal 4-Box in-venue monetization grid ($20 Cover, $10 Micro-Tip, $50 Power Hype, $150 VIP Table) and automated 70/30 prize pot surges.",
    features: [
      "Universal 4-Box in-venue monetization checkout integration",
      "Automated 70/30 winner prize pot surge calculations",
      "High-throughput mobile QR door ticketing & duplicate prevention",
      "VIP bottle service reservations with native PayPal Pay Later / Pay in 4",
      "Real-time promoter gross revenue and transaction settlement"
    ],
    image: "https://images.unsplash.com/photo-1764347295958-6a729b1fdf7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: "knowledge-ai",
    element: "09. Knowledge of Self (Philosophy)",
    service: "AI Agency Sprints & Platform Architecture",
    icon: Brain,
    description: "Rapid 7-day turnkey AI sprints, multi-agent orchestration (n8n, CrewAI), proprietary OS licensing, and digital transformation consulting.",
    features: [
      "7-Day Turnkey AI Sprints: rapid production MVP deployment",
      "Multi-agent autonomous workflows via n8n and CrewAI",
      "Proprietary 9LMNTS OS platform licensing (Sound Clash, Artist, Gate OS)",
      "Supabase PostgreSQL, Edge Functions & Vector database setups",
      "Full digital transformation architecture & roadmap consulting"
    ],
    image: "https://images.unsplash.com/photo-1612967690587-d741c8d7825d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");

    let emailOk = false;
    setEmailErrorMsg("");

    const emailMessage = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW SERVICE INQUIRY — 9LMNTS STUDIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 CONTACT INFORMATION
  Name:    ${formData.name}
  Email:   ${formData.email}
  Phone:   ${formData.phone || "Not provided"}

🎯 SERVICE INTEREST
  Service: ${formData.service}

💬 MESSAGE
${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: 9lmnts.com/services
Timestamp: ${new Date().toLocaleString()}
    `.trim();

    try {
      const emailResponse = await fetch(`${SERVER_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          to: "9lmntstudio@gmail.com",
          subject: `Service Inquiry - ${formData.service || "General"}`,
          message: emailMessage,
          replyTo: formData.email,
        }),
      });

      const emailResult = await emailResponse.json();
      if (emailResult.success) {
        emailOk = true;
      } else {
        throw new Error(emailResult.error || "Email sending failed");
      }
    } catch (err: any) {
      setEmailErrorMsg(err.message || "Failed to send email notification");
    }

    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        source: "services-page",
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {});

    fetch(`${SERVER_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        ...formData,
        source: "services-page",
      }),
    }).catch(() => {});

    setFormStatus(emailOk ? "success" : "error");
    if (emailOk) {
      formRef.current?.reset();
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    }
    setTimeout(() => setFormStatus("idle"), 6000);
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-16 font-['Orbitron'] text-white">
      <SEO 
        title="Services & The 9 Elements | 9LMNTS Studio" 
        description="Explore the 9 Elements of Hip-Hop transformed into cutting-edge studio services: Graphic Design, Live Arenas, WebAR Merch, and AI Automation." 
      />

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-b border-[#222222] overflow-hidden text-center">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#FF5500]/30 rounded-full text-[#FF5500] text-xs font-mono tracking-widest uppercase mb-6 bg-[#FF5500]/5">
            <Zap size={12} className="animate-pulse" /> 9LMNTS Studio Core Architecture
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6">
            <span>THE NINE ELEMENTS OF </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5500] via-[#FF6A00] to-[#00D2FF]">
              CULTURE & CREATION
            </span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto mb-10 font-sans leading-relaxed">
            The foundational elements of Hip-Hop transformed into production-grade digital services. Nine disciplines. One unified studio standard.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto font-mono">
            {[
              { val: "9", label: "Cultural Pillars" },
              { val: "Web 2.5", label: "Infrastructure" },
              { val: "Zero App", label: "WebAR Launch" },
            ].map((s) => (
              <div key={s.label} className="bg-[#0F0F0F] border border-[#222222] rounded-xl py-4">
                <p className="text-[#FF5500] text-2xl font-bold font-['Orbitron']">{s.val}</p>
                <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9 Pillars Grid (No individual prices) */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NINE_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isExpanded = expandedCard === pillar.id;

              return (
                <div
                  key={pillar.id}
                  className="bg-[#0F0F0F] border border-[#222222] hover:border-[#FF5500]/50 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col group shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                >
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={pillar.image}
                      alt={pillar.element}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-2.5 py-1 rounded border border-[#222222] text-[#FF5500] text-xs font-mono font-bold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    
                    <div className="absolute top-3 right-3 w-10 h-10 bg-[#FF5500] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,85,0,0.5)]">
                      <Icon size={20} className="text-white" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-widest mb-1">
                      {pillar.element}
                    </p>
                    <h3 className="text-white text-lg font-bold mb-2 leading-snug font-['Orbitron']">
                      {pillar.service}
                    </h3>
                    <p className="text-[#8E9BAE] text-xs sm:text-sm leading-relaxed mb-4 font-sans flex-1">
                      {pillar.description}
                    </p>

                    {/* Expandable Features */}
                    <button
                      type="button"
                      onClick={() => setExpandedCard(isExpanded ? null : pillar.id)}
                      className="flex items-center gap-1.5 text-xs text-[#FF5500] hover:text-white transition-colors mb-3 uppercase tracking-widest font-mono font-bold"
                    >
                      <ChevronDown size={13} className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                      {isExpanded ? "Hide Deliverables" : "View Deliverables"}
                    </button>

                    {isExpanded && (
                      <ul className="space-y-2 mb-4 font-sans border-t border-[#222222] pt-3">
                        {pillar.features.map((f, fIdx) => (
                          <li key={fIdx} className="flex items-start gap-2 text-gray-300 text-xs">
                            <Check size={12} className="text-[#FF5500] flex-shrink-0 mt-0.5" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-auto pt-4 border-t border-[#222222]">
                      <button
                        onClick={() => onNavigate("start-project", pillar.id)}
                        className="w-full py-3 bg-[#121624] hover:bg-[#FF5500] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-[#222222] hover:border-[#FF5500] shadow-sm"
                      >
                        <span>Request Service Intake</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7-Day Sprint Feature Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A0C14] border-y border-[#222222] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#FF5500]/30 rounded-full text-[#FF5500] text-xs font-mono tracking-widest uppercase mb-5 bg-[#FF5500]/10">
                <Zap size={11} /> Turnkey Delivery Cycle
              </div>
              <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-5 leading-tight">
                7-Day Creative Sprint
              </h2>
              <p className="text-gray-300 text-base mb-6 leading-relaxed font-sans">
                Turn your concept into an autonomous digital product in one week. We build production portals, deploy custom WebAR experiences, and automate workflows using Supabase, n8n, and verified PayPal merchant rails.
              </p>
              <ul className="space-y-3 mb-8 font-sans text-xs sm:text-sm text-gray-300">
                {[
                  "Turnkey Event OS or Artist OS portal deployed in 7 business days",
                  "300 DPI high-contrast scannable WebAR apparel targets & 3D assets",
                  "Automated WhatsApp & ManyChat lead qualification funnels",
                  "Direct PayPal E-Commerce checkout with native Pay in 4 financing",
                  "Production handoff with 30-day post-launch warranty",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={14} className="text-[#FF5500] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-4 items-center">
                <button
                  onClick={() => onNavigate("start-project", "7-day-sprint")}
                  className="px-8 py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,85,0,0.5)] transition-all flex items-center gap-2"
                >
                  <span>Start 7-Day Sprint</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="px-8 py-4 bg-[#0F0F0F] hover:bg-[#1A1D28] text-white font-bold rounded-xl text-xs uppercase tracking-widest border border-[#222222] transition-colors"
                >
                  View Sprints & Retainers
                </button>
              </div>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-[#222222] bg-[#050505] shadow-2xl aspect-video">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1760931969401-9bd6ee902798?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="7-Day Sprint"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#050505] relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#FF5500]/30 rounded-full text-[#FF5500] text-xs font-mono tracking-widest uppercase mb-4 bg-[#FF5500]/10">
              <Send size={11} /> Project Intake
            </div>
            <h2 className="text-3xl sm:text-5xl font-black uppercase text-white mb-3">
              Request Your Architecture Call
            </h2>
            <p className="text-gray-400 text-sm sm:text-base font-sans">
              Complete the intake below — our team responds within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            <div className="bg-[#0F0F0F] border border-[#222222] rounded-2xl p-6 sm:p-10 shadow-2xl">
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3.5 bg-[#050505] border border-[#222222] rounded-xl text-white text-sm focus:border-[#FF5500] outline-none font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3.5 bg-[#050505] border border-[#222222] rounded-xl text-white text-sm focus:border-[#FF5500] outline-none font-sans"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (613) 000-0000"
                      className="w-full px-4 py-3.5 bg-[#050505] border border-[#222222] rounded-xl text-white text-sm focus:border-[#FF5500] outline-none font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                      Selected Element / Pillar *
                    </label>
                    <div className="relative">
                      <select
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#050505] border border-[#222222] rounded-xl text-white text-xs sm:text-sm appearance-none focus:border-[#FF5500] outline-none font-sans"
                      >
                        <option value="">Select a service element</option>
                        {NINE_PILLARS.map((p) => (
                          <option key={p.id} value={p.id} className="bg-[#0F0F0F]">
                            {p.element} — {p.service}
                          </option>
                        ))}
                        <option value="7-day-sprint" className="bg-[#0F0F0F]">
                          7-Day Creative Sprint
                        </option>
                        <option value="custom" className="bg-[#0F0F0F]">
                          Custom Proprietary OS Build
                        </option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF5500]">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[#FF5500] text-[10px] font-mono font-bold uppercase tracking-widest mb-2">
                    Project Details & Goals *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your event, brand goals, timeline, and requirements…"
                    className="w-full px-4 py-3.5 bg-[#050505] border border-[#222222] rounded-xl text-white text-sm focus:border-[#FF5500] outline-none font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full py-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,85,0,0.4)] flex items-center justify-center gap-2"
                >
                  {formStatus === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Transmit Project Brief</span>
                    </>
                  )}
                </button>

                {formStatus === "success" && (
                  <div className="p-4 rounded-xl bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-sans">
                    ✓ Project brief received. We will be in touch within 24 hours.
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-sans">
                    {emailErrorMsg || "Brief recorded. If you need immediate assistance, email us at 9lmntstudio@gmail.com."}
                  </div>
                )}
              </form>
            </div>

            {/* Direct Contact Box */}
            <div className="space-y-6">
              <div className="bg-[#0F0F0F] border border-[#222222] rounded-2xl p-6">
                <p className="text-[#FF5500] text-xs font-mono font-bold uppercase tracking-widest mb-4">
                  Direct Studio Comms
                </p>
                <div className="space-y-4 font-sans text-xs">
                  <div>
                    <span className="text-gray-500 block uppercase">Email</span>
                    <a href="mailto:9lmntstudio@gmail.com" className="text-white font-bold hover:text-[#FF5500] transition-colors">
                      9lmntstudio@gmail.com
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block uppercase">Phone / WhatsApp</span>
                    <a href="tel:+16134009691" className="text-white font-bold hover:text-[#FF5500] transition-colors">
                      (613) 400-9691
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block uppercase">Instagram</span>
                    <a href="https://instagram.com/9lmntstudio" target="_blank" rel="noopener noreferrer" className="text-white font-bold hover:text-[#FF5500] transition-colors">
                      @9lmntstudio
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-[#0F0F0F] border border-[#222222] rounded-2xl p-6">
                <p className="text-[#00D2FF] text-xs font-mono font-bold uppercase tracking-widest mb-2">
                  Payment Security
                </p>
                <p className="text-gray-400 font-sans text-xs leading-relaxed">
                  Direct corporate billing via verified PayPal E-Commerce Services. Includes PayPal Pay Later / Pay in 4 installment financing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
