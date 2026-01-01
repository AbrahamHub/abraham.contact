import { useState } from "react";
import { Send, Download, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useContact } from "@/hooks/useContentAPI";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { data: contactData } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const apiBase = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');
      const response = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "¡Mensaje enviado! 🎉",
          description: "Me pondré en contacto contigo pronto.",
        });
        setName("");
        setEmail("");
      } else {
        toast({
          title: "Error al enviar 😕",
          description: data.error || "Intenta nuevamente más tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error de conexión 😕",
        description: "No se pudo conectar con el servidor.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contacto" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {(contactData as any)?.title || "Contacto"}
            </h2>
            <p className="text-muted-foreground">
              {(contactData as any)?.subtitle || "¿Qué tal? 👀 ¿Te gustaría crear cosas juntos?"}
              <br />
              {(contactData as any)?.description || "No olvides dejarme tu nombre y correo y me comunicaré en breve contigo. 🫶"}
            </p>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ scale: 1.01 }}
            className="card-terminal hover-glow transition-shadow duration-500"
          >
            <div className="card-terminal-header">
              <div className="browser-dots">
                <div className="browser-dot browser-dot-red" />
                <div className="browser-dot browser-dot-yellow" />
                <div className="browser-dot browser-dot-green" />
              </div>
              <span className="text-xs text-muted-foreground ml-4">{(contactData as any)?.fileName || "contact.tsx"}</span>
            </div>
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {(contactData as any)?.form?.nameLabel || "Nombre"}
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={(contactData as any)?.form?.namePlaceholder || "Tu nombre"}
                    required
                    className="bg-secondary/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-2"
                >
                  <label className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {(contactData as any)?.form?.emailLabel || "Correo electrónico"}
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={(contactData as any)?.form?.emailPlaceholder || "tu@email.com"}
                    required
                    className="bg-secondary/50 border-border focus:border-primary transition-all duration-300"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {(contactData as any)?.form?.submittingButton || "Enviando..."}
                        </motion.span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          {(contactData as any)?.form?.submitButton || "Enviar"}
                        </>
                      )}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Download CV Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                asChild
              >
                <a 
                  href="/documents/CV-ABRAHAM_CASTAÑEDA.pdf" 
                  download="CV-ABRAHAM_CASTAÑEDA.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  {(contactData as any)?.cvButton || "Descargar CV"}
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
