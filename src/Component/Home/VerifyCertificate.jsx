import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Loader2, Cpu, CheckCircle } from "lucide-react";

export default function VerifyCertificate() {
  const [serial, setSerial] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsVerifying(true);
    // Simulate a high-tech scan delay
    setTimeout(() => {
      setIsVerifying(false);
      alert(`Verifying certificate: ${serial}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-4 relative overflow-hidden font-sans">
      
      {/* 1. INNOVATIVE BACKGROUND: Cyber Grid & Ambient Glow */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#81007f 1px, transparent 1px), linear-gradient(90deg, #81007f 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#81007f] rounded-full blur-[120px] opacity-20 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#4d004d] rounded-full blur-[120px] opacity-20" />

      {/* 2. MAIN CONTAINER */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-[#81007f]" />
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-[#81007f]" />

        <div className="bg-black/60 backdrop-blur-2xl shadow-[0_0_50px_rgba(129,0,127,0.15)] rounded-2xl p-10 text-center border border-white/10 relative overflow-hidden">
          
          {/* Animated "Scanner" Line during verification */}
          <AnimatePresence>
            {isVerifying && (
              <motion.div 
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-[#81007f] shadow-[0_0_15px_#81007f] z-20"
              />
            )}
          </AnimatePresence>

          {/* Content Switcher */}
          {!isVerifying ? (
            <motion.div exit={{ opacity: 0, y: -20 }}>
              <div className="flex justify-center mb-6 relative">
                <div className="absolute inset-0 bg-[#81007f] blur-2xl opacity-20 scale-150" />
                <ShieldCheck className="w-16 h-16 relative z-10" style={{ color: "#81007f" }} />
              </div>

              <h1 className="text-4xl font-extrabold text-white tracking-tight">
                Verify Certificate
              </h1>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xs mx-auto">
                Enter the{" "}
                <span className="font-semibold text-white border-b border-[#81007f]">
                  Certificate Serial Number
                </span>{" "}
                from your issued certificate to verify its authenticity.
              </p>

              <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-6">
                <div className="text-left w-full group">
                  <label className="text-[10px] uppercase tracking-[2px] font-bold text-[#81007f] mb-2 block ml-1">
                    System Entry Input
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={serial}
                      onChange={(e) => setSerial(e.target.value)}
                      className="w-full border border-white/10 bg-white/5 text-white rounded-xl px-5 py-4 focus:outline-none focus:border-[#81007f] focus:ring-1 focus:ring-[#81007f] transition-all placeholder-gray-600 font-mono"
                      placeholder="DLA-2025-XYZ123"
                      required
                    />
                    <Cpu className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 group-focus-within:text-[#81007f] transition-colors" />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(129, 0, 127, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="text-white font-bold w-full py-4 rounded-xl shadow-lg transition-all relative overflow-hidden group"
                  style={{ background: "linear-gradient(135deg, #81007f 0%, #4d004d 100%)" }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
                    Initiate Verification
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="py-12 flex flex-col items-center"
            >
              <Loader2 className="w-16 h-16 text-[#81007f] animate-spin mb-6" />
              <h2 className="text-xl font-mono text-[#81007f] animate-pulse">SEARCHING DATABASE...</h2>
              <p className="text-gray-500 text-xs mt-2 font-mono">ENCRYPTED LINK ESTABLISHED</p>
            </motion.div>
          )}
        </div>

        {/* 3. FOOTER INNOVATION: Status bar */}
        <div className="mt-6 flex justify-between items-center px-4 opacity-50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
            <span className="text-[10px] text-white font-mono uppercase">System: Secure</span>
          </div>
          <span className="text-[10px] text-white font-mono">v2.0.4-RSA</span>
        </div>
      </motion.div>
    </div>
  );
}