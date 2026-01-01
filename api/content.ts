import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio';

let cachedClient: MongoClient | null = null;

async function connectToDatabase() {
  if (cachedClient) {
    return { client: cachedClient, db: cachedClient.db(MONGODB_DB_NAME) };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return { client, db: client.db(MONGODB_DB_NAME) };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { section } = req.query;
    
    if (!section || Array.isArray(section)) {
      return res.status(400).json({ error: 'Invalid section parameter' });
    }

    if (req.method === 'GET') {
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      const doc = await collection.findOne({ section });
      
      if (!doc) {
        return res.status(404).json({ error: `Section '${section}' not found` });
      }
      
      // Return data directly (already inside doc.data)
      return res.status(200).json(doc.data);
    }

    if (req.method === 'PUT') {
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      
      const result = await collection.updateOne(
        { section },
        { $set: { data: req.body, updatedAt: new Date() } },
        { upsert: true }
      );
      
      return res.status(200).json({ message: 'Updated successfully' });
    }

    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
