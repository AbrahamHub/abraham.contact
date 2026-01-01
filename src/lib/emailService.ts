import nodemailer from 'nodemailer';

// Configurar el transportador de nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verificar la configuración del transportador
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Error al configurar el servicio de email:', error);
  } else {
    console.log('✅ Servicio de email listo para enviar mensajes');
  }
});

export interface ContactEmailData {
  name: string;
  email: string;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const { name, email } = data;
  
  console.log('📧 Enviando email a:', email);
  console.log('📧 Desde:', process.env.GMAIL_USER);
  
  // Email de confirmación que se envía al usuario que llenó el formulario
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: email,
    subject: `✅ Gracias por contactarme, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0;">
          <h1 style="color: white; margin: 0;">¡Hola ${name}!</h1>
          <p style="color: #f0f0f0; margin: 10px 0 0 0;">Gracias por tu interés en mi perfil</p>
        </div>
        
        <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none;">
          <p style="color: #333; font-size: 16px; line-height: 1.6;">
            Gracias por ponerte en contacto conmigo a través de mi portafolio. 
            Me da gusto que estés interesado en conocer más sobre mi perfil profesional.
          </p>
          
          <h2 style="color: #667eea; margin-top: 30px; font-size: 20px;">📋 Resumen Técnico</h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            
            <h3 style="color: #333; font-size: 16px; margin-top: 0;">💻 Especialización</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li><strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS</li>
              <li><strong>Backend:</strong> Java, Spring Boot, Node.js, Express</li>
              <li><strong>Cloud:</strong> AWS (EC2, S3, Lambda, RDS)</li>
              <li><strong>Bases de Datos:</strong> MongoDB, PostgreSQL, MySQL</li>
            </ul>
            
            <h3 style="color: #333; font-size: 16px; margin-top: 20px;">🔐 DataSecOps</h3>
            <ul style="color: #555; line-height: 1.8;">
              <li>Implementación de pipelines CI/CD</li>
              <li>Gestión de infraestructura con IaC (Terraform)</li>
              <li>Seguridad en desarrollo y despliegue</li>
              <li>Monitoreo y análisis de datos en tiempo real</li>
            </ul>
            
            <h3 style="color: #333; font-size: 16px; margin-top: 20px;">🎓 Formación</h3>
            <p style="color: #555; margin: 10px 0;">
              <strong>Ingeniería en Tecnología de Software</strong><br>
              Universidad Autónoma de Nuevo León (UANL)
            </p>
          </div>
          
          <div style="background-color: #fff3cd; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #ffc107;">
            <p style="color: #856404; margin: 0;">
              📎 <strong>Adjunto encontrarás mi CV completo</strong> con más detalles sobre mi experiencia y proyectos.
            </p>
          </div>
          
          <p style="color: #333; margin-top: 30px; font-size: 16px;">
            Me pondré en contacto contigo pronto para conversar sobre posibles colaboraciones u oportunidades.
          </p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0;">
            <p style="color: #333; margin: 5px 0;"><strong>Abraham Castañeda Quintero</strong></p>
            <p style="color: #666; margin: 5px 0;">
              📧 <a href="mailto:abrahamcastanedaquintero@gmail.com" style="color: #667eea; text-decoration: none;">abrahamcastanedaquintero@gmail.com</a>
            </p>
            <p style="color: #666; margin: 5px 0;">
              💼 <a href="https://www.linkedin.com/in/abraham-castañeda-quintero-1295b3203/" style="color: #667eea; text-decoration: none;">LinkedIn</a> | 
              🐙 <a href="https://github.com/AbrahamHub" style="color: #667eea; text-decoration: none;">GitHub</a>
            </p>
          </div>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; text-align: center; border-radius: 0 0 10px 10px;">
          <p style="color: #666; font-size: 12px; margin: 0;">
            Este es un mensaje automático de confirmación.
          </p>
        </div>
      </div>
    `,
    attachments: [
      {
        filename: 'CV-ABRAHAM_CASTAÑEDA.pdf',
        path: './public/documents/CV-ABRAHAM_CASTAÑEDA.pdf',
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email enviado:', info.messageId);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    throw new Error('Failed to send email');
  }
}

export default { sendContactEmail };
