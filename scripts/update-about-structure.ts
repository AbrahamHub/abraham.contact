import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

async function updateAboutStructure() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Conectado a MongoDB\n');

    const db = client.db(dbName);
    const collection = db.collection('content');

    // Actualizar la estructura de about
    const aboutData = {
      title: "Me presento 🤝",
      subtitle: "Conoce más sobre mi trayectoria",
      description: `Soy un <span class="text-primary font-semibold">entusiasta de la tecnología</span>, amante de los perros 🐾 y apasionado por aprender todos los días. Me considero como una persona que la mayoría del tiempo lo aprovecha en estar activo, es por eso que me fascina la programación y llevar una vida saludable. 🏃‍♂️

A mi mente le encantan los retos, por eso soy entusiasta de juegos y acertijos de destreza mental como el <span class="text-accent font-semibold">ajedrez ◾️👑◽️</span>. Dedico gran parte de mi tiempo en el auto-cultivo de mi mente 🧠, leo de los temas técnicos y no técnicos 📖👓, medito 🧘🏻, me muevo 🫀 y sobre todo me motivo para alcanzar mis metas y sueños.`,
      traits: [
        { icon: "heart", label: "Amante de los perros 🐾" },
        { icon: "brain", label: "Mente curiosa" },
        { icon: "gamepad", label: "Ajedrecista ♟️" },
        { icon: "book", label: "Lector ávido" }
      ],
      quote: "Cada proyecto es una oportunidad de crecimiento laboral y profesional. Mi utopía es dejar huella en este mundo en pro del futuro y del progreso como humanidad. 🐾🌎"
    };

    const result = await collection.updateOne(
      { section: 'about' },
      {
        $set: {
          section: 'about',
          data: aboutData,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    console.log('✅ Estructura de "about" actualizada');
    console.log('📊 Datos:', aboutData);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('\n👋 Desconectado');
  }
}

updateAboutStructure();
