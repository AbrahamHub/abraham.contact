import { MongoClient, Db } from 'mongodb';
import 'dotenv/config'; // Cargar dotenv como fallback

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env');
}

const uri: string = process.env.MONGODB_URI;
const dbName: string = process.env.MONGODB_DB_NAME || 'portfolio';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri);
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export default connectToDatabase;
