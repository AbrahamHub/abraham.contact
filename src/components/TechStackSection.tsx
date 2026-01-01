import { motion } from "framer-motion";
import { useTechStack } from "@/hooks/useContentAPI";

const TechStackSection = () => {
  const { data: techStackData, loading, error } = useTechStack();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  if (loading) {
    return (
      <section id="tecnologias" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="text-muted-foreground">Cargando tecnologías...</div>
        </div>
      </section>
    );
  }

  if (error || !techStackData) {
    return (
      <section id="tecnologias" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          <div className="text-destructive">Error al cargar tecnologías</div>
        </div>
      </section>
    );
  }

  const technologies = (techStackData as any)?.technologies || [];

  return (
    <section id="tecnologias" className="py-24 relative overflow-hidden">
      {/* Background Effect */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" 
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {(techStackData as any)?.title || "Mi Stack Tecnológico"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {(techStackData as any)?.subtitle || "Herramientas y tecnologías con las que trabajo"}
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-primary mx-auto rounded-full mt-4 origin-center" 
          />
        </motion.div>

        {/* Tech Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6 max-w-6xl mx-auto"
        >
          {technologies.map((tech: any, index: number) => {
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.08, y: -6 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="group flex flex-col items-center text-center cursor-pointer"
              >
                {/* SVG Icon from CDN */}
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 8 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="w-20 h-20 mb-2 flex items-center justify-center rounded-xl bg-secondary/30 border border-border group-hover:border-primary/50 group-hover:bg-secondary/50 transition-colors duration-300 p-3"
                >
                  <img 
                    src={tech.svg} 
                    alt={tech.name}
                    className="w-full h-full object-contain group-hover:drop-shadow-lg transition-all duration-300"
                    style={{ color: tech.color }}
                  />
                </motion.div>
                
                {/* Tech Name */}
                <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors duration-300 mb-1 leading-tight">
                  {tech.name}
                </h4>

                {/* Category Badge */}
                <span className="text-[10px] text-muted-foreground bg-secondary/40 px-1.5 py-0.5 rounded-full">
                  {tech.category}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStackSection;
