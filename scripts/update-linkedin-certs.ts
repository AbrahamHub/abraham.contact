#!/usr/bin/env tsx

/**
 * 📜 Script para actualizar certificaciones de LinkedIn en DataSecOps
 * 
 * Extrae las certificaciones reales de Abraham Castañeda Quintero
 * Fuente: https://www.linkedin.com/in/abraham-casta%C3%B1eda-quintero-1295b3203/details/certifications/
 */

import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB_NAME || 'portfolio';

async function updateLinkedInCertifications() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('📡 Conectado a MongoDB');

    const db = client.db(dbName);
    const contentCollection = db.collection('content');
    
    console.log('🔧 Creando/Actualizando documento dataSecOps...\n');

    // Crear documento con la estructura correcta para contentAPI
    const dataSecOpsDocument = {
      section: 'dataSecOps',
      data: {
        badge: 'DataSecOps Engineer',
        title: 'DataSecOps Engineer',
        subtitle: 'La convergencia perfecta entre ciencia de datos, ciberseguridad y operaciones en la nube. Donde los datos se encuentran con la seguridad y la automatización.',
        quote: '"Los datos son el nuevo petróleo, pero sin seguridad y automatización, son solo un derrame esperando suceder."',
        quoteSubtext: 'En constante evolución - Certificaciones que respaldan mi expertise',
        areas: [
          {
            id: 'data-science',
            title: 'Data Science & ML',
            icon: '📊',
            description: 'Machine Learning, Deep Learning, MLOps y análisis de datos',
            detailedInfo: {
              description: 'Especialización en desarrollo e implementación de modelos de Machine Learning y Deep Learning, con enfoque en MLOps para producción.',
              certifications: [
      {
        name: 'Curso Profesional de Machine Learning con scikit-learn',
        issuer: 'Platzi',
        date: 'Mayo 2025',
        credentialId: 'eb999a69-26b0-4902-b152-64bf03b3fa31',
        url: 'https://platzi.com/p/appleabraham777/curso/1796-course/diploma/detalle/',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQE1yYY18pFG6A/profile-treasury-document-pdf-analyzed/B56ZahYKL3HUAc-/0/1746464189618?e=1767830400&v=beta&t=_dtOKoiD4R0OMgpmYCk7excMiVUpf9Y-SVEglf8IyJc',
        skills: ['Inteligencia artificial', 'Machine Learning', 'Python']
      },
      {
        name: 'Curso de Deep Learning con TensorFlow y Keras',
        issuer: 'Platzi',
        date: 'Mayo 2025',
        credentialId: '3803c348-10c0-462c-9f2a-3c354f3a9f31',
        url: 'https://platzi.com/p/appleabraham777/curso/11718-deeplearning/diploma/detalle/',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQF-E0kNGEJ8Cg/profile-treasury-document-pdf-analyzed/B56ZaO7TjYHsAk-/0/1746154636393?e=1767830400&v=beta&t=tpruXNeT0JUfPtQv4plN-BzaIaj21DUinhTh6SjA5k4',
        skills: ['Deep Learning', 'TensorFlow', 'Keras', 'Neural Networks']
      },
      {
        name: 'Curso de MLOPS: Despliegue de Modelos de Machine Learning',
        issuer: 'Platzi',
        date: 'Abril 2025',
        credentialId: '890fc8d2-dd60-464b-8f83-ebdc16a8b175',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/9045-mlops/diploma/detalle/',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQF1fUppb2tl_w/profile-treasury-document-pdf-analyzed/B56ZYyRm_WGUAc-/0/1744600201345?e=1767830400&v=beta&t=gdAxLr3BqsM9gqlfRRS5c0AplWJtolSDD-4eBIlZBTw',
        skills: ['MLOps', 'DevOps', 'Machine Learning']
      },
      {
        name: 'Curso de Big Data y Machine Learning con Google Cloud Platform',
        issuer: 'Platzi',
        date: 'Marzo 2025',
        credentialId: 'b14378d8-60e2-4f12-acc2-ab0a5bcf84a0',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/2473-bigdata-ml-gcp/diploma/detalle/',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQHMKUU1gB7tSg/profile-treasury-document-pdf-analyzed/B56ZWcFUlHHEAc-/0/1742080401488?e=1767830400&v=beta&t=UavsgZg3Q4Goli5wchFnU5KKWwtW7-wLWsK-BECVStw',
        skills: ['Google Cloud', 'Big Data', 'Machine Learning']
      },
      {
        name: 'Minería de Datos',
        issuer: 'Pontificia Universidad Católica de Chile',
        date: 'Septiembre 2024',
        credentialId: 'PRQ7M2HBVY4E',
        url: 'https://www.coursera.org/account/accomplishments/records/PRQ7M2HBVY4E',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQFFR38fJ_IOkQ/profile-treasury-document-pdf-analyzed/B56Zttqis1JgAg-/0/1767071435449?e=1767830400&v=beta&t=No7j1OYFh_j8eQw_7VFQCHkmZcr9itbyNFL94SoEVH4',
        skills: ['Minería de datos', 'Ciencia de datos', 'Visión por computador', 'Análisis matemático']
      },
      {
        name: 'Prepare Data for ML APIs on Google Cloud Skill Badge',
        issuer: 'Google Cloud',
        date: 'Mayo 2024',
        url: 'https://www.credly.com/badges/7314b2df-142b-45e7-9c07-e5d225c2a51f/linked_in_profile',
        skills: ['Google Cloud', 'Machine Learning', 'Data Processing']
      },
      {
        name: 'Curso de Fundamentos de R',
        issuer: 'Platzi',
        date: 'Noviembre 2024',
        credentialId: 'bb5d6356-e551-49ee-87ce-7ae4a23c0c02',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/1445-fundamentos-r/diploma/detalle/',
        skills: ['R', 'Ciencia de datos', 'Análisis estadístico']
      },
      {
        name: 'Introduction to Generative AI',
        issuer: 'Google Cloud',
        date: 'Septiembre 2024',
        credentialId: 'XGXRHTDE0GZA',
        url: 'https://www.coursera.org/account/accomplishments/records/XGXRHTDE0GZA',
        skills: ['Generative AI', 'LLMs', 'AI']
      }
    ]
          }
        },
        {
          id: 'cybersecurity',
          title: 'Cybersecurity',
          icon: '🛡️',
          description: 'Seguridad de redes, detección de amenazas, gestión de riesgos',
          detailedInfo: {
            description: 'Especialización en ciberseguridad con certificaciones de Google y Cisco, incluyendo CCNA y el programa completo de Ciberseguridad de Google.',
            certifications: [
      {
        name: 'Programa Especializado: Ciberseguridad de Google',
        issuer: 'Google',
        date: 'Febrero 2025',
        credentialId: 'BJ1KOS01G0YA',
        url: 'https://www.coursera.org/account/accomplishments/specialization/BJ1KOS01G0YA',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQHuXzqG4bPIyQ/profile-treasury-document-pdf-analyzed/B56ZUczEvFHsAc-/0/1739944907885?e=1767830400&v=beta&t=iARJTwUu1Q5OJTcoN7S4oucj5HugRCQrIdw2TY1FmHM',
        featured: true,
        skills: ['Cybersecurity', 'Network Security', 'Security Operations']
      },
      {
        name: 'Automatiza las tareas de ciberseguridad con Python',
        issuer: 'Google',
        date: 'Febrero 2025',
        credentialId: '5VYAM7EGVKTC',
        url: 'https://www.coursera.org/account/accomplishments/records/5VYAM7EGVKTC',
        skills: ['Python', 'Security Automation', 'Cybersecurity']
      },
      {
        name: 'Ponlo en práctica: Prepárate para los trabajos en ciberseguridad',
        issuer: 'Google',
        date: 'Febrero 2025',
        credentialId: 'ZXOQ0O9LV7TD',
        url: 'https://www.coursera.org/account/accomplishments/records/ZXOQ0O9LV7TD',
        skills: ['Incident Response', 'Security Best Practices']
      },
      {
        name: 'CCNA: Switching, Routing, and Wireless Essentials',
        issuer: 'Cisco',
        date: 'Enero 2025',
        url: 'https://www.credly.com/badges/e6d22895-102d-4b99-84a0-b2d5e381a6fc/linked_in_profile',
        skills: ['Cisco Networking', 'CCNA', 'Network Security']
      },
      {
        name: 'Haz sonar la alarma: Detección y respuesta',
        issuer: 'Google',
        date: 'Enero 2025',
        credentialId: 'NOCY38DRGOB5',
        url: 'https://www.coursera.org/account/accomplishments/verify/NOCY38DRGOB5',
        skills: ['Threat Detection', 'Incident Response', 'SIEM']
      },
      {
        name: 'Activos, amenazas y vulnerabilidades',
        issuer: 'Google',
        date: 'Diciembre 2024',
        credentialId: 'GBA51S76EDK7',
        url: 'https://www.coursera.org/account/accomplishments/verify/GBA51S76EDK7',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQHuXzqG4bPIyQ/profile-treasury-document-pdf-analyzed/B56ZUczEvFHsAc-/0/1739944907885?e=1767830400&v=beta&t=iARJTwUu1Q5OJTcoN7S4oucj5HugRCQrIdw2TY1FmHM',
        skills: ['Vulnerability Assessment', 'Threat Analysis', 'Risk Management']
      },
      {
        name: 'Herramientas del oficio: Linux y SQL',
        issuer: 'Google',
        date: 'Octubre 2024',
        credentialId: 'DKK3ZXP3LS0J',
        url: 'https://www.coursera.org/account/accomplishments/records/DKK3ZXP3LS0J',
        skills: ['Linux', 'SQL', 'Command Line', 'Security Tools']
      },
      {
        name: 'Conexión y protección: Redes y seguridad de redes',
        issuer: 'Google',
        date: 'Septiembre 2024',
        credentialId: 'RLCZYCBGR4O2',
        url: 'https://www.coursera.org/account/accomplishments/records/RLCZYCBGR4O2',
        skills: ['Network Security', 'Firewalls', 'VPN', 'Network Protocols']
      },
      {
        name: 'Ve a lo seguro: Gestiona los riesgos de seguridad',
        issuer: 'Google',
        date: 'Agosto 2024',
        credentialId: 'WAERHZ9U0NV5',
        url: 'https://www.coursera.org/account/accomplishments/records/WAERHZ9U0NV5',
        skills: ['Risk Management', 'Security Compliance', 'Security Frameworks']
      },
      {
        name: 'CCNA: Introduction to Networks',
        issuer: 'Cisco',
        date: 'Diciembre 2023',
        url: 'https://www.credly.com/badges/94da4c39-5d74-48de-95f4-1d1010140b35/linked_in_profile',
        skills: ['CCNA', 'Networking', 'Cisco Networking', 'TCP/IP']
      }
    ]
          }
        },
        {
          id: 'cloud-operations',
          title: 'Cloud Operations',
          icon: '☁️',
          description: 'AWS, Google Cloud Platform, infraestructura y DevOps',
          detailedInfo: {
            description: 'Certificado en múltiples plataformas cloud con experiencia en AWS y GCP, especializado en arquitectura cloud, contenedores y operaciones DevOps.',
            certifications: [
      {
        name: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services (AWS)',
        date: 'Noviembre 2025',
        expires: 'Noviembre 2028',
        url: 'https://www.credly.com/badges/26cec571-e94f-4c9f-ad54-450e7fdcaabf/linked_in_profile',
        pdfUrl: 'https://media.licdn.com/dms/document/media/v2/D562DAQGvSJwrPrwB9Q/profile-treasury-document-pdf-analyzed/B56ZpWXzv9HIAg-/0/1762385674785?e=1767830400&v=beta&t=cAgQ5qhRI5--m-mDV3XXtJehiW8UpQAQ_9Eq_um4HUs',
        featured: true,
        skills: ['AWS', 'Cloud Computing', 'Cloud Architecture']
      },
      {
        name: 'Curso de Contenedores y Aplicaciones en la Nube con Google Cloud Platform',
        issuer: 'Platzi',
        date: 'Noviembre 2024',
        credentialId: 'd7b2884e-c3ed-4de0-93ab-e3ef6df3afe6',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/2471-contenedores-gcp/diploma/detalle/',
        skills: ['Google Cloud', 'Kubernetes', 'Containers', 'Docker']
      },
      {
        name: 'Google Cloud Computing Foundations Certificate',
        issuer: 'Google Cloud',
        date: 'Mayo 2024',
        url: 'https://www.credly.com/badges/22c8a22d-7289-4508-8133-a35d23a2708e/linked_in_profile',
        skills: ['Google Cloud', 'Cloud Fundamentals', 'GCP']
      },
      {
        name: 'Build a Secure Google Cloud Network Skill Badge',
        issuer: 'Google Cloud',
        date: 'Mayo 2024',
        url: 'https://www.credly.com/badges/bdbfbccd-324d-41ef-aa4e-930341bc19c1/linked_in_profile',
        skills: ['Google Cloud', 'VPC', 'Cloud Security', 'Networking']
      },
      {
        name: 'Implement Load Balancing on Compute Engine Skill Badge',
        issuer: 'Google Cloud',
        date: 'Mayo 2024',
        url: 'https://www.credly.com/badges/2c3c33e9-3bc5-4c49-a80f-de3e69a81fb4/linked_in_profile',
        skills: ['Load Balancing', 'Compute Engine', 'High Availability']
      },
      {
        name: 'Set Up an App Dev Environment on Google Cloud Skill Badge',
        issuer: 'Google Cloud',
        date: 'Mayo 2024',
        url: 'https://www.credly.com/badges/cc4df6ab-3ebf-4b9e-b577-da0beb0935c7/linked_in_profile',
        skills: ['App Development', 'Cloud Development', 'DevOps']
      },
      {
        name: 'Curso de Almacenamiento en la Nube con Google Cloud Platform',
        issuer: 'Platzi',
        date: 'Abril 2024',
        credentialId: '70afeaf8-984a-48fa-bd5c-b74c086468bf',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/2468-almacenamiento-gcp/diploma/detalle/',
        skills: ['Google Cloud Storage', 'Cloud Storage', 'Data Management']
      },
      {
        name: 'Curso de Máquinas Virtuales con Google Cloud Platform',
        issuer: 'Platzi',
        date: 'Abril 2024',
        credentialId: '8049da34-b7bc-41c4-9718-6de0fda98139',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/2470-maquinas-virtuales-gcp/diploma/detalle/',
        skills: ['Compute Engine', 'Virtual Machines', 'Cloud Infrastructure']
      },
      {
        name: 'Curso Práctico de AWS Cloud',
        issuer: 'Platzi',
        date: 'Enero 2024',
        credentialId: '5ffa37a2-785f-4816-afbb-c0eaa403bb92',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/1323-aws-cloud-practico/diploma/detalle/',
        skills: ['AWS', 'EC2', 'S3', 'Cloud Services']
      },
      {
        name: 'Audiocurso de Fundamentos de Arquitectura de Alta Concurrencia',
        issuer: 'Platzi',
        date: 'Diciembre 2023',
        credentialId: '42f667f1-700e-47de-81a2-7f0b344164b7',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/2509-arquitectura-alta-concurrencia/diploma/detalle/',
        skills: ['High Availability', 'Scalability', 'System Design']
      },
      {
        name: 'Curso de Introducción a Google Cloud Platform',
        issuer: 'Platzi',
        date: 'Diciembre 2023',
        credentialId: 'b49d0931-91c7-468b-91ea-8c314b4eddb1',
        url: 'https://platzi.com/p/abraham-castaneda-quintero/curso/2469-fundamentos-google/diploma/detalle/',
        skills: ['Google Cloud', 'Cloud Computing', 'GCP Fundamentals']
      }
    ]
          }
        }
      ]
      },
      updatedAt: new Date()
    };

    // Actualizar o insertar documento en MongoDB con la estructura correcta
    const result = await contentCollection.updateOne(
      { section: 'dataSecOps' },
      { $set: dataSecOpsDocument },
      { upsert: true }
    );
    
    console.log('\n✅ Documento DataSecOps actualizado correctamente\n');
    console.log('📊 Resumen:');
    console.log(`   🔬 Data Science: ${dataSecOpsDocument.data.areas[0].detailedInfo.certifications.length} certificaciones`);
    console.log(`   🛡️  Cybersecurity: ${dataSecOpsDocument.data.areas[1].detailedInfo.certifications.length} certificaciones`);
    console.log(`   ☁️  Cloud Operations: ${dataSecOpsDocument.data.areas[2].detailedInfo.certifications.length} certificaciones`);
    const total = dataSecOpsDocument.data.areas.reduce((acc: number, area: any) => acc + area.detailedInfo.certifications.length, 0);
    console.log(`   🎯 Total: ${total} certificaciones\n`);
    console.log('🌟 Destacadas:');
    console.log('   • AWS Certified Cloud Practitioner (AWS, Nov 2025)');
    console.log('   • Programa Especializado: Ciberseguridad de Google (Google, Feb 2025)');
    console.log('   • CCNA: Switching, Routing, and Wireless Essentials (Cisco, Ene 2025)\n');
    console.log('🔗 Fuente: https://www.linkedin.com/in/abraham-casta%C3%B1eda-quintero-1295b3203/details/certifications/');
    console.log(`\n📄 Operación: ${result.upsertedCount > 0 ? 'Documento insertado' : 'Documento actualizado'}`);



  } catch (error) {
    console.error('\n❌ Error al actualizar certificaciones:', error);
  } finally {
    await client.close();
    process.exit(0);
  }
}

// Ejecutar script
updateLinkedInCertifications();
