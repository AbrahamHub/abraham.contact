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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { path } = req.query;
    const pathArray = Array.isArray(path) ? path : [path];
    const route = pathArray.join('/');

    // GET /api/content
    if (route === 'content' && req.method === 'GET') {
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      const data = await collection.find({}).toArray();
      return res.json(data);
    }

    // GET /api/content/:section
    if (route.startsWith('content/') && req.method === 'GET') {
      const section = route.replace('content/', '');
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      const data = await collection.findOne({ section });
      
      if (!data) {
        return res.status(404).json({ error: `Section '${section}' not found` });
      }
      
      return res.json(data.data || data);
    }

    // PUT /api/content/:section
    if (route.startsWith('content/') && req.method === 'PUT') {
      const section = route.replace('content/', '');
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      
      const result = await collection.updateOne(
        { section },
        { $set: { data: req.body, updatedAt: new Date() } },
        { upsert: true }
      );
      
      if (result.matchedCount > 0 || result.upsertedId) {
        return res.json({ message: 'Content updated successfully' });
      } else {
        return res.status(500).json({ error: 'Failed to update content' });
      }
    }

    // POST /api/contact
    if (route === 'contact' && req.method === 'POST') {
      const { name, email } = req.body;
      
      if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }

      const { db } = await connectToDatabase();
      const contactsCollection = db.collection('contacts');
      
      await contactsCollection.insertOne({
        name,
        email,
        timestamp: new Date(),
        status: 'sent',
        emailSent: true
      });
      
      return res.json({ 
        success: true, 
        message: 'Contact information received successfully' 
      });
    }

    return res.status(404).json({ error: 'Route not found' });

  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
