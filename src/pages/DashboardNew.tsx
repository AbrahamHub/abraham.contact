import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Save, LogOut, User, Code, Briefcase, Shield, 
  FileText, Mail, Home, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const DashboardNew = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<any>({});

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

  // Cargar todos los datos al iniciar
  useEffect(() => {
    fetchAllContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAllContent = async () => {
    try {
      const response = await fetch(`${apiUrl}/content`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error",
        description: "No se pudo cargar el contenido",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    });
    navigate("/login");
  };

  const updateSection = async (section: string, data: any) => {
    setLoading(true);
    try {
      const response = await fetch(`${apiUrl}/content/${section}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "✅ Cambios guardados y publicados",
          description: `La sección ${section} se actualizó en vivo`,
        });
        await fetchAllContent();
        
        // Emit custom event for live page refresh
        window.dispatchEvent(new CustomEvent('content-updated', { detail: { section } }));
      } else {
        throw new Error('Error al guardar');
      }
    } catch (error) {
      toast({
        title: "❌ Error al guardar",
        description: "No se pudieron guardar los cambios. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver al sitio</span>
              </Link>
              <div className="h-6 w-px bg-border" />
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Settings className="w-5 h-5 text-primary" />
                Dashboard de Contenido
              </h1>
            </div>

            <Button 
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto">
            <TabsTrigger value="personal" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="hero" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Sobre mí
            </TabsTrigger>
            <TabsTrigger value="skills" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Habilidades
            </TabsTrigger>
            <TabsTrigger value="techStack" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Tecnologías
            </TabsTrigger>
            <TabsTrigger value="dataSecOps" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              DataSecOps
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="contact" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contacto
            </TabsTrigger>
            <TabsTrigger value="footer" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Footer
            </TabsTrigger>
          </TabsList>

          {/* Personal Section */}
          <TabsContent value="personal">
            <PersonalSection 
              data={content.personal} 
              onSave={(data) => updateSection('personal', data)}
              loading={loading}
            />
          </TabsContent>

          {/* Hero Section */}
          <TabsContent value="hero">
            <HeroSection 
              data={content.hero} 
              onSave={(data) => updateSection('hero', data)}
              loading={loading}
            />
          </TabsContent>

          {/* About Section */}
          <TabsContent value="about">
            <AboutSection 
              data={content.about} 
              onSave={(data) => updateSection('about', data)}
              loading={loading}
            />
          </TabsContent>

          {/* Skills Section */}
          <TabsContent value="skills">
            <SkillsSection 
              data={content.skills} 
              onSave={(data) => updateSection('skills', data)}
              loading={loading}
            />
          </TabsContent>

          {/* TechStack Section */}
          <TabsContent value="techStack">
            <TechStackSection 
              data={content.techStack} 
              onSave={(data) => updateSection('techStack', data)}
              loading={loading}
            />
          </TabsContent>

          {/* DataSecOps Section */}
          <TabsContent value="dataSecOps">
            <DataSecOpsSection 
              data={content.dataSecOps} 
              onSave={(data) => updateSection('dataSecOps', data)}
              loading={loading}
            />
          </TabsContent>

          {/* Projects Section */}
          <TabsContent value="projects">
            <ProjectsSection 
              data={content.projects} 
              onSave={(data) => updateSection('projects', data)}
              loading={loading}
            />
          </TabsContent>

          {/* Contact Section */}
          <TabsContent value="contact">
            <ContactSectionDashboard 
              data={content.contact} 
              onSave={(data) => updateSection('contact', data)}
              loading={loading}
            />
          </TabsContent>

          {/* Footer Section */}
          <TabsContent value="footer">
            <FooterSection 
              data={content.footer} 
              onSave={(data) => updateSection('footer', data)}
              loading={loading}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Sub-componentes para cada sección
const PersonalSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Información Personal</CardTitle>
        <CardDescription>Datos básicos de contacto y perfil</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nombre completo</label>
            <Input
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Abraham Castañeda Quintero"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Título/Rol</label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Full Stack Developer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtítulo</label>
          <Input
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Especializado en React y Spring Boot"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="tu@email.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Ubicación</label>
            <Input
              value={formData.location || ''}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ciudad, País"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">GitHub</label>
            <Input
              value={formData.github || ''}
              onChange={(e) => setFormData({ ...formData, github: e.target.value })}
              placeholder="https://github.com/username"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">LinkedIn</label>
            <Input
              value={formData.linkedin || ''}
              onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const HeroSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || { developer: {}, terminal: {} });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sección Hero</CardTitle>
        <CardDescription>Texto principal de bienvenida y terminal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="font-semibold mb-4">Información del desarrollador</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Pasión (texto principal con efecto typewriter)</label>
              <Input
                value={formData.developer?.passion || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  developer: { ...formData.developer, passion: e.target.value }
                })}
                placeholder="Desarrollador web con pasión por los datos"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rol</label>
              <Input
                value={formData.developer?.role || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  developer: { ...formData.developer, role: e.target.value }
                })}
                placeholder="Full-Stack Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Enfoque</label>
              <Input
                value={formData.developer?.focus || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  developer: { ...formData.developer, focus: e.target.value }
                })}
                placeholder="Frontend, Backend, DevOps"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Estado</label>
              <Input
                value={formData.developer?.status || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  developer: { ...formData.developer, status: e.target.value }
                })}
                placeholder="Disponible para nuevos proyectos"
              />
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h3 className="font-semibold mb-4">Terminal (simulación de código)</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Comando</label>
              <Input
                value={formData.terminal?.command || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  terminal: { ...formData.terminal, command: e.target.value }
                })}
                placeholder="npm run dev"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Saludo del terminal</label>
              <Input
                value={formData.terminal?.greeting || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  terminal: { ...formData.terminal, greeting: e.target.value }
                })}
                placeholder="// Hola! Soy Abraham"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Código del terminal</label>
              <Textarea
                value={formData.terminal?.codeSnippet || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  terminal: { ...formData.terminal, codeSnippet: e.target.value }
                })}
                rows={6}
                placeholder="const developer = {&#10;  name: 'Abraham',&#10;  role: 'Full-Stack'&#10;};"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Texto de scroll</label>
          <Input
            value={formData.scrollText || ''}
            onChange={(e) => setFormData({ ...formData, scrollText: e.target.value })}
            placeholder="Scroll para explorar"
          />
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const AboutSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre mí</CardTitle>
        <CardDescription>Descripción personal y estadísticas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Sobre mí"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtítulo</label>
          <Input
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Conoce más sobre mi trayectoria"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <Textarea
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Descripción completa..."
            rows={6}
          />
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const SkillsSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || { frontend: {}, backend: {} });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Habilidades</CardTitle>
        <CardDescription>Gestión de skills Frontend y Backend</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título de la sección</label>
          <Input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Puedo hacer..."
          />
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">Frontend</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                value={formData.frontend?.title || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  frontend: { ...formData.frontend, title: e.target.value }
                })}
                placeholder="Front-end"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción (puede incluir HTML)</label>
              <Textarea
                value={formData.frontend?.description || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  frontend: { ...formData.frontend, description: e.target.value }
                })}
                rows={4}
                placeholder="Descripción de habilidades frontend..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tecnologías (separadas por coma)</label>
              <Input
                value={formData.frontend?.technologies?.join(', ') || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  frontend: { ...formData.frontend, technologies: e.target.value.split(',').map((t: string) => t.trim()) }
                })}
                placeholder="React, Vue.js, TypeScript, Tailwind"
              />
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">Backend</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Título</label>
              <Input
                value={formData.backend?.title || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  backend: { ...formData.backend, title: e.target.value }
                })}
                placeholder="Back-end"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Descripción (puede incluir HTML)</label>
              <Textarea
                value={formData.backend?.description || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  backend: { ...formData.backend, description: e.target.value }
                })}
                rows={4}
                placeholder="Descripción de habilidades backend..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tecnologías (separadas por coma)</label>
              <Input
                value={formData.backend?.technologies?.join(', ') || ''}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  backend: { ...formData.backend, technologies: e.target.value.split(',').map((t: string) => t.trim()) }
                })}
                placeholder="Java, Spring Boot, AWS, PostgreSQL, CI/CD"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const TechStackSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || { technologies: [] });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Stack Tecnológico</CardTitle>
        <CardDescription>Tecnologías y herramientas</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Stack Tecnológico"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtítulo</label>
          <Input
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Especializado en tecnologías de la Web..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tecnologías (una por línea: Nombre, Categoría)</label>
          <Textarea
            value={formData.technologies?.map((t: any) => `${t.name}, ${t.category}`).join('\n') || ''}
            onChange={(e) => {
              const techs = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                const [name, category] = line.split(',').map(s => s.trim());
                return { name, category };
              });
              setFormData({ ...formData, technologies: techs });
            }}
            rows={12}
            placeholder="JavaScript, Language&#10;TypeScript, Language&#10;React, Frontend"
          />
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const DataSecOpsSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>DataSecOps</CardTitle>
        <CardDescription>Información completa de DataSecOps (edición simplificada)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Badge</label>
          <Input
            value={formData.badge || ''}
            onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            placeholder="Nuevo Rol"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="DataSecOps Engineer"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtítulo</label>
          <Textarea
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            rows={2}
            placeholder="La convergencia perfecta..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Quote</label>
          <Textarea
            value={formData.quote || ''}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            rows={3}
            placeholder="Frase inspiradora..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtexto del Quote</label>
          <Input
            value={formData.quoteSubtext || ''}
            onChange={(e) => setFormData({ ...formData, quoteSubtext: e.target.value })}
            placeholder="En constante evolución"
          />
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            ℹ️ Para editar las áreas (Data Science, Cybersecurity, Cloud Operations) y sus certificaciones, 
            necesitarás acceder directamente a MongoDB o usar una interfaz más avanzada.
          </p>
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const ProjectsSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Proyectos</CardTitle>
        <CardDescription>Gestión de títulos de sección (edición de proyectos próximamente)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Título</label>
          <Input
            value={formData.title || ''}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Proyectos Destacados"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Subtítulo</label>
          <Input
            value={formData.subtitle || ''}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            placeholder="Algunos de mis trabajos recientes"
          />
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            ℹ️ Para editar proyectos individuales (título, descripción, tags, links), 
            accede directamente a MongoDB o espera próximas actualizaciones del dashboard.
          </p>
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const ContactSectionDashboard = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || { form: {} });

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contacto</CardTitle>
        <CardDescription>Textos del formulario de contacto</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Título</label>
            <Input
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Trabajemos juntos"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subtítulo</label>
            <Input
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="¿Tienes un proyecto en mente?"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción</label>
            <Textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              placeholder="Completa el formulario..."
            />
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">Textos del formulario</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Label Nombre</label>
                <Input
                  value={formData.form?.nameLabel || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    form: { ...formData.form, nameLabel: e.target.value }
                  })}
                  placeholder="Tu nombre"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Placeholder Nombre</label>
                <Input
                  value={formData.form?.namePlaceholder || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    form: { ...formData.form, namePlaceholder: e.target.value }
                  })}
                  placeholder="Abraham Castañeda"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Label Email</label>
                <Input
                  value={formData.form?.emailLabel || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    form: { ...formData.form, emailLabel: e.target.value }
                  })}
                  placeholder="Tu email"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Placeholder Email</label>
                <Input
                  value={formData.form?.emailPlaceholder || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    form: { ...formData.form, emailPlaceholder: e.target.value }
                  })}
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Botón Enviar</label>
                <Input
                  value={formData.form?.submitButton || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    form: { ...formData.form, submitButton: e.target.value }
                  })}
                  placeholder="Enviar mensaje"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Botón Enviando</label>
                <Input
                  value={formData.form?.submittingButton || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    form: { ...formData.form, submittingButton: e.target.value }
                  })}
                  placeholder="Enviando..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-4">Botón CV</h3>
          <div className="space-y-2">
            <label className="text-sm font-medium">Texto del botón</label>
            <Input
              value={formData.cvButton || ''}
              onChange={(e) => setFormData({ ...formData, cvButton: e.target.value })}
              placeholder="Descargar CV"
            />
          </div>
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

const FooterSection = ({ data, onSave, loading }: any) => {
  const [formData, setFormData] = useState(data || {});

  useEffect(() => {
    if (data) setFormData(data);
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Footer</CardTitle>
        <CardDescription>Información del pie de página</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Texto "Hecho con"</label>
          <Input
            value={formData.madeWith || ''}
            onChange={(e) => setFormData({ ...formData, madeWith: e.target.value })}
            placeholder="Hecho con"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ubicación</label>
          <Input
            value={formData.location || ''}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="de LATAM para el mundo 🌎"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Copyright</label>
          <Input
            value={formData.copyright || ''}
            onChange={(e) => setFormData({ ...formData, copyright: e.target.value })}
            placeholder="Todos los derechos reservados"
          />
        </div>

        <Button 
          onClick={() => onSave(formData)}
          disabled={loading}
          className="w-full"
        >
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Guardando...' : 'Guardar cambios'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardNew;
