import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<"typing" | "complete" | "fade">("typing");

  useEffect(() => {
    const typingTimer = setTimeout(() => setPhase("complete"), 2000);
    const completeTimer = setTimeout(() => setPhase("fade"), 3000);
    const fadeTimer = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(typingTimer);
      clearTimeout(completeTimer);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "fade" || (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      )}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: phase === "fade" ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
      >
        <div className="text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 md:gap-4"
          >
            <motion.span 
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-primary opacity-60"
            >
              &lt;
            </motion.span>
            
            <div className="overflow-hidden">
              <motion.h1
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground glow-text whitespace-nowrap overflow-hidden"
              >
                Abraham
              </motion.h1>
            </div>

            <motion.span 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 0.6 }}
              transition={{ duration: 0.5, delay: 1.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-primary opacity-60"
            >
              /&gt;
            </motion.span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === "complete" ? 1 : 0, y: phase === "complete" ? 0 : 20 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <span className="text-muted-foreground text-lg">DataSecOps Engineer</span>
          </motion.div>

          {/* Cursor blinking */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
            className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-primary"
          />
        </div>

        {/* Background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                opacity: 0,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{ 
                opacity: [0, 0.5, 0],
                y: [null, Math.random() * -200],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              className="absolute w-1 h-1 rounded-full bg-primary"
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroAnimation;