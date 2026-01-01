import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

function getTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error('Email service not configured (missing GMAIL_USER or GMAIL_APP_PASSWORD)');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  transporter.verify((error) => {
    if (error) {
      console.error('❌ Error al configurar el servicio de email:', error);
    } else {
      console.log('✅ Servicio de email listo para enviar mensajes');
    }
  });

  return transporter;
}

export interface ContactEmailData {
  name: string;
  email: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { name, email } = data;
  const transporter = getTransporter();

  const resumePath = path.join(process.cwd(), 'public', 'documents', 'CV-ABRAHAM_CASTAÑEDA.pdf');
  const hasResume = fs.existsSync(resumePath);

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `✅ Gracias por contactarme, ${name}!`,
    html: `Hola ${name}, gracias por tu interés en mi perfil. Me pondré en contacto pronto.`,
    attachments: hasResume
      ? [
          {
            filename: 'CV-ABRAHAM_CASTAÑEDA.pdf',
            path: resumePath,
          },
        ]
      : undefined,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log('✅ Email enviado:', info.messageId);
}

export default { sendContactEmail };