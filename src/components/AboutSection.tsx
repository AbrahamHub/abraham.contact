import { Heart, Brain, Gamepad2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useAbout } from "@/hooks/useContentAPI";

const AboutSection = () => {
  const { data: aboutData, loading } = useAbout();

  const iconMap: Record<string, typeof Heart> = {
    heart: Heart,
    brain: Brain,
    gamepad: Gamepad2,
    book: BookOpen,
  };

  if (loading) {
    return (
      <section id="sobre-mi" className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </section>
    );
  }

  const traits = (aboutData as any)?.traits || [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="sobre-mi" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {(aboutData as any)?.title || "Me presento 🤝"}
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-primary mx-auto rounded-full origin-center" 
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Card */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileHover={{ scale: 1.02 }}
            className="card-terminal order-2 lg:order-1 hover-glow transition-shadow duration-500"
          >
            <div className="card-terminal-header">
              <div className="browser-dots">
                <div className="browser-dot browser-dot-red" />
                <div className="browser-dot browser-dot-yellow" />
                <div className="browser-dot browser-dot-green" />
              </div>
              <span className="text-xs text-muted-foreground ml-4">about.md</span>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-muted-foreground mb-4">{"//"}</p>
              {(aboutData as any)?.description?.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index} className="text-foreground leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: paragraph }} />
              ))}
              <p className="text-muted-foreground">{"//"}</p>
            </div>
          </motion.div>

          {/* Traits Grid */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-4">
              {traits.map((trait: any, index: number) => {
                const Icon = iconMap[trait.icon] || Heart;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="p-6 rounded-xl bg-secondary/30 border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors duration-300 group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Icon className="w-8 h-8 text-primary mb-3 transition-transform" />
                    </motion.div>
                    <p className="text-sm text-foreground">{trait.label}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote */}
            {(aboutData as any)?.quote && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className="mt-8 p-6 rounded-xl border border-primary/20 bg-primary/5 cursor-pointer"
              >
                <p className="text-foreground italic">
                  "{(aboutData as any).quote}"
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
