# 🗄️ Integración con MongoDB

Este proyecto ahora utiliza MongoDB para almacenar y gestionar el contenido de forma dinámica.

## 🚀 Configuración

### 1. Variables de Entorno

El archivo `.env` contiene la configuración de MongoDB:

```env
MONGODB_URI=mongodb+srv://appleabraham777_db_user:JBYilEwpO7xa05A4@cluster0.oe4rjag.mongodb.net/?appName=Cluster0
MONGODB_DB_NAME=portfolio
```

### 2. Estructura de la Base de Datos

- **Base de datos**: `portfolio`
- **Colección**: `content`
- **Documentos**: Uno por cada sección (personal, hero, skills, etc.)

Estructura de documento:
```json
{
  "_id": ObjectId,
  "section": "personal",
  "data": { ...contenido },
  "updatedAt": ISODate
}
```

## 📦 Migración de Datos

### Migrar JSON a MongoDB

Para migrar todos los archivos JSON locales a MongoDB:

```bash
npm run migrate
```

Este comando:
- ✅ Conecta a MongoDB
- ✅ Crea la colección `content` si no existe
- ✅ Migra todas las secciones desde `src/data/*.json`
- ✅ Crea índice único en el campo `section`

## 🛠️ Desarrollo

### Ejecutar con API Server

```bash
# Ejecutar frontend y backend simultáneamente
npm run dev:full

# O ejecutar por separado:
npm run dev      # Frontend en http://localhost:5173
npm run server   # API en http://localhost:3001
```

## 🌐 API Endpoints

### GET - Obtener todo el contenido
```
GET http://localhost:3001/api/content
```

### GET - Obtener sección específica
```
GET http://localhost:3001/api/content/personal
GET http://localhost:3001/api/content/hero
GET http://localhost:3001/api/content/skills
```

### PUT - Actualizar sección
```
PUT http://localhost:3001/api/content/personal
Content-Type: application/json

{
  "name": "Nuevo Nombre",
  "email": "nuevo@email.com"
}
```

## 💻 Uso en Componentes

### Opción 1: Datos estáticos (Fallback)

Los componentes siguen usando los archivos JSON locales como fallback:

```typescript
import techStackData from '@/data/techStack.json';

const TechStackSection = () => {
  return <div>{techStackData.title}</div>;
};
```

### Opción 2: Fetch desde API

Para datos dinámicos desde MongoDB:

```typescript
import { useState, useEffect } from 'react';

const DynamicSection = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/content/personal')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;
  
  return <div>{data.name}</div>;
};
```

## 🔄 Sistema Híbrido

El sistema funciona en modo híbrido:

1. **Desarrollo local**: Usa archivos JSON como fallback
2. **Con MongoDB**: `contentAPI` consulta MongoDB automáticamente
3. **Fallback automático**: Si MongoDB falla, usa JSON local

## 📝 Editar Contenido

### Método 1: Editar JSON y re-migrar

1. Edita los archivos en `src/data/*.json`
2. Ejecuta `npm run migrate`
3. Los cambios se actualizan en MongoDB

### Método 2: API REST

Usa cURL, Postman o cualquier cliente HTTP:

```bash
curl -X PUT http://localhost:3001/api/content/personal \
  -H "Content-Type: application/json" \
  -d '{"name": "Abraham", "email": "abraham@example.com"}'
```

### Método 3: MongoDB Compass

1. Abre MongoDB Compass
2. Conecta con tu URI
3. Navega a `portfolio > content`
4. Edita los documentos directamente

## 🚀 Despliegue en Vercel

### Variables de Entorno en Vercel

1. Ve a tu proyecto en Vercel
2. Settings > Environment Variables
3. Agrega:
   - `MONGODB_URI`: Tu connection string
   - `MONGODB_DB_NAME`: `portfolio`

### API Routes

El servidor Express no funciona en Vercel. Para producción, crea Serverless Functions:

```typescript
// api/content/[section].ts
import { contentAPI } from '@/lib/contentAPI';

export default async function handler(req, res) {
  const { section } = req.query;
  
  if (req.method === 'GET') {
    const data = await contentAPI.getSection(section);
    return res.json(data);
  }
}
```

## 🔒 Seguridad

### En Producción:

1. **Autenticación**: Agrega middleware de autenticación para PUT/POST
2. **Rate Limiting**: Limita requests por IP
3. **Validación**: Valida datos antes de guardar
4. **CORS**: Configura dominios permitidos

```typescript
// Ejemplo de seguridad básica
app.use((req, res, next) => {
  if (req.method !== 'GET' && req.headers.authorization !== 'Bearer YOUR_TOKEN') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
});
```

## 📊 Monitoreo

### Verificar conexión a MongoDB:

```bash
# Desde MongoDB Compass o shell
db.content.find()
db.content.countDocuments()
```

### Logs del servidor:

El servidor muestra logs de todas las operaciones:
- ✅ Conexión exitosa
- 🔄 Requests GET/PUT
- ❌ Errores de conexión

## 🆘 Troubleshooting

### Error: "Cannot connect to MongoDB"

1. Verifica que el URI en `.env` sea correcto
2. Verifica que tu IP esté en la whitelist de MongoDB Atlas
3. Verifica que las credenciales sean válidas

### Error: "Collection not found"

```bash
npm run migrate
```

### Cache issues

El `contentAPI` mantiene un cache. Para limpiarlo:

```typescript
import { contentAPI } from '@/lib/contentAPI';
contentAPI.clearCache();
```

## 📚 Recursos

- [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
