import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

async function updateAllStructures() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection('content');

    // 1. Projects
    const projectsData = {
      title: "Mira mi trabajo 👀",
      subtitle: "Algunos proyectos destacados en los que he trabajado",
      projects: [
        {
          id: "ecommerce",
          title: "E-Commerce Platform",
          description: "Plataforma de comercio electrónico con carrito de compras, pagos y gestión de inventario.",
          tags: ["React", "Node.js", "MongoDB"],
          color: "primary",
          github: "#",
          demo: "#"
        },
        {
          id: "task-manager",
          title: "Task Management App",
          description: "Aplicación de gestión de tareas con drag & drop, colaboración en tiempo real y notificaciones.",
          tags: ["TypeScript", "Next.js", "Prisma"],
          color: "accent",
          github: "#",
          demo: "#"
        },
        {
          id: "portfolio-dashboard",
          title: "Portfolio Dashboard",
          description: "Dashboard interactivo para visualización de datos financieros con gráficos en tiempo real.",
          tags: ["React", "D3.js", "Python"],
          color: "primary",
          github: "#",
          demo: "#"
        }
      ]
    };

    // 2. Navbar
    const navbarData = {
      brandName: "Abraham",
      navLinks: [
        { href: "#sobre-mi", label: "Sobre mí" },
        { href: "#datasecops", label: "DataSecOps" },
        { href: "#proyectos", label: "Proyectos" },
        { href: "#tecnologias", label: "Tecnologías" },
        { href: "#contacto", label: "Contacto" }
      ]
    };

    // 3. DataSecOps completo
    const dataSecOpsData = {
      title: "DataSecOps Engineer",
      subtitle: "La convergencia perfecta entre ciencia de datos, ciberseguridad y operaciones en la nube.",
      badge: "Nuevo Rol",
      areas: [
        {
          id: "data",
          title: "Data Science",
          subtitle: "Ciencia de Datos",
          icon: "database",
          color: "primary",
          skills: [
            { name: "Python", icon: "brain" },
            { name: "Machine Learning", icon: "cpu" },
            { name: "Data Analysis", icon: "barChart" },
            { name: "SQL & NoSQL", icon: "database" }
          ],
          description: "Transformo datos en decisiones estratégicas. Análisis predictivo, visualización de datos y modelos de ML para extraer insights valiosos que impulsan el negocio.",
          highlights: ["Pandas & NumPy", "TensorFlow", "Scikit-learn", "Power BI", "Jupyter"],
          detailedInfo: {
            intro: "En el área de Ciencia de Datos, me especializo en convertir datos complejos en insights accionables que impulsan decisiones estratégicas.",
            expertise: [
              "Análisis exploratorio de datos (EDA) con visualizaciones interactivas",
              "Desarrollo de modelos predictivos de Machine Learning",
              "Procesamiento y limpieza de grandes volúmenes de datos",
              "Implementación de pipelines de datos automatizados",
              "Creación de dashboards interactivos para stakeholders"
            ],
            certifications: [
              { name: "Python for Data Science", issuer: "IBM", url: "#" },
              { name: "Machine Learning Specialization", issuer: "Stanford University", url: "#" },
              { name: "Data Analysis Professional Certificate", issuer: "Google", url: "#" }
            ]
          }
        },
        {
          id: "security",
          title: "Cybersecurity",
          subtitle: "Ciberseguridad",
          icon: "shield",
          color: "accent",
          skills: [
            { name: "Penetration Testing", icon: "lock" },
            { name: "Security Audits", icon: "shield" },
            { name: "Threat Analysis", icon: "network" },
            { name: "Compliance", icon: "server" }
          ],
          description: "Protejo sistemas y datos con enfoque proactivo. Implemento estrategias de seguridad, auditorías de vulnerabilidades y respuesta a incidentes para mantener la integridad de la información.",
          highlights: ["OWASP", "Burp Suite", "Nmap", "Wireshark", "ISO 27001"],
          detailedInfo: {
            intro: "Mi enfoque en ciberseguridad combina habilidades técnicas avanzadas con un pensamiento estratégico para proteger activos digitales críticos.",
            expertise: [
              "Auditorías de seguridad y análisis de vulnerabilidades",
              "Implementación de estrategias de defensa en profundidad",
              "Respuesta a incidentes y análisis forense digital",
              "Cumplimiento de estándares como ISO 27001 y OWASP Top 10",
              "Pruebas de penetración en aplicaciones web y redes"
            ],
            certifications: [
              { name: "Certified Ethical Hacker (CEH)", issuer: "EC-Council", url: "#" }
            ]
          }
        },
        {
          id: "ops",
          title: "Cloud Operations",
          subtitle: "Operaciones en la Nube",
          icon: "cloud",
          color: "primary",
          skills: [
            { name: "Cloud Infrastructure", icon: "cloud" },
            { name: "CI/CD", icon: "server" },
            { name: "Containerization", icon: "cpu" },
            { name: "Monitoring", icon: "barChart" }
          ],
          description: "Construyo y gestiono infraestructura escalable en la nube. Automatización, despliegue continuo y monitoreo para garantizar disponibilidad y rendimiento óptimo.",
          highlights: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions"],
          detailedInfo: {
            intro: "Especializado en diseñar, implementar y mantener infraestructuras cloud robustas y escalables que garantizan alta disponibilidad.",
            expertise: [
              "Arquitectura de soluciones en AWS (EC2, RDS, S3, Lambda)",
              "Orquestación de contenedores con Kubernetes",
              "Implementación de pipelines CI/CD automatizados",
              "Infrastructure as Code con Terraform",
              "Monitoreo y observabilidad con CloudWatch y Prometheus"
            ],
            certifications: [
              { name: "AWS Solutions Architect", issuer: "Amazon Web Services", url: "#" },
              { name: "Kubernetes Administrator (CKA)", issuer: "Cloud Native Computing Foundation", url: "#" }
            ]
          }
        }
      ],
      quote: "La seguridad de los datos no es un destino, es un viaje continuo. DataSecOps es mi brújula en este camino.",
      quoteSubtext: "En constante evolución"
    };

    // Actualizar todas las secciones
    await collection.updateOne(
      { section: 'projects' },
      { $set: { section: 'projects', data: projectsData, updatedAt: new Date() }},
      { upsert: true }
    );
    console.log('✅ Projects actualizado');

    await collection.updateOne(
      { section: 'navbar' },
      { $set: { section: 'navbar', data: navbarData, updatedAt: new Date() }},
      { upsert: true }
    );
    console.log('✅ Navbar actualizado');

    await collection.updateOne(
      { section: 'dataSecOps' },
      { $set: { section: 'dataSecOps', data: dataSecOpsData, updatedAt: new Date() }},
      { upsert: true }
    );
    console.log('✅ DataSecOps actualizado');

    console.log('\n✨ Todas las estructuras actualizadas!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n👋 Desconectado');
  }
}

updateAllStructures();
