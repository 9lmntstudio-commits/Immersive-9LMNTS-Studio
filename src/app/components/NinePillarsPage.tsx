import { Mic, Disc, Palette, Activity, Volume2, BookOpen, Shirt, Briefcase, MessageSquare, Brain, ArrowRight } from "lucide-react";
import { SEO } from "./SEO";

interface NinePillarsPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

interface Element {
  num: number;
  name: string;
  icon: any;
  services: string[];
  osProducts: string[];
}

export function NinePillarsPage({ onNavigate }: NinePillarsPageProps) {
  const elements: Element[] = [
    {
      num: 1,
      name: "MCing",
      icon: Mic,
      services: ["Brand Voice Development", "AI Assistant Outreach", "Copywriting"],
      osProducts: ["Artist OS (singers, rappers, comedians, keynote speakers)"],
    },
    {
      num: 2,
      name: "DJing",
      icon: Disc,
      services: ["Audio Mixing", "Sound Design", "Music Production"],
      osProducts: ["Artist OS (for DJs)", "Sound Clash OS (for DJ battles/tournaments)"],
    },
    {
      num: 3,
      name: "Graffiti",
      icon: Palette,
      services: ["Logo Design", "UI/Graphic Design", "Brand Identity"],
      osProducts: ["Brand OS"],
    },
    {
      num: 4,
      name: "Breaking",
      icon: Activity,
      services: ["Motion Graphics", "Animation", "Choreography Visualization"],
      osProducts: ["Dance OS", "Sound Clash OS (for dance battles)", "Sports OS (for sports events)"],
    },
    {
      num: 5,
      name: "Beatboxing",
      icon: Volume2,
      services: ["Beat Production", "Sound Engineering", "Audio Effects"],
      osProducts: ["Artist OS (for beatboxers)", "Sound Clash OS (for beat battles)"],
    },
    {
      num: 6,
      name: "Knowledge",
      icon: BookOpen,
      services: ["Business Consulting", "Strategy Planning", "Market Research"],
      osProducts: ["Education OS"],
    },
    {
      num: 7,
      name: "Fashion",
      icon: Shirt,
      services: ["Brand Clothing Design", "Merchandise Design", "Visual Merchandising"],
      osProducts: ["Fashion OS", "Chef OS (for culinary events)"],
    },
    {
      num: 8,
      name: "Entrepreneurship",
      icon: Briefcase,
      services: ["Business Planning", "Startup Consulting", "Revenue Strategy"],
      osProducts: ["Corporate Clash OS", "Startup OS", "Gaming OS (for gaming tournaments)", "Sports OS (for sports business)"],
    },
    {
      num: 9,
      name: "Language",
      icon: MessageSquare,
      services: ["Content Creation", "Copywriting", "Translation Services"],
      osProducts: ["Communication OS"],
    },
    {
      num: 10,
      name: "AI",
      icon: Brain,
      services: ["Custom AI Assistants", "AI Integration", "Machine Learning"],
      osProducts: ["AI Platform (integrated across all OS products)"],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="9 Pillars Plus AI | 9LMNTS Studio" 
        description="The 9LMNTS Framework: Each Hip-Hop element maps to our creative services and OS Series products, connecting culture with technology." 
      />
      
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-card border border-primary/30 rounded-full text-primary text-sm uppercase tracking-widest">
              The Framework
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 font-bold leading-tight">
            <span className="font-['Orbitron'] uppercase tracking-tighter">The</span> <span className="font-['Righteous'] text-primary text-6xl sm:text-7xl lg:text-8xl capitalize ml-[-10px] -rotate-3 inline-block">9LMNTS</span>
            <br />
            <span className="font-['Orbitron'] uppercase tracking-tighter">Pillars Plus</span> <span className="font-['Righteous'] text-primary text-6xl sm:text-7xl lg:text-8xl capitalize ml-[-10px] -rotate-3 inline-block">AI</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed">
            Each Hip-Hop element maps to our creative services and OS Series products, connecting culture with technology
          </p>
        </div>
      </section>

      {/* OS Product Distinction */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-background p-6 rounded-none border border-primary/20">
              <h3 className="text-foreground text-xl mb-3 font-bold uppercase tracking-widest text-primary">
                Artist OS
              </h3>
              <p className="text-muted-foreground text-sm font-sans">
                <span className="font-bold">24/7 operation:</span> For touring and live performers including singers, rappers, bands, DJs, keynote speakers, and comedians. Requires constant backend operation.
              </p>
            </div>
            <div className="bg-background p-6 rounded-none border border-primary/20">
              <h3 className="text-foreground text-xl mb-3 font-bold uppercase tracking-widest text-primary">
                Sound Clash OS
              </h3>
              <p className="text-muted-foreground text-sm font-sans">
                <span className="font-bold">Per-event and live operation:</span> For tournament/competition events including gaming, rap battles, DJ battles, singing battles, sports (5v5 street basketball). Per-event ticket sales with live operation during events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Elements Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {elements.map((element) => {
              const Icon = element.icon;
              return (
                <div
                  key={element.num}
                  className="bg-card p-6 rounded-none border border-primary/20 hover:border-primary transition-all hover:scale-105 group cursor-pointer"
                >
                  <div className="flex flex-col items-center text-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-none flex items-center justify-center mb-3 group-hover:bg-primary transition-all duration-300">
                      <Icon className="text-primary group-hover:text-primary-foreground" size={32} />
                    </div>
                    <span className="text-3xl text-primary font-black mb-1">{element.num}</span>
                    <h3 className="text-foreground text-lg font-bold uppercase tracking-widest">{element.name}</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-2">Studio Services</h4>
                      <ul className="space-y-1">
                        {element.services.map((service, idx) => (
                          <li key={idx} className="text-muted-foreground text-xs font-sans text-left">
                            • {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="text-primary text-xs font-bold uppercase tracking-widest mb-2">OS Products</h4>
                      <ul className="space-y-1">
                        {element.osProducts.map((product, idx) => (
                          <li key={idx} className="text-muted-foreground text-xs font-sans text-left">
                            • {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold leading-tight uppercase tracking-tighter">
            <span className="font-['Orbitron']">Ready to</span>
            <br />
            <span className="font-['Orbitron']">Explore Our</span>{" "}
            <span className="font-['Righteous'] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-15px] -rotate-6 inline-block">
              Full Range?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 font-sans">
            Let's create something extraordinary together
          </p>
          <button 
            onClick={() => onNavigate("pricing")}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all transform hover:scale-105 border border-primary uppercase tracking-widest inline-flex items-center gap-2"
          >
            View Pricing
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
}
