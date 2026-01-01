import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME || 'portfolio');
  
  // Verificar collections
  const collections = await db.listCollections().toArray();
  console.log('Collections:', collections.map(c => c.name));
  
  // Obtener un documento de ejemplo
  const aboutDoc = await db.collection('content').findOne({ section: 'about' });
  if (aboutDoc) {
    console.log('\nEstructura de documento "about":');
    console.log('Keys:', Object.keys(aboutDoc));
    console.log('Section:', aboutDoc.section);
    console.log('Data keys:', aboutDoc.data ? Object.keys(aboutDoc.data) : 'No data field');
  } else {
    console.log('No document found for section: about');
  }
} catch (error) {
  console.error('Error:', error.message);
} finally {
  await client.close();
}
