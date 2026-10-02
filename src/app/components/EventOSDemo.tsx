import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft, ShoppingBag, Zap, ArrowRight, X, Shield,
  Check, Music, Crown, Star, Users, BarChart2, Lock,
  MapPin, Brain, Heart, ThumbsUp, CheckSquare,
} from "lucide-react";
import {
  SOUND_CLASH_DATA, ARTIST_OS_DATA, CORPORATE_CLASH_DATA, RECEPTION_OS_DATA,
  COMEDIAN_OS_DATA, VENUE_OS_DATA, UNCLE_JAY_OS_DATA, GAMING_OS_DATA,
  EventOSData,
} from "./EventOSData";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GateOSCheckoutModal } from "./GateOSCheckoutModal";
import { SEO } from "./SEO";

interface EventOSDemoProps {
  onNavigate: (page: string) => void;
}

const THEMES: Record<string, EventOSData> = {
  nightlife: SOUND_CLASH_DATA,
  artist:    ARTIST_OS_DATA,
  corporate: CORPORATE_CLASH_DATA,
  wedding:   RECEPTION_OS_DATA,
  comedy:    COMEDIAN_OS_DATA,
  venue:     VENUE_OS_DATA,
  catering:  UNCLE_JAY_OS_DATA,
  gaming:    GAMING_OS_DATA,
};

const generateChartData = () =>
  Array.from({ length: 20 }, (_, i) => ({
    time: i,
    value: 40 + Math.random() * 40 + (i > 15 ? 20 : 0),
  }));

/* ── Static demo data ──────────────────────────────────────── */
const REVENUE_COMPARISON = [
  { month: "Jan", Manual: 12000, EventOS: 28000 },
  { month: "Feb", Manual: 11500, EventOS: 37000 },
  { month: "Mar", Manual: 13000, EventOS: 54000 },
  { month: "Apr", Manual: 12800, EventOS: 71000 },
  { month: "May", Manual: 14000, EventOS: 88000 },
  { month: "Jun", Manual: 12000, EventOS: 101000 },
];

const TICKET_VELOCITY = [
  { time: "8PM", tickets: 45 },
  { time: "9PM", tickets: 122 },
  { time: "10PM", tickets: 285 },
  { time: "11PM", tickets: 430 },
  { time: "12AM", tickets: 512 },
  { time: "1AM",  tickets: 580 },
];

const getVotePacks = (themeId: string) => {
  const packs: Record<string, any[]> = {
    nightlife: [
      { id: "starter", emoji: "🗳️", name: "Starter Pack",  votes: 5,   price: 2,  cpp: "0.40", popular: false },
      { id: "hype",    emoji: "🔥", name: "Hype Pack",     votes: 20,  price: 5,  cpp: "0.25", popular: true  },
      { id: "power",   emoji: "⚡", name: "Power Pack",    votes: 50,  price: 10, cpp: "0.20", popular: false },
      { id: "squad",   emoji: "👑", name: "Squad Pack",    votes: 100, price: 15, cpp: "0.15", popular: false },
    ],
    corporate: [
      { id: "angel", emoji: "💼", name: "Angel Vote",  votes: 10,   price: 5,  cpp: "0.50", popular: false },
      { id: "series-a", emoji: "📈", name: "Series A Pack", votes: 50,  price: 20, cpp: "0.40", popular: true  },
      { id: "venture", emoji: "🚀", name: "Venture Pack", votes: 100, price: 35, cpp: "0.35", popular: false },
      { id: "ipo", emoji: "💎", name: "IPO Pack", votes: 250, price: 75, cpp: "0.30", popular: false },
    ],
    wedding: [
      { id: "toast", emoji: "🥂", name: "Toast Pack",  votes: 10,   price: 5,  cpp: "0.50", popular: false },
      { id: "bouquet", emoji: "💐", name: "Bouquet Pack", votes: 25,  price: 10, cpp: "0.40", popular: true  },
      { id: "champagne", emoji: "🍾", name: "Champagne Pack", votes: 50, price: 15, cpp: "0.30", popular: false },
      { id: "honeymoon", emoji: "✈️", name: "Honeymoon Fund", votes: 100, price: 25, cpp: "0.25", popular: false },
    ],
    comedy: [
      { id: "giggle", emoji: "😄", name: "Giggle Pack",  votes: 5,   price: 2,  cpp: "0.40", popular: false },
      { id: "laugh", emoji: "😂", name: "Belly Laugh", votes: 20,  price: 5,  cpp: "0.25", popular: true  },
      { id: "rofl", emoji: "🤣", name: "ROFL Pack", votes: 50, price: 10, cpp: "0.20", popular: false },
      { id: "ovation", emoji: "👏", name: "Standing Ovation", votes: 100, price: 15, cpp: "0.15", popular: false },
    ],
    venue: [
      { id: "drink", emoji: "🍸", name: "Drink Token",  votes: 1,   price: 10,  cpp: "10.00", popular: false },
      { id: "bottle", emoji: "🍾", name: "Bottle Service", votes: 1,  price: 50, cpp: "50.00", popular: true  },
      { id: "vip-table", emoji: "👑", name: "VIP Table Upgrade", votes: 1, price: 150, cpp: "150.00", popular: false },
      { id: "event", emoji: "🎉", name: "Full Event Package", votes: 1, price: 500, cpp: "500.00", popular: false },
    ],
    catering: [
      { id: "taste", emoji: "🍽️", name: "Taste Vote",  votes: 5,   price: 2,  cpp: "0.40", popular: false },
      { id: "foodie", emoji: "😋", name: "Foodie Pack", votes: 20,  price: 5,  cpp: "0.25", popular: true  },
      { id: "chef", emoji: "👨‍🍳", name: "Chef's Choice", votes: 50, price: 10, cpp: "0.20", popular: false },
      { id: "critic", emoji: "⭐", name: "Food Critic", votes: 100, price: 15, cpp: "0.15", popular: false },
    ],
    gaming: [
      { id: "cheer", emoji: "⚡", name: "Cheer Pack",  votes: 10,   price: 2,  cpp: "0.20", popular: false },
      { id: "power", emoji: "🔥", name: "Power Boost", votes: 50,  price: 5,  cpp: "0.10", popular: true  },
      { id: "mega", emoji: "💎", name: "Mega Boost", votes: 200, price: 15, cpp: "0.08", popular: false },
      { id: "sponsor", emoji: "👑", name: "Sponsor Pack", votes: 500, price: 30, cpp: "0.06", popular: false },
    ],
  };
  return packs[themeId] || packs.nightlife;
};

const INITIAL_TIP_FEED = [
  { id: 1, emoji: "🔥", label: "Table 7",   time: "just now", amount: 50  },
  { id: 2, emoji: "💜", label: "Sarah K.",  time: "just now", amount: 20  },
  { id: 3, emoji: "👑", label: "Anonymous", time: "just now", amount: 100 },
];

const INITIAL_QA = [
  { id: 1, votes: 24, q: "How do I upgrade to a VIP table right now?",   from: "Table 5",   answered: true,  answer: "Tap 'VIP Upgrade' in the app or see our host near the bar — we have 2 tables left!" },
  { id: 2, votes: 17, q: "Will there be a second round of the battle?",   from: "Anonymous", answered: false, answer: "" },
  { id: 3, votes: 9,  q: "Can I get a table extension past 2AM?",          from: "Sarah K.",  answered: false, answer: "" },
  { id: 4, votes: 6,  q: "Is the DJ taking requests all night?",           from: "Marcus J.", answered: false, answer: "" },
];

const getFeatures = (themeId: string) => {
  const features: Record<string, any[]> = {
    nightlife: [
      { icon: BarChart2,    label: "Real-time Analytics",  desc: "Live event metrics and revenue tracking"        },
      { icon: Users,        label: "Guest Management",      desc: "VIP lists, check-ins, capacity control"        },
      { icon: Lock,         label: "Smart Ticketing",       desc: "Dynamic pricing with surge detection"          },
      { icon: Shield,       label: "Fraud Prevention",      desc: "AI-powered ticket verification"                },
      { icon: MapPin,       label: "Multi-venue",           desc: "Manage all locations from one dashboard"       },
      { icon: Brain,        label: "AI Predictions",        desc: "Predict crowd flow and bar demand"             },
      { icon: CheckSquare,  label: "Vote Packs",            desc: "Monetized crowd voting — guests buy influence" },
      { icon: Heart,        label: "Tip the DJ",            desc: "Direct digital tips from fans to your DJ"      },
      { icon: Zap,          label: "Flash Offers",          desc: "Time-limited deals that spike revenue instantly"},
    ],
    corporate: [
      { icon: BarChart2,    label: "Pitch Analytics",      desc: "Track investor engagement in real-time"        },
      { icon: Users,        label: "Investor CRM",          desc: "Manage investor pipeline and follow-ups"       },
      { icon: Lock,         label: "Smart Commitments",     desc: "Digital LOIs and cap table integration"        },
      { icon: Shield,       label: "Due Diligence",         desc: "Secure document rooms and NDA tracking"        },
      { icon: MapPin,       label: "Multi-event",           desc: "Roadshow management across cities"             },
      { icon: Brain,        label: "Investor Matching",     desc: "AI-powered investor recommendations"           },
      { icon: CheckSquare,  label: "Vote Signals",          desc: "Track investor interest levels live"           },
      { icon: Heart,        label: "Warm Intros",           desc: "Facilitate investor connections"               },
      { icon: Zap,          label: "Flash Commitments",     desc: "Time-limited investment opportunities"         },
    ],
    wedding: [
      { icon: BarChart2,    label: "Guest Analytics",       desc: "Track RSVPs and guest engagement"              },
      { icon: Users,        label: "Seating Management",    desc: "Digital seating charts and table assignments"  },
      { icon: Lock,         label: "Registry Integration",  desc: "Sync with Zola, TheKnot, and more"             },
      { icon: Shield,       label: "Guest Privacy",         desc: "Secure photo sharing and memories"             },
      { icon: MapPin,       label: "Venue Coordination",    desc: "Timeline sync with vendors"                    },
      { icon: Brain,        label: "Song Predictions",      desc: "AI-curated playlist based on crowd"            },
      { icon: CheckSquare,  label: "Speech Voting",         desc: "Rate toasts and speeches live"                 },
      { icon: Heart,        label: "Honeymoon Fund",        desc: "Digital cash fund for the couple"              },
      { icon: Zap,          label: "Surprise Moments",      desc: "Coordinate flash mobs and surprises"           },
    ],
    comedy: [
      { icon: BarChart2,    label: "Laugh Tracking",        desc: "Measure crowd energy and reactions"            },
      { icon: Users,        label: "Audience Management",   desc: "Table assignments and VIP seating"             },
      { icon: Lock,         label: "Smart Ticketing",       desc: "Early bird and group discounts"                },
      { icon: Shield,       label: "Heckler Protection",    desc: "Mute button for disruptive guests"             },
      { icon: MapPin,       label: "Comedy Circuit",        desc: "Tour multiple venues seamlessly"               },
      { icon: Brain,        label: "Joke Analytics",        desc: "Track which bits kill and which bomb"          },
      { icon: CheckSquare,  label: "Roast Voting",          desc: "Crowd decides the winner"                      },
      { icon: Heart,        label: "Tip the Comic",         desc: "Direct digital tips to performers"             },
      { icon: Zap,          label: "Request a Roast",       desc: "Monetize audience participation"               },
    ],
    venue: [
      { icon: BarChart2,    label: "Capacity Tracking",     desc: "Real-time occupancy and fire code compliance"  },
      { icon: Users,        label: "Door Management",       desc: "Digital guest lists and ID verification"       },
      { icon: Lock,         label: "Table Reservations",    desc: "VIP bottle service and table management"       },
      { icon: Shield,       label: "Age Verification",      desc: "Digital ID scanning and validation"            },
      { icon: MapPin,       label: "Multi-venue Chain",     desc: "Manage multiple locations from one dashboard"  },
      { icon: Brain,        label: "Crowd Predictions",     desc: "Forecast busy nights and staff accordingly"    },
      { icon: CheckSquare,  label: "Event Booking",         desc: "Private event and buyout management"           },
      { icon: Heart,        label: "Host Tipping",          desc: "Tip pool management for staff"                 },
      { icon: Zap,          label: "Flash Promotions",      desc: "Happy hour and surge pricing"                  },
    ],
    catering: [
      { icon: BarChart2,    label: "Dish Analytics",        desc: "Track most popular menu items"                 },
      { icon: Users,        label: "Guest Dietary",         desc: "Manage allergies and preferences"              },
      { icon: Lock,         label: "Menu Customization",    desc: "Build custom menus per event"                  },
      { icon: Shield,       label: "Health Compliance",     desc: "Track food safety and certifications"          },
      { icon: MapPin,       label: "Multi-location",        desc: "Serve multiple events simultaneously"          },
      { icon: Brain,        label: "Taste Predictions",     desc: "AI menu recommendations per crowd"             },
      { icon: CheckSquare,  label: "Dish Voting",           desc: "Guests vote on their favorite courses"         },
      { icon: Heart,        label: "Tip the Chef",          desc: "Direct appreciation to kitchen staff"          },
      { icon: Zap,          label: "Live Auction",          desc: "Bid on private dinners and classes"            },
    ],
    gaming: [
      { icon: BarChart2,    label: "Tournament Analytics",  desc: "Track brackets, scores, and standings"         },
      { icon: Users,        label: "Player Registration",   desc: "Seeding, pools, and check-in management"       },
      { icon: Lock,         label: "Anti-cheat",            desc: "Match verification and replay review"          },
      { icon: Shield,       label: "Prize Distribution",    desc: "Automated payouts and tax forms"               },
      { icon: MapPin,       label: "Multi-game Support",    desc: "Run multiple tournaments at once"              },
      { icon: Brain,        label: "Match Predictions",     desc: "AI-powered bracket predictions"                },
      { icon: CheckSquare,  label: "Fantasy Draft",         desc: "Pick your team and compete"                    },
      { icon: Heart,        label: "Cheer for Players",     desc: "Support your favorites with cheers"            },
      { icon: Zap,          label: "Coaching Sessions",     desc: "Book time with pro players"                    },
    ],
  };
  return features[themeId] || features.nightlife;
};

const REVENUE_STREAMS = [
  { label: "Ticket Sales",    amount: "$52,000", pct: 82 },
  { label: "Bottle Service",  amount: "$38,000", pct: 72 },
  { label: "Vote Packs",      amount: "$14,200", pct: 54 },
  { label: "Song Requests",   amount: "$4,200",  pct: 22 },
  { label: "DJ Tips",         amount: "$2,840",  pct: 18 },
  { label: "VIP Upgrades",    amount: "$8,500",  pct: 33 },
];


/* ── Component ─────────────────────────────────────────────── */
export function EventOSDemo({ onNavigate }: EventOSDemoProps) {
  const [activeThemeId, setActiveThemeId] = useState<string>("nightlife");
  const activeData = THEMES[activeThemeId];
  const { theme, labels, contestants, liveStats, storeItems, requests, vipUsers } = activeData;

  /* existing state */
  const [votes, setVotes]               = useState({ [contestants[0].id]: activeData.contestants[0].initialVotes, [contestants[1].id]: activeData.contestants[1].initialVotes });
  const [hypeData, setHypeData]         = useState(generateChartData());
  const [showStoreModal, setShowStoreModal] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [chartWidth, setChartWidth]     = useState(0);
  const chartContainerRef               = useRef<HTMLDivElement>(null);

  /* new state */
  const [totalTips, setTotalTips]       = useState(284);
  const [tipFeed, setTipFeed]           = useState(INITIAL_TIP_FEED);
  const [customTip, setCustomTip]       = useState("");
  const [flashTime, setFlashTime]       = useState(12 * 60 + 39); // 12:39
  const [qaTab, setQaTab]               = useState<"qa" | "requests" | "birthdays">("qa");
  const [qaQuestions, setQaQuestions]   = useState(INITIAL_QA);
  const [qaInput, setQaInput]           = useState("");
  const [qaName, setQaName]             = useState("");
  const [upvoted, setUpvoted]           = useState<Set<number>>(new Set());
  
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  /* reset on theme change */
  useEffect(() => {
    setVotes({ [contestants[0].id]: contestants[0].initialVotes, [contestants[1].id]: contestants[1].initialVotes });
  }, [activeThemeId, contestants]);

  /* chart container sizing */
  useEffect(() => {
    if (!chartContainerRef.current) return;
    const ro = new ResizeObserver(entries => {
      for (const e of entries) { if (e.contentRect.width > 0) setChartWidth(e.contentRect.width); }
    });
    ro.observe(chartContainerRef.current);
    return () => ro.disconnect();
  }, []);

  /* live simulation */
  useEffect(() => {
    const iv = setInterval(() => {
      setVotes(prev => {
        const c = Math.random() > 0.5 ? 0.1 : -0.1;
        const [id1, id2] = [contestants[0].id, contestants[1].id];
        return { ...prev, [id1]: Math.min(90, Math.max(10, (prev[id1] || 50) + c)), [id2]: Math.min(90, Math.max(10, (prev[id2] || 50) - c)) };
      });
      setHypeData(prev => [...prev.slice(1), { time: prev[prev.length - 1].time + 1, value: 50 + Math.random() * 40 }]);
    }, 2000);
    return () => clearInterval(iv);
  }, [contestants]);

  /* flash offer countdown */
  useEffect(() => {
    const iv = setInterval(() => setFlashTime(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(iv);
  }, []);

  /* tip feed simulation */
  useEffect(() => {
    const names = ["Table 3", "Alex M.", "VIP 9", "DJ Fan", "Anonymous"];
    const emojis = ["🔥", "💜", "👑", "⚡", "🎵"];
    const iv = setInterval(() => {
      const amount = [5, 10, 20, 50][Math.floor(Math.random() * 4)];
      const entry = { id: Date.now(), emoji: emojis[Math.floor(Math.random() * emojis.length)], label: names[Math.floor(Math.random() * names.length)], time: "just now", amount };
      setTipFeed(prev => [entry, ...prev.slice(0, 4)]);
      setTotalTips(t => t + amount);
    }, 7000);
    return () => clearInterval(iv);
  }, []);

  const flashMins = String(Math.floor(flashTime / 60)).padStart(2, "0");
  const flashSecs = String(flashTime % 60).padStart(2, "0");

  const votePacks = getVotePacks(activeThemeId);
  const features = getFeatures(activeThemeId);

  const handleAction = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };

  const handleTip = (amount: number) => {
    setTotalTips(t => t + amount);
    const entry = { id: Date.now(), emoji: "🎵", label: "You", time: "just now", amount };
    setTipFeed(prev => [entry, ...prev.slice(0, 4)]);
    handleAction(`Tip of $${amount} sent to the DJ!`);
  };

  const handleQASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim()) return;
    const newQ = { id: Date.now(), votes: 0, q: qaInput.trim(), from: qaName.trim() || "Anonymous", answered: false, answer: "" };
    setQaQuestions(prev => [newQ, ...prev]);
    setQaInput(""); setQaName("");
    handleAction("Question submitted live!");
  };

  const handleUpvote = (id: number) => {
    if (upvoted.has(id)) return;
    setUpvoted(prev => new Set([...prev, id]));
    setQaQuestions(prev => prev.map(q => q.id === id ? { ...q, votes: q.votes + 1 } : q));
  };

  const p = theme.primary;

  return (
    <div className={`min-h-screen font-sans text-white overflow-x-hidden relative transition-colors duration-500 ${theme.background}`}>
      <SEO 
        title="Gate OS Interactive Demo | 9LMNTS Studio" 
        description="Experience the future of event management with Gate OS. See live ticketing, real-time analytics, and futuristic modules in our interactive demo." 
      />
      {/* Ambient background */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1561474381-7a7ebb152e2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwY3liZXIlMjB0ZXh0dXJlfGVufDF8fHx8MTc3Nzk2NjczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')] bg-cover bg-center opacity-10 pointer-events-none mix-blend-screen" />
      <div className="fixed inset-0 pointer-events-none opacity-80" style={{ background: `linear-gradient(to bottom, transparent, ${theme.background.replace("bg-[", "").replace("]", "")})` }} />

      {/* ── NAV ──────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-40 border-b border-white/5 backdrop-blur-xl bg-black/80">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => onNavigate("portfolio")} className="flex items-center text-white/60 hover:text-white transition-colors text-sm font-medium">
            <ChevronLeft size={18} className="mr-1" /> Exit
          </button>
          <div className="flex items-center gap-3">
            <span className="font-bold tracking-wider text-lg hidden sm:block">
              {labels.appName} <span style={{ color: p }}>{labels.appSubtitle}</span>
            </span>
            <div className="flex bg-white/10 rounded-lg p-1 ml-2">
              {(Object.keys(THEMES) as Array<keyof typeof THEMES>).map(key => (
                <button key={key} onClick={() => setActiveThemeId(key)}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${activeThemeId === key ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"}`}>
                  {THEMES[key].name}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold animate-pulse">
              <span className="w-2 h-2 rounded-full bg-red-500" />{labels.liveBadge}
            </div>
            <button onClick={() => setShowStoreModal(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all border"
              style={{ borderColor: `${p}33`, backgroundColor: `${p}1A`, color: p }}>
              <ShoppingBag size={14} /><span className="hidden sm:inline">Store</span>
            </button>
          </div>
        </div>
        {/* Ticker */}
        <div className="border-y border-white/5 overflow-hidden py-2" style={{ backgroundColor: `${p}0D` }}>
          <div className="animate-marquee whitespace-nowrap flex gap-8 text-xs font-medium" style={{ color: `${p}CC` }}>
            {[...labels.ticker, ...labels.ticker].map((item, i) => <span key={i}>{item}</span>)}
          </div>
        </div>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 0%, ${p}18, transparent 70%)` }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-5 animate-pulse"
            style={{ borderColor: `${p}50`, color: p, backgroundColor: `${p}15` }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p }} /> Live Demo — {activeData.name.toUpperCase()}
          </div>
          <h1 className="text-5xl sm:text-7xl font-black italic uppercase leading-none mb-4">
            Your Events.<br />
            <span style={{ color: p }}>Supercharged.</span>
          </h1>
          <p className="text-white/60 text-xl mb-8 max-w-2xl mx-auto">
            EventOS turns your venue into a revenue machine. Watch these numbers climb in real time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <button onClick={() => setIsCheckoutModalOpen(true)}
              className="px-8 py-4 rounded-xl font-black uppercase tracking-wide text-black transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              style={{ backgroundColor: p }}>
              Get EventOS Now
            </button>
            <button onClick={() => handleAction("Demo booked!")}
              className="px-8 py-4 rounded-xl font-black uppercase tracking-wide border border-white/20 hover:border-white/50 transition-all">
              Book a Demo
            </button>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {(() => {
              const stats: Record<string, any[]> = {
                nightlife: [
                  { val: "878",    label: "Live Tickets",       badge: "LIVE" },
                  { val: "$128.5K",label: "Tonight's Revenue",  badge: null  },
                  { val: "127",    label: "Events This Month",  badge: null  },
                  { val: "4.9★",   label: "Avg Rating",         badge: null  },
                ],
                corporate: [
                  { val: "$1.2M",  label: "Capital Committed",  badge: "LIVE" },
                  { val: "342",    label: "Active Investors",   badge: null  },
                  { val: "24",     label: "Pitches This Month", badge: null  },
                  { val: "4.8★",   label: "Founder Rating",     badge: null  },
                ],
                wedding: [
                  { val: "156",    label: "Guests Checked In",  badge: "LIVE" },
                  { val: "$8,420", label: "Honeymoon Fund",     badge: null  },
                  { val: "89",     label: "Photos Shared",      badge: null  },
                  { val: "5.0★",   label: "Perfect Day",        badge: null  },
                ],
                comedy: [
                  { val: "300",    label: "Live Crowd",         badge: "LIVE" },
                  { val: "$4,250", label: "The Pot",            badge: null  },
                  { val: "4,821",  label: "Total Votes",        badge: null  },
                  { val: "😂😂😂", label: "Laugh Level",        badge: null  },
                ],
                venue: [
                  { val: "340/500",label: "Capacity",           badge: "LIVE" },
                  { val: "$52K",   label: "Bar Revenue",        badge: null  },
                  { val: "42",     label: "VIP Tables",         badge: null  },
                  { val: "4.7★",   label: "Service Rating",     badge: null  },
                ],
                catering: [
                  { val: "187",    label: "Guests Served",      badge: "LIVE" },
                  { val: "$9,944", label: "Event Revenue",      badge: null  },
                  { val: "1,247",  label: "Dish Votes",         badge: null  },
                  { val: "4.9★",   label: "Food Rating",        badge: null  },
                ],
                gaming: [
                  { val: "12.8K",  label: "Live Viewers",       badge: "LIVE" },
                  { val: "$25K",   label: "Prize Pool",         badge: null  },
                  { val: "256",    label: "Competitors",        badge: null  },
                  { val: "GF",     label: "Grand Finals",       badge: null  },
                ],
              };
              return (stats[activeThemeId] || stats.nightlife).map(s => (
              <div key={s.label} className="relative bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                {s.badge && (
                  <span className="absolute top-2 right-2 text-[9px] font-black px-1.5 py-0.5 rounded-full text-black" style={{ backgroundColor: p }}>
                    {s.badge}
                  </span>
                )}
                <div className="text-3xl font-black mb-1" style={{ color: p }}>{s.val}</div>
                <div className="text-white/50 text-xs font-medium uppercase tracking-wide">{s.label}</div>
              </div>
              ));
            })()}
          </div>
        </div>
      </section>

      {/* ── LIVE BENTO GRID ──────────────────────────────────── */}
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

          {/* 1. Battle Stage */}
          <div className={`md:col-span-8 md:row-span-2 relative group rounded-3xl overflow-hidden border border-white/10 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="absolute inset-0 opacity-50" style={{ background: `linear-gradient(135deg, ${p}1A, transparent)` }} />
            <div className="relative p-6 h-full flex flex-col">
              {/* Main Battle Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-sm font-bold tracking-widest uppercase mb-1" style={{ color: p }}>{labels.battleSubtitle}</h2>
                  <h1 className="text-3xl font-black italic">{labels.battleTitle}</h1>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono">12:45 REMAINING</div>
              </div>

              {/* Main Battle - Featured */}
              <div className="relative mb-6 pb-6 border-b border-white/5">
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {contestants.map((c, idx) => (
                    <div key={c.id} className="text-center relative">
                      <div className="relative mx-auto w-20 h-20 sm:w-28 sm:h-28 mb-3 rounded-full p-1 transition-all duration-500" style={{ background: `linear-gradient(135deg, ${c.color}, transparent)` }}>
                        <ImageWithFallback src={c.image} alt={c.name} className={`w-full h-full rounded-full object-cover border-4 ${theme.cardBg === "bg-[#1a2236]" ? "border-[#1a2236]" : "border-[#111]"}`} />
                        <div className={`absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center border border-white/10 ${theme.cardBg}`}>
                          <span className="text-xs font-bold" style={{ color: c.color }}>#{idx + 1}</span>
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black uppercase mb-1">{c.name}</h3>
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-3">{c.role}</p>
                      <div className="relative h-10 bg-white/5 rounded-xl overflow-hidden cursor-pointer hover:bg-white/10 transition-colors"
                        onClick={() => handleAction(`Voted for ${c.name}`)}>
                        <div className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out opacity-20" style={{ width: `${Math.round(votes[c.id] || 50)}%`, background: c.color }} />
                        <div className="relative flex items-center justify-between px-3 h-full">
                          <span className="font-bold text-xs">VOTE</span>
                          <span className="font-mono font-bold text-sm" style={{ color: c.color }}>{Math.round(votes[c.id] || 50)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-3xl font-black italic text-white/5 pointer-events-none">VS</div>
              </div>

              {/* Undercard Battles - 4 Smaller Battles */}
              <div>
                <h3 className="text-xs font-bold tracking-widest uppercase mb-3 text-white/40">UNDERCARD BATTLES</h3>
                <div className="grid grid-cols-2 gap-3">
                  {/* Undercard 1 */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => handleAction("Undercard battle clicked")}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Pixel Master</div>
                        <div className="text-[10px] text-white/40">Round 2</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-cyan-400">64%</div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all" style={{ width: '64%' }} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Neon Knight</div>
                        <div className="text-[10px] text-white/40">Round 2</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-purple-400">36%</div>
                    </div>
                  </div>

                  {/* Undercard 2 */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => handleAction("Undercard battle clicked")}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Vibe Chief</div>
                        <div className="text-[10px] text-white/40">Round 2</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-400">58%</div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 transition-all" style={{ width: '58%' }} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Bass Drop</div>
                        <div className="text-[10px] text-white/40">Round 2</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-orange-400">42%</div>
                    </div>
                  </div>

                  {/* Undercard 3 */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => handleAction("Undercard battle clicked")}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Gold Rush</div>
                        <div className="text-[10px] text-white/40">Round 3</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-yellow-400">71%</div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 transition-all" style={{ width: '71%' }} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Cosmic Flow</div>
                        <div className="text-[10px] text-white/40">Round 3</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-indigo-400">29%</div>
                    </div>
                  </div>

                  {/* Undercard 4 */}
                  <div className="bg-white/5 rounded-xl p-3 border border-white/5 hover:border-white/10 transition-colors cursor-pointer" onClick={() => handleAction("Undercard battle clicked")}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-pink-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Electric Rose</div>
                        <div className="text-[10px] text-white/40">Round 3</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-rose-400">45%</div>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-rose-500 to-pink-600 transition-all" style={{ width: '45%' }} />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-lime-500 to-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">Neon Jungle</div>
                        <div className="text-[10px] text-white/40">Round 3</div>
                      </div>
                      <div className="text-xs font-mono font-bold text-lime-400">55%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Live Activity */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider mb-4">Live Activity</h3>
            <div ref={chartContainerRef} className="w-full h-32 mb-4 relative min-w-0 overflow-hidden">
              {chartWidth > 0 && (
                <AreaChart width={chartWidth} height={128} data={hypeData}>
                  <defs>
                    <linearGradient id="colorHype" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor={p} stopOpacity={0.3} />
                      <stop offset="95%" stopColor={p} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area key="area-hype" type="monotone" dataKey="value" stroke={p} fillOpacity={1} fill="url(#colorHype)" strokeWidth={2} />
                  <YAxis key="y-hype" hide domain={["dataMin", "dataMax"]} />
                </AreaChart>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                ...liveStats.slice(0, 3).map(s => ({ label: s.label, val: s.value })),
                { label: "Request Line", val: String(requests.length > 0 ? requests[0].votes : 142) },
              ].map(s => (
                <div key={s.label} className="p-3 rounded-xl bg-white/5 border border-white/5">
                  <div className="text-[10px] font-bold uppercase text-white/40 mb-1">{s.label}</div>
                  <div className="text-lg font-bold" style={{ color: p }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Store */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.storeTitle}</h3>
              <button onClick={() => setShowStoreModal(true)} className="text-xs font-bold hover:text-white transition-colors" style={{ color: p }}>VIEW ALL</button>
            </div>
            <div className="space-y-3">
              {storeItems.slice(0, 3).map(item => (
                <button key={item.id} onClick={() => item.popular ? setShowStoreModal(true) : handleAction(`Selected: ${item.name}`)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group text-left relative overflow-hidden hover:border-white/20">
                  {item.popular && <div className="absolute top-0 right-0 px-2 py-0.5 text-black text-[8px] font-bold rounded-bl-lg" style={{ backgroundColor: p }}>HOT</div>}
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform" style={{ backgroundColor: `${item.color}1A`, color: item.color }}>
                    <item.icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-[10px] text-white/40">{item.desc}</div>
                  </div>
                  <div className="text-sm font-bold text-white/90">${item.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Request Line */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 overflow-hidden transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.requestTitle}</h3>
              <Music size={14} className="text-white/40" />
            </div>
            <div className="space-y-3 mb-4">
              {requests.map(req => (
                <div key={req.id} className="flex items-center justify-between group cursor-pointer" onClick={() => handleAction(`Upvoted ${req.song}`)}>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-mono text-white/30 group-hover:text-white transition-colors">0{req.id}</div>
                    <div>
                      <div className="text-sm font-medium leading-tight group-hover:text-white transition-colors" style={{ color: req.votes > 50 ? theme.secondary : "white" }}>{req.song}</div>
                      <div className="text-xs text-white/40">{req.artist}</div>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-md bg-white/5 text-xs font-mono text-white/60 group-hover:bg-white/10 transition-colors">{req.votes}</div>
                </div>
              ))}
            </div>
            <button onClick={() => handleAction("Request Modal Opened")} className="w-full py-2 rounded-lg border border-dashed border-white/20 text-xs font-bold text-white/40 hover:text-white hover:border-white/40 transition-all">
              + ADD REQUEST
            </button>
          </div>

          {/* 5. VIP Lounge */}
          <div className={`md:col-span-4 rounded-3xl border border-white/10 backdrop-blur-xl p-5 transition-colors duration-500 ${theme.cardBg}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-white/60 uppercase tracking-wider">{labels.vipTitle}</h3>
              <Crown size={14} className="text-[#FFD700]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {vipUsers.map((guest, i) => (
                <div key={guest.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <ImageWithFallback src={guest.img} alt={guest.name} className="w-full h-full object-cover" onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-black" />
                  </div>
                  <div>
                    <div className="text-xs font-bold group-hover:text-white transition-colors">{guest.name}</div>
                    <div className="text-[10px] text-white/40">{guest.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Brand Promo */}
          <div className="md:col-span-4 rounded-3xl border border-white/10 p-6 text-black flex flex-col justify-between relative overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${p}, ${theme.secondary})` }}>
            <div className="absolute top-0 right-0 p-8 opacity-10"><Zap size={120} /></div>
            <div className="relative z-10">
              <h3 className="text-2xl font-black italic uppercase leading-none mb-2">UNLOCK<br />FULL ACCESS</h3>
              <p className="text-sm font-medium opacity-80">Get the full EventOS experience for your next production.</p>
            </div>
            <button onClick={() => onNavigate("start-project")}
              className="relative z-10 mt-6 w-full py-3 bg-black text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
              Start Your Project <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </main>

      {/* ── VOTE PACKS ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-4" style={{ borderColor: `${p}50`, color: p, backgroundColor: `${p}15` }}>
            Core Revenue Driver · Used in 12/12 Events
          </div>
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">
            {activeThemeId === 'venue' ? 'Service Packages' :
             activeThemeId === 'catering' ? 'Dish Power Votes' :
             activeThemeId === 'gaming' ? 'Cheer Packs' :
             activeThemeId === 'comedy' ? 'Laugh Packs' :
             activeThemeId === 'corporate' ? 'Investment Signals' :
             activeThemeId === 'wedding' ? 'Guest Contributions' :
             'Vote Packs'}
          </h2>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {activeThemeId === 'venue' ? 'Premium services and upgrades for your night out' :
             activeThemeId === 'catering' ? 'Boost your favorite dishes and influence the menu' :
             activeThemeId === 'gaming' ? 'Support your favorite players with cheer power' :
             activeThemeId === 'comedy' ? 'Vote for the funniest comic and request roasts' :
             activeThemeId === 'corporate' ? 'Signal investment interest and unlock access' :
             activeThemeId === 'wedding' ? 'Contribute to the celebration and honeymoon fund' :
             'Guests buy votes to crown their favourite. Pure monetised engagement.'}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
          {[{ val: "$1,423", label: "vote revenue tonight" }, { val: "2,847", label: "Votes Cast" }, { val: "18 votes", label: "Avg per Guest" }].map(s => (
            <div key={s.label} className="text-center bg-white/5 rounded-2xl p-5 border border-white/10">
              <div className="text-2xl font-black" style={{ color: p }}>{s.val}</div>
              <div className="text-white/40 text-xs mt-1 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Pack cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {votePacks.map(pack => (
            <div key={pack.id} className={`relative rounded-2xl border p-6 transition-all hover:-translate-y-1 cursor-pointer ${pack.popular ? "bg-white/10 border-white/30 scale-105 shadow-[0_0_40px_rgba(255,255,255,0.08)]" : "bg-white/5 border-white/10 hover:border-white/30"}`}
              style={pack.popular ? { borderColor: p } : undefined}
              onClick={() => handleAction(`Purchased ${pack.name}`)}>
              {pack.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-black text-[10px] font-black uppercase rounded-full whitespace-nowrap" style={{ backgroundColor: p }}>
                  ⚡ MOST POPULAR
                </div>
              )}
              <div className="text-3xl mb-3">{pack.emoji}</div>
              <h3 className="font-black text-lg mb-0.5">{pack.name}</h3>
              <p className="text-white/40 text-xs mb-4">{pack.votes} votes · ${pack.cpp}¢/vote</p>
              <div className="text-3xl font-black mb-4" style={{ color: pack.popular ? p : "white" }}>${pack.price}</div>
              <button className="w-full py-2.5 rounded-xl text-sm font-bold transition-all" style={{ backgroundColor: pack.popular ? p : "rgba(255,255,255,0.1)", color: pack.popular ? "black" : "white" }}>
                Buy Pack
              </button>
            </div>
          ))}
        </div>

        {/* Flash Offer */}
        <div className="mt-10 max-w-2xl mx-auto rounded-2xl border p-6 relative overflow-hidden" style={{ borderColor: `${p}50`, backgroundColor: `${p}10` }}>
          <div className="absolute right-0 top-0 w-32 h-32 opacity-10" style={{ background: `radial-gradient(circle, ${p}, transparent)` }} />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Zap size={14} style={{ color: p }} />
                <span className="text-xs font-black uppercase tracking-widest" style={{ color: p }}>⚡ Flash Offer — Live Right Now</span>
              </div>
              <h3 className="text-white font-black text-xl">VIP Table Upgrade — 50% Off</h3>
              <p className="text-white/50 text-sm mt-1">Table 12 just became available · Includes bottle service + priority service</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center">
                <div className="text-3xl font-black font-mono" style={{ color: p }}>{flashMins}:{flashSecs}</div>
                <div className="text-white/40 text-xs">remaining</div>
              </div>
              <button onClick={() => handleAction("VIP Table claimed!")} className="px-6 py-3 rounded-xl font-black text-black whitespace-nowrap hover:opacity-90 transition-opacity" style={{ backgroundColor: p }}>
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TIP SECTION (Dynamic based on event type) ───────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">
              {activeThemeId === 'venue' ? 'Tip Your Server' :
               activeThemeId === 'catering' ? 'Tip the Chef' :
               activeThemeId === 'gaming' ? 'Support Players' :
               activeThemeId === 'comedy' ? 'Tip the Comic' :
               activeThemeId === 'corporate' ? 'Angel Backing' :
               activeThemeId === 'wedding' ? 'Gift the Couple' :
               'Tip the DJ'}
            </h2>
            <p className="text-white/60 text-lg">
              {activeThemeId === 'venue' ? 'Appreciate great service with direct digital tips' :
               activeThemeId === 'catering' ? 'Show love to the kitchen crew creating amazing food' :
               activeThemeId === 'gaming' ? 'Cheer for your favorite players and boost their prize pool' :
               activeThemeId === 'comedy' ? 'Support the comics making you laugh all night' :
               activeThemeId === 'corporate' ? 'Signal strong interest with early commitments' :
               activeThemeId === 'wedding' ? 'Contribute to their honeymoon and new life together' :
               'Digital tips direct from fans — your DJ earns more, guests connect deeper'}
            </p>
            <div className="inline-flex items-center gap-2 mt-4 text-2xl font-black" style={{ color: p }}>${totalTips} <span className="text-white/40 text-sm font-normal">
              {activeThemeId === 'corporate' ? 'committed tonight' :
               activeThemeId === 'wedding' ? 'in gifts tonight' :
               'in tips tonight'}
            </span></div>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Tip panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-black text-black text-sm" style={{ backgroundColor: p }}>
                  {activeThemeId === 'venue' ? '🍸' :
                   activeThemeId === 'catering' ? '👨‍🍳' :
                   activeThemeId === 'gaming' ? '🎮' :
                   activeThemeId === 'comedy' ? '🎤' :
                   activeThemeId === 'corporate' ? '💼' :
                   activeThemeId === 'wedding' ? '💑' :
                   'DJ'}
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    {activeThemeId === 'venue' ? 'SERVICE · HOST' :
                     activeThemeId === 'catering' ? 'KITCHEN · CHEF' :
                     activeThemeId === 'gaming' ? 'ESPORTS · PLAYER' :
                     activeThemeId === 'comedy' ? 'COMEDY · PERFORMER' :
                     activeThemeId === 'corporate' ? 'STARTUP · FOUNDER' :
                     activeThemeId === 'wedding' ? 'COUPLE · NEWLYWEDS' :
                     'SOUND · DJ'}
                  </div>
                  <div className="text-sm font-bold">
                    {activeThemeId === 'venue' ? 'Serving Table 12 · 42 guests' :
                     activeThemeId === 'catering' ? 'Cooking live · 187 guests' :
                     activeThemeId === 'gaming' ? 'Playing finals · 12.8K viewers' :
                     activeThemeId === 'comedy' ? 'Performing now · 300 crowd' :
                     activeThemeId === 'corporate' ? 'Pitching now · 342 investors' :
                     activeThemeId === 'wedding' ? 'Celebrating · 156 guests' :
                     'Playing now · 878 listeners'}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="w-1 rounded-full transition-all" style={{ height: `${6 + Math.random() * 16}px`, backgroundColor: p, opacity: 0.7 + Math.random() * 0.3 }} />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/50 text-xs uppercase tracking-widest mb-3 font-bold">Quick Tip</p>
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[5, 10, 20, 50].map(amt => (
                  <button key={amt} onClick={() => handleTip(amt)}
                    className="py-3 rounded-xl border border-white/20 text-sm font-black hover:text-black transition-all hover:-translate-y-0.5"
                    style={{ backgroundColor: "transparent" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = p; (e.currentTarget as HTMLButtonElement).style.color = "black"; (e.currentTarget as HTMLButtonElement).style.borderColor = p; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "white"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}>
                    ${amt}
                  </button>
                ))}
              </div>
              <form onSubmit={e => { e.preventDefault(); const a = parseInt(customTip); if (a > 0) { handleTip(a); setCustomTip(""); }}} className="flex gap-2">
                <input value={customTip} onChange={e => setCustomTip(e.target.value)} type="number" min="1" placeholder="Custom amount..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:border-white/30 outline-none" />
                <button type="submit" className="px-5 py-2.5 rounded-xl font-bold text-black text-sm" style={{ backgroundColor: p }}>Send</button>
              </form>
            </div>

            {/* Live tip feed */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">Live Tip Feed</h3>
                <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-black" style={{ backgroundColor: p }}>LIVE</span>
              </div>
              <div className="space-y-3 mb-6">
                <AnimatePresence>
                  {tipFeed.slice(0, 5).map(tip => (
                    <motion.div key={tip.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{tip.emoji}</span>
                        <div>
                          <div className="text-sm font-bold">{tip.label}</div>
                          <div className="text-xs text-white/40">{tip.time}</div>
                        </div>
                      </div>
                      <div className="text-lg font-black" style={{ color: p }}>${tip.amount}</div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                {[{ l: "Total tips tonight", v: `$${totalTips}` }, { l: "Avg Tip", v: "$95" }, { l: "Top Tip", v: "$100" }].map(s => (
                  <div key={s.l} className="text-center">
                    <div className="text-lg font-black" style={{ color: p }}>{s.v}</div>
                    <div className="text-[10px] text-white/40 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── LIVE AUDIENCE INTERACTION (Q&A) ─────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">
            {activeThemeId === 'gaming' ? 'Live Tournament Feed' :
             activeThemeId === 'corporate' ? 'Investor Q&A' :
             activeThemeId === 'catering' ? 'Ask the Chef' :
             activeThemeId === 'comedy' ? 'Roast Requests' :
             activeThemeId === 'venue' ? 'Table Requests' :
             activeThemeId === 'wedding' ? 'Guest Messages' :
             'Live Audience Interaction'}
          </h2>
          <p className="text-white/60 text-lg">
            {activeThemeId === 'gaming' ? 'Match predictions · Fantasy scores · Cosplay voting' :
             activeThemeId === 'corporate' ? 'Due diligence questions answered live by founders' :
             activeThemeId === 'catering' ? 'Recipe secrets · Technique questions · Booking inquiries' :
             activeThemeId === 'comedy' ? 'Request roasts · Vote on comics · Submit heckles' :
             activeThemeId === 'venue' ? 'Bottle service · VIP upgrades · Special requests' :
             activeThemeId === 'wedding' ? 'Well wishes · Song requests · Photo sharing' :
             'Q&A · Requests · Birthdays — real-time guest engagement, every voice heard'}
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {(["qa", "requests", "birthdays"] as const).map(tab => {
              const counts: Record<string, number> = { qa: 4, requests: 4, birthdays: 3 };
              const icons: Record<string, string> = { qa: "Q&A", requests: "Requests", birthdays: "🎂" };
              return (
                <button key={tab} onClick={() => setQaTab(tab)}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-colors ${qaTab === tab ? "text-white border-b-2" : "text-white/40 hover:text-white"}`}
                  style={qaTab === tab ? { borderColor: p } : undefined}>
                  {icons[tab]} <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: qaTab === tab ? `${p}30` : "rgba(255,255,255,0.1)", color: qaTab === tab ? p : "rgba(255,255,255,0.4)" }}>{counts[tab]}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6">
            {qaTab === "qa" && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-black" style={{ backgroundColor: p }}>LIVE</span>
                  <span className="text-white/40 text-xs">Questions answered in real time by the host</span>
                </div>
                {qaQuestions.map(q => (
                  <div key={q.id} className={`p-4 rounded-xl border transition-colors ${q.answered ? "bg-white/5 border-white/10" : "bg-white/3 border-white/5"}`}>
                    <div className="flex items-start gap-3">
                      <button onClick={() => handleUpvote(q.id)}
                        className={`flex-shrink-0 flex flex-col items-center gap-0.5 p-2 rounded-lg transition-all ${upvoted.has(q.id) ? "text-white" : "text-white/40 hover:text-white"}`}
                        style={upvoted.has(q.id) ? { backgroundColor: `${p}25`, color: p } : undefined}>
                        <ThumbsUp size={14} />
                        <span className="text-xs font-bold">{q.votes}</span>
                      </button>
                      <div className="flex-1">
                        {q.answered && <span className="text-[9px] font-black px-2 py-0.5 rounded-full text-black mr-2" style={{ backgroundColor: p }}>⭐ FEATURED</span>}
                        <p className="text-sm font-medium text-white mt-1">{q.q}</p>
                        <p className="text-xs text-white/40 mt-0.5">from {q.from}</p>
                        {q.answered && <p className="text-xs text-white/60 mt-2 bg-white/5 rounded-lg p-2">{q.answer} <span style={{ color: p }} className="font-bold">✓ Answered</span></p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {qaTab === "requests" && (
              <div className="space-y-3">
                {requests.map(r => (
                  <div key={r.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                    <div>
                      <p className="text-sm font-bold">{r.song}</p>
                      <p className="text-xs text-white/40">{r.artist}</p>
                    </div>
                    <button onClick={() => handleAction(`Upvoted ${r.song}`)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/5 hover:bg-white/10 transition-colors">
                      <ThumbsUp size={12} /> {r.votes}
                    </button>
                  </div>
                ))}
              </div>
            )}
            {qaTab === "birthdays" && (
              <div className="text-center py-8 text-white/40">
                <div className="text-4xl mb-3">🎂</div>
                <p className="font-bold">3 Birthday Wishes Tonight</p>
                <p className="text-sm mt-2">Shoutouts are live — tap to celebrate!</p>
              </div>
            )}

            {/* Ask a question form (Q&A only) */}
            {qaTab === "qa" && (
              <form onSubmit={handleQASubmit} className="mt-6 pt-6 border-t border-white/10">
                <h4 className="text-sm font-bold mb-3">Ask a Question <span className="text-white/40 font-normal text-xs">— The host will answer live</span></h4>
                <input value={qaName} onChange={e => setQaName(e.target.value)} type="text" placeholder="Your name (optional)"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 outline-none mb-3" />
                <div className="flex gap-2">
                  <input value={qaInput} onChange={e => setQaInput(e.target.value)} type="text" placeholder="Type your question..." required
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:border-white/30 outline-none" />
                  <button type="submit" className="px-5 py-3 rounded-xl font-bold text-black text-sm flex-shrink-0" style={{ backgroundColor: p }}>
                    Ask Live
                  </button>
                </div>
                <p className="text-white/30 text-xs mt-2">Your submission goes live instantly</p>
              </form>
            )}

            {/* Activity footer */}
            <div className="flex gap-4 mt-5 pt-5 border-t border-white/10">
              {[{ val: qaQuestions.length, label: "Questions" }, { val: 4, label: "Requests" }, { val: 3, label: "Wishes" }].map(s => (
                <div key={s.label} className="flex items-center gap-1.5 text-sm">
                  <span className="font-black" style={{ color: p }}>{s.val}</span>
                  <span className="text-white/40">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ─────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">EventOS vs. Doing It Manually</h2>
            <p className="text-white/60 text-lg">The numbers don't lie</p>
          </div>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 text-center bg-white/5 border-b border-white/10 py-4 text-xs font-black uppercase tracking-widest">
              <div className="text-white/40">Manual</div>
              <div className="text-white/60">Metric</div>
              <div style={{ color: p }}>EventOS ⚡</div>
            </div>
            {[
              { manual: "$12K",    label: "Revenue per Event",  eventos: "$47K",     highlight: true  },
              { manual: "3 days",  label: "Setup Time",          eventos: "2 hours",  highlight: false },
              { manual: "18%",     label: "No-show Rate",        eventos: "3%",       highlight: false },
              { manual: "12 people",label: "Staff Required",    eventos: "4 people", highlight: false },
              { manual: "High",    label: "Ticket Fraud",        eventos: "Near Zero",highlight: true  },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-3 text-center py-5 border-b border-white/5 transition-colors ${row.highlight ? "" : ""}`}>
                <div className="text-white/40 text-sm font-medium">{row.manual}</div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-wide">{row.label}</div>
                <div className="text-sm font-black" style={{ color: p }}>{row.eventos}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHARTS ───────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue comparison */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-black text-lg uppercase mb-1">Revenue: Manual vs EventOS</h3>
            <p className="text-white/40 text-sm mb-6">Same events, 3.9× more revenue</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={REVENUE_COMPARISON} barGap={4}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis key="x" dataKey="month" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis key="y" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${v / 1000}K`} />
                <Tooltip key="tooltip" formatter={(v: any) => `$${(v / 1000).toFixed(0)}K`} contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} />
                <Legend key="legend" wrapperStyle={{ color: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                <Bar key="bar-manual"  dataKey="Manual"  fill="rgba(255,255,255,0.15)" radius={[4, 4, 0, 0] as any} />
                <Bar key="bar-eventos" dataKey="EventOS" fill={p} radius={[4, 4, 0, 0] as any} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ticket sales velocity */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-black text-lg uppercase mb-1">Ticket Sales Velocity</h3>
            <p className="text-white/40 text-sm mb-6">Tonight's event — selling faster than ever</p>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={TICKET_VELOCITY}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis key="x" dataKey="time" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis key="y" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip key="tooltip" contentStyle={{ background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "white" }} />
                <Line key="line-tickets" type="monotone" dataKey="tickets" stroke={p} strokeWidth={3} dot={{ fill: p, strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">Everything You Need</h2>
            <p className="text-white/60 text-lg">One platform to run your entire event operation</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(f => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors" style={{ backgroundColor: `${p}20` }}>
                    <Icon size={18} style={{ color: p }} />
                  </div>
                  <div>
                    <h4 className="font-black text-sm mb-1">{f.label}</h4>
                    <p className="text-white/40 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── REVENUE STREAMS ──────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">Every Revenue Stream, One Platform</h2>
          <p className="text-white/60 text-lg">EventOS unlocks 6 ways to make money at every event</p>
        </div>
        <div className="space-y-4 mb-8">
          {REVENUE_STREAMS.map(s => (
            <div key={s.label} className="flex items-center gap-4">
              <div className="w-32 text-sm font-bold text-right text-white/70 flex-shrink-0">{s.label}</div>
              <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden relative">
                <motion.div className="h-full rounded-full" initial={{ width: 0 }} whileInView={{ width: `${s.pct}%` }} transition={{ duration: 1, ease: "easeOut" }} viewport={{ once: true }}
                  style={{ background: `linear-gradient(90deg, ${p}, ${theme.secondary})` }} />
                <span className="absolute inset-0 flex items-center px-4 text-xs font-bold text-white/80">{s.amount}</span>
              </div>
              <div className="w-12 text-xs font-bold text-right flex-shrink-0" style={{ color: p }}>{s.pct}%</div>
            </div>
          ))}
        </div>
        <div className="text-center py-5 rounded-2xl border border-white/10 bg-white/5">
          <div className="text-xs text-white/40 uppercase tracking-widest mb-1">Total Event Revenue</div>
          <div className="text-4xl font-black" style={{ color: p }}>$119,740</div>
        </div>
      </section>

      {/* ── GUEST SATISFACTION ───────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-black italic uppercase mb-3">Guest Satisfaction</h2>
          <p className="text-white/60 text-lg mb-12">EventOS doesn't just manage your event — it makes your guests love it.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Excellent", pct: 68, col: p },
              { label: "Good",      pct: 22, col: theme.secondary },
              { label: "Average",   pct: 8,  col: "#f59e0b" },
              { label: "Poor",      pct: 2,  col: "#ef4444" },
            ].map(s => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <div className="text-3xl font-black mb-1" style={{ color: s.col }}>{s.pct}%</div>
                <div className="text-white/50 text-xs uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-black" style={{ borderColor: `${p}50`, color: p, backgroundColor: `${p}15` }}>
            <Star size={16} fill={p} /> 90% Excellent + Good ratings
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 100%, ${p}18, transparent 70%)` }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold uppercase tracking-widest mb-6" style={{ borderColor: `${p}50`, color: p, backgroundColor: `${p}15` }}>
            Limited availability — serious venues only
          </div>
          <h2 className="text-5xl sm:text-6xl font-black italic uppercase leading-none mb-4">
            Ready to 4× Your<br />
            <span style={{ color: p }}>Event Revenue?</span>
          </h2>
          <p className="text-white/60 text-xl mb-12 max-w-2xl mx-auto">
            Join 200+ venues using EventOS. Get set up in 2 hours, not 2 days.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 text-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative mt-4 md:mt-0">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center font-black text-black z-10" style={{ backgroundColor: p }}>1</div>
              <h3 className="font-black text-lg mb-2">Deposit & Reserve</h3>
              <p className="text-white/50 text-sm leading-relaxed">Lock in your date. We instantly provision your dedicated platform environment.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative mt-4 md:mt-0">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center font-black text-black z-10" style={{ backgroundColor: p }}>2</div>
              <h3 className="font-black text-lg mb-2">Unlock "The Gate"</h3>
              <p className="text-white/50 text-sm leading-relaxed">Access your basic OS immediately to start managing RSVPs, building hype, and collecting data before the event.</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 relative mt-4 md:mt-0" style={{ borderColor: `${p}50`, backgroundColor: `${p}0A` }}>
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center font-black text-black z-10 shadow-[0_0_15px_rgba(255,255,255,0.3)]" style={{ backgroundColor: p }}>3</div>
              <h3 className="font-black text-lg mb-2" style={{ color: p }}>Full Event OS Live</h3>
              <p className="text-white/50 text-sm leading-relaxed">On event day, The Gate transforms into the full Event OS, activating live voting, digital tipping, and real-time analytics.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <button onClick={() => setIsCheckoutModalOpen(true)}
              className="px-10 py-4 rounded-xl font-black uppercase tracking-wide text-black text-lg hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all"
              style={{ backgroundColor: p }}>
              Get EventOS
            </button>
            <button onClick={() => handleAction("Free consultation booked!")}
              className="px-10 py-4 rounded-xl font-black uppercase tracking-wide border border-white/20 hover:border-white/50 text-lg transition-all">
              Book Free Consultation
            </button>
          </div>
          <p className="text-white/30 text-sm">No contracts. Cancel anytime. Results in first event.</p>
        </div>
      </section>

      {/* ── STORE MODAL ──────────────────────────────────────── */}
      <AnimatePresence>
        {showStoreModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setShowStoreModal(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className={`border border-white/10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative ${theme.cardBg}`}
              onClick={e => e.stopPropagation()}>
              <button onClick={() => setShowStoreModal(false)} className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors z-20"><X size={24} /></button>
              <div className="grid grid-cols-1 md:grid-cols-12 h-full min-h-[500px]">
                <div className="md:col-span-4 bg-[#0A0A0A] p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20" style={{ background: `linear-gradient(135deg, ${p}, transparent)` }} />
                  <div className="relative z-10">
                    <h2 className="text-3xl font-black italic text-white mb-2 uppercase">{labels.storeTitle}</h2>
                    <p className="text-white/60 text-sm mb-8">Boost your influence. Get noticed. Unlock exclusive rewards.</p>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex items-center gap-3 mb-2"><Shield style={{ color: p }} size={20} /><span className="font-bold text-sm">Instant Delivery</span></div>
                      <p className="text-[10px] text-white/40">Purchases applied immediately. Valid for this event only.</p>
                    </div>
                  </div>
                  <div className="mt-auto relative z-10">
                    <div className="text-xs font-bold text-white/40 mb-2">ACCEPTED PAYMENTS</div>
                    <div className="flex gap-2">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="w-8 h-5 rounded bg-white/10" />)}</div>
                  </div>
                </div>
                <div className={`md:col-span-8 p-8 ${theme.cardBg}`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full items-center">
                    {storeItems.slice(0, 3).map(item => (
                      <div key={item.id} className={`relative p-6 rounded-2xl border transition-all duration-300 hover:-translate-y-2 ${item.popular ? "bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.05)] z-10 scale-105" : "bg-white/5 border-white/5 hover:border-white/20"}`}
                        style={{ borderColor: item.popular ? p : undefined }}>
                        {item.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-black text-[10px] font-black uppercase tracking-wider rounded-full" style={{ backgroundColor: p }}>Most Popular</div>}
                        <div className="flex justify-center mb-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center`} style={{ backgroundColor: item.popular ? p : "rgba(255,255,255,0.1)", color: item.popular ? "black" : "white" }}>
                            <item.icon size={24} />
                          </div>
                        </div>
                        <div className="text-center mb-6">
                          <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                          <div className="flex items-baseline justify-center gap-1"><span className="text-sm opacity-60">$</span><span className="text-3xl font-black">{item.price}</span></div>
                        </div>
                        <div className="space-y-3 mb-8"><div className="flex items-center gap-2 text-xs text-white/80 justify-center">{item.desc}</div></div>
                        <button onClick={() => { setShowStoreModal(false); handleAction(`Purchased ${item.name}`); }}
                          className="w-full py-3 rounded-xl text-xs font-bold transition-all"
                          style={{ backgroundColor: item.popular ? p : "rgba(255,255,255,0.1)", color: item.popular ? "black" : "white" }}>
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── NOTIFICATION TOAST ───────────────────────────────── */}
      <AnimatePresence>
        {notification && (
          <motion.div initial={{ opacity: 0, y: 50, x: "-50%" }} animate={{ opacity: 1, y: 0, x: "-50%" }} exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-8 left-1/2 z-50 px-6 py-3 rounded-full bg-[#1A1A1A] border text-white shadow-2xl flex items-center gap-3"
            style={{ borderColor: p, boxShadow: `0 0 30px ${p}4D` }}>
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-black" style={{ backgroundColor: p }}>
              <Check size={12} strokeWidth={4} />
            </div>
            <span className="font-medium text-sm">{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <GateOSCheckoutModal 
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        invoiceDetails={{
          id: `NX-${Math.floor(Math.random() * 10000)}`,
          title: "Gate OS Access Ticket",
          amount: 150.00,
          description: "Standard Access Pass + VIP Entry"
        }}
      />

      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
      `}</style>
    </div>
  );
}
