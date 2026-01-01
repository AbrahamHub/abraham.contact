import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

async function updateAllTextContent() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection('content');

    // 1. Hero Section - Textos del hero
    const heroData = {
      brandName: "Abraham",
      logoText: "Abraham",
      developer: {
        passion: "Desarrollador web con pasión por los datos",
        role: "Ingeniero en Software por egresar 🚀",
        focus: "Full-Stack",
        status: "Construyendo cosas increíbles"
      },
      terminal: {
        command: "$ whoami",
        greeting: "Hola, soy Abraham 👋",
        codeSnippet: `const desarrollador = {
  pasión: "Código",
  enfoque: "Full-Stack",
  estado: "Construyendo cosas increíbles"
};`
      },
      scrollText: "Scroll"
    };

    // 2. Contact Section
    const contactData = {
      title: "Contacto",
      subtitle: "¿Qué tal? 👀 ¿Te gustaría crear cosas juntos?",
      description: "No olvides dejarme tu nombre y correo y me comunicaré en breve contigo. 🫶",
      fileName: "contact.tsx",
      form: {
        nameLabel: "Nombre",
        namePlaceholder: "Tu nombre",
        emailLabel: "Correo electrónico",
        emailPlaceholder: "tu@email.com",
        submitButton: "Enviar",
        submittingButton: "Enviando..."
      },
      cvButton: "Descargar CV",
      successMessage: "¡Mensaje enviado! Me pondré en contacto pronto.",
      errorMessage: "Hubo un error. Por favor intenta de nuevo."
    };

    // Actualizar todas las secciones
    await collection.updateOne(
      { section: 'hero' },
      { $set: { section: 'hero', data: heroData, updatedAt: new Date() }},
      { upsert: true }
    );
    console.log('✅ Hero actualizado');

    await collection.updateOne(
      { section: 'contact' },
      { $set: { section: 'contact', data: contactData, updatedAt: new Date() }},
      { upsert: true }
    );
    console.log('✅ Contact actualizado');

    console.log('\n✨ Todo el contenido de texto actualizado!');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n👋 Desconectado');
  }
}

updateAllTextContent();
