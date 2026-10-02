import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  CheckCircle,
  AlertCircle,
  Loader2,
  Send,
  Zap,
  Brain,
  Palette,
  Calendar,
  Users,
  Mail,
  Phone,
  Globe,
  Building2,
  User,
  ExternalLink,
  Filter,
  Mic2,
  Disc3,
  Paintbrush,
  Radio,
  BookOpen,
  Lightbulb,
  Code,
  Clock,
  DollarSign,
  ChevronDown,
} from "lucide-react";
import { getSupabaseClient } from "../utils/supabase/client";
import { SEO } from "./SEO";
import {
  projectId,
  publicAnonKey,
} from "../utils/supabase/info";

/* ─── Config ────────────────────────────────────────────────── */
const N8N_WEBHOOK_URL =
  "https://loabrain.app.n8n.cloud/webhook/9lmnts-leads";
const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-662c70dc`;

/* ─── Types ─────────────────────────────────────────────────── */
type FilterTab = "all" | "ai" | "creative" | "eventos";
type SubmitStatus = "idle" | "sending" | "success" | "error";

interface StartProjectPageProps {
  selectedPlan?: string;
  onNavigate: (page: string, plan?: string) => void;
}

/* ─── Master Service List ───────────────────────────────────── */
const ALL_SERVICES = [
  // ── AI Services (Nine Pillars) ─────────────────────────────
  {
    id: "ai-brand-voice",
    type: "ai" as const,
    icon: Mic2,
    element: "MCing Element",
    name: "AI Brand Voice & Content Generation",
    description:
      "Custom GPT trained on your brand — automated content, social media, email copy at scale.",
    price: "From $2,500",
    paypalAmount: 2500,
    features: [
      "Custom GPT brand voice model",
      "Automated social content",
      "Email campaign automation",
      "Brand consistency audit",
      "Performance analytics",
    ],
  },
  {
    id: "ai-ux-flow",
    type: "ai" as const,
    icon: Disc3,
    element: "DJing Element",
    name: "AI User Experience Flow",
    description:
      "AI-powered UX optimization, personalization engines, and conversion flows.",
    price: "From $3,000",
    paypalAmount: 3000,
    features: [
      "AI UX audit & mapping",
      "Personalization engine",
      "Conversion funnel optimization",
      "A/B testing automation",
      "User behaviour analytics",
    ],
  },
  {
    id: "ai-visual-design",
    type: "ai" as const,
    icon: Paintbrush,
    element: "Graffiti Element",
    name: "AI Visual Design System",
    description:
      "AI-generated logo, brand identity, and full visual design system.",
    price: "From $2,000",
    paypalAmount: 2000,
    features: [
      "AI logo variations",
      "Full brand identity system",
      "Colour & typography AI",
      "Social media templates",
      "Brand guidelines doc",
    ],
  },
  {
    id: "ai-innovation",
    type: "ai" as const,
    icon: Brain,
    element: "Breaking Element",
    name: "AI Innovation & Disruption",
    description:
      "AI trend prediction, competitive intelligence, and market disruption strategy.",
    price: "From $1,500",
    paypalAmount: 1500,
    features: [
      "AI trend prediction",
      "Competitor intelligence",
      "Market disruption roadmap",
      "Innovation sprint",
      "Strategic playbook",
    ],
  },
  {
    id: "ai-interaction",
    type: "ai" as const,
    icon: Radio,
    element: "Beatboxing Element",
    name: "AI Interaction & Animation",
    description:
      "AI-powered micro-interactions, real-time animations, and dynamic interfaces.",
    price: "From $2,000",
    paypalAmount: 2000,
    features: [
      "AI micro-interaction design",
      "Real-time animation system",
      "Dynamic UI components",
      "Motion design library",
      "Interactive prototype",
    ],
  },
  {
    id: "ai-content-learning",
    type: "ai" as const,
    icon: BookOpen,
    element: "Knowledge Element",
    name: "AI Content & Learning Systems",
    description:
      "AI content curation, LMS integration, and personalized learning paths.",
    price: "From $1,000",
    paypalAmount: 1000,
    features: [
      "AI content curation engine",
      "LMS platform integration",
      "Personalized learning paths",
      "Automated knowledge base",
      "Content repurposing",
    ],
  },
  {
    id: "ai-trend-forecasting",
    type: "ai" as const,
    icon: Lightbulb,
    element: "Fashion Element",
    name: "AI Trend Forecasting",
    description:
      "Real-time trend prediction, style adaptation, and market intelligence dashboards.",
    price: "From $2,500",
    paypalAmount: 2500,
    features: [
      "Real-time trend monitoring",
      "Style adaptation reports",
      "Market intelligence dashboard",
      "Consumer forecasting",
      "Trend-to-campaign pipeline",
    ],
  },
  {
    id: "ai-business-automation",
    type: "ai" as const,
    icon: Code,
    element: "Entrepreneurship Element",
    name: "AI Business Automation",
    description:
      "Full workflow automation, CRM integration, lead qualification, and revenue ops.",
    price: "From $3,000",
    paypalAmount: 3000,
    features: [
      "End-to-end workflow automation",
      "AI lead qualification",
      "CRM integrations (n8n)",
      "Revenue ops dashboard",
      "Performance monitoring",
    ],
  },
  {
    id: "ai-multilingual",
    type: "ai" as const,
    icon: Globe,
    element: "Language Element",
    name: "AI Multilingual Communication",
    description:
      "AI translation, cultural adaptation, and global market entry systems.",
    price: "From $3,500",
    paypalAmount: 3500,
    features: [
      "AI translation & localization",
      "Cultural adaptation",
      "Multi-language content",
      "Global market entry",
      "Multilingual chatbot",
    ],
  },
  // ── Creative Services ──────────────────────────────────────
  {
    id: "7-day-sprint",
    type: "creative" as const,
    icon: Zap,
    element: "Sprint Track",
    name: "7-Day Agentic Sprint (AI Automation)",
    description:
      "Rapid AI agent deployment, MVP builds, and workflow automation in one week.",
    price: "From $1,500",
    paypalAmount: 1500,
    features: [
      "AI agent deployment",
      "MVP in 7 days",
      "n8n workflow automation",
      "Supabase integration",
      "Production-ready delivery",
    ],
  },
  {
    id: "web-design",
    type: "creative" as const,
    icon: Palette,
    element: "Digital Presence",
    name: "Web Design & Development",
    description:
      "Modern responsive websites with AI integration, SEO, and fast performance.",
    price: "From $1,500",
    paypalAmount: 1500,
    features: [
      "Responsive design",
      "AI integration",
      "SEO optimization",
      "Mobile-first approach",
      "Fast loading",
    ],
  },
  {
    id: "brand-identity",
    type: "creative" as const,
    icon: Paintbrush,
    element: "Brand Creation",
    name: "Brand Identity & Logo Design",
    description:
      "Full brand packages — logo, colours, typography, and brand guidelines.",
    price: "From $2,000",
    paypalAmount: 2000,
    features: [
      "Logo design",
      "Colour system",
      "Typography selection",
      "Brand guidelines",
      "Social media kit",
    ],
  },
  {
    id: "ecommerce",
    type: "creative" as const,
    icon: DollarSign,
    element: "Revenue Engine",
    name: "E-Commerce Platform",
    description:
      "Online store with payment processing, inventory, and conversion optimization.",
    price: "From $3,000",
    paypalAmount: 3000,
    features: [
      "Store setup",
      "Payment integration",
      "Inventory management",
      "Conversion optimization",
      "Analytics dashboard",
    ],
  },
  {
    id: "mobile-app",
    type: "creative" as const,
    icon: Brain,
    element: "Mobile First",
    name: "Mobile App Design",
    description:
      "iOS and Android app UI/UX design with prototype and developer handoff.",
    price: "From $5,000",
    paypalAmount: 5000,
    features: [
      "iOS & Android design",
      "UI/UX system",
      "Interactive prototype",
      "Dev-ready specs",
      "Design system",
    ],
  },
  {
    id: "marketing-campaign",
    type: "creative" as const,
    icon: Zap,
    element: "Growth Engine",
    name: "Marketing Campaign",
    description:
      "Full-funnel digital marketing — ads, copy, landing pages, and analytics.",
    price: "From $1,500",
    paypalAmount: 1500,
    features: [
      "Ad campaign setup",
      "Copywriting",
      "Landing pages",
      "Funnel strategy",
      "Analytics & reporting",
    ],
  },
  // ── EventOS ────────────────────────────────────────────────
  {
    id: "eventos-basic",
    type: "eventos" as const,
    icon: Calendar,
    element: "Event Starter",
    name: "EventOS Basic Boost",
    description:
      "EventOS Platform License + Basic Design — perfect for single events.",
    price: "$1,500",
    paypalAmount: 1500,
    features: [
      "EventOS platform license",
      "Basic event design",
      "Ticket management",
      "Guest portal",
      "Basic analytics",
    ],
  },
  {
    id: "eventos-standard",
    type: "eventos" as const,
    icon: Calendar,
    element: "Event Professional",
    name: "EventOS Standard Pro",
    description:
      "EventOS + AI Event Operator + Analytics — for recurring event operators.",
    price: "$3,000",
    paypalAmount: 3000,
    features: [
      "EventOS + AI operator",
      "Custom branding",
      "Advanced analytics",
      "Multi-event management",
      "Priority support",
    ],
  },
  {
    id: "eventos-premium",
    type: "eventos" as const,
    icon: Calendar,
    element: "Event Enterprise",
    name: "EventOS Premium Elite",
    description:
      "EventOS + AI + White-label Rights — your own branded event platform.",
    price: "$5,000",
    paypalAmount: 5000,
    features: [
      "White-label rights",
      "Full AI automation",
      "Custom domain",
      "Reseller rights",
      "Dedicated support",
    ],
  },
  {
    id: "eventos-custom",
    type: "eventos" as const,
    icon: Calendar,
    element: "Event Empire",
    name: "EventOS Custom Scale",
    description:
      "Enterprise event solutions with custom features and dedicated AI operator.",
    price: "Custom",
    paypalAmount: 500,
    features: [
      "Custom development",
      "Enterprise features",
      "Dedicated AI operator",
      "API integrations",
      "SLA support",
    ],
  },
];

const FILTER_TABS: { key: FilterTab; label: string }[] = [
  { key: "all", label: "All Services" },
  { key: "ai", label: "AI (Nine Pillars)" },
  { key: "creative", label: "Creative & Web" },
  { key: "eventos", label: "EventOS" },
];

const TIMELINES = [
  "ASAP (Rush — within 1 week)",
  "2–4 Weeks",
  "1–2 Months",
  "2–3 Months",
  "3–4 Months",
  "Flexible / Not Sure",
];

const BUDGET_RANGES = [
  "Under $1,500 CAD",
  "$1,500 – $3,000 CAD",
  "$3,000 – $5,000 CAD",
  "$5,000 – $10,000 CAD",
  "$10,000+ CAD",
  "Let's Discuss",
];

const STEP_LABELS = [
  "Choose Service",
  "Project Details",
  "Contact Info",
  "Review & Send",
];

/* ─── Component ─────────────────────────────────────────────── */
export function StartProjectPage({
  selectedPlan,
  onNavigate,
}: StartProjectPageProps) {
  // Diagnostic logging on mount
  useEffect(() => {
    console.log("📧 Email Configuration (Supabase Edge Function):", {
      serverUrl: SERVER_URL,
      currentDomain: window.location.hostname,
      currentUrl: window.location.href,
    });
  }, []);

  // Pre-select service if coming from nav
  const preSelected = selectedPlan
    ? ALL_SERVICES.find(
        (s) =>
          s.id === selectedPlan || s.id.includes(selectedPlan),
      )
    : null;

  const [step, setStep] = useState(preSelected ? 2 : 1);
  const [filter, setFilter] = useState<FilterTab>("all");
  const [submitStatus, setSubmitStatus] =
    useState<SubmitStatus>("idle");
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    serviceId: preSelected?.id || "",
    serviceType: preSelected?.type || "",
    serviceName: preSelected?.name || "",
    serviceElement: preSelected?.element || "",
    servicePrice: preSelected?.price || "",
    projectName: preSelected?.name || "",
    timeline: "",
    budget: "",
    description: "",
    eventType: "",
    expectedAttendees: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
  });

  const selectedService = ALL_SERVICES.find(
    (s) => s.id === formData.serviceId,
  );
  const filteredServices = ALL_SERVICES.filter(
    (s) => filter === "all" || s.type === filter,
  );

  /* ── Helpers ──────────────────────────────────────────────── */
  const field = (key: string, val: string) =>
    setFormData((p) => ({ ...p, [key]: val }));

  const handleServiceSelect = (id: string) => {
    const svc = ALL_SERVICES.find((s) => s.id === id);
    if (!svc) return;
    setFormData((p) => ({
      ...p,
      serviceId: svc.id,
      serviceType: svc.type,
      serviceName: svc.name,
      serviceElement: svc.element,
      servicePrice: svc.price,
      projectName: svc.name,
    }));
    setStep(2);
  };

  const handleNext = () => {
    if (isStepValid() && step < 4) setStep((s) => s + 1);
  };
  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.serviceId !== "";
      case 2:
        return (
          formData.projectName.trim() !== "" &&
          formData.timeline !== ""
        );
      case 3:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== ""
        );
      default:
        return true;
    }
  };

  const buildEmailMessage = () =>
    `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW PROJECT INQUIRY — 9LMNTS STUDIO
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 SERVICE: ${formData.serviceElement} — ${formData.serviceName}
💰 PRICE:   ${formData.servicePrice}

📋 PROJECT DETAILS
  Project Name: ${formData.projectName}
  Timeline:     ${formData.timeline}
  Budget:       ${formData.budget || "Not specified"}${formData.eventType ? `\n  Event Type:   ${formData.eventType}` : ""}${formData.expectedAttendees ? `\n  Attendees:    ${formData.expectedAttendees}` : ""}
${formData.description ? `\n  Description:\n  ${formData.description}` : ""}

👤 CONTACT
  Name:    ${formData.name}
  Email:   ${formData.email}
  Phone:   ${formData.phone || "Not provided"}
  Company: ${formData.company || "Not provided"}
  Website: ${formData.website || "Not provided"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Source: 9lmnts.com/start-project
  `.trim();

  /* ── Submit ───────────────────────────────────────────────── */
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("sending");
    setSubmitError("");

    let emailOk = false;
    let emailErrorDetail = "";

    // 1 — Send email via Supabase Edge Function
    try {
      const emailResponse = await fetch(`${SERVER_URL}/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          to: "9lmntstudio@gmail.com",
          subject: `New Project Inquiry - ${formData.serviceName}`,
          message: buildEmailMessage(),
          replyTo: formData.email,
        }),
      });

      const emailResult = await emailResponse.json();

      if (emailResult.success) {
        emailOk = true;
        console.log("✅ Email sent successfully via Supabase Edge Function");
      } else {
        throw new Error(emailResult.error || "Email sending failed");
      }
    } catch (err: any) {
      console.error("❌ Email sending error:", err);
      emailErrorDetail = err.message || "Failed to send email notification";
    }

    // 2 — n8n webhook (non-blocking, no-cors mode)
    fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        source: "start-project",
        timestamp: new Date().toISOString(),
      }),
    }).catch((e) => console.warn("⚠️ n8n webhook error:", e));

    // 3 — Supabase KV store (non-blocking)
    fetch(`${SERVER_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${publicAnonKey}`,
      },
      body: JSON.stringify({
        ...formData,
        source: "start-project",
      }),
    }).catch((e) => console.warn("⚠️ KV store error:", e));

    setSubmitStatus(emailOk ? "success" : "error");
    if (!emailOk) {
      setSubmitError(
        emailErrorDetail ||
          "Email notification failed, but your inquiry was saved. We will still respond within 24 hours — or email us at 9lmntstudio@gmail.com",
      );
    }
    setIsSubmitting(false);
  };

  /* ── Success Screen ──────────────────────────────────────── */
  if (submitStatus === "success") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-20 relative overflow-hidden font-['Orbitron']">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(var(--color-primary) 1px,transparent 1px),linear-gradient(90deg,var(--color-primary) 1px,transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-none border-2 border-primary flex items-center justify-center animate-pulse">
                <div className="w-20 h-20 bg-primary rounded-none flex items-center justify-center">
                  <Check
                    size={40}
                    className="text-primary-foreground"
                    strokeWidth={3}
                  />
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-none opacity-60" />
              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-primary/40 rounded-none" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-5 bg-primary/5">
            <Zap size={11} /> Transmission Received
          </div>
          <h1 className="text-4xl sm:text-5xl text-foreground leading-tight mb-5 font-bold">
            <span className="font-['Orbitron'] uppercase tracking-tighter">Brief</span>{" "}
            <span className="font-['Caveat'] text-[#FF5500] text-primary text-5xl sm:text-7xl lg:text-9xl capitalize ml-[-15px] -rotate-3 inline-block">
              Transmitted!
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-5 max-w-lg mx-auto font-sans">
            Your project brief has landed with the 9LMNTS Studio
            team. Expect a response within{" "}
            <span className="text-primary font-bold">
              24 hours
            </span>
            .
          </p>

          {selectedService && (
            <div className="bg-primary/5 border border-primary/20 rounded-none px-6 py-4 mb-8 flex items-center gap-3">
              <div className="w-10 h-10 border border-primary/20 flex items-center justify-center bg-card">
                <selectedService.icon
                  size={18}
                  className="text-primary flex-shrink-0"
                />
              </div>
              <div className="text-left">
                <p className="text-primary text-[10px] font-black uppercase tracking-widest">
                  {selectedService.element}
                </p>
                <p className="text-foreground font-bold uppercase tracking-wide">
                  {selectedService.name}
                </p>
                <p className="text-primary text-sm font-black">
                  {selectedService.price}
                </p>
              </div>
            </div>
          )}

          <div className="bg-card border border-primary/15 rounded-none p-8 mb-8 text-left">
            <h3 className="text-foreground font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={16} className="text-primary" /> What
              Happens Next
            </h3>
            <div className="space-y-5 font-sans">
              {[
                {
                  n: "01",
                  t: "Brief Review",
                  d: "We analyse your submission and identify the best approach",
                },
                {
                  n: "02",
                  t: "Discovery Call",
                  d: "Free 30-min call to align on vision, scope, and goals",
                },
                {
                  n: "03",
                  t: "Custom Proposal",
                  d: "Scope, timeline & investment delivered within 48 hrs",
                },
                {
                  n: "04",
                  t: "Kick-Off",
                  d: "We activate the 9LMNTS process and start building",
                },
              ].map((item) => (
                <div
                  key={item.n}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-none bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary text-xs font-mono font-bold">
                      {item.n}
                    </span>
                  </div>
                  <div>
                    <p className="text-foreground text-sm font-bold uppercase tracking-wide mb-0.5">
                      {item.t}
                    </p>
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("home")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-none hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)] transition-all font-bold uppercase tracking-widest border border-primary"
            >
              Back to Home <ArrowRight size={18} className="ml-2 inline-block" />
            </button>
            <button
              onClick={() => onNavigate("portfolio")}
              className="px-8 py-4 border border-primary/30 text-primary rounded-none hover:border-primary hover:bg-primary/5 transition-all font-bold uppercase tracking-widest"
            >
              View Our Work
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Main Wizard ────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-['Orbitron'] text-foreground">
      <SEO 
        title="Start Your Project | 9LMNTS Studio" 
        description="Initiate your next big idea with 9LMNTS Studio. Use our interactive wizard to define your cyber aesthetic digital transformation." 
      />
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/4 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/3 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px,transparent 1px),linear-gradient(90deg,var(--color-primary) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-primary/30 rounded-full text-primary text-xs tracking-widest uppercase mb-5 bg-primary/5">
            <Zap size={11} /> Start Your Project
          </div>
          <h1 className="text-4xl sm:text-6xl text-foreground leading-tight mb-4 font-bold">
            <span className="font-['Orbitron'] uppercase tracking-tighter">Launch Your</span>{" "}
            <span className="font-['Caveat'] text-[#FF5500] text-primary text-5xl sm:text-7xl lg:text-9xl capitalize ml-[-15px] -rotate-3 inline-block">
              Vision
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto font-sans">
            {step === 1
              ? "Select a service from all 9 pillars, creative & EventOS offerings"
              : `Step ${step} of ${STEP_LABELS.length} · ${STEP_LABELS[step - 1]}`}
          </p>
        </div>

        {/* Progress stepper */}
        <div className="mb-10 max-w-2xl mx-auto">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-5 h-px bg-border z-0" />
            <div
              className="absolute left-0 top-5 h-px bg-primary z-0 transition-all duration-500"
              style={{
                width: `${((step - 1) / (STEP_LABELS.length - 1)) * 100}%`,
              }}
            />
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const active = step === n,
                done = step > n;
              return (
                <div
                  key={n}
                  className="flex flex-col items-center z-10 flex-1"
                >
                  <div
                    className={`w-10 h-10 rounded-none flex items-center justify-center text-sm font-bold transition-all border-2 ${
                      done
                        ? "bg-primary border-primary text-primary-foreground"
                        : active
                          ? "bg-background border-primary text-primary shadow-[0_0_16px_rgba(255,69,0,0.4)]"
                          : "bg-background border-border text-muted-foreground"
                    }`}
                  >
                    {done ? (
                      <Check size={16} strokeWidth={3} />
                    ) : (
                      n
                    )}
                  </div>
                  <span
                    className={`mt-2 text-[10px] uppercase tracking-widest hidden sm:block transition-colors font-bold ${active ? "text-primary" : done ? "text-muted-foreground" : "text-muted-foreground/40"}`}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form card */}
        <div className="bg-card border border-primary/15 rounded-none overflow-hidden shadow-2xl">
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="p-6 sm:p-10">
            {/* ══ STEP 1 — Choose Service ══════════════════════════ */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl text-foreground font-bold uppercase tracking-widest mb-1">
                  Choose Your Service
                </h2>
                <p className="text-muted-foreground text-sm mb-7 font-sans">
                  Select from all 19 services across AI,
                  Creative, and EventOS — click to continue, or
                  use PayPal for direct payment
                </p>

                {/* Filter tabs */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {FILTER_TABS.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setFilter(key)}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-none text-xs font-bold uppercase tracking-widest transition-all border ${
                        filter === key
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                      }`}
                    >
                      {label}
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-none border ${filter === key ? "bg-primary-foreground/20 border-primary-foreground/20" : "bg-muted/10 border-border"}`}
                      >
                        {
                          ALL_SERVICES.filter(
                            (s) =>
                              key === "all" || s.type === key,
                          ).length
                        }
                      </span>
                    </button>
                  ))}
                </div>

                {/* AI Pillars label */}
                {(filter === "all" || filter === "ai") && (
                  <p className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <Brain size={12} /> Nine Pillars — AI
                    Services
                  </p>
                )}

                {/* Service cards */}
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {filteredServices.map((svc) => {
                    const Icon = svc.icon;
                    const selected =
                      formData.serviceId === svc.id;
                    return (
                      <div
                        key={svc.id}
                        className={`relative bg-background border rounded-none p-5 transition-all group ${
                          selected
                            ? "border-primary shadow-[0_0_20px_rgba(255,69,0,0.12)]"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        {selected && (
                          <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-none flex items-center justify-center">
                            <Check
                              size={11}
                              className="text-primary-foreground"
                              strokeWidth={3}
                            />
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleServiceSelect(svc.id)
                          }
                          className="w-full text-left"
                        >
                          <div className="flex items-start gap-3 mb-3">
                            <div
                              className={`w-9 h-9 rounded-none border border-primary/20 flex items-center justify-center flex-shrink-0 transition-colors ${
                                selected
                                  ? "bg-primary/20"
                                  : "bg-card group-hover:bg-primary/10"
                              }`}
                            >
                              <Icon
                                size={16}
                                className="text-primary"
                              />
                            </div>
                            <div>
                              <p className="text-primary text-[9px] uppercase tracking-widest font-black mb-0.5">
                                {svc.element}
                              </p>
                              <h3 className="text-foreground text-xs font-bold leading-tight uppercase tracking-wide">
                                {svc.name}
                              </h3>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-[11px] leading-relaxed mb-3 line-clamp-2 font-sans">
                            {svc.description}
                          </p>
                          <p className="text-primary font-black text-base">
                            {svc.price}
                          </p>
                        </button>

                        {/* PayPal direct */}
                        <a
                          href={`https://PayPal.Me/9LMNTSSTUDIO/${svc.paypalAmount}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="mt-3 flex items-center justify-center gap-1.5 w-full py-2 rounded-none border border-primary/15 text-primary/50 text-[9px] uppercase font-bold tracking-widest hover:border-primary/50 hover:text-primary transition-colors"
                        >
                          <ExternalLink size={10} /> Quick Pay
                          via PayPal
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ══ STEP 2 — Project Details ══════════════════════════ */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl text-foreground font-bold uppercase tracking-widest mb-1">
                  Project Details
                </h2>
                <p className="text-muted-foreground text-sm mb-8 font-sans">
                  Tell us what you're building and when you need
                  it
                </p>

                {/* Selected service reminder */}
                {selectedService && (
                  <div className="flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-none px-5 py-3 mb-7">
                    <div className="w-10 h-10 border border-primary/20 flex items-center justify-center bg-card">
                      <selectedService.icon
                        size={18}
                        className="text-primary flex-shrink-0"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-black">
                        {selectedService.element}
                      </p>
                      <p className="text-foreground text-sm font-bold truncate uppercase tracking-wide">
                        {selectedService.name}
                      </p>
                      <p className="text-primary text-xs font-black">
                        {selectedService.price}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-muted-foreground text-[10px] uppercase tracking-widest font-bold hover:text-primary transition-colors whitespace-nowrap flex-shrink-0 border border-border px-2 py-1 bg-background"
                    >
                      Change ↗
                    </button>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Project name */}
                  <div>
                    <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                      Project Name{" "}
                      <span className="text-primary">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.projectName}
                      onChange={(e) =>
                        field("projectName", e.target.value)
                      }
                      placeholder="e.g. AI Content System for My Business"
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Timeline */}
                    <div>
                      <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                        Timeline{" "}
                        <span className="text-primary">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.timeline}
                          onChange={(e) =>
                            field("timeline", e.target.value)
                          }
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground text-sm appearance-none focus:border-primary focus:outline-none transition-all cursor-pointer font-sans"
                        >
                          <option value="">
                            Select timeline
                          </option>
                          {TIMELINES.map((t) => (
                            <option
                              key={t}
                              value={t}
                              className="bg-card"
                            >
                              {t}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                          ▼
                        </div>
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                        Budget Range
                      </label>
                      <div className="relative">
                        <select
                          value={formData.budget}
                          onChange={(e) =>
                            field("budget", e.target.value)
                          }
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground text-sm appearance-none focus:border-primary focus:outline-none transition-all cursor-pointer font-sans"
                        >
                          <option value="">
                            Select budget range
                          </option>
                          {BUDGET_RANGES.map((b) => (
                            <option
                              key={b}
                              value={b}
                              className="bg-card"
                            >
                              {b}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
                          ▼
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EventOS-specific */}
                  {formData.serviceType === "eventos" && (
                    <div className="grid sm:grid-cols-2 gap-5 p-5 bg-primary/5 border border-primary/10 rounded-none">
                      <div>
                        <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Calendar size={11} /> Event Type
                        </label>
                        <input
                          type="text"
                          value={formData.eventType}
                          onChange={(e) =>
                            field("eventType", e.target.value)
                          }
                          placeholder="Corporate, Festival…"
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                        />
                      </div>
                      <div>
                        <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center gap-1.5">
                          <Users size={11} /> Expected Attendees
                        </label>
                        <input
                          type="number"
                          value={formData.expectedAttendees}
                          onChange={(e) =>
                            field(
                              "expectedAttendees",
                              e.target.value,
                            )
                          }
                          placeholder="Number of guests"
                          className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <div>
                    <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                      Project Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        field("description", e.target.value)
                      }
                      rows={5}
                      placeholder="Vision, goals, requirements — the more detail the better."
                      className="w-full px-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm resize-none focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-sans"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ══ STEP 3 — Contact Info ════════════════════════════ */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl text-foreground font-bold uppercase tracking-widest mb-1">
                  Contact Information
                </h2>
                <p className="text-muted-foreground text-sm mb-8 font-sans">
                  How should we reach you to discuss the
                  project?
                </p>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                        Full Name{" "}
                        <span className="text-primary">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
                          size={14}
                        />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            field("name", e.target.value)
                          }
                          placeholder="Your full name"
                          className="w-full pl-10 pr-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                        Email Address{" "}
                        <span className="text-primary">
                          *
                        </span>
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
                          size={14}
                        />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            field("email", e.target.value)
                          }
                          placeholder="your@email.com"
                          className="w-full pl-10 pr-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
                          size={14}
                        />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            field("phone", e.target.value)
                          }
                          placeholder="+1 (555) 123-4567"
                          className="w-full pl-10 pr-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building2
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
                          size={14}
                        />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) =>
                            field("company", e.target.value)
                          }
                          placeholder="Your company"
                          className="w-full pl-10 pr-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                      Website URL
                    </label>
                    <div className="relative">
                      <Globe
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40"
                        size={14}
                      />
                      <input
                        type="url"
                        value={formData.website}
                        onChange={(e) =>
                          field("website", e.target.value)
                        }
                        placeholder="https://yourwebsite.com"
                        className="w-full pl-10 pr-4 py-3.5 bg-background border border-border rounded-none text-foreground placeholder-muted-foreground text-sm focus:border-primary focus:outline-none transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ══ STEP 4 — Review & Send ═══════════════════════════ */}
            {step === 4 && (
              <div>
                <h2 className="text-2xl text-foreground font-bold uppercase tracking-widest mb-1">
                  Review Project Brief
                </h2>
                <p className="text-muted-foreground text-sm mb-8 font-sans">
                  Please confirm all details before transmitting
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Service & Project */}
                  <div className="space-y-6">
                    <div className="bg-background border border-primary/20 p-5 rounded-none">
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 border-b border-primary/10 pb-2">
                        01. Service
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-primary/20 flex items-center justify-center bg-card">
                          {selectedService && <selectedService.icon className="text-primary" size={18} />}
                        </div>
                        <div>
                          <p className="text-foreground text-sm font-bold uppercase tracking-wide">
                            {formData.serviceName}
                          </p>
                          <p className="text-primary text-xs font-black">
                            {formData.servicePrice}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-background border border-primary/20 p-5 rounded-none">
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 border-b border-primary/10 pb-2">
                        02. Project
                      </p>
                      <div className="space-y-2 font-sans">
                        <p className="text-foreground text-sm font-bold">
                          {formData.projectName}
                        </p>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
                          <p className="text-muted-foreground">
                            <span className="text-primary">Timeline:</span> {formData.timeline}
                          </p>
                          <p className="text-muted-foreground">
                            <span className="text-primary">Budget:</span> {formData.budget || "Not specified"}
                          </p>
                        </div>
                        {formData.description && (
                          <p className="text-muted-foreground text-xs italic mt-2 line-clamp-3">
                            "{formData.description}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="space-y-6">
                    <div className="bg-background border border-primary/20 p-5 rounded-none">
                      <p className="text-primary text-[10px] font-black uppercase tracking-widest mb-3 border-b border-primary/10 pb-2">
                        03. Contact
                      </p>
                      <div className="space-y-3 font-sans">
                        <div className="flex items-center gap-2 text-foreground text-sm font-bold">
                          <User size={14} className="text-primary" />
                          {formData.name}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                          <Mail size={14} className="text-primary" />
                          {formData.email}
                        </div>
                        {formData.phone && (
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Phone size={14} className="text-primary" />
                            {formData.phone}
                          </div>
                        )}
                        {formData.company && (
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Building2 size={14} className="text-primary" />
                            {formData.company}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Final Warning */}
                    <div className="p-4 bg-primary/5 border border-primary/20 flex gap-3 rounded-none">
                      <AlertCircle className="text-primary flex-shrink-0" size={18} />
                      <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
                        By transmitting this brief, you agree to our response turnaround of 24 hours. We will contact you via email to schedule a discovery call.
                      </p>
                    </div>
                  </div>
                </div>

                {submitStatus === "error" && (
                  <div className="mt-8 flex items-start gap-3 p-4 rounded-none bg-destructive/10 border border-destructive/30 font-sans">
                    <AlertCircle size={18} className="text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-destructive font-bold text-sm mb-1">Transmission Warning</p>
                      <p className="text-muted-foreground text-xs leading-relaxed">{submitError}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Wizard Navigation */}
            <div className="mt-10 pt-8 border-t border-border flex justify-between items-center">
              <button
                type="button"
                onClick={handleBack}
                disabled={step === 1 || isSubmitting}
                className={`flex items-center gap-2 px-6 py-3 rounded-none text-xs font-bold uppercase tracking-widest transition-all ${
                  step === 1 || isSubmitting
                    ? "opacity-0 pointer-events-none"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <div className="flex gap-4">
                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                    className={`flex items-center gap-2 px-8 py-3 rounded-none text-xs font-black uppercase tracking-widest transition-all border ${
                      isStepValid()
                        ? "bg-primary text-primary-foreground border-primary hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(255,69,0,0.3)]"
                        : "bg-background text-muted-foreground border-border cursor-not-allowed"
                    }`}
                  >
                    Next Step <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 px-10 py-3 rounded-none text-xs font-black uppercase tracking-widest transition-all border border-primary ${
                      isSubmitting
                        ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,69,0,0.4)]"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2
                          size={16}
                          className="animate-spin"
                        />{" "}
                        Transmitting...
                      </>
                    ) : (
                      <>
                        <Send size={16} /> Transmit Brief
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
          <p>Secure 256-bit Encrypted Transmission</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-primary" /> 24hr Response</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={12} className="text-primary" /> Free Discovery Call</span>
          </div>
        </div>
      </div>
    </div>
  );
}
