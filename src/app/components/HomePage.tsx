import {
  ArrowRight,
  Sparkles,
  Zap,
  Layers,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import img1 from "../../imports/image-1.png";
import img2 from "../../imports/image-2.png";
import img3 from "../../imports/image-3.png";
import { SEO } from "./SEO";
const soundClashImg = img3;
const weddingImg    = img2;
const corporateImg  = img1;

interface HomePageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const featuredWorks = [
    {
      title: "Sound Clash OS",
      category: "Live DJ Battles & Tournament Arena",
      image: soundClashImg,
      action: () => window.open("https://clash.9lmntsstudio.com", "_blank"),
    },
    {
      title: "9LMNTS Event OS",
      category: "Live Competition & Staging Engine",
      image: weddingImg,
      action: () => onNavigate("event-os-demo"),
    },
    {
      title: "Project LOA Universe",
      category: "Unreal Engine 5.7 Action RPG",
      image: corporateImg,
      action: () => onNavigate("loa"),
    },
  ];

  const pricingTiers = [
    {
      name: "Flow Element",
      price: "$1,500",
      planValue: "basic",
      features: [
        "Basic Web Design",
        "3 Page Website",
        "Mobile Responsive",
        "1 Month Support",
      ],
    },
    {
      name: "Beat Element",
      price: "$3,000",
      planValue: "standard",
      features: [
        "Advanced Design",
        "Up to 10 Pages",
        "Custom Animations",
        "3 Months Support",
        "SEO Optimization",
      ],
      highlighted: false,
    },
    {
      name: "Cypher Element",
      price: "$5,000",
      planValue: "premium",
      features: [
        "Premium Design",
        "Unlimited Pages",
        "Full Stack Development",
        "6 Months Support",
        "AI Integration",
        "Custom CMS",
      ],
      highlighted: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-['Orbitron']">
      <SEO 
        title="9LMNTS Studio | Futuristic Web Experiences" 
        description="Pioneering the digital frontier with high-performance Web3 applications, cyber aesthetic designs, and real-time CRM capabilities powered by Gate OS." 
      />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background effect */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-6 inline-block">
            <span className="px-4 py-2 bg-card border border-primary/30 rounded-full text-primary text-sm">
              Welcome to the Future
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-7xl text-foreground mb-6 tracking-tight font-bold">
            <span className="font-['Orbitron']">9LMNTS</span>{" "}
            <span className="font-['Righteous'] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-10px] -rotate-6 inline-block">
              Studio
            </span>
            <br />
            Digital Design Enters the
            <br />
            <span className="text-primary font-['Orbitron'] uppercase tracking-widest">
              CYBER CYPHER
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Blending Hip-Hop culture with cutting-edge AI
            technology to create unforgettable digital
            experiences
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate("start-project")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all transform hover:scale-105 flex items-center justify-center gap-2 group border border-primary"
            >
              Start Your Project
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
            <button
              onClick={() => onNavigate("event-os-demo")}
              className="px-8 py-4 bg-transparent border border-primary text-primary rounded-none font-bold hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
            >
              Event OS Demo <Zap size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* 9 Elements Concept */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4">
              The{" "}
              <span className="font-['Orbitron']">9LMNTS</span>{" "}
              <span className="font-['Righteous'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                Concept
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Just like the 9 elements of Hip-Hop culture, we
              bring together diverse creative pillars to craft
              your digital presence
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-4 mb-12">
            {[
              { num: 1, label: "MCing" },
              { num: 2, label: "DJing" },
              { num: 3, label: "Graffiti" },
              { num: 4, label: "Breaking" },
              { num: 5, label: "Beatboxing" },
              { num: 6, label: "Knowledge" },
              { num: 7, label: "Fashion" },
              { num: 8, label: "Entrepreneurship" },
              { num: 9, label: "Language" },
            ].map((element) => (
              <div
                key={element.num}
                className="bg-background border border-primary/30 rounded-none flex flex-col items-center justify-center group hover:border-primary transition-all hover:scale-105 cursor-pointer p-4"
              >
                <span className="text-3xl sm:text-4xl text-primary group-hover:scale-110 transition-transform mb-2">
                  {element.num}
                </span>
                <span className="text-xs sm:text-sm text-foreground text-center group-hover:text-primary transition-colors">
                  {element.label}
                </span>
              </div>
            ))}
            <button
              onClick={() => onNavigate("nine-pillars")}
              className="bg-primary border border-primary rounded-none flex flex-col items-center justify-center group hover:bg-primary/90 transition-all hover:scale-105 cursor-pointer p-4"
            >
              <ArrowRight
                className="text-primary-foreground group-hover:scale-110 transition-transform mb-2"
                size={32}
              />
              <span className="text-xs sm:text-sm text-primary-foreground text-center font-bold">
                Let's Begin
              </span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-background p-6 rounded-none border border-primary/20 hover:border-primary/50 transition-all">
              <Sparkles
                className="text-primary mb-4"
                size={32}
              />
              <h3 className="text-foreground text-xl mb-2 font-bold">
                Creative Flow
              </h3>
              <p className="text-muted-foreground">
                Each element represents a unique aspect of
                digital creation, flowing together seamlessly
              </p>
            </div>
            <div className="bg-background p-6 rounded-none border border-primary/20 hover:border-primary/50 transition-all">
              <Zap className="text-primary mb-4" size={32} />
              <h3 className="text-foreground text-xl mb-2 font-bold">
                AI-Powered
              </h3>
              <p className="text-muted-foreground">
                Leveraging artificial intelligence to enhance
                every stage of the design process
              </p>
            </div>
            <div className="bg-background p-6 rounded-none border border-primary/20 hover:border-primary/50 transition-all">
              <Layers
                className="text-primary mb-4"
                size={32}
              />
              <h3 className="text-foreground text-xl mb-2 font-bold">
                Layered Excellence
              </h3>
              <p className="text-muted-foreground">
                Building complex solutions through thoughtful
                layering of design elements
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4">
              <span className="font-['Orbitron']">Featured</span>{" "}
              <span className="font-['Righteous'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                Work
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Explore our latest digital masterpieces
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {featuredWorks.map((work, index) => (
              <div
                key={index}
                onClick={work.action}
                className="group cursor-pointer flex flex-col items-center"
              >
                {/* iPhone Mockup Container */}
                <div className="relative w-[280px] h-[580px] bg-[#050505] rounded-[3rem] border-[8px] border-[#1a1a1a] shadow-[0_0_50px_rgba(255,69,0,0.1)] group-hover:shadow-[0_0_60px_rgba(255,69,0,0.2)] transition-all duration-500 relative overflow-hidden mb-8">
                  {/* Speaker/Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-[#1a1a1a] rounded-b-2xl z-30 flex items-center justify-center">
                    <div className="w-10 h-1 bg-[#222] rounded-full" />
                  </div>

                  {/* Screen Content */}
                  <div className="absolute inset-0 w-full h-full bg-black overflow-hidden rounded-[2.5rem]">
                    <ImageWithFallback
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Screen Glow Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>

                  {/* Reflection/Shine FX */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20" />
                </div>
                
                {/* Details at Bottom */}
                <div className="text-center w-full px-4">
                  <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-none mb-3">
                    <p className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                      {work.category}
                    </p>
                  </div>
                  <h3 className="text-white text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {work.title}
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
                    <span className="text-[10px] font-black uppercase tracking-widest">Launch System</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => onNavigate("services")}
              className="px-8 py-4 bg-transparent border border-primary text-primary rounded-none font-bold hover:bg-primary/10 transition-all inline-flex items-center gap-2 uppercase tracking-widest"
            >
              Explore 9 Elements Services
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* AR Wings & Phygital Streetwear — Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="bg-background border border-primary/30 p-8 sm:p-12 relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-none text-primary text-xs font-mono tracking-widest uppercase mb-4">
                <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                Coming Soon // Q4 2026 & 2027 Arena Rollout
              </div>
              <h2 className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-white mb-4">
                WebAR Holographic Wings
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8 font-sans">
                Next-generation browser WebAR holographic wings and NFC-embedded 450 GSM streetwear. Scan the back cipher code on any authenticated 9LMNTS garment to project glowing neon energy wings over your shoulders in real-time camera view with zero app downloads required.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onNavigate("start-project", "ar-waitlist")}
                  className="px-8 py-4 bg-primary text-primary-foreground font-bold uppercase tracking-widest hover:bg-primary/90 transition-all text-xs"
                >
                  Join Early Waitlist
                </button>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="px-8 py-4 bg-transparent border border-primary text-primary font-bold uppercase tracking-widest hover:bg-primary/10 transition-all text-xs"
                >
                  View Product Matrix
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4">
              <span className="font-['Orbitron']">
                Choose Your
              </span>{" "}
              <span className="font-['Righteous'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                Element
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Flexible pricing for every stage of your journey
            </p>
          </div>

          <div>
            <button
              onClick={() => onNavigate("pricing")}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all inline-flex items-center gap-2 transform hover:scale-105 border border-primary"
            >
              View All Plans
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}