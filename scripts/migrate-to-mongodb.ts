import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

// Cargar variables de entorno
dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

interface ContentSection {
  _id: string;
  section: string;
  data: any;
  updatedAt: Date;
}

async function migrateToMongoDB() {
  console.log('🚀 Iniciando migración a MongoDB...\n');

  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection<ContentSection>('content');

    // Crear índice único en el campo section
    await collection.createIndex({ section: 1 }, { unique: true });

    const dataDir = path.join(process.cwd(), 'src', 'data');
    const files = [
      'personal.json',
      'hero.json',
      'about.json',
      'skills.json',
      'techStack.json',
      'dataSecOps.json',
      'projects.json',
      'contact.json',
      'footer.json'
    ];

    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const sectionName = file.replace('.json', '');
      
      // Leer el archivo JSON
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const jsonData = JSON.parse(fileContent);

      // Insertar o actualizar en MongoDB
      const result = await collection.updateOne(
        { section: sectionName },
        {
          $set: {
            section: sectionName,
            data: jsonData,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );

      if (result.upsertedCount > 0) {
        console.log(`✅ Insertado: ${sectionName}`);
      } else {
        console.log(`🔄 Actualizado: ${sectionName}`);
      }
    }

    console.log('\n✨ Migración completada exitosamente!');
    console.log(`📊 Base de datos: ${dbName}`);
    console.log(`📁 Colección: content`);

    // Mostrar estadísticas
    const count = await collection.countDocuments();
    console.log(`\n📈 Total de documentos: ${count}`);

  } catch (error) {
    console.error('❌ Error durante la migración:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\n👋 Desconectado de MongoDB');
  }
}

// Ejecutar migración
migrateToMongoDB();
