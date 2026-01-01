import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import { useHero } from "@/hooks/useContentAPI";

const HeroSection = () => {
  const { data: heroData, loading } = useHero();
  const [showCursor, setShowCursor] = useState(true);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = (heroData as any)?.developer?.passion || "Desarrollador web con pasión por los datos";

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 80); // 80ms por carácter

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-16">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Code Brackets with Name - Animación Original Exacta */}
          <motion.div 
            initial={{ scale: 1.5 }}
            animate={{ scale: 1 }}
            transition={{ 
              duration: 1.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="flex items-center justify-center gap-4 md:gap-8 mb-8"
          >
            {/* Left Bracket < */}
            <motion.span 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.6 }}
              transition={{ 
                duration: 1.5,
                delay: 0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="code-bracket"
            >
              &lt;
            </motion.span>

            {/* Name Container with Width Animation */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "auto" }}
              transition={{ 
                duration: 1.5,
                delay: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="overflow-hidden"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground whitespace-nowrap">
                Abraham
              </h1>
            </motion.div>

            {/* Right Bracket /> */}
            <motion.span 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 0.6 }}
              transition={{ 
                duration: 1.5,
                delay: 0,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="code-bracket"
            >
              /&gt;
            </motion.span>
          </motion.div>

          {/* Subtitle with Typewriter Effect */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 1.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border">
              <span className="text-primary font-medium">
                {displayedText}
                <span className={`ml-1 ${showCursor ? "opacity-100" : "opacity-0"}`}>|</span>
              </span>
            </div>
          </motion.div>

          {/* Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="flex items-center justify-center gap-3 mb-12"
          >
            <a 
              href="https://www.uanl.mx/oferta/ingeniero-en-tecnologia-de-software/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent">Ingeniero en Software por egresar 🚀</span>
            </a>
          </motion.div>

          {/* Laptop Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: "20%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2,
              delay: 2.2,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative">
              {/* Screen Content */}
              <div className="card-terminal">
                <div className="card-terminal-header">
                  <div className="browser-dots">
                    <div className="browser-dot browser-dot-red" />
                    <div className="browser-dot browser-dot-yellow" />
                    <div className="browser-dot browser-dot-green" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-4">terminal</span>
                </div>
                <div className="p-6 md:p-8 text-left">
                  <p className="text-muted-foreground mb-2">
                    <span className="text-accent">$</span> whoami
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Hola, soy Abraham 👋
                  </p>
                  <div className="text-muted-foreground text-sm md:text-base">
                    <span className="text-primary">const</span> desarrollador = {"{"}
                    <br />
                    <span className="ml-4">pasión: <span className="text-accent">"Código"</span>,</span>
                    <br />
                    <span className="ml-4">enfoque: <span className="text-accent">"Full-Stack"</span>,</span>
                    <br />
                    <span className="ml-4">estado: <span className="text-accent">"Construyendo cosas increíbles"</span></span>
                    <br />
                    {"}"};
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-3xl -z-10" />
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2"
          >
            <a 
              href="#sobre-mi" 
              className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            >
              <span className="text-xs">Scroll</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4" />
              </motion.div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
