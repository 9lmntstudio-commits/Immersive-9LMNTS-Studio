import React, { useState, useEffect } from "react";
import { SEO } from "./SEO";
import { ChevronLeft, Ticket, Calendar, Music, Shield, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import heroImage from "../imports/Gate_OS_image-2.png"; 
import corp1 from "../imports/corporate-1.png";
import corp2 from "../imports/corporate-2.png";
import corp3 from "../imports/corporate-3.png";
import corp4 from "../imports/corporate-4.png";
import corp5 from "../imports/corporate-5.png";
import corp6 from "../imports/corporate-6.png";
import wed1 from "../imports/wedding-1.png";
import wed2 from "../imports/wedding-2.png";
import wed3 from "../imports/wedding-3.png";
import sc1 from "../imports/sound-clash-1.png";
import sc2 from "../imports/sound-clash-2.png";
import sc3 from "../imports/sound-clash-3.png";
import founderImg from "../imports/founder.png";
import logoImg from "../imports/logo.png";

interface ClashOSProps {
  onNavigate: (page: string) => void;
}

// The exact Gate OS Ticketing System as a Modal Overlay
function GateOSModal({ onClose }: { onClose: () => void }) {
  const [fomoTimer, setFomoTimer] = useState("--:--:--:--");
  const [fomoWarning, setFomoWarning] = useState("Price increases by $5 when timer hits zero!");
  const [currentPrice, setCurrentPrice] = useState(30);
  const [selectedTier, setSelectedTier] = useState("");
  const [addCatering, setAddCatering] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const priceTiers = [
        { date: new Date('2026-05-05T00:00:00-04:00').getTime(), price: 30 },
        { date: new Date('2026-05-08T00:00:00-04:00').getTime(), price: 35 },
        { date: new Date('2026-05-11T00:00:00-04:00').getTime(), price: 40 },
        { date: new Date('2026-05-14T00:00:00-04:00').getTime(), price: 45 },
        { date: new Date('2026-05-17T00:00:00-04:00').getTime(), price: 50 }
    ];

    const timer = setInterval(() => {
        const now = new Date().getTime();
        let currentTierIndex = 0;
        
        for (let i = 0; i < priceTiers.length; i++) {
            if (now < priceTiers[i].date) {
                currentTierIndex = i;
                break;
            }
        }
        if (now >= priceTiers[priceTiers.length - 1].date) {
            currentTierIndex = priceTiers.length - 1;
        }

        const currentBasePrice = priceTiers[currentTierIndex].price;
        setCurrentPrice(currentBasePrice);

        const nextTierDate = priceTiers[currentTierIndex].date;
        const distance = nextTierDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            setFomoTimer(`${days}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`);
            setFomoWarning("Price increases by $5 when timer hits zero!");
        } else {
            setFomoTimer("DOORS OPEN");
            setFomoWarning("Tickets are at full price at the door.");
        }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!selectedTier) {
        setSelectedTier(`${currentPrice}|Entry Pass|0`);
    }
  }, [currentPrice]);

  const handleCheckout = () => {
    const mockTxId = "TXN-" + Math.random().toString(36).substring(2, 10).toUpperCase();
    setTransactionId(mockTxId);
    setIsPaid(true);
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        style={{ fontFamily: "'Inter', sans-serif" }}
    >
        <motion.div 
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-[480px] bg-[#0f0f0f] border-x-2 border-[#FF4500] shadow-[0_0_40px_rgba(255,69,0,0.3)] flex flex-col relative my-auto rounded-t-lg rounded-b-lg overflow-hidden"
        >
            {/* Close Button */}
            <button 
                onClick={onClose}
                className="absolute top-4 right-4 z-50 bg-black/60 p-2 rounded-full backdrop-blur-sm border border-[#FF4500]/50 hover:bg-[#FF4500]/20 transition-colors"
            >
                <X size={20} className="text-white" />
            </button>

            {/* Hero / Flyer Container */}
            <div className="relative w-full border-b-[3px] border-[#FF4500] bg-black min-h-[250px]">
                <img 
                    src={heroImage} 
                    alt="The Clash Live Event" 
                    className="w-full h-auto block" 
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        const fallback = document.getElementById('fallback-header');
                        if(fallback) fallback.style.display = 'flex';
                    }} 
                />
                
                <div id="fallback-header" className="hidden absolute inset-0 bg-[#111] flex-col items-center justify-center p-5 text-center">
                    <h1 className="text-[#FF4500] m-0 text-3xl tracking-[2px]" style={{ fontFamily: "'Orbitron', sans-serif" }}>THE CLASH</h1>
                    <div className="text-white font-bold tracking-[1px] mt-2">UNDERGROUND MUSIC TOURNAMENT</div>
                    <div className="text-[#aaa] text-xs mt-2">MAY 16, 2026 • BRONSON CENTRE</div>
                </div>
                
                <div className="absolute bottom-5 left-0 w-full text-center text-white text-[1.5rem] tracking-[2px] uppercase z-10 drop-shadow-[0_0_10px_rgba(0,0,0,1)]" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    FEATURING <br/>
                    <span className="text-[#FF4500] font-black">John DECK</span>
                </div>
            </div>

            {/* Action Area */}
            <div className="px-[20px] py-[30px] text-center bg-[#0f0f0f]">
                {!isPaid ? (
                    <div className="animate-in fade-in duration-300">
                        {/* FOMO Timer */}
                        <div className="bg-[#110500] border border-[#FF4500] rounded-lg p-[15px] mb-[20px] shadow-[0_0_15px_rgba(255,69,0,0.2)] animate-[pulse-glow_2s_infinite]">
                            <div className="text-white text-[0.9rem] uppercase tracking-[1px] mb-[8px] font-bold">Early Bird Ends In:</div>
                            <div className="text-[#FF4500] text-[1.8rem] font-black tracking-[2px] leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>{fomoTimer}</div>
                            <div className="text-[#ff4444] text-[0.8rem] mt-[8px] font-bold">{fomoWarning}</div>
                        </div>

                        <h2 className="text-[#FF4500] uppercase text-[1.5rem] mb-[20px] drop-shadow-[0_0_10px_rgba(255,69,0,0.3)] m-0" style={{ fontFamily: "'Orbitron', sans-serif" }}>Secure Entry</h2>
                        
                        {/* Tier Select */}
                        <div className="relative mb-[25px]">
                            <select 
                                value={selectedTier}
                                onChange={(e) => setSelectedTier(e.target.value)}
                                className="w-full p-[16px] bg-[#1a1a1a] text-white border border-[#333] border-l-4 border-l-[#FF4500] rounded text-[1rem] font-bold outline-none appearance-none cursor-pointer"
                            >
                                <option value={`${currentPrice}|Entry Pass|0`}>Entry Pass Only (${currentPrice.toFixed(2)})</option>
                                <option value={`${currentPrice + 2}|Entry Pass + 10 Votes|10`}>Entry Pass + 10 Votes (${(currentPrice + 2).toFixed(2)})</option>
                                <option value={`${currentPrice + 5}|Entry Pass + 20 Votes|20`}>Entry Pass + 20 Votes (${(currentPrice + 5).toFixed(2)})</option>
                                <option value={`${currentPrice + 10}|Entry Pass + 50 Votes|50`}>Entry Pass + 50 Votes (${(currentPrice + 10).toFixed(2)})</option>
                                <option value={`2.00|10 Power Votes|10`}>10 Power Votes Only ($2.00)</option>
                                <option value={`5.00|20 Power Votes|20`}>20 Power Votes Only ($5.00)</option>
                                <option value={`10.00|50 Power Votes|50`}>50 Power Votes Only ($10.00)</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#FF4500]">
                                ▼
                            </div>
                        </div>

                        {/* Catering Module */}
                        <div className="mt-[30px] p-[15px] border border-[#FF4500] bg-[#000000] text-center mb-[25px]">
                            <div className="text-[#FF4500] text-[1.2rem] mb-[10px] uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>Catering OS Add-On</div>
                            <label className="flex items-center justify-center gap-[10px] cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    checked={addCatering}
                                    onChange={(e) => setAddCatering(e.target.checked)}
                                    className="w-[20px] h-[20px] accent-[#FF4500]" 
                                    style={{ transform: "scale(1.5)" }}
                                />
                                <span className="font-bold text-[1.1rem]">Add Premium BBQ Plate (+$15)</span>
                            </label>
                        </div>

                        {/* Checkout Button */}
                        <div className="mt-[25px]">
                            <button 
                                onClick={handleCheckout}
                                className="w-full bg-[#ffc439] text-black font-black text-lg py-[16px] rounded-[4px] hover:bg-[#ffc439]/90 transition-colors shadow-[0_0_15px_rgba(255,196,57,0.3)] active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Shield size={20} className="text-black" />
                                Pay with PayPal
                            </button>
                        </div>
                    </div>
                ) : (
                    /* Digital ID / Entry Pass */
                    <div className="bg-[#111] text-white p-[25px] rounded-[8px] border-2 border-[#FF4500] mt-[10px] text-center animate-in fade-in zoom-in duration-300 shadow-[0_0_30px_rgba(255,69,0,0.2)]">
                        <h3 className="mt-0 text-[#FF4500] text-[1.17em] uppercase tracking-[1px] border-b border-[#333] pb-[15px]" style={{ fontFamily: "'Orbitron', sans-serif" }}>ENTRY PASS SECURED</h3>
                        <div className="text-[#00ff88] font-black my-[15px] text-[1.1rem]">Payment Confirmed! ✅</div>
                        <p className="text-[0.9rem] text-[#ccc]">Screenshot this Digital ID for door entry.</p>
                        
                        {/* QR Code Placeholder */}
                        <div className="flex justify-center my-[20px] p-[15px] bg-white rounded-[8px] w-fit mx-auto">
                           <div className="w-[180px] h-[180px] flex items-center justify-center border-[8px] border-black p-2 relative">
                               <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-black"></div>
                               <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-black"></div>
                               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-black"></div>
                               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-black"></div>
                               <div className="text-black font-black text-xs text-center leading-tight">
                                  VALID<br/>SCAN
                               </div>
                           </div>
                        </div>
                        
                        <p className="text-[0.8rem] text-[#666] mb-[5px] mt-[20px] uppercase">Transaction ID / Digital ID:</p>
                        <div className="font-mono text-[#aaa] text-[0.9rem] break-all bg-[#000] p-[10px] rounded-[4px]">{transactionId}</div>
                        <div className="text-[0.85rem] text-[#888] mt-[20px] font-bold uppercase leading-relaxed">
                            MAY 16, 2026 • BRONSON CENTRE, OTTAWA
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    </motion.div>
  );
}

export function ClashOS({ onNavigate }: ClashOSProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050505] text-[#ffffff] font-sans relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
        
        {/* Subtle animated background grid */}
        <div className="fixed inset-0 pointer-events-none opacity-20 z-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,69,0,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,69,0,0.2)_1px,transparent_1px)] bg-[size:40px_40px] animate-[pulse-glow_4s_infinite]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
        </div>

        {/* Top Nav to go back */}
        <div className="absolute top-4 left-4 z-50">
            <button onClick={() => onNavigate("home")} className="bg-black/60 p-2 rounded-full backdrop-blur-sm border border-[#333] hover:border-[#FF4500] transition-colors flex items-center gap-2 pr-4">
                <ChevronLeft size={20} className="text-[#FF4500]" />
                <span className="text-xs font-bold tracking-widest uppercase text-white">Back</span>
            </button>
        </div>

        {/* Main Dashboard UI */}
        <div className="relative z-10 w-full max-w-[480px] mx-auto min-h-screen flex flex-col pt-20 px-6 border-x border-[#333]/30 bg-[#0a0a0a]">
            
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-[#FF4500]/10 border border-[#FF4500]/50 px-3 py-1 rounded-full mb-6">
                    <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></span>
                    <span className="text-[#FF4500] text-xs font-black uppercase tracking-widest">Live Now</span>
                </div>
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    Culture <span className="text-[#FF4500]">Clash</span>
                </h1>
                <p className="text-[#aaa] text-sm uppercase tracking-widest font-bold">The Underground Music Tournament</p>
            </div>

            <div className="bg-[#111] border border-[#333] rounded-xl p-6 mb-6 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/5 to-transparent pointer-events-none" />
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Calendar size={18} className="text-[#FF4500]" /> Next Event
                    </h3>
                    <span className="text-[#FF4500] text-xs font-bold bg-[#FF4500]/10 px-2 py-1 rounded">MAY 16</span>
                </div>
                <p className="text-sm text-[#888] mb-6">Secure your entry or pledge to power up your favorite artists in the ultimate showdown.</p>
                
                {/* THIS IS THE BUTTON THAT TRIGGERS THE GATE OS MODAL */}
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-[#FF4500] to-[#ff2a00] text-white font-black text-lg py-4 rounded-lg hover:shadow-[0_0_20px_rgba(255,69,0,0.5)] transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest"
                >
                    <Ticket size={24} />
                    Get Tickets / Pledge
                </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#111] border border-[#333] rounded-xl p-5 text-center">
                    <Music size={24} className="text-[#FF4500] mx-auto mb-2" />
                    <div className="text-2xl font-black text-white">8</div>
                    <div className="text-xs text-[#888] font-bold uppercase tracking-wider mt-1">Artists</div>
                </div>
                <div className="bg-[#111] border border-[#333] rounded-xl p-5 text-center">
                    <Shield size={24} className="text-[#FF4500] mx-auto mb-2" />
                    <div className="text-2xl font-black text-white">3</div>
                    <div className="text-xs text-[#888] font-bold uppercase tracking-wider mt-1">Arenas</div>
                </div>
            </div>

            {/* Official Locations & Partner Arenas */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                        <span className="w-1 h-4 bg-[#FF4500] inline-block"></span>
                        Partner Locations
                    </h3>
                </div>
                
                <div className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {[
                        { img: corp1, name: "Sector 01", tag: "Corporate" }, 
                        { img: corp2, name: "Sector 02", tag: "Corporate" }, 
                        { img: corp3, name: "Sector 03", tag: "Corporate" }, 
                        { img: corp4, name: "Sector 04", tag: "Corporate" }, 
                        { img: corp5, name: "Sector 05", tag: "Corporate" }, 
                        { img: corp6, name: "Sector 06", tag: "Corporate" },
                        { img: sc1, name: "Arena Alpha", tag: "Sound Clash" },
                        { img: sc2, name: "Arena Beta", tag: "Sound Clash" },
                        { img: sc3, name: "Arena Gamma", tag: "Sound Clash" },
                        { img: wed1, name: "Venue One", tag: "Reception" },
                        { img: wed2, name: "Venue Two", tag: "Reception" },
                        { img: wed3, name: "Venue Three", tag: "Reception" }
                    ].map((loc, idx) => (
                        <div key={idx} className="min-w-[200px] h-[140px] rounded-lg overflow-hidden border border-[#333] snap-start relative group flex-shrink-0">
                            <img src={loc.img} alt={`Location ${idx + 1}`} className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                            <div className="absolute top-2 right-2">
                                <span className="text-[0.6rem] font-bold px-2 py-1 bg-black/60 border border-[#333] text-[#aaa] rounded uppercase tracking-widest backdrop-blur-sm group-hover:border-[#FF4500] group-hover:text-white transition-colors">{loc.tag}</span>
                            </div>
                            <div className="absolute bottom-2 left-3">
                                <span className="text-white text-xs font-bold uppercase tracking-wider">{loc.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Organizer / Founder Section */}
            <div className="mb-8 bg-[#0a0a0a] border border-[#222] rounded-xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <img src={logoImg} alt="9LMNTS" className="w-24 h-auto" />
                </div>
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-full border-2 border-[#FF4500] overflow-hidden flex-shrink-0 shadow-[0_0_15px_rgba(255,69,0,0.3)]">
                        <img src={founderImg} alt="Founder" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <div className="text-[#FF4500] text-xs font-black uppercase tracking-widest mb-1">Architect</div>
                        <h4 className="text-white font-bold text-lg">Director Deck</h4>
                        <p className="text-[#888] text-xs uppercase tracking-wide">9LMNTS Studio</p>
                    </div>
                </div>
            </div>

            <div className="mt-auto pb-8 pt-4">
                <button className="w-full bg-[#111] border border-[#333] text-white font-bold py-4 rounded-lg hover:border-[#FF4500] transition-colors flex items-center justify-between px-6 group">
                    <span className="uppercase tracking-widest text-sm">View Schedule</span>
                    <ArrowRight size={18} className="text-[#888] group-hover:text-[#FF4500] group-hover:translate-x-1 transition-all" />
                </button>
            </div>
        </div>

        {/* The Gate OS Modal Integration */}
        <AnimatePresence>
            {isModalOpen && (
                <GateOSModal onClose={() => setIsModalOpen(false)} />
            )}
        </AnimatePresence>
        
        <style>{`
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 15px rgba(255,69,0,0.2); }
                50% { box-shadow: 0 0 25px rgba(255,69,0,0.4); border-color: #ff6a00; }
            }
            .hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
        `}</style>
    </div>
  );
}