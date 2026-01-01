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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (!MONGODB_URI) {
    return res.status(500).json({ error: 'MONGODB_URI is not configured' });
  }

  let emailSent = false;
  let emailError: string | null = null;
  let emailErrorStack: string | null = null;

  try {
    // Enviar email de confirmación (error => 500)
    try {
      const { sendContactEmail } = await import('./_lib/emailService');
      await sendContactEmail({ name, email });
      emailSent = true;
    } catch (err) {
      emailError = err instanceof Error ? err.message : 'Unknown email error';
      emailErrorStack = err instanceof Error && err.stack ? err.stack : null;
      console.error('Email send failed:', err);
      // Persist attempt result before returning error
    }

    // Guardar en MongoDB
    const { db } = await connectToDatabase();
    const contactsCollection = db.collection('contacts');

    await contactsCollection.insertOne({
      name,
      email,
      timestamp: new Date(),
      status: emailSent ? 'sent' : 'email_failed',
      emailSent,
      emailError,
      emailErrorStack,
    });

    if (!emailSent) {
      return res.status(500).json({
        success: false,
        emailSent,
        emailError,
        message: 'Contact saved but email could not be sent',
      });
    }

    return res.status(201).json({
      success: true,
      emailSent,
      message: 'Contact information received and email sent successfully',
    });
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
