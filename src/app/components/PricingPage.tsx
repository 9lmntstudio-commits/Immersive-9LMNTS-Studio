import { Check, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { GateOSCheckoutModal } from './GateOSCheckoutModal';
import { SEO } from './SEO';

interface PricingPageProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function PricingPage({ onNavigate }: PricingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const handleOpenCheckout = (tier: any) => {
    setSelectedInvoice({
      id: `NX-${Math.floor(1000 + Math.random() * 9000)}`,
      title: tier.name,
      amount: tier.price === 'Custom' ? 5000 : parseFloat(tier.price.replace(/[$,]/g, '')),
      description: tier.description
    });
    setIsModalOpen(true);
  };

  const pricingTiers = [
    {
      name: 'Basic Boost',
      price: '$1,500',
      planValue: 'basic',
      description: 'Startups/Small Projects',
      features: [
        'Initial Concept',
        '1 Revision Round',
        'Basic Mockups',
        'Mobile Responsive',
        'Basic Design Assets',
        '1-2 Week Delivery',
      ],
      cta: 'Select Plan',
      popular: false,
    },
    {
      name: 'Standard Pro',
      price: '$3,000',
      planValue: 'standard',
      description: 'Growing Businesses',
      features: [
        'Everything in Basic Boost',
        'Full Wireframe',
        '2 Revision Rounds',
        'Full Design System Overview',
        'Component Library',
        'Interactive Prototype',
        '2-3 Week Delivery',
      ],
      cta: 'Select Plan',
      popular: false,
    },
    {
      name: 'Premium Elite',
      price: '$5,000',
      planValue: 'premium',
      description: 'Established Brands',
      features: [
        'Everything in Standard Pro',
        'Full UX Research',
        'Unlimited Revisions',
        'Full Design System Documentation',
        'Advanced Animations',
        'Priority Support',
        'Developer Handoff',
        'Style Guide',
        '3-4 Week Delivery',
      ],
      cta: 'Select Plan',
      popular: true,
    },
    {
      name: 'Custom Scale',
      price: 'Custom',
      planValue: 'custom',
      description: 'High-End/Large Scope',
      features: [
        'Large-scale Applications',
        'Full Brand Overhaul',
        'Retainer Work Available',
        'Dedicated Team',
        'Custom Timeline (Max 4 weeks)',
        'White Label Solutions',
        'Ongoing Support',
        '24/7 Availability',
      ],
      cta: 'Contact for Quote',
      popular: false,
    },
  ];

  const faqs = [
    {
      question: 'What is included in each tier?',
      answer: 'Each tier builds on the previous one. Basic Boost covers initial concepts and mockups, Standard Pro adds wireframes and design systems, Premium Elite includes full UX research and unlimited revisions, and Custom Scale is tailored to your specific needs.',
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Absolutely! You can upgrade at any time during the project. We\'ll credit your previous payment toward the higher tier.',
    },
    {
      question: 'What does "Full Design System" include?',
      answer: 'A full design system includes color palettes, typography scales, component libraries, spacing guidelines, and comprehensive documentation for consistent implementation across all platforms.',
    },
    {
      question: 'Do you offer payment plans?',
      answer: 'Yes, we offer flexible payment plans for projects over $3,000 CAD. Contact us to discuss milestone-based payment options.',
    },
    {
      question: 'What is the delivery timeline?',
      answer: 'Basic Boost takes 1-2 weeks, Standard Pro takes 2-3 weeks, Premium Elite takes 3-4 weeks, and Custom Scale timelines are negotiated based on project scope with a maximum of 4 weeks for most projects.',
    },
    {
      question: 'What services do you offer?',
      answer: 'We specialize in: 7-Day Agentic Sprint (AI Automation), Brand Identity & Logo Design, Website Design & Development, E-commerce Platforms, Mobile App Design, Marketing Campaigns, and Full Digital Transformations.',
    },
    {
      question: 'What files do I receive?',
      answer: 'You receive all design files (Figma/Adobe), exported assets, documentation, and for Premium Elite and above, developer-ready specs and style guides.',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 font-['Orbitron'] text-foreground">
      <SEO 
        title="Pricing | 9LMNTS Studio" 
        description="Transparent and modular pricing tiers for our cyber aesthetic web experiences. Choose between Flow, Beat, and Cypher elements." 
      />
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="px-4 py-2 bg-card border border-primary/30 rounded-full text-primary text-sm uppercase tracking-widest">
              Transparent Pricing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-foreground mb-6 font-bold">
            <span className="font-['Orbitron'] uppercase tracking-tighter">The</span> <span className="font-['Caveat'] text-[#FF5500] text-primary text-6xl sm:text-7xl lg:text-8xl capitalize ml-[-10px] -rotate-3 inline-block">Element Levels</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto font-sans">
            Choose the perfect tier for your project. All plans include our signature 
            9 Elements approach to digital excellence
          </p>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {pricingTiers.slice(0, 3).map((tier, index) => (
              <div
                key={index}
                className={`p-8 rounded-none transition-all flex flex-col ${
                  tier.popular
                    ? 'bg-background border-2 border-primary shadow-[0_0_40px_rgba(255,69,0,0.2)] scale-105 z-10'
                    : 'bg-background border border-primary/20'
                }`}
              >
                {tier.popular && (
                  <div className="mb-4">
                    <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-foreground text-2xl mb-2 font-bold uppercase tracking-widest">{tier.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl text-primary font-black">{tier.price}</span>
                  <span className="text-muted-foreground ml-2 text-sm">CAD</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1 font-sans">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-muted-foreground flex items-start text-sm">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleOpenCheckout(tier)}
                  className={`w-full py-4 rounded-none font-bold uppercase tracking-widest transition-all border ${
                    tier.popular
                      ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                      : 'bg-transparent border-primary text-primary hover:bg-primary/10'
                  }`}
                >
                  Buy Pass
                </button>
              </div>
            ))}
          </div>

          <div className="text-center font-sans">
            <p className="text-muted-foreground text-sm">
              All prices in Canadian Dollars (CAD). Need a custom solution?{' '}
              <a href="#" className="text-primary hover:underline font-bold">
                Contact us
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Compare All Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Compare All</span> <span className="font-['Caveat'] text-[#FF5500] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Features</span>
            </h2>
            <p className="text-muted-foreground font-sans">Detailed feature comparison across all tiers</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-card rounded-none border border-primary/20 font-sans">
              <thead>
                <tr className="border-b border-primary/20">
                  <th className="text-left p-4 text-foreground uppercase tracking-widest text-xs">Features</th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs">Basic Boost</th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs">Standard Pro</th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs bg-primary/10">
                    Premium Elite
                    <div className="text-[10px] text-primary mt-1">Popular</div>
                  </th>
                  <th className="text-center p-4 text-foreground uppercase tracking-widest text-xs">Custom Scale</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Initial Concept', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Mobile Responsive', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Basic Design Assets', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Revision Rounds', basic: '1', standard: '2', premium: 'Unlimited', custom: 'Unlimited' },
                  { feature: 'Basic Mockups', basic: true, standard: true, premium: true, custom: true },
                  { feature: 'Full Wireframe', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Component Library', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Interactive Prototype', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Design System Overview', basic: false, standard: true, premium: true, custom: true },
                  { feature: 'Full UX Research', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Full Design System Documentation', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Advanced Animations', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Developer Handoff', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Style Guide', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Priority Support', basic: false, standard: false, premium: true, custom: true },
                  { feature: 'Dedicated Team', basic: false, standard: false, premium: false, custom: true },
                  { feature: 'White Label Solutions', basic: false, standard: false, premium: false, custom: true },
                  { feature: 'Retainer Work Available', basic: false, standard: false, premium: false, custom: true },
                  { feature: '24/7 Availability', basic: false, standard: false, premium: false, custom: true },
                  { feature: 'Delivery Time', basic: '1-2 weeks', standard: '2-3 weeks', premium: '3-4 weeks', custom: 'Max 4 weeks' },
                ].map((row, index) => (
                  <tr key={index} className="border-b border-primary/10 hover:bg-primary/5 transition-colors">
                    <td className="p-4 text-muted-foreground text-sm font-medium">{row.feature}</td>
                    <td className="p-4 text-center">
                      {typeof row.basic === 'boolean' ? (
                        row.basic ? (
                          <Check className="text-primary mx-auto" size={18} />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs font-bold uppercase">{row.basic}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.standard === 'boolean' ? (
                        row.standard ? (
                          <Check className="text-primary mx-auto" size={18} />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs font-bold uppercase">{row.standard}</span>
                      )}
                    </td>
                    <td className="p-4 text-center bg-primary/5">
                      {typeof row.premium === 'boolean' ? (
                        row.premium ? (
                          <Check className="text-primary mx-auto" size={18} />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )
                      ) : (
                        <span className="text-primary text-xs font-bold uppercase">{row.premium}</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {typeof row.custom === 'boolean' ? (
                        row.custom ? (
                          <Check className="text-primary mx-auto" size={18} />
                        ) : (
                          <span className="text-muted-foreground/30">—</span>
                        )
                      ) : (
                        <span className="text-muted-foreground text-xs font-bold uppercase">{row.custom}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-border">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl text-foreground mb-4 font-bold uppercase tracking-widest">
              <span className="font-['Orbitron']">Frequently Asked</span> <span className="font-['Caveat'] text-[#FF5500] text-primary text-4xl sm:text-6xl capitalize ml-[-5px] -rotate-3 inline-block">Questions</span>
            </h2>
            <p className="text-muted-foreground font-sans">Everything you need to know about our pricing</p>
          </div>

          <div className="space-y-4 font-sans">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-background rounded-none border border-primary/20 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(faq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
                >
                  <span className="text-foreground font-bold text-sm uppercase tracking-widest">{faq.question}</span>
                  <HelpCircle
                    className={`text-primary flex-shrink-0 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                    size={20}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 border-t border-primary/10 pt-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-5xl text-foreground mb-6 font-bold leading-tight">
          <span className="font-['Orbitron'] uppercase tracking-tighter">Still Have</span> <span className="font-['Caveat'] text-[#FF5500] text-primary text-5xl sm:text-6xl lg:text-8xl capitalize ml-[-15px] -rotate-6 inline-block">Questions?</span>
        </h2>
        <p className="text-muted-foreground text-lg mb-8 font-sans">
          Our team is ready to help you choose the perfect plan
        </p>
        <button className="px-10 py-4 bg-primary text-primary-foreground rounded-none font-bold hover:bg-primary/90 transition-all transform hover:scale-105 border border-primary uppercase tracking-widest">
          Schedule a Consultation
        </button>
      </div>
    </section>

    {/* Checkout Modal */}
    {selectedInvoice && (
      <GateOSCheckoutModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        invoiceDetails={selectedInvoice}
      />
    )}
  </div>
  );
}