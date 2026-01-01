import { Database, Shield, Cloud, Brain, Lock, Server, BarChart3, Network, Cpu, ExternalLink, FileText, Award } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDataSecOps } from "@/hooks/useContentAPI";

const DataSecOpsSection = () => {
  const { data: dataSecOpsData, loading } = useDataSecOps();
  
  if (loading) {
    return (
      <section className="py-24 relative">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </section>
    );
  }

  const iconMap: Record<string, typeof Database> = {
    database: Database,
    shield: Shield,
    cloud: Cloud,
    brain: Brain,
    lock: Lock,
    server: Server,
    barChart: BarChart3,
    network: Network,
    cpu: Cpu,
  };

  const colorMap: Record<string, string> = {
    primary: "primary",
    accent: "accent",
  };

  // UI defaults per area so the cards keep their intended look without needing extra fields in DB
  const areaMeta: Record<string, { icon?: typeof Database; subtitle?: string; color?: "primary" | "accent" }> = {
    "data-science": {
      icon: Brain,
      subtitle: "Data Science & ML",
      color: "primary",
    },
    cybersecurity: {
      icon: Shield,
      subtitle: "Cybersecurity & Blue Team",
      color: "accent",
    },
    "cloud-operations": {
      icon: Cloud,
      subtitle: "Cloud & DevOps",
      color: "primary",
    },
  };

  const dataSecOpsAreas = (dataSecOpsData as any)?.areas || [];


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="datasecops" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5" 
      />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 px-0 sm:px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-6"
          >
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-primary font-medium">{(dataSecOpsData as any)?.badge || "Nuevo Rol"}</span>
          </motion.div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            <span className="text-gradient">{(dataSecOpsData as any)?.title || "DataSecOps Engineer"}</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2 sm:px-4">
            {(dataSecOpsData as any)?.subtitle || "La convergencia perfecta entre ciencia de datos, ciberseguridad y operaciones en la nube."}
          </p>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-32 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mt-6 origin-center" 
          />
        </motion.div>

        {/* Areas Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto px-2 sm:px-0"
        >
          {dataSecOpsAreas.map((area: any) => {
            const meta = areaMeta[area.id] || {};
            const AreaIcon = meta.icon || iconMap[area.icon] || Database;
            const areaColor = meta.color || colorMap[area.color] || "primary";
            const subtitle = meta.subtitle || area.subtitle || area.title;
            
            return (
              <motion.div
                key={area.id}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group card-terminal hover-glow transition-all duration-500"
              >
                <div className={`card-terminal-header ${areaColor === "accent" ? "border-accent/30" : "border-primary/30"}`}>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    <AreaIcon className={`w-5 h-5 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                  </motion.div>
                  <span className="text-xs text-muted-foreground ml-2">{subtitle}</span>
                </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className={`w-14 h-14 rounded-xl ${areaColor === "accent" ? "bg-accent/10 border-accent/30" : "bg-primary/10 border-primary/30"} border flex items-center justify-center group-hover:${areaColor === "accent" ? "bg-accent/20" : "bg-primary/20"} transition-colors`}
                  >
                    <AreaIcon className={`w-7 h-7 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-foreground">{area.title}</h3>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {area.description}
                </p>

                {/* Skills - Extracted from certifications */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(() => {
                    // Extract unique skills from certifications
                    const allSkills = area.detailedInfo?.certifications?.flatMap((cert: any) => cert.skills || []) || [];
                    const uniqueSkills = [...new Set(allSkills)].slice(0, 4);
                    const skillIcons = ['brain', 'shield', 'cloud', 'database'] as const;
                    
                    return uniqueSkills.map((skill: string, idx: number) => {
                      const SkillIcon = iconMap[skillIcons[idx % skillIcons.length]] || Database;
                      return (
                        <motion.div
                          key={skill}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.2 + idx * 0.1 }}
                          whileHover={{ scale: 1.05, x: 5 }}
                          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/30 border border-border hover:border-primary/30 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <SkillIcon className={`w-4 h-4 flex-shrink-0 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                          <span className="text-xs text-foreground">{skill}</span>
                        </motion.div>
                      );
                    });
                  })()}
                </div>

                {/* Highlights - Top issuers */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(() => {
                    const issuers = area.detailedInfo?.certifications?.map((cert: any) => cert.issuer) || [];
                    const uniqueIssuers = [...new Set(issuers)].slice(0, 4);
                    
                    return uniqueIssuers.map((issuer: string, i: number) => (
                      <motion.span
                        key={issuer}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.05 }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        className={`px-3 py-1.5 text-xs rounded-full ${areaColor === "accent" ? "bg-accent/10 text-accent border-accent/20" : "bg-primary/10 text-primary border-primary/20"} border cursor-pointer transition-all whitespace-nowrap`}
                      >
                        {issuer}
                      </motion.span>
                    ));
                  })()}
                </div>

                {/* Ver más button */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className={`w-full group ${areaColor === "accent" ? "border-accent/30 hover:bg-accent/10 hover:border-accent" : "border-primary/30 hover:bg-primary/10 hover:border-primary"} transition-all`}
                    >
                      <span>Ver más</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className={`w-12 h-12 rounded-xl ${areaColor === "accent" ? "bg-accent/10 border-accent/30" : "bg-primary/10 border-primary/30"} border flex items-center justify-center`}>
                          <AreaIcon className={`w-6 h-6 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                        </div>
                        {area.title}
                      </DialogTitle>
                      <DialogDescription className="text-base mt-4">
                        {area.detailedInfo?.description || area.description}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="mt-6 space-y-6">

                      {/* Certifications */}
                      <div>
                        <h4 className="font-semibold text-lg mb-4 flex items-center gap-2">
                          <Award className={`w-5 h-5 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                          Certificaciones y Diplomas ({area.detailedInfo.certifications.length})
                        </h4>
                        
                        {/* Certificaciones con PDF - Vista previa */}
                        {area.detailedInfo.certifications.some((cert: any) => cert.pdfUrl) && (
                          <div className="mb-6">
                            <div className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
                              {area.detailedInfo.certifications.filter((cert: any) => cert.pdfUrl).map((cert: any, idx: number) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className={`group rounded-xl border ${cert.featured ? (areaColor === "accent" ? "border-accent/40 bg-accent/5" : "border-primary/40 bg-primary/5") : (areaColor === "accent" ? "border-accent/20 hover:border-accent/40" : "border-primary/20 hover:border-primary/40")} overflow-hidden transition-all hover:shadow-lg bg-card`}
                            >
                              <div className="flex flex-col gap-0">
                                {/* PDF Preview */}
                                {cert.pdfUrl ? (
                                  <a
                                    href={cert.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block relative w-full aspect-[16/9] bg-secondary/10 overflow-hidden flex-shrink-0 rounded-t-xl"
                                  >
                                    <iframe
                                      src={`${cert.pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                      className="w-full h-full pointer-events-none scale-100 group-hover:scale-105 transition-transform duration-300"
                                      title={`Vista previa: ${cert.name}`}
                                    />
                                    {/* Overlay on hover */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                      <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 dark:bg-black/90 rounded-full p-3">
                                        <FileText className={`w-6 h-6 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                                      </div>
                                    </div>
                                    {/* PDF Badge */}
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1 z-10">
                                      <FileText className="w-3 h-3" />
                                      PDF
                                    </div>
                                  </a>
                                ) : (
                                  <div className="w-full aspect-[16/9] bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center flex-shrink-0 rounded-t-xl">
                                    <Award className={`w-16 h-16 ${areaColor === "accent" ? "text-accent/30" : "text-primary/30"}`} />
                                  </div>
                                )}
                                
                                {/* Certificate Info */}
                                <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                                  {cert.featured && (
                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${areaColor === "accent" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"} font-semibold mb-2 w-fit`}>
                                      ⭐ Destacada
                                    </span>
                                  )}
                                  <h5 className="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2\">
                                    {cert.name}
                                  </h5>
                                  <p className="text-xs sm:text-sm text-muted-foreground mb-0.5 sm:mb-1\">
                                    {cert.issuer}
                                  </p>
                                  <p className="text-xs text-muted-foreground mb-2 sm:mb-3">
                                    {cert.date}{cert.expires ? ` • Vence: ${cert.expires}` : ''}
                                  </p>
                                  
                                  {/* Skills */}
                                  {cert.skills && cert.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mb-3">
                                      {cert.skills.slice(0, 4).map((skill: string, i: number) => (
                                        <span
                                          key={i}
                                          className={`px-2 py-0.5 text-xs rounded-full ${areaColor === "accent" ? "bg-accent/10 text-accent/80 border-accent/20" : "bg-primary/10 text-primary/80 border-primary/20"} border`}
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                      {cert.skills.length > 4 && (
                                        <span className="text-xs text-muted-foreground px-2 py-0.5">
                                          +{cert.skills.length - 4} más
                                        </span>
                                      )}
                                    </div>
                                  )}
                                  
                                  {/* Action Buttons */}
                                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-1.5 mt-auto w-full">
                                    {cert.url && (
                                      <a
                                        href={cert.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center justify-center sm:justify-start gap-1 px-2 sm:px-3 py-2 sm:py-1.5 text-xs rounded-lg flex-1 sm:flex-auto ${areaColor === "accent" ? "bg-accent/10 hover:bg-accent/20 text-accent border-accent/30" : "bg-primary/10 hover:bg-primary/20 text-primary border-primary/30"} border transition-all whitespace-nowrap`}
                                      >
                                        <ExternalLink className="w-3 h-3 flex-shrink-0" />
                                        <span className="hidden sm:inline">Ver credencial</span>
                                        <span className="sm:hidden">Credencial</span>
                                      </a>
                                    )}
                                    {cert.pdfUrl && (
                                      <a
                                        href={cert.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center sm:justify-start gap-1 px-2 sm:px-3 py-2 sm:py-1.5 text-xs rounded-lg flex-1 sm:flex-auto bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30 transition-all whitespace-nowrap"
                                      >
                                        <FileText className="w-3 h-3 flex-shrink-0" />
                                        <span className="hidden sm:inline">Descargar PDF</span>
                                        <span className="sm:hidden">PDF</span>
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Certificaciones sin PDF - Lista compacta */}
                        {area.detailedInfo.certifications.some((cert: any) => !cert.pdfUrl) && (
                          <div>
                            <h5 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              Certificaciones Digitales
                            </h5>
                            <div className="space-y-2">
                              {area.detailedInfo.certifications.filter((cert: any) => !cert.pdfUrl).map((cert: any, idx: number) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.03 }}
                                  className={`group rounded-lg border ${cert.featured ? (areaColor === "accent" ? "border-accent/40 bg-accent/5" : "border-primary/40 bg-primary/5") : (areaColor === "accent" ? "border-accent/20 hover:border-accent/30" : "border-primary/20 hover:border-primary/30")} p-4 transition-all hover:shadow-md bg-card`}
                                >
                                  <div className="flex items-start gap-3">
                                    {/* Icon */}
                                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${areaColor === "accent" ? "bg-accent/10" : "bg-primary/10"} flex items-center justify-center`}>
                                      <Award className={`w-5 h-5 ${areaColor === "accent" ? "text-accent" : "text-primary"}`} />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between gap-2 mb-1">
                                        <h6 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                                          {cert.name}
                                        </h6>
                                        {cert.featured && (
                                          <span className={`flex-shrink-0 px-2 py-0.5 text-xs rounded-full ${areaColor === "accent" ? "bg-accent/20 text-accent" : "bg-primary/20 text-primary"} font-semibold`}>
                                            ⭐
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-2">
                                        {cert.issuer} • {cert.date}{cert.expires ? ` • Vence: ${cert.expires}` : ''}
                                      </p>
                                      
                                      {/* Skills */}
                                      {cert.skills && cert.skills.length > 0 && (
                                        <div className="flex flex-wrap gap-1 mb-2">
                                          {cert.skills.slice(0, 3).map((skill: string, i: number) => (
                                            <span
                                              key={i}
                                              className={`px-1.5 py-0.5 text-xs rounded ${areaColor === "accent" ? "bg-accent/10 text-accent/80" : "bg-primary/10 text-primary/80"}`}
                                            >
                                              {skill}
                                            </span>
                                          ))}
                                          {cert.skills.length > 3 && (
                                            <span className="text-xs text-muted-foreground px-1.5 py-0.5">
                                              +{cert.skills.length - 3}
                                            </span>
                                          )}
                                        </div>
                                      )}
                                      
                                      {/* Action Button */}
                                      {cert.url && (
                                        <a
                                          href={cert.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded ${areaColor === "accent" ? "bg-accent/10 hover:bg-accent/20 text-accent" : "bg-primary/10 hover:bg-primary/20 text-primary"} transition-all`}
                                        >
                                          <ExternalLink className="w-3 h-3" />
                                          Ver credencial
                                        </a>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </motion.div>
          );
          })}
        </motion.div>

        {/* Bottom Quote */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 max-w-3xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 border border-border cursor-pointer"
          >
            <p className="text-foreground text-lg italic">
              {(dataSecOpsData as any)?.quote}
            </p>
            <div className="mt-4 flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">{(dataSecOpsData as any)?.quoteSubtext}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DataSecOpsSection;