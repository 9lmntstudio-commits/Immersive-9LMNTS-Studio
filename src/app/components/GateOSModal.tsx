import React, { useState } from 'react';
import { X, Ticket, ShieldCheck, Zap, Flame, CreditCard, CheckCircle2 } from 'lucide-react';

interface GateOSModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GateOSModal: React.FC<GateOSModalProps> = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<'ga' | 'power' | 'vip'>('power');
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const tiers = {
    ga: {
      name: 'General Admission Pass',
      price: 20,
      badge: 'GA ENTRY',
      desc: 'Access to main arena dancefloor, live decibel battle view, and single mobile crowd vote.',
    },
    power: {
      name: 'Power Hype Supporter Pass',
      price: 50,
      badge: 'POPULAR',
      desc: 'Fast-track entry, 50 Decibel Surge votes for your contender, and official 9LMNTS lanyard.',
    },
    vip: {
      name: 'VIP Stage Table & Hospitality',
      price: 150,
      badge: 'VIP ACCESS',
      desc: 'VIP mezzanine balcony table, dedicated bottle service host, 200 power votes, and soundcheck access.',
    },
  };

  const current = tiers[selectedTier];
  const total = current.price * quantity;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulating PayPal E-Commerce checkout flow
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl rounded-3xl bg-[#0a0b10] border border-[#ff5500]/40 shadow-[0_0_40px_rgba(255,85,0,0.3)] p-6 sm:p-8 space-y-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition"
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              Pass Activated // Gate OS
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Your digital entry badge for <span className="text-[#ff5500] font-bold">Sound Clash OS Live (Oct 31)</span> has been generated. Confirmation sent via PayPal E-Commerce.
            </p>
            <div className="p-4 rounded-2xl bg-black border border-white/10 font-mono text-xs text-slate-400 max-w-xs mx-auto text-left space-y-1">
              <div>PASS: {current.name}</div>
              <div>QTY: {quantity}</div>
              <div>TOTAL: ${total}.00 CAD</div>
              <div className="text-emerald-400">STATUS: NFC WALLET READY</div>
            </div>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase"
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-widest bg-[#ff5500]/15 text-[#ff5500] border border-[#ff5500]/40">
                  GATE OS // CASHLESS TICKETING
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider bg-white/5 text-slate-400 border border-white/10">
                  OCTOBER 31, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                Bronson Centre Arena Passes
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Official 8-Contender Halloween Sound Clash. Instant contactless entry badge generated upon checkout.
              </p>
            </div>

            {/* Pass Tier Selection Grid */}
            <div className="space-y-2.5">
              {(['ga', 'power', 'vip'] as const).map((tierKey) => {
                const tier = tiers[tierKey];
                const isSelected = selectedTier === tierKey;
                return (
                  <div
                    key={tierKey}
                    onClick={() => setSelectedTier(tierKey)}
                    className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-[#ff5500]/10 border-[#ff5500] shadow-[0_0_20px_rgba(255,85,0,0.2)]'
                        : 'bg-black/50 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm sm:text-base">{tier.name}</span>
                        {tier.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-white/10 text-[#00f0ff] uppercase">
                            {tier.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{tier.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-black text-white">${tier.price}</div>
                      <div className="text-[10px] font-mono text-slate-500">CAD / PASS</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quantity Selector & Total */}
            <div className="p-4 rounded-2xl bg-black border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-slate-400 uppercase">Quantity:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-mono font-bold text-white text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-500 block uppercase">Total Checkout</span>
                <span className="text-xl font-black text-[#ff5500]">${total}.00 CAD</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff5500] to-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_25px_rgba(255,85,0,0.4)] hover:brightness-110 active:scale-95 transition flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CreditCard size={16} />
              <span>{isProcessing ? 'Connecting PayPal Engine...' : `Authorize $${total}.00 CAD with PayPal`}</span>
            </button>

            {/* Footer Notice */}
            <div className="text-center text-[10px] font-mono text-slate-500">
              Transactions processed securely via PayPal E-Commerce Services • Full Refund Guarantee on Cancelled Dates
            </div>
          </>
        )}
      </div>
    </div>
  );
};
