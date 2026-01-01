import { ExternalLink, Github, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useProjects } from "@/hooks/useContentAPI";

const ProjectsSection = () => {
  const { data: projectsData, loading } = useProjects();
  
  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">Cargando proyectos...</p>
        </div>
      </section>
    );
  }

  const projects = (projectsData as any)?.projects || [];
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

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section id="proyectos" className="py-24 relative">
      {/* Infinite Scroll Text */}
      <div className="overflow-hidden mb-16">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex whitespace-nowrap infinite-scroll"
        >
          <span className="text-6xl md:text-8xl font-bold text-secondary/30 px-8">
            PROYECTOS • PROYECTOS • PROYECTOS • PROYECTOS •
          </span>
          <span className="text-6xl md:text-8xl font-bold text-secondary/30 px-8">
            PROYECTOS • PROYECTOS • PROYECTOS • PROYECTOS •
          </span>
        </motion.div>
      </div>

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
            {(projectsData as any)?.title || "Mira mi trabajo 👀"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {(projectsData as any)?.subtitle || "Algunos proyectos destacados en los que he trabajado"}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12"
        >
          {projects.map((project: any, index: number) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group card-terminal hover-glow transition-shadow duration-500 cursor-pointer"
            >
              <div className="card-terminal-header">
                <motion.div
                  whileHover={{ rotate: 20 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Folder className={`w-5 h-5 ${project.color === "accent" ? "text-accent" : "text-primary"}`} />
                </motion.div>
                <div className="ml-auto flex gap-2">
                  {project.demo && (
                    <motion.div whileHover={{ scale: 1.2, y: -2 }}>
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                      </a>
                    </motion.div>
                  )}
                  <motion.div whileHover={{ scale: 1.2, y: -2 }}>
                    {project.github ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex"
                      >
                        <Github className="w-4 h-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
                      </a>
                    ) : (
                      <Github className="w-4 h-4 text-muted-foreground/50" />
                    )}
                  </motion.div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              asChild
            >
              <a href="https://github.com/AbrahamHub" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" />
                Más proyectos 🙀
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
