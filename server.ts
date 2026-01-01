import './config/env';
import express from 'express';
import cors from 'cors';

import { contentAPI } from './src/lib/contentAPI';
import { connectToDatabase } from './src/lib/mongodb';
import { sendContactEmail } from './src/lib/emailService';

const app = express();
const PORT = process.env.API_PORT || 3001;

app.use(cors());
app.use(express.json());
// GET all content
app.get('/api/content', async (req, res) => {
  try {
    const data = await contentAPI.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch content' });
  }
});

// GET specific section
app.get('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const data = await contentAPI.getSection(section as any);
    res.json(data);
  } catch (error) {
    console.error('Error fetching section:', error);
    res.status(500).json({ error: 'Failed to fetch section' });
  }
});

// UPDATE specific section
app.put('/api/content/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const success = await contentAPI.updateSection(section as any, req.body);
    
    if (success) {
      res.json({ message: 'Content updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update content' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update content' });
  }
});

// POST send contact email
app.post('/api/contact', async (req, res) => {
  console.log('POST /api/contact called');
  try {
    const { name, email } = req.body;
    
    // Validación básica
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    console.log(`Contact form submitted: ${name} <${email}>`);
    
    // Enviar email
    await sendContactEmail({ name, email });
    console.log('✅ Email enviado exitosamente');
    
    // Guardar en MongoDB
    const { db } = await connectToDatabase();
    const contactsCollection = db.collection('contacts');
    
    await contactsCollection.insertOne({
      name,
      email,
      timestamp: new Date(),
      status: 'sent',
      emailSent: true
    });
    
    res.json({ 
      success: true, 
      message: 'Contact information received and email sent successfully' 
    });
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    res.status(500).json({ 
      error: 'Failed to process contact form', 
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`🚀 API Server running on http://localhost:${PORT}`);
});

// Mantener el proceso vivo
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
