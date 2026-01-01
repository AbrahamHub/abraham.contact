import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

async function updateSkillsStructure() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection('content');

    const skillsData = {
      title: "Puedo hacer...",
      frontend: {
        title: "Front-end",
        description: 'He construido interfaces web con <span class="text-primary">React</span> + <span class="text-primary">Next.js</span>, enfocándome en componentes reutilizables, consumo de APIs, manejo de estado y diseño responsivo con <span class="text-primary">Tailwind CSS</span>, cuidando la experiencia de usuario. 💽',
        technologies: ["React", "Vue.js", "TypeScript", "Tailwind"]
      },
      backend: {
        title: "Back-end",
        description: 'He desarrollado APIs con <span class="text-accent">Java</span> y <span class="text-accent">Spring Boot</span>, implementando lógica de negocio, manejo de bases de datos relacionales, autenticación y despliegue en <span class="text-accent">AWS</span> , además de integrar CI/CD con GitHub Actions. ⚙️',
        technologies: ["Java", "Spring Boot", "AWS", "PostgreSQL", "CI/CD"]
      }
    };

    const result = await collection.updateOne(
      { section: 'skills' },
      {
        $set: {
          section: 'skills',
          data: skillsData,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('✅ Estructura de "skills" actualizada');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n👋 Desconectado');
  }
}

updateSkillsStructure();
