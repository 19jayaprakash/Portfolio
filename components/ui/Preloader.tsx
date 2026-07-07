"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Prevent scrolling while preloader is active
    document.body.style.overflow = "hidden";

    // Increment progress counter rapidly up to 100% over 3.5 seconds
    const duration = 3500;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let stepCount = 0;

    const timer = setInterval(() => {
      stepCount++;
      const nextProgress = Math.min(Math.floor((stepCount / steps) * 100), 100);
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(timer);
        
        // Let the 100% state rest for 500ms, then fade out the preloader
        setTimeout(() => {
          setLoading(false);
          document.body.style.overflow = "auto";
        }, 500);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col justify-between p-8 md:p-16 bg-[#070605] overflow-hidden select-none pointer-events-auto"
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%", 
            transition: { duration: 0.95, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Top Row: Brand Label */}
          <div className="flex justify-between items-start">
            <motion.span 
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              JP © PORTFOLIO
            </motion.span>
            <motion.span 
              className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-500"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              CREATIVE DEVELOPER
            </motion.span>
          </div>

          {/* Center Row: Signature Name with glowing effects */}
          <div className="text-center relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="space-y-4"
            >
              <h2 
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-[0.15em] uppercase select-none filter drop-shadow-[0_0_20px_rgba(200,149,107,0.15)]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Jayaprakash R
              </h2>
              
              <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.4em] uppercase text-amber-500/80">
                <span className="w-1 h-1 rounded-full bg-amber-500 animate-ping" />
                <span>Crafting Digital Experiences</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom Row: Loader Bar & Progress Number */}
          <div className="space-y-6">
            {/* Progress line */}
            <div className="relative w-full h-[2px] bg-neutral-900 overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-amber-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            <div className="flex justify-between items-end font-mono">
              <span className="text-[10px] text-neutral-500 uppercase tracking-widest animate-pulse">
                INITIALIZING CORE ASSETS...
              </span>
              <div className="text-right">
                <span className="text-4xl font-light font-display text-white pr-1">
                  {progress}
                </span>
                <span className="text-xs text-neutral-500 font-mono">%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
