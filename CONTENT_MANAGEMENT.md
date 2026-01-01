# Sistema de Gestión de Contenido

Este proyecto utiliza un sistema de contenido basado en JSON modular que permite editar todos los textos, URLs y configuraciones sin necesidad de una base de datos externa.

## 📁 Estructura

```
src/
├── data/                      # Archivos JSON modulares
│   ├── personal.json          # Información personal
│   ├── hero.json              # Sección hero
│   ├── about.json             # Sobre mí
│   ├── skills.json            # Habilidades
│   ├── techStack.json         # Stack tecnológico
│   ├── dataSecOps.json        # DataSecOps áreas
│   ├── projects.json          # Proyectos
│   ├── contact.json           # Contacto
│   └── footer.json            # Footer
├── lib/
│   └── contentAPI.ts          # API para acceder al contenido
└── hooks/
    └── useContent.ts          # Hooks para usar en componentes
```

## 📝 Archivos de Contenido Modulares

Cada sección tiene su propio archivo JSON para facilitar la edición:

- **personal.json**: Información personal (nombre, email, redes sociales)
- **hero.json**: Textos de la sección hero
- **about.json**: Sección "Sobre mí"
- **skills.json**: Habilidades frontend y backend
- **techStack.json**: Stack tecnológico con iconos y colores
- **dataSecOps.json**: Áreas de especialización (Data Science, Cybersecurity, Cloud Ops)
- **projects.json**: Proyectos destacados
- **contact.json**: Información de contacto y formulario
- **footer.json**: Pie de página

## 🔧 Cómo Editar el Contenido

### Método 1: Edición Directa (Desarrollo)

1. Abre el archivo JSON de la sección que quieres editar en `src/data/`
   - Ejemplo: `src/data/personal.json` para info personal
   - Ejemplo: `src/data/techStack.json` para tecnologías
2. Edita los valores que necesites
3. Guarda el archivo
4. Los cambios se reflejarán automáticamente en desarrollo

### Método 2: Usando la API (Producción)

```typescript
import { contentAPI } from '@/lib/contentAPI';

// Obtener todo el contenido
const allContent = contentAPI.getAll();

// Obtener una sección específica
const heroData = contentAPI.getHero();
const skillsData = contentAPI.getSkills();

// Actualizar contenido (para implementación futura)
await contentAPI.updateSection('personal', {
  name: 'Nuevo Nombre',
  email: 'nuevo@email.com'
});
```

## 📚 Uso en Componentes

### Opción 1: Usando la API directamente

```typescript
import { contentAPI } from '@/lib/contentAPI';

const MyComponent = () => {
  const heroData = contentAPI.getHero();
  const personalData = contentAPI.getPersonal();
  
  return (
    <div>
      <h1>{personalData.name}</h1>
      <p>{heroData.developer.passion}</p>
    </div>
  );
};
```

### Opción 2: Usando hooks específicos

```typescript
import { useHero, usePersonal, useTechStack } from '@/hooks/useContent';

const MyComponent = () => {
  const hero = useHero();
  const personal = usePersonal();
  const techStack = useTechStack();
  
  return (
    <div>
      <h1>{personal.name}</h1>
      <p>{hero.scrollText}</p>
      <ul>
        {techStack.technologies.map(tech => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

### Hooks disponibles:

- `usePersonal()` - Información personal
- `useHero()` - Sección hero
- `useAbout()` - Sobre mí
- `useSkills()` - Habilidades
- `useTechStack()` - Stack tecnológico
- `useDataSecOps()` - DataSecOps áreas
- `useProjects()` - Proyectos
- `useContact()` - Contacto
- `useFooter()` - Footer
- `useContent()` - Todo el contenido

## 🌐 URLs de PDFs y Certificados

Los PDFs de certificaciones se almacenan en la carpeta `public/certificates/`:

```json
{
  "certifications": [
    {
      "name": "Python for Data Science",
      "issuer": "IBM",
      "url": "/certificates/python-data-science.pdf"
    }
  ]
}
```

### Agregar un nuevo certificado:

1. Coloca el PDF en `public/certificates/`
2. Actualiza el JSON con la ruta: `/certificates/nombre-archivo.pdf`

## 🚀 Despliegue en Vercel

El contenido se despliega automáticamente con la aplicación. Para editar en producción:

### Opción 1: Commit y Push (Cambio en una sección)
```bash
# Edita solo la sección que necesitas
git add src/data/personal.json
git commit -m "Update personal info"
git push
```

### Opción 2: Múltiples cambios
```bash
# Edita varios archivos
git add src/data/*.json
git commit -m "Update content sections"
git push
```

### Opción 2: CMS Integrado (Futuro)
Puedes extender el sistema para usar:
- **Vercel KV**: Para almacenamiento key-value
- **Vercel Postgres**: Para una base de datos SQL
- **Edge Config**: Para configuración de borde

Ejemplo de integración con Vercel KV:

```typescript
// src/lib/contentAPI.ts
import { kv } from '@vercel/kv';

async updateSection(section, newData) {
  // Guardar en Vercel KV
  await kv.set(`content:${section}`, newData);
  
  // O guardar todo el contenido
  await kv.set('content', this.data);
}
```

## 🎨 Colores de Tecnologías

Los colores de los iconos de tecnologías están en formato hexadecimal:

```json
{
  "name": "React",
  "category": "Frontend",
  "color": "#61DAFB"
}
```

Para cambiar el color de un icono, simplemente modifica el valor `color`.

## 📊 Estructura de DataSecOps

Cada área tiene:
- **Información básica**: título, descripción, highlights
- **Información detallada**: intro, expertise, certificaciones
- **Certificaciones**: nombre, emisor, URL del PDF

```json
{
  "certifications": [
    {
      "name": "Nombre del Certificado",
      "issuer": "Organización Emisora",
      "url": "/certificates/archivo.pdf"
    }
  ]
}
```

## ⚡ Características

- ✅ **Modular**: Cada sección en su propio archivo
- ✅ **Fácil acceso**: Edita solo lo que necesitas
- ✅ **Sin base de datos externa**: Todo en JSON
- ✅ **Type-safe**: TypeScript con tipos automáticos
- ✅ **API centralizada**: Acceso unificado a todos los datos
- ✅ **Hooks específicos**: useHero(), useSkills(), etc.
- ✅ **Listo para Vercel**: Deploy automático
- ✅ **Extensible**: Preparado para CMS futuro

## 🎯 Ventajas del Sistema Modular

1. **Organización**: Cada sección en su propio archivo
2. **Facilidad de edición**: Solo abres el archivo que necesitas
3. **Control de versiones**: Git muestra cambios específicos por sección
4. **Performance**: Importa solo lo necesario
5. **Mantenibilidad**: Más fácil encontrar y actualizar contenido
6. **Escalabilidad**: Agrega nuevas secciones sin afectar las existentes

## 🔐 Seguridad

El archivo JSON es público (se compila en el bundle). No incluyas:
- Contraseñas
- API keys privadas
- Información sensible

Para datos sensibles, usa variables de entorno de Vercel.

## 📞 Soporte

Para editar el contenido después del despliegue:
1. Clona el repositorio
2. Edita `src/data/content.json`
3. Push a la rama main
4. Vercel desplegará automáticamente
