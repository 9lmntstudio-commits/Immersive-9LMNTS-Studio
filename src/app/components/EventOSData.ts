import {
  Zap,
  Users,
  Music,
  Crown,
  Clock,
  Beer,
  Star,
  MessageSquare,
  TrendingUp,
  Heart,
  Briefcase,
  Gift,
  Mic,
  Coffee,
} from "lucide-react";

// Theme & Data Definitions

export interface EventOSTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string; // Tailwind class for gradient or color
  cardBg: string;
}

export interface EventOSData {
  id: string;
  name: string;
  theme: EventOSTheme;
  labels: {
    appName: string;
    appSubtitle: string;
    battleTitle: string;
    battleSubtitle: string;
    contestantRole: string;
    storeTitle: string;
    vipTitle: string;
    requestTitle: string;
    liveBadge: string;
    ticker: string[];
  };
  contestants: any[];
  vipUsers: any[];
  liveStats: any[];
  storeItems: any[];
  requests: any[];
}

export const ARTIST_OS_DATA: EventOSData = {
  id: "artist",
  name: "Artist OS",
  theme: {
    primary: "#FF5500", // Flame Orange
    secondary: "#00D4FF", // Cyber Cyan
    accent: "#00FF9D", // Matrix Green
    background: "bg-[#050505]",
    cardBg: "bg-[#0B0F17]",
  },
  labels: {
    appName: "ARTIST OS",
    appSubtitle: "24/7 CREATOR HEADQUARTERS",
    battleTitle: "STREAMING VAULT & CATALOG",
    battleSubtitle: "Direct Fan Tipping • Uncompressed WAV Stems • VIP Vault",
    contestantRole: "Featured Cut / Stem",
    storeTitle: "Fan Store & Vault",
    vipTitle: "Backstage Fan Club",
    requestTitle: "Booking & Collab Drawer",
    liveBadge: "ONLINE",
    ticker: [
      "🔥 NEW UNRELEASED STEM DROPPED TO VAULT",
      "👑 MARCUS JOINED THE VIP BACKSTAGE CLUB",
      "⚡ 5 DIRECT FAN TIP RECEIVED VIA APPLE PAY",
      "🎵 TOUR DATE CONFIRMED: BRONSON CENTRE, OTTAWA",
    ],
  },
  contestants: [
    {
      id: "track-1",
      name: "CYBER BASS PROTOCOL (VIP EDIT)",
      role: "BASS / TRAP • 140 BPM",
      color: "#FF5500",
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialVotes: 142,
    },
    {
      id: "track-2",
      name: "NEO-OTTAWA NIGHTS (ORIGINAL MIX)",
      role: "AFRO HOUSE / MELODIC • 122 BPM",
      color: "#00D4FF",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      initialVotes: 98,
    },
  ],
  liveStats: [
    {
      label: "Catalog Streams",
      value: "18,420",
      icon: Music,
      color: "#FF5500",
    },
    {
      label: "Direct Fan Tips",
      value: ",850",
      icon: Zap,
      color: "#00FF9D",
    },
    {
      label: "Active Superfans",
      value: "428",
      icon: Users,
      color: "#00D4FF",
    },
  ],
  storeItems: [
    {
      id: "fan-tip-10",
      name: "Direct Fan Tip Jar",
      price: 10,
      icon: Heart,
      desc: "Send instant appreciation directly to the artist (100% to creator)",
      color: "#00FF9D",
      popular: false,
    },
    {
      id: "fan-pass-25",
      name: "Monthly Fan Pass (Rollover)",
      price: 25,
      icon: Star,
      desc: "Access private streaming vault, unreleased tracks, and tour discounts",
      color: "#FF5500",
      popular: true,
    },
    {
      id: "ar-garment-45",
      name: "Phygital AR Cyber Hoodie",
      price: 45,
      icon: Crown,
      desc: "Heavyweight streetwear featuring WebAR 3D glowing wings on camera scan",
      color: "#00D4FF",
      popular: false,
    },
    {
      id: "stem-license-250",
      name: "Stem Vault & Commercial Sync",
      price: 250,
      icon: Zap,
      desc: "Complete multitrack WAV stems with commercial synchronization license",
      color: "#FF5500",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "Exclusive DJ Set Booking (2-Hour Club Set)",
      artist: "Promoter / Venue Inquiry",
      votes: 12,
      user: "Bronson Centre",
    },
    {
      id: 2,
      song: "Remix Stems Request (CYBER BASS PROTOCOL)",
      artist: "Producer Collaboration",
      votes: 8,
      user: "DJ Specter",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "Devon K.",
      role: "Superfan #01",
      status: "Listening",
      img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
    {
      id: 2,
      name: "Elena R.",
      role: "Catalog Backer",
      status: "VIP Vault",
      img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    },
  ],
};

export const SOUND_CLASH_DATA: EventOSData = {
  id: "nightlife",
  name: "Sound Clash",
  theme: {
    primary: "#d946ef", // Neon Pink
    secondary: "#06b6d4", // Cyber Cyan
    accent: "#ef4444", // Fire Red
    background: "bg-[#050505]", // Simplification for demo
    cardBg: "bg-[#111]",
  },
  labels: {
    appName: "SOUND CLASH",
    appSubtitle: "OS",
    battleTitle: "SOUND CLASH ARENA",
    battleSubtitle: "8 DJs • 3 Rounds • Live Mobile Crowd Voting",
    contestantRole: "Genre",
    storeTitle: "Club Store",
    vipTitle: "VIP Lounge",
    requestTitle: "Request Line",
    liveBadge: "LIVE",
    ticker: [
      "🔥 DJ K-OS JUST DROPPED A NEW TRACK",
      "👑 SARAH J. JOINED THE VIP LOUNGE",
      "⚡ POWER HYPE ACTIVATED BY TABLE 4",
      "🎵 NEXT BATTLE: ROUND 2 STARTS IN 5 MINS",
    ],
  },
  contestants: [
    {
      id: "k-os",
      name: "DJ K-OS",
      role: "Techno / Acid",
      color: "#d946ef",
      image: "https://images.unsplash.com/photo-1762028895490-5b777a1f6165?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwZGolMjBtaXhpbmd8ZW58MXx8fHwxNzc3OTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      initialVotes: 48,
    },
    {
      id: "vibe",
      name: "DJ VIBE",
      role: "House / Bass",
      color: "#06b6d4",
      image: "https://images.unsplash.com/photo-1655928461456-b5c6db979360?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwY3liZXJwdW5rJTIwZGp8ZW58MXx8fHwxNzc3OTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      initialVotes: 52,
    },
  ],
  liveStats: [
    {
      label: "Live Audience",
      value: "1,247",
      icon: Users,
      color: "#d946ef",
    },
    {
      label: "Hype Level",
      value: "9,420",
      icon: Zap,
      color: "#06b6d4",
    },
    {
      label: "Set Time",
      value: "12:45",
      icon: Clock,
      color: "#ef4444",
    },
  ],
  storeItems: [
    {
      id: "power-hype",
      name: "Power Hype Pack",
      price: 10,
      icon: Zap,
      desc: "Boost your vote x50",
      color: "#d946ef",
      popular: true,
    },
    {
      id: "vip-access",
      name: "VIP Access Pass",
      price: 150,
      icon: Crown,
      desc: "Enter the VIP Lounge",
      color: "#ef4444",
      popular: false,
    },
    {
      id: "round",
      name: "Buy a Round",
      price: 50,
      icon: Beer,
      desc: "Send drinks to VIPs",
      color: "#06b6d4",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "One More Time",
      artist: "Daft Punk",
      votes: 142,
      user: "Anon",
    },
    {
      id: 2,
      song: "Never Be Like You",
      artist: "Flume",
      votes: 89,
      user: "Mike",
    },
    {
      id: 3,
      song: "Summer",
      artist: "Calvin Harris",
      votes: 67,
      user: "VIP Table 3",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "Sarah J.",
      role: "Influencer",
      status: "Online",
      img: "https://images.unsplash.com/photo-1519097186222-b26cc78c3077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3Nzc5NjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "David C.",
      role: "Producer",
      status: "In Lounge",
      img: "https://images.unsplash.com/photo-1724770657545-f40944375d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzc5NjY4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Elena R.",
      role: "Artist",
      status: "Ordering",
      img: "https://images.unsplash.com/photo-1535037532858-83180dabddb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzc3OTY2NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Marcus",
      role: "Promoter",
      status: "Online",
      img: "https://images.unsplash.com/photo-1541294054180-6c46ae51bbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzc3OTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

export const CORPORATE_CLASH_DATA: EventOSData = {
  id: "corporate",
  name: "Corporate Clash",
  theme: {
    primary: "#3b82f6", // Electric Blue
    secondary: "#06d6a0", // Emerald Green
    accent: "#ef4444", // Alert Red
    background: "bg-[#0a0f1f]",
    cardBg: "bg-[#1a2236]",
  },
  labels: {
    appName: "CORPORATE CLASH",
    appSubtitle: "OS",
    battleTitle: "PITCH COMPETITION",
    battleSubtitle: "Seed Round",
    contestantRole: "Vertical",
    storeTitle: "Investor Rack",
    vipTitle: "Investors Online",
    requestTitle: "Live Q&A",
    liveBadge: "PITCHING",
    ticker: [
      "📈 ALPHA AI SECURES $500K COMMITMENT",
      "💼 ROBERT K. REQUESTED PITCH DECK",
      "🚀 BETA BIO IS TRENDING ON TWITTER",
      "📅 NEXT PITCH: GAMMA TECH AT 2:00 PM",
    ],
  },
  contestants: [
    {
      id: "alpha",
      name: "Alpha AI",
      role: "Artificial Intelligence",
      color: "#3b82f6",
      image: "https://images.unsplash.com/photo-1776484061072-d568e5b5e9ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwYnVpbGRpbmclMjB0ZWNofGVufDF8fHx8MTc3Nzk2NjgwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      initialVotes: 65,
    },
    {
      id: "beta",
      name: "Beta Bio",
      role: "Biotech",
      color: "#06d6a0",
      image: "https://images.unsplash.com/photo-1615772447993-c7548c44781d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwc2t5c2NyYXBlciUyMG5pZ2h0fGVufDF8fHx8MTc3Nzk2NjgwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      initialVotes: 35,
    },
  ],
  liveStats: [
    {
      label: "Investors",
      value: "342",
      icon: Briefcase,
      color: "#3b82f6",
    },
    {
      label: "Capital Committed",
      value: "$1.2M",
      icon: TrendingUp,
      color: "#06d6a0",
    },
    {
      label: "Pitch Time",
      value: "04:12",
      icon: Clock,
      color: "#ef4444",
    },
  ],
  storeItems: [
    {
      id: "invest-pack",
      name: "Angel Vote Pack",
      price: 500,
      icon: TrendingUp,
      desc: "Signal strong interest",
      color: "#06d6a0",
      popular: true,
    },
    {
      id: "vip-meet",
      name: "Founder Meeting",
      price: 1000,
      icon: Users,
      desc: "Book 1:1 post-event",
      color: "#3b82f6",
      popular: false,
    },
    {
      id: "deck",
      name: "Download Deck",
      price: 50,
      icon: Briefcase,
      desc: "Get full financials",
      color: "#ef4444",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "What is your CAC?",
      artist: "SaaS Metrics",
      votes: 42,
      user: "VC Fund A",
    },
    {
      id: 2,
      song: "IP Ownership?",
      artist: "Legal",
      votes: 28,
      user: "Angel Group",
    },
    {
      id: 3,
      song: "Roadmap for Q4",
      artist: "Product",
      votes: 15,
      user: "TechCrunch",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "James H.",
      role: "Angel Investor",
      status: "Looking",
      img: "https://images.unsplash.com/photo-1688387785356-d7fd8ee55c86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzc3OTY2ODAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Amanda L.",
      role: "VP Marketing",
      status: "Online",
      img: "https://images.unsplash.com/photo-1645976531514-33221ad57007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBwb3J0cmFpdCUyMHdvbWFufGVufDF8fHx8MTc3Nzk2NjgwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Robert K.",
      role: "Tech Crunch",
      status: "Reporting",
      img: "https://images.unsplash.com/photo-1724770657545-f40944375d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmYXNoaW9uJTIwbWFufGVufDF8fHx8MTc3Nzk2NjgwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Lisa M.",
      role: "Founder @ Zen",
      status: "Networking",
      img: "https://images.unsplash.com/photo-1567333243998-f726b9125de5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3Nzc5NjY4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

export const RECEPTION_OS_DATA: EventOSData = {
  id: "wedding",
  name: "Reception OS",
  theme: {
    primary: "#D4AF37", // Gold
    secondary: "#FF5500", // Party Orange
    accent: "#f4f4f0", // Cream
    background: "bg-[#1a1a1a]", // Darker for contrast
    cardBg: "bg-[#2a2a2a]",
  },
  labels: {
    appName: "ROMEO & JULIET",
    appSubtitle: "2025",
    battleTitle: "SPEECH BATTLE",
    battleSubtitle: "Who did it better?",
    contestantRole: "Role",
    storeTitle: "Honeymoon Fund",
    vipTitle: "Family Table",
    requestTitle: "DJ Requests",
    liveBadge: "JUST MARRIED",
    ticker: [
      "💍 MERCUTIO JUST ROASTED ROMEO",
      "🎂 CAKE CUTTING IN 15 MINUTES",
      "📸 USE HASHTAG #ROMEOANDJULIET FOREVER",
      "🏖️ HONEYMOON FUND AT 60% GOAL",
    ],
  },
  contestants: [
    {
      id: "best-man",
      name: "Mercutio",
      role: "Best Man",
      color: "#D4AF37",
      image: "https://images.unsplash.com/photo-1716637222819-e3c260dc03e7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwY291cGxlJTIwbmVvbnxlbnwxfHx8fDE3Nzc5NjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      initialVotes: 42,
    },
    {
      id: "moh",
      name: "The Nurse",
      role: "Maid of Honor",
      color: "#FF5500",
      image: "https://images.unsplash.com/photo-1724770657545-f40944375d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmYXNoaW9uJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc3OTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      initialVotes: 58,
    },
  ],
  liveStats: [
    {
      label: "Guests",
      value: "156",
      icon: Users,
      color: "#D4AF37",
    },
    {
      label: "Love Level",
      value: "MAX",
      icon: Heart,
      color: "#FF5500",
    },
    {
      label: "Dinner",
      value: "70%",
      icon: Coffee,
      color: "#f4f4f0",
    },
  ],
  storeItems: [
    {
      id: "honeymoon",
      name: "Honeymoon Ticket",
      price: 25,
      icon: Gift,
      desc: "Win a getaway",
      color: "#D4AF37",
      popular: true,
    },
    {
      id: "drink",
      name: "Buy Couple a Drink",
      price: 15,
      icon: Beer,
      desc: "Cheers!",
      color: "#FF5500",
      popular: false,
    },
    {
      id: "dj-tip",
      name: "Tip the DJ",
      price: 20,
      icon: Mic,
      desc: "Play my song next",
      color: "#f4f4f0",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "Love Story",
      artist: "Taylor Swift",
      votes: 24,
      user: "Bridesmaids",
    },
    {
      id: 2,
      song: "Yeah!",
      artist: "Usher",
      votes: 18,
      user: "Groomsmen",
    },
    {
      id: 3,
      song: "Don't Stop Believin'",
      artist: "Journey",
      votes: 31,
      user: "Dad",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "Aunt May",
      role: "Family",
      status: "Crying",
      img: "https://images.unsplash.com/photo-1519097186222-b26cc78c3077?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjB3b21hbnxlbnwxfHx8fDE3Nzc5NjY4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 2,
      name: "Uncle Ben",
      role: "Family",
      status: "Bar",
      img: "https://images.unsplash.com/photo-1724770657545-f40944375d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBwb3J0cmFpdCUyMG1hbnxlbnwxfHx8fDE3Nzc5NjY4MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 3,
      name: "Romeo",
      role: "Groom",
      status: "Happy",
      img: "https://images.unsplash.com/photo-1541294054180-6c46ae51bbf2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwcG9ydHJhaXQlMjBtYW58ZW58MXx8fHwxNzc3OTY2ODAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
    {
      id: 4,
      name: "Juliet",
      role: "Bride",
      status: "Radiant",
      img: "https://images.unsplash.com/photo-1535037532858-83180dabddb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBmYXNoaW9uJTIwd29tYW58ZW58MXx8fHwxNzc3OTY2NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    },
  ],
};

export const COMEDIAN_OS_DATA: EventOSData = {
  id: "comedy",
  name: "Comedian OS",
  theme: {
    primary: "#FF4500", // Orange Red
    secondary: "#ef4444", // Warm Red
    accent: "#f59e0b", // Gold
    background: "bg-[#050505]",
    cardBg: "bg-[#0A0A0A]",
  },
  labels: {
    appName: "THE ROAST",
    appSubtitle: "BATTLE",
    battleTitle: "ROAST BATTLE",
    battleSubtitle: "The Veteran vs The Challenger",
    contestantRole: "Comedian",
    storeTitle: "Heckle & Hype Suite",
    vipTitle: "Network",
    requestTitle: "Request a Roast",
    liveBadge: "LIVE",
    ticker: [
      "🔥 BIG MIKE JUST LANDED A KILLER ROAST",
      "😂 CROWD IS ROARING AT NUVO LOUNGE",
      "💰 THE POT: $4,250",
      "🎤 NEXT BATTLE: ROUND 2 STARTS IN 10 MINS",
    ],
  },
  contestants: [
    {
      id: "big-mike",
      name: "Big Mike",
      role: "The Veteran",
      color: "#FF4500",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      initialVotes: 46,
    },
    {
      id: "slick-j",
      name: "Slick J",
      role: "The Challenger",
      color: "#ef4444",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
      initialVotes: 54,
    },
  ],
  liveStats: [
    {
      label: "Crowd",
      value: "300",
      icon: Users,
      color: "#FF4500",
    },
    {
      label: "Votes",
      value: "4,821",
      icon: Zap,
      color: "#ef4444",
    },
    {
      label: "The Pot",
      value: "$4,250",
      icon: TrendingUp,
      color: "#f59e0b",
    },
  ],
  storeItems: [
    {
      id: "entry-ticket",
      name: "Entry Ticket",
      price: 20,
      icon: Star,
      desc: "Show access + networking",
      color: "#FF4500",
      popular: false,
    },
    {
      id: "request-roast",
      name: "Request a Roast",
      price: 15,
      icon: Mic,
      desc: "Get roasted on stage",
      color: "#ef4444",
      popular: true,
    },
    {
      id: "power-votes",
      name: "Power Vote Pack",
      price: 5,
      icon: Zap,
      desc: "5x voting power",
      color: "#f59e0b",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "Roast my date",
      artist: "Comedy Request",
      votes: 28,
      user: "Table 7",
    },
    {
      id: 2,
      song: "I wear crocs",
      artist: "Self Roast",
      votes: 45,
      user: "Anon",
    },
    {
      id: 3,
      song: "My hairline",
      artist: "Personal Roast",
      votes: 18,
      user: "VIP 3",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Comedy Fan",
      status: "Online",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    },
    {
      id: 2,
      name: "Jamie Park",
      role: "Industry Pro",
      status: "Online",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
    },
    {
      id: 3,
      name: "Taylor Chen",
      role: "Venue Manager",
      status: "Backstage",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
    },
    {
      id: 4,
      name: "Morgan Reed",
      role: "First Timer",
      status: "Online",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    },
  ],
};

export const VENUE_OS_DATA: EventOSData = {
  id: "venue",
  name: "Venue OS",
  theme: {
    primary: "#d4af37", // Gold
    secondary: "#b537f2", // Neon Purple
    accent: "#06d6a0", // Emerald
    background: "bg-[#07050a]",
    cardBg: "bg-[#120e1a]",
  },
  labels: {
    appName: "NUVO 295",
    appSubtitle: "LOUNGE",
    battleTitle: "VIP EXPERIENCE",
    battleSubtitle: "Table Management",
    contestantRole: "Service",
    storeTitle: "Bar Menu",
    vipTitle: "VIP Tables",
    requestTitle: "DJ Booth",
    liveBadge: "OPEN",
    ticker: [
      "🍸 BOTTLE SERVICE SPECIAL: CLASE AZUL $650",
      "⭐ VIP TABLE 12 AVAILABLE",
      "🎧 DJ KENDEE SPINNING AFROBEATS",
      "📝 HOST EVENT PLANNING NOW AVAILABLE",
    ],
  },
  contestants: [
    {
      id: "vip-experience",
      name: "VIP Reserve",
      role: "Premium Service",
      color: "#d4af37",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800",
      initialVotes: 65,
    },
    {
      id: "standard",
      name: "Standard Entry",
      role: "General Access",
      color: "#b537f2",
      image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800",
      initialVotes: 35,
    },
  ],
  liveStats: [
    {
      label: "Capacity",
      value: "340/500",
      icon: Users,
      color: "#d4af37",
    },
    {
      label: "Door Price",
      value: "$25",
      icon: TrendingUp,
      color: "#b537f2",
    },
    {
      label: "A/V Setup",
      value: "DJ",
      icon: Music,
      color: "#06d6a0",
    },
  ],
  storeItems: [
    {
      id: "corona",
      name: "Corona Extra",
      price: 9,
      icon: Beer,
      desc: "330ml Bottle",
      color: "#d4af37",
      popular: false,
    },
    {
      id: "signature-mix",
      name: "Bruno's Signature Mix",
      price: 22,
      icon: Star,
      desc: "House specialty",
      color: "#b537f2",
      popular: true,
    },
    {
      id: "bottle-service",
      name: "Clase Azul Reposado",
      price: 650,
      icon: Crown,
      desc: "750ml + 3 mixers",
      color: "#06d6a0",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "Afrobeats Mix",
      artist: "DJ Kendee",
      votes: 45,
      user: "Table 8",
    },
    {
      id: 2,
      song: "Birthday Shoutout",
      artist: "Special Request",
      votes: 28,
      user: "VIP 5",
    },
    {
      id: 3,
      song: "Amapiano Set",
      artist: "DJ Request",
      votes: 62,
      user: "Anniversary",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "Sarah J.",
      role: "VIP Guest",
      status: "Online",
      img: "https://images.unsplash.com/photo-1519097186222-b26cc78c3077?w=300",
    },
    {
      id: 2,
      name: "Marcus K.",
      role: "Regular",
      status: "At Bar",
      img: "https://images.unsplash.com/photo-1541294054180-6c46ae51bbf2?w=300",
    },
    {
      id: 3,
      name: "Elena R.",
      role: "Birthday",
      status: "Celebrating",
      img: "https://images.unsplash.com/photo-1535037532858-83180dabddb0?w=300",
    },
    {
      id: 4,
      name: "David C.",
      role: "Host",
      status: "Managing",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    },
  ],
};

export const UNCLE_JAY_OS_DATA: EventOSData = {
  id: "catering",
  name: "Catering OS",
  theme: {
    primary: "#E34D2E", // Red Vibrant
    secondary: "#32cd32", // Lime Green
    accent: "#ffd700", // Gold
    background: "bg-[#000000]",
    cardBg: "bg-[#0A0A0A]",
  },
  labels: {
    appName: "CATERING OS",
    appSubtitle: "THE PIT",
    battleTitle: "DISH VOTING",
    battleSubtitle: "Vote for your favorites",
    contestantRole: "Course",
    storeTitle: "Kitchen Store",
    vipTitle: "Crew",
    requestTitle: "Ask Chef",
    liveBadge: "LIVE",
    ticker: [
      "🔥 VOTE NOW: JERK SPRING ROLLS VS POUTINE CROQUETTES",
      "🎸 LIVE BLUES AT 8:30PM WITH SOUL FOOD COLLECTIVE",
      "💰 AUCTION: PRIVATE DINNER WITH CHEF",
      "✨ BOOK CATERING OS FOR YOUR NEXT EVENT",
    ],
  },
  contestants: [
    {
      id: "jerk-rolls",
      name: "Jerk Chicken Spring Rolls",
      role: "Starter",
      color: "#E34D2E",
      image: "https://images.unsplash.com/photo-1541014741259-de529411b96a?w=300",
      initialVotes: 58,
    },
    {
      id: "poutine",
      name: "Poutine Croquettes",
      role: "Starter",
      color: "#32cd32",
      image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?w=300",
      initialVotes: 42,
    },
  ],
  liveStats: [
    {
      label: "Guests",
      value: "187",
      icon: Users,
      color: "#E34D2E",
    },
    {
      label: "Votes",
      value: "1,247",
      icon: Zap,
      color: "#32cd32",
    },
    {
      label: "Raised",
      value: "$9,944",
      icon: TrendingUp,
      color: "#ffd700",
    },
  ],
  storeItems: [
    {
      id: "jerk-sauce",
      name: "Signature Jerk Sauce",
      price: 12,
      icon: Star,
      desc: "Take home the flavor",
      color: "#E34D2E",
      popular: true,
    },
    {
      id: "bbq-rub",
      name: "BBQ Rub Trio",
      price: 25,
      icon: Gift,
      desc: "3-pack seasoning set",
      color: "#32cd32",
      popular: false,
    },
    {
      id: "cooking-class",
      name: "Private BBQ Class",
      price: 100,
      icon: Star,
      desc: "Learn from Chef",
      color: "#ffd700",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "What's the secret to your sauce?",
      artist: "BBQ Question",
      votes: 24,
      user: "BBQ_Lover",
    },
    {
      id: 2,
      song: "How long do you smoke the brisket?",
      artist: "Cooking Technique",
      votes: 18,
      user: "Chef_Mike",
    },
    {
      id: 3,
      song: "Can you cater my event?",
      artist: "Booking Inquiry",
      votes: 31,
      user: "Sarah_K",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "Lead Chef",
      role: "Executive Chef",
      status: "Cooking",
      img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=300",
    },
    {
      id: 2,
      name: "Maria",
      role: "Sous Chef",
      status: "Prep",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300",
    },
    {
      id: 3,
      name: "Luca",
      role: "Sauce Master",
      status: "Mixing",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    },
    {
      id: 4,
      name: "Ana",
      role: "Beverage Director",
      status: "Bar",
      img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
    },
  ],
};

export const GAMING_OS_DATA: EventOSData = {
  id: "gaming",
  name: "Gaming OS",
  theme: {
    primary: "#00ffff", // Neon Cyan
    secondary: "#ff00ff", // Neon Magenta
    accent: "#ffd700", // Gold
    background: "bg-[#050514]",
    cardBg: "bg-[#0A0A14]",
  },
  labels: {
    appName: "GAME OS",
    appSubtitle: "PRO",
    battleTitle: "TOURNAMENT BATTLE",
    battleSubtitle: "8 DJs • 3 Rounds • Live Mobile Crowd Voting",
    contestantRole: "Player",
    storeTitle: "Gaming Gear",
    vipTitle: "Top Players",
    requestTitle: "Match Predictions",
    liveBadge: "LIVE EVENT",
    ticker: [
      "🎮 GRAND FINALS: XXSHADOWXX VS NOSCOPEKING",
      "🏆 PRIZE POOL: $25,000",
      "⚡ CHEER PACKS LIVE NOW",
      "🎭 COSPLAY VOTING OPEN",
    ],
  },
  contestants: [
    {
      id: "shadow",
      name: "xXShadowXx",
      role: "Champion",
      color: "#00ffff",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
      initialVotes: 65,
    },
    {
      id: "noscope",
      name: "NoScopeKing",
      role: "Challenger",
      color: "#ff00ff",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800",
      initialVotes: 35,
    },
  ],
  liveStats: [
    {
      label: "Viewers",
      value: "12,847",
      icon: Users,
      color: "#00ffff",
    },
    {
      label: "Prize Pool",
      value: "$25K",
      icon: TrendingUp,
      color: "#ff00ff",
    },
    {
      label: "Players",
      value: "256",
      icon: Zap,
      color: "#ffd700",
    },
  ],
  storeItems: [
    {
      id: "pro-mouse",
      name: "Pro Gaming Mouse",
      price: 45,
      icon: Zap,
      desc: "8K Sensor",
      color: "#00ffff",
      popular: true,
    },
    {
      id: "headset",
      name: "Gaming Headset",
      price: 80,
      icon: Music,
      desc: "Noise cancelling",
      color: "#ff00ff",
      popular: false,
    },
    {
      id: "jersey",
      name: "Team Jersey",
      price: 35,
      icon: Star,
      desc: "Custom design",
      color: "#ffd700",
      popular: false,
    },
  ],
  requests: [
    {
      id: 1,
      song: "xXShadowXx will win 2-0",
      artist: "Match Prediction",
      votes: 142,
      user: "eSports_Fan",
    },
    {
      id: 2,
      song: "NoScopeKing comeback 2-1",
      artist: "Upset Prediction",
      votes: 89,
      user: "Underdog",
    },
    {
      id: 3,
      song: "Going to Game 5",
      artist: "Series Length",
      votes: 67,
      user: "Analyst",
    },
  ],
  vipUsers: [
    {
      id: 1,
      name: "xXShadowXx",
      role: "Top Seed",
      status: "Playing",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300",
    },
    {
      id: 2,
      name: "PixelQueen",
      role: "2nd Place",
      status: "Spectating",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300",
    },
    {
      id: 3,
      name: "NoScopeKing",
      role: "Finalist",
      status: "Playing",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300",
    },
    {
      id: 4,
      name: "ComboBreaker",
      role: "3rd Place",
      status: "Online",
      img: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300",
    },
  ],
};