import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, Plus, Trash2, Edit2, FileText, ExternalLink, X, Save, 
  LogOut, User, Briefcase, Code, FolderOpen, Mail, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

interface Technology {
  id: string;
  name: string;
  category: string;
}

interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  pdfUrl: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  color: string;
}

interface ProfileData {
  name: string;
  role: string;
  status: string;
  aboutText1: string;
  aboutText2: string;
  quote: string;
}

interface ContactData {
  email: string;
  cvUrl: string;
}

const initialTechnologies: Technology[] = [
  { id: "1", name: "JavaScript", category: "Language" },
  { id: "2", name: "TypeScript", category: "Language" },
  { id: "3", name: "Python", category: "Language" },
  { id: "4", name: "React", category: "Frontend" },
  { id: "5", name: "Next.js", category: "Frontend" },
  { id: "6", name: "Tailwind CSS", category: "Frontend" },
  { id: "7", name: "Node.js", category: "Backend" },
  { id: "8", name: "Express", category: "Backend" },
  { id: "9", name: "PostgreSQL", category: "Database" },
  { id: "10", name: "MongoDB", category: "Database" },
  { id: "11", name: "Git", category: "Tools" },
  { id: "12", name: "Docker", category: "Tools" },
  { id: "13", name: "AWS", category: "Cloud" },
  { id: "14", name: "Kubernetes", category: "DevOps" },
];

const initialCertificates: Certificate[] = [
  { id: "1", title: "React - The Complete Guide", issuer: "Udemy", date: "2024-01", pdfUrl: "https://example.com/cert1.pdf" },
  { id: "2", title: "TypeScript Professional", issuer: "Platzi", date: "2024-03", pdfUrl: "https://example.com/cert2.pdf" },
  { id: "3", title: "AWS Cloud Practitioner", issuer: "Amazon", date: "2023-12", pdfUrl: "https://example.com/cert3.pdf" },
];

const initialProjects: Project[] = [
  { id: "1", title: "E-Commerce Platform", description: "Plataforma de comercio electrónico con carrito de compras, pagos y gestión de inventario.", tags: ["React", "Node.js", "MongoDB"], color: "primary" },
  { id: "2", title: "Task Management App", description: "Aplicación de gestión de tareas con drag & drop, colaboración en tiempo real.", tags: ["TypeScript", "Next.js", "Prisma"], color: "accent" },
  { id: "3", title: "Portfolio Dashboard", description: "Dashboard interactivo para visualización de datos financieros.", tags: ["React", "D3.js", "Python"], color: "primary" },
];

const initialProfile: ProfileData = {
  name: "Abraham",
  role: "Desarrollador Web Full-Stack",
  status: "ITS en proceso 🚀",
  aboutText1: "Soy un entusiasta de la tecnología, amante de los perros 🐾 y apasionado por aprender todos los días.",
  aboutText2: "A mi mente le encantan los retos, por eso soy entusiasta de juegos y acertijos de destreza mental como el ajedrez.",
  quote: "Cada proyecto es una oportunidad de crecimiento laboral y profesional.",
};

const initialContact: ContactData = {
  email: "contacto@abraham.dev",
  cvUrl: "https://example.com/cv.pdf",
};

const categories = ["Language", "Frontend", "Backend", "Database", "Tools", "Cloud", "DevOps", "Security", "Data Science"];

const Dashboard = () => {
  const { isAuthenticated, isLoading, logout } = useAuth();
  
  const [technologies, setTechnologies] = useState<Technology[]>(initialTechnologies);
  const [certificates, setCertificates] = useState<Certificate[]>(initialCertificates);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [profile, setProfile] = useState<ProfileData>(initialProfile);
  const [contact, setContact] = useState<ContactData>(initialContact);
  
  const [newTech, setNewTech] = useState({ name: "", category: "Frontend" });
  const [newCert, setNewCert] = useState({ title: "", issuer: "", date: "", pdfUrl: "" });
  const [newProject, setNewProject] = useState({ title: "", description: "", tags: "", color: "primary" });
  
  const [editingTech, setEditingTech] = useState<Technology | null>(null);
  const [selectedPdf, setSelectedPdf] = useState<Certificate | null>(null);
  
  const [isTechDialogOpen, setIsTechDialogOpen] = useState(false);
  const [isCertDialogOpen, setIsCertDialogOpen] = useState(false);
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary animate-pulse">Cargando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const addTechnology = () => {
    if (!newTech.name.trim()) {
      toast({ title: "Error", description: "El nombre es requerido", variant: "destructive" });
      return;
    }
    const tech: Technology = { id: Date.now().toString(), name: newTech.name, category: newTech.category };
    setTechnologies([...technologies, tech]);
    setNewTech({ name: "", category: "Frontend" });
    setIsTechDialogOpen(false);
    toast({ title: "Éxito", description: "Tecnología agregada correctamente" });
  };

  const updateTechnology = () => {
    if (!editingTech) return;
    setTechnologies(technologies.map((t) => (t.id === editingTech.id ? editingTech : t)));
    setEditingTech(null);
    toast({ title: "Éxito", description: "Tecnología actualizada" });
  };

  const deleteTechnology = (id: string) => {
    setTechnologies(technologies.filter((t) => t.id !== id));
    toast({ title: "Eliminado", description: "Tecnología eliminada" });
  };

  const addCertificate = () => {
    if (!newCert.title.trim() || !newCert.issuer.trim()) {
      toast({ title: "Error", description: "Título e institución son requeridos", variant: "destructive" });
      return;
    }
    const cert: Certificate = { id: Date.now().toString(), ...newCert };
    setCertificates([...certificates, cert]);
    setNewCert({ title: "", issuer: "", date: "", pdfUrl: "" });
    setIsCertDialogOpen(false);
    toast({ title: "Éxito", description: "Certificado agregado correctamente" });
  };

  const deleteCertificate = (id: string) => {
    setCertificates(certificates.filter((c) => c.id !== id));
    toast({ title: "Eliminado", description: "Certificado eliminado" });
  };

  const addProject = () => {
    if (!newProject.title.trim() || !newProject.description.trim()) {
      toast({ title: "Error", description: "Título y descripción son requeridos", variant: "destructive" });
      return;
    }
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      description: newProject.description,
      tags: newProject.tags.split(",").map(t => t.trim()).filter(t => t),
      color: newProject.color,
    };
    setProjects([...projects, project]);
    setNewProject({ title: "", description: "", tags: "", color: "primary" });
    setIsProjectDialogOpen(false);
    toast({ title: "Éxito", description: "Proyecto agregado correctamente" });
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast({ title: "Eliminado", description: "Proyecto eliminado" });
  };

  const saveProfile = () => {
    toast({ title: "Guardado", description: "Perfil actualizado correctamente" });
  };

  const saveContact = () => {
    toast({ title: "Guardado", description: "Información de contacto actualizada" });
  };

  const groupedTechnologies = technologies.reduce((acc, tech) => {
    if (!acc[tech.category]) acc[tech.category] = [];
    acc[tech.category].push(tech);
    return acc;
  }, {} as Record<string, Technology[]>);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-foreground">Dashboard</h1>
            <Badge variant="outline" className="border-accent/30 text-accent">
              <Shield className="w-3 h-3 mr-1" />
              Admin
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <div className="browser-dots">
              <div className="browser-dot browser-dot-red" />
              <div className="browser-dot browser-dot-yellow" />
              <div className="browser-dot browser-dot-green" />
            </div>
            <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-secondary/50 border border-border">
            <TabsTrigger value="profile" className="gap-2">
              <User className="w-4 h-4" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="projects" className="gap-2">
              <FolderOpen className="w-4 h-4" />
              Proyectos
            </TabsTrigger>
            <TabsTrigger value="technologies" className="gap-2">
              <Code className="w-4 h-4" />
              Tecnologías
            </TabsTrigger>
            <TabsTrigger value="certificates" className="gap-2">
              <FileText className="w-4 h-4" />
              Certificados
            </TabsTrigger>
            <TabsTrigger value="contact" className="gap-2">
              <Mail className="w-4 h-4" />
              Contacto
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-terminal">
                <CardHeader className="card-terminal-header">
                  <User className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm font-medium text-foreground">Información del Perfil</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Nombre</label>
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm text-muted-foreground">Rol</label>
                      <Input
                        value={profile.role}
                        onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Estado</label>
                    <Input
                      value={profile.status}
                      onChange={(e) => setProfile({ ...profile, status: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Sobre mí (párrafo 1)</label>
                    <Textarea
                      value={profile.aboutText1}
                      onChange={(e) => setProfile({ ...profile, aboutText1: e.target.value })}
                      className="bg-secondary/50 border-border min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Sobre mí (párrafo 2)</label>
                    <Textarea
                      value={profile.aboutText2}
                      onChange={(e) => setProfile({ ...profile, aboutText2: e.target.value })}
                      className="bg-secondary/50 border-border min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Cita personal</label>
                    <Textarea
                      value={profile.quote}
                      onChange={(e) => setProfile({ ...profile, quote: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <Button onClick={saveProfile} className="hover-glow">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Perfil
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Proyectos</h2>
                <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 hover-glow">
                      <Plus className="w-4 h-4" />
                      Agregar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Nuevo Proyecto</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        placeholder="Título del proyecto"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Textarea
                        placeholder="Descripción"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Input
                        placeholder="Tags (separados por coma)"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Select
                        value={newProject.color}
                        onValueChange={(value) => setNewProject({ ...newProject, color: value })}
                      >
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Color" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          <SelectItem value="primary">Primary</SelectItem>
                          <SelectItem value="accent">Accent</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={addProject} className="w-full hover-glow">
                        Agregar Proyecto
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="card-terminal group hover:border-primary/50 transition-all">
                    <CardHeader className="card-terminal-header">
                      <FolderOpen className={`w-4 h-4 ${project.color === "accent" ? "text-accent" : "text-primary"}`} />
                      <CardTitle className="text-sm font-medium text-foreground truncate">{project.title}</CardTitle>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => deleteProject(project.id)}
                        className="ml-auto h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-border">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Technologies Tab */}
          <TabsContent value="technologies">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Stack Tecnológico</h2>
                <Dialog open={isTechDialogOpen} onOpenChange={setIsTechDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 hover-glow">
                      <Plus className="w-4 h-4" />
                      Agregar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Nueva Tecnología</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        placeholder="Nombre de la tecnología"
                        value={newTech.name}
                        onChange={(e) => setNewTech({ ...newTech, name: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Select
                        value={newTech.category}
                        onValueChange={(value) => setNewTech({ ...newTech, category: value })}
                      >
                        <SelectTrigger className="bg-secondary/50 border-border">
                          <SelectValue placeholder="Categoría" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-border">
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button onClick={addTechnology} className="w-full hover-glow">
                        Agregar Tecnología
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-6">
                {Object.entries(groupedTechnologies).map(([category, techs]) => (
                  <Card key={category} className="card-terminal">
                    <CardHeader className="card-terminal-header">
                      <CardTitle className="text-sm font-medium text-primary">{category}</CardTitle>
                      <Badge variant="outline" className="ml-auto border-primary/30 text-primary">
                        {techs.length}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex flex-wrap gap-3">
                        {techs.map((tech) => (
                          <div
                            key={tech.id}
                            className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/30 border border-border hover:border-primary/50 transition-all"
                          >
                            {editingTech?.id === tech.id ? (
                              <>
                                <Input
                                  value={editingTech.name}
                                  onChange={(e) => setEditingTech({ ...editingTech, name: e.target.value })}
                                  className="h-6 w-24 text-sm bg-secondary border-border"
                                />
                                <Button size="sm" variant="ghost" onClick={updateTechnology} className="h-6 w-6 p-0 text-accent">
                                  <Save className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => setEditingTech(null)} className="h-6 w-6 p-0">
                                  <X className="w-3 h-3" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span className="text-foreground font-medium">{tech.name}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <Button size="sm" variant="ghost" onClick={() => setEditingTech(tech)} className="h-6 w-6 p-0 text-muted-foreground hover:text-primary">
                                    <Edit2 className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="ghost" onClick={() => deleteTechnology(tech.id)} className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive">
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Certificados</h2>
                <Dialog open={isCertDialogOpen} onOpenChange={setIsCertDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2 hover-glow">
                      <Plus className="w-4 h-4" />
                      Agregar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-card border-border">
                    <DialogHeader>
                      <DialogTitle className="text-foreground">Nuevo Certificado</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <Input
                        placeholder="Título del curso"
                        value={newCert.title}
                        onChange={(e) => setNewCert({ ...newCert, title: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Input
                        placeholder="Institución"
                        value={newCert.issuer}
                        onChange={(e) => setNewCert({ ...newCert, issuer: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Input
                        type="month"
                        value={newCert.date}
                        onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Input
                        placeholder="URL del PDF"
                        value={newCert.pdfUrl}
                        onChange={(e) => setNewCert({ ...newCert, pdfUrl: e.target.value })}
                        className="bg-secondary/50 border-border"
                      />
                      <Button onClick={addCertificate} className="w-full hover-glow">
                        Agregar Certificado
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="card-terminal group hover:border-primary/50 transition-all">
                    <CardHeader className="card-terminal-header">
                      <FileText className="w-4 h-4 text-primary" />
                      <CardTitle className="text-sm font-medium text-foreground truncate">{cert.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 space-y-4">
                      <div>
                        <p className="text-muted-foreground text-sm">Institución</p>
                        <p className="text-foreground font-medium">{cert.issuer}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-sm">Fecha</p>
                        <p className="text-foreground">{cert.date || "Sin fecha"}</p>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-primary/30 text-primary hover:bg-primary/10"
                          onClick={() => setSelectedPdf(cert)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Ver PDF
                        </Button>
                        <Button variant="outline" size="sm" className="border-border" asChild>
                          <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCertificate(cert.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Dialog open={!!selectedPdf} onOpenChange={() => setSelectedPdf(null)}>
                <DialogContent className="bg-card border-border max-w-4xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5 text-primary" />
                      {selectedPdf?.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 rounded-lg overflow-hidden bg-secondary/30 border border-border">
                    {selectedPdf && (
                      <iframe
                        src={selectedPdf.pdfUrl}
                        className="w-full h-full min-h-[60vh]"
                        title={selectedPdf.title}
                      />
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="card-terminal max-w-2xl">
                <CardHeader className="card-terminal-header">
                  <Mail className="w-4 h-4 text-primary" />
                  <CardTitle className="text-sm font-medium text-foreground">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">Email de contacto</label>
                    <Input
                      type="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-muted-foreground">URL del CV (PDF)</label>
                    <Input
                      value={contact.cvUrl}
                      onChange={(e) => setContact({ ...contact, cvUrl: e.target.value })}
                      className="bg-secondary/50 border-border"
                    />
                  </div>
                  <Button onClick={saveContact} className="hover-glow">
                    <Save className="w-4 h-4 mr-2" />
                    Guardar Contacto
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;