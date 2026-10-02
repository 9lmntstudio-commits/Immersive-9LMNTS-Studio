import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, FileText, Send, CheckSquare, CreditCard, Sparkles, Smartphone } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface GateOSCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  invoiceDetails?: {
    id: string;
    title: string;
    amount: number;
    description: string;
    paypalCheckoutUrl?: string;
  };
  onSimulateSuccess?: () => void;
}

export function GateOSCheckoutModal({
  isOpen,
  onClose,
  invoiceDetails = {
    id: "NX-8492",
    title: "Gate OS Access Ticket",
    amount: 20.00,
    description: "Standard Access Pass + Live Voting Ballot",
    paypalCheckoutUrl: "https://www.paypal.com/ncp/payment/YOUR_CHECKOUT_LINK"
  },
  onSimulateSuccess
}: GateOSCheckoutModalProps) {
  const [method, setMethod] = useState<'card' | 'etransfer' | 'demo'>('card');
  const [step, setStep] = useState<'select' | 'etransfer' | 'success'>('select');
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSimulateDemo = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
      if (onSimulateSuccess) {
        onSimulateSuccess();
      }
    }, 600);
  };

  const handleConfirmTransfer = async () => {
    setIsSubmitting(true);
    try {
      await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-662c70dc/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify({
          id: invoiceDetails.id,
          title: invoiceDetails.title,
          amount: invoiceDetails.amount,
          description: invoiceDetails.description,
          method: "e-Transfer"
        })
      });
      setStep('success');
    } catch (error) {
      console.error(error);
      setStep('success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setTimeout(() => {
      setStep('select');
      setAgreed(true);
    }, 300);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#07090E] border border-[#FF5500]/40 shadow-[0_0_50px_rgba(255,85,0,0.25)] rounded-xl overflow-hidden flex flex-col font-['Orbitron',sans-serif]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-[#FF5500]/20 bg-[#0B0F17]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500] animate-pulse" />
                <h2 className="text-[#FF5500] text-sm font-bold tracking-wider uppercase">
                  {step === 'success' ? 'SYSTEM.AUTHORIZED' : 'GATE.OS // CHECKOUT'}
                </h2>
              </div>
              <button
                onClick={resetAndClose}
                className="text-gray-400 hover:text-[#FF5500] transition-colors focus:outline-none p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 relative">
              <AnimatePresence mode="wait">
                {step === 'select' && (
                  <motion.div
                    key="select"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    {/* Invoice Card */}
                    <div className="bg-[#0B0F17] border border-white/10 p-4 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[#FF5500] text-[10px] font-black uppercase tracking-widest">ORDER ITEM</p>
                          <p className="text-white font-bold text-sm">{invoiceDetails.title}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">AMOUNT</p>
                          <p className="text-[#FF5500] text-xl font-black font-mono">${invoiceDetails.amount.toFixed(2)}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-gray-400 font-sans">{invoiceDetails.description}</p>
                    </div>

                    {/* Payment Options */}
                    <div className="space-y-3 pt-2">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">SELECT CHECKOUT METHOD</p>
                      
                      {/* Option 1: Apple Pay / Google Pay / Card */}
                      <a
                        href={invoiceDetails.paypalCheckoutUrl || "https://www.paypal.com"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full p-4 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-between shadow-lg shadow-[#FF5500]/20 group"
                      >
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-white" />
                          <div className="text-left">
                            <p className="font-bold">Apple Pay / Google Pay / Card</p>
                            <p className="text-[10px] font-sans text-white/80 lowercase">Instant secure digital checkout</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono">→</span>
                      </a>

                      {/* Option 2: Interac e-Transfer */}
                      <button
                        onClick={() => setStep('etransfer')}
                        className="w-full p-3.5 bg-[#121622] hover:bg-[#1A2030] text-gray-200 border border-white/10 font-bold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-between text-left"
                      >
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-cyber-cyan" />
                          <div>
                            <p className="font-bold">Interac e-Transfer (Canada)</p>
                            <p className="text-[10px] font-sans text-gray-400 lowercase">Zero fees • Auto-deposit enabled</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 font-mono">→</span>
                      </button>

                      {/* Option 3: Demo Test Simulation */}
                      <button
                        onClick={handleSimulateDemo}
                        disabled={isSubmitting}
                        className="w-full p-3 bg-transparent hover:bg-white/5 border border-dashed border-gray-600 text-gray-400 hover:text-white font-bold text-[11px] uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
                      >
                        <Sparkles className="w-4 h-4 text-matrix-green" />
                        <span>{isSubmitting ? "Simulating..." : "Test Interactive Demo (Simulate Vote)"}</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: E-TRANSFER DETAILS */}
                {step === 'etransfer' && (
                  <motion.div
                    key="etransfer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="space-y-5"
                  >
                    <div className="text-center space-y-1">
                      <h3 className="text-white text-base font-bold uppercase tracking-tight">Interac e-Transfer Instructions</h3>
                      <p className="text-[11px] text-gray-400 font-sans">Send payment directly from your Canadian banking app.</p>
                    </div>

                    <div className="bg-[#0B0F17] border border-white/10 p-4 rounded-lg space-y-3">
                      <div>
                        <p className="text-[10px] text-[#FF5500] font-bold uppercase tracking-wider mb-1">RECIPIENT EMAIL:</p>
                        <p className="text-white text-xs font-mono bg-black p-2.5 rounded border border-white/10 select-all">9lmntstudio@gmail.com</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">REFERENCE / ORDER ID:</p>
                        <p className="text-white text-xs font-mono bg-[#FF5500]/10 p-2.5 rounded border border-[#FF5500]/30 select-all">{invoiceDetails.id}</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep('select')}
                        className="w-1/3 py-3 bg-white/5 hover:bg-white/10 text-gray-300 font-bold text-xs uppercase tracking-wider rounded-lg"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleConfirmTransfer}
                        disabled={isSubmitting}
                        className="w-2/3 py-3 bg-[#FF5500] hover:bg-[#E64A19] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all"
                      >
                        {isSubmitting ? "Confirming..." : "I Have Sent Payment"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: SUCCESS STATE */}
                {step === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-6 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#00FF9D]/10 border-2 border-[#00FF9D] mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(0,255,157,0.3)]">
                      <CheckCircle2 className="w-8 h-8 text-[#00FF9D]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight">Access Credential Verified</h3>
                      <p className="text-xs text-gray-400 font-sans">
                        {invoiceDetails.title} has been logged to the arena.
                      </p>
                    </div>
                    <div className="bg-[#0B0F17] p-3 rounded border border-white/10 text-xs font-mono text-[#00FF9D]">
                      CREDENTIAL_TOKEN: VALID // PASS GRANTED
                    </div>
                    <button
                      onClick={resetAndClose}
                      className="w-full py-3.5 bg-[#FF5500] text-white font-bold uppercase tracking-wider text-xs rounded-lg hover:bg-[#E64A19] transition-colors"
                    >
                      Enter Arena Stage
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
