import { Monitor, Server } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSkills } from "@/hooks/useContentAPI";

const SkillsSection = () => {
  const { data: skillsData, loading } = useSkills();
  const sectionRef = useRef<HTMLDivElement>(null);

  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">Cargando habilidades...</p>
        </div>
      </section>
    );
  }

  return <SkillsContent skillsData={skillsData} />;
};

const SkillsContent = ({ skillsData }: { skillsData: any }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Giro de 0 a 180 grados basado en el scroll (eje horizontal)
  const rotateX = useTransform(scrollYProgress, [0.5, 0.6], [0, 180]);

  const techBadgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, delay: 0.3 + i * 0.1 },
    }),
  };

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-24 relative min-h-[200vh]">
      <div className="container mx-auto px-4 sm:px-6 sticky top-0 h-screen flex flex-col justify-center py-8 sm:py-16 md:py-20">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {skillsData?.title || "Puedo hacer..."}
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-primary mx-auto rounded-full origin-center" 
          />
        </motion.div>

        {/* Flip Card Container */}
        <div className="max-w-3xl mx-auto w-full perspective-[2000px] px-2 sm:px-4" style={{ perspective: "2000px" }}>
          <motion.div
            style={{ 
              rotateX,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full min-h-[300px] sm:min-h-[340px] md:min-h-[380px]"
          >
            {/* Frontend Card (Front) */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="card-terminal hover-glow transition-shadow duration-500 h-full"
              >
                <div className="card-terminal-header bg-card">
                  <div className="browser-dots">
                    <div className="browser-dot browser-dot-red" />
                    <div className="browser-dot browser-dot-yellow" />
                    <div className="browser-dot browser-dot-green" />
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
                    <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-lg sm:rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <Monitor className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-primary" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{skillsData?.frontend?.title || "Front-end"}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: skillsData?.frontend?.description || "" }} />
                  <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                    {(skillsData?.frontend?.technologies || []).map((tech: string, i: number) => (
                      <motion.span
                        key={tech}
                        custom={i}
                        variants={techBadgeVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-full bg-secondary text-foreground border border-border whitespace-nowrap"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Backend Card (Back) */}
            <div 
              className="absolute inset-0 backface-hidden"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateX(180deg)"
              }}
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="card-terminal hover-glow transition-shadow duration-500 bg-card h-full"
              >
                <div className="card-terminal-header bg-secondary">
                  <div className="browser-dots">
                    <div className="browser-dot browser-dot-red" />
                    <div className="browser-dot browser-dot-yellow" />
                    <div className="browser-dot browser-dot-green" />
                  </div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-5 md:mb-6">
                    <div className="w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 rounded-lg sm:rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center flex-shrink-0">
                      <Server className="w-6 sm:w-7 md:w-8 h-6 sm:h-7 md:h-8 text-accent" />
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">{skillsData?.backend?.title || "Back-end"}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base lg:text-lg" dangerouslySetInnerHTML={{ __html: skillsData?.backend?.description || "" }} />
                  <div className="mt-4 sm:mt-5 md:mt-6 flex flex-wrap gap-2 sm:gap-2.5">
                    {(skillsData?.backend?.technologies || []).map((tech: string, i: number) => (
                      <motion.span
                        key={tech}
                        custom={i}
                        variants={techBadgeVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-xs sm:text-sm rounded-full bg-secondary text-foreground border border-border whitespace-nowrap"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
