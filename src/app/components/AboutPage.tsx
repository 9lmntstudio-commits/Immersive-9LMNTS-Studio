import { Brain, Zap, Target, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { SEO } from "./SEO";
import founderImg from "../imports/founder.png";
const founderImage = founderImg;
const cultureImage = "https://images.unsplash.com/photo-1602559399822-bd7d9f6da207?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjB0ZWFtJTIwcGVvcGxlfGVufDF8fHx8MTc3Nzk2NjczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
const aiImage      = "https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwbmVvbiUyMGJyYWlufGVufDF8fHx8MTc3Nzk2NjczOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

interface AboutPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function AboutPage({ onNavigate }: AboutPageProps) {
  const aiFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Design",
      description:
        "Leveraging machine learning to optimize layouts and user experiences",
    },
    {
      icon: Zap,
      title: "Rapid Prototyping",
      description:
        "AI-assisted wireframing and mockup generation for faster iterations",
    },
    {
      icon: Target,
      title: "Smart Optimization",
      description:
        "Automated testing and performance optimization powered by AI",
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="About | 9LMNTS Studio" 
        description="Learn about 9LMNTS Studio, our vision for the future of digital creation, and our AI-powered workflows." 
      />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-card border border-primary/30 rounded-full text-primary text-sm uppercase tracking-widest">
              About Us
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 font-bold leading-tight">
            <span className="font-['Orbitron'] uppercase tracking-tighter">
              Where Culture Meets
            </span>
            <br />
            <span className="font-['Mrs_Saint_Delafield'] text-primary text-6xl sm:text-7xl lg:text-9xl capitalize ml-[-15px] -rotate-3 inline-block">
              Technology
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-sans leading-relaxed">
            9LMNTS Studio bridges the gap between Hip-Hop
            culture and cutting-edge digital innovation,
            creating experiences that resonate and inspire
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-none overflow-hidden border-2 border-primary/30 bg-background shadow-[0_0_30px_rgba(255,69,0,0.1)]">
                <ImageWithFallback
                  src={cultureImage}
                  alt="Hip-Hop Culture"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl text-foreground mb-6 font-bold uppercase tracking-widest">
                <span className="font-['Orbitron']">The</span>{" "}
                <span className="font-['Orbitron']">9LMNTS</span>{" "}
                <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl capitalize ml-[-10px] -rotate-3 inline-block">
                  Story
                </span>
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed font-sans">
                <p>
                  Born from the vibrant energy of Hip-Hop
                  culture, 9LMNTS Studio represents the
                  convergence of artistic expression and
                  technological innovation. Just as Hip-Hop
                  consists of 9 foundational elements— MCing,
                  DJing, Graffiti, Breaking, Beatboxing,
                  Knowledge, Fashion, Entrepreneurship, and
                  Language—our approach to digital design draws
                  from these diverse disciplines.
                </p>
                <p>
                  Each element influences how we craft digital
                  experiences. The rhythm of a DJ's mix informs
                  our UX flows. The bold statements of graffiti
                   art inspire our visual designs. The
                  entrepreneurial spirit drives our innovative
                  solutions. The result? Websites and
                  applications that don't just function—they
                  perform.
                </p>
                <p>
                  We believe that great design, like great
                  Hip-Hop, is about authentic expression,
                  cultural awareness, and pushing boundaries.
                  Every project we undertake is an opportunity
                  to create something that resonates on a deeper
                  level, connecting with audiences through both
                  aesthetics and meaning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Element Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">The</span>{" "}
              <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                AI Element
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-3xl mx-auto font-sans leading-relaxed">
              We've added a 10th element to the traditional 9:
              Artificial Intelligence. By integrating AI into
              our workflow, we deliver smarter, faster, and more
              innovative solutions
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 lg:order-1">
              <div className="grid gap-6">
                {aiFeatures.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className="bg-card p-6 rounded-none border border-primary/20 hover:border-primary/40 transition-all group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-none flex-shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                          <Icon
                            className="text-primary"
                            size={24}
                          />
                        </div>
                        <div>
                          <h3 className="text-foreground text-xl mb-2 font-bold uppercase tracking-widest">
                            {feature.title}
                          </h3>
                          <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square rounded-none overflow-hidden border-2 border-primary/30 bg-black">
                <ImageWithFallback
                  src={aiImage}
                  alt="AI Technology"
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          <div className="bg-card p-8 rounded-none border border-primary/20">
            <h3 className="text-foreground text-2xl mb-4 font-bold uppercase tracking-widest">
              Our AI Workflow
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed font-sans">
              From initial concept to final deployment, AI
              enhances every stage of our process. We use
              machine learning algorithms to analyze user
              behavior, optimize designs, and predict trends.
              This allows us to create solutions that are not
              just current, but future-ready.
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {["Analyze", "Design", "Optimize", "Deploy"].map(
                (step, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-none flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-300">
                      <span className="text-primary group-hover:text-primary-foreground text-2xl font-black">
                        {index + 1}
                      </span>
                    </div>
                    <span className="text-foreground font-bold uppercase tracking-widest text-xs">{step}</span>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Meet the</span>{" "}
              <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                Founder
              </span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative max-w-lg mx-auto w-full">
              <div className="aspect-[4/5] rounded-none overflow-hidden border-2 border-primary/30 shadow-[0_0_40px_rgba(255,69,0,0.15)] bg-black">
                <img
                  src={founderImage}
                  alt="Darnley Sanon - Founder"
                  className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 opacity-90 hover:opacity-100"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            </div>

            <div>
              <div className="mb-6">
                <h3 className="text-foreground text-4xl mb-2 font-bold uppercase tracking-tighter">
                  Darnley Sanon
                </h3>
                <p className="text-primary text-xl font-bold uppercase tracking-widest">
                  Founder & Creative Director
                </p>
              </div>

              <div className="space-y-4 text-muted-foreground leading-relaxed font-sans mb-8">
                <p>
                  With over a decade of experience in graphic
                  design and UI/UX, Darnley founded 9LMNTS
                  Studio to merge his passion for Hip-Hop
                   culture with cutting-edge digital design. His
                  unique approach combines artistic authenticity
                  with technical excellence.
                </p>
                <p>
                  As a freelance graphic designer and UI/UX
                  specialist, he has worked with clients across
                  Southeast Asia, bringing a fresh perspective
                  that honors cultural roots while embracing
                  innovation.
                </p>
                <p className="border-l-4 border-primary pl-6 py-2 text-foreground font-medium italic">
                  "Every project is an opportunity to tell a
                  story, to create something that resonates
                  beyond the screen. That's the power of
                  combining art, culture, and technology."
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {[
                  "Graphic Design",
                  "UI/UX Design",
                  "Brand Strategy",
                  "Art Direction",
                ].map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-background border border-primary/30 rounded-none text-primary text-xs font-bold uppercase tracking-widest"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Our</span>{" "}
              <span className="font-['Mrs_Saint_Delafield'] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">
                Values
              </span>
            </h2>
            <p className="text-muted-foreground text-lg font-sans">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Authenticity",
                description:
                  "We create designs that are true to your brand and resonate with your audience",
              },
              {
                title: "Innovation",
                description:
                  "We push boundaries and embrace new technologies to deliver cutting-edge solutions",
              },
              {
                title: "Excellence",
                description:
                  "We are committed to the highest quality in every aspect of our work",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-none border border-primary/20 hover:border-primary/50 transition-all text-center group"
              >
                <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-none flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-300">
                  <span className="text-primary group-hover:text-primary-foreground text-2xl font-black">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-foreground text-xl mb-4 font-bold uppercase tracking-widest">
                  {value.title}
                </h3>
                <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold leading-tight uppercase tracking-tighter">
            <span className="font-['Orbitron']">
              Ready to Start
            </span>
            <br />
            <span className="font-['Orbitron']">Your</span>{" "}
            <span className="font-['Mrs_Saint_Delafield'] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-15px] -rotate-6 inline-block">
              Journey?
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 font-sans">
            Let's create something extraordinary together
          </p>
          <button 
            onClick={() => onNavigate("start-project")}
            className="px-10 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all transform hover:scale-105 border border-primary uppercase tracking-widest"
          >
            Get in Touch
            <ArrowRight size={20} className="ml-2 inline-block" />
          </button>
        </div>
      </section>
    </div>
  );
}