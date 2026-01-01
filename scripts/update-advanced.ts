#!/usr/bin/env tsx

/**
 * 🛠️ Script de actualización avanzada para MongoDB
 * 
 * Usa este script para actualizar estructuras complejas que no están
 * disponibles en el Dashboard simplificado:
 * 
 * - Proyectos individuales (con tags, links, etc.)
 * - Áreas de DataSecOps con certificaciones
 * - Arrays de traits en About
 * - Social links en Footer
 */

import { connectDB, contentAPI } from './contentAPI';

// ═══════════════════════════════════════════════════════════════════════════
// 1️⃣  AGREGAR/EDITAR UN PROYECTO COMPLETO
// ═══════════════════════════════════════════════════════════════════════════

async function addProject() {
  const newProject = {
    id: 'proyecto-nuevo',
    title: 'Mi Nuevo Proyecto',
    description: 'Descripción detallada del proyecto con todas las tecnologías utilizadas',
    tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
    color: '#3B82F6', // Color en hexadecimal
    github: 'https://github.com/usuario/proyecto',
    demo: 'https://proyecto-demo.vercel.app'
  };

  try {
    await connectDB();
    
    // Obtener proyectos actuales
    const currentProjects = await contentAPI.getSection('projects') as any;
    
    // Agregar nuevo proyecto al array
    currentProjects.projects.push(newProject);
    
    // Actualizar en MongoDB
    await contentAPI.updateSection('projects', currentProjects);
    
    console.log('✅ Proyecto agregado correctamente');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 2️⃣  EDITAR UN PROYECTO EXISTENTE
// ═══════════════════════════════════════════════════════════════════════════

async function updateProject(projectId: string, updates: any) {
  try {
    await connectDB();
    
    const projectsData = await contentAPI.getSection('projects') as any;
    
    // Encontrar el proyecto por ID
    const projectIndex = projectsData.projects.findIndex((p: any) => p.id === projectId);
    
    if (projectIndex === -1) {
      console.error(`❌ Proyecto con ID "${projectId}" no encontrado`);
      return;
    }
    
    // Actualizar el proyecto
    projectsData.projects[projectIndex] = {
      ...projectsData.projects[projectIndex],
      ...updates
    };
    
    await contentAPI.updateSection('projects', projectsData);
    
    console.log(`✅ Proyecto "${projectId}" actualizado`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 3️⃣  AGREGAR CERTIFICACIÓN A UN ÁREA DE DATASECOPS
// ═══════════════════════════════════════════════════════════════════════════

async function addCertification(areaId: string, certification: any) {
  try {
    await connectDB();
    
    const dataSecOpsData = await contentAPI.getSection('dataSecOps') as any;
    
    // Encontrar el área
    const area = dataSecOpsData.areas.find((a: any) => a.id === areaId);
    
    if (!area) {
      console.error(`❌ Área con ID "${areaId}" no encontrada`);
      return;
    }
    
    // Agregar certificación al área
    if (!area.detailedInfo.certifications) {
      area.detailedInfo.certifications = [];
    }
    
    area.detailedInfo.certifications.push(certification);
    
    await contentAPI.updateSection('dataSecOps', dataSecOpsData);
    
    console.log(`✅ Certificación agregada al área "${areaId}"`);
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 4️⃣  AGREGAR TRAIT AL ABOUT SECTION
// ═══════════════════════════════════════════════════════════════════════════

async function addTrait(trait: any) {
  try {
    await connectDB();
    
    const aboutData = await contentAPI.getSection('about') as any;
    
    if (!aboutData.traits) {
      aboutData.traits = [];
    }
    
    aboutData.traits.push(trait);
    
    await contentAPI.updateSection('about', aboutData);
    
    console.log('✅ Trait agregado correctamente');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 5️⃣  ACTUALIZAR SOCIAL LINKS EN FOOTER
// ═══════════════════════════════════════════════════════════════════════════

async function updateSocialLinks(newLinks: any[]) {
  try {
    await connectDB();
    
    const footerData = await contentAPI.getSection('footer') as any;
    
    footerData.socialLinks = newLinks;
    
    await contentAPI.updateSection('footer', footerData);
    
    console.log('✅ Links sociales actualizados');
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📋 EJEMPLOS DE USO
// ═══════════════════════════════════════════════════════════════════════════

async function ejemplos() {
  console.log('🔧 Ejecutando ejemplos de actualización...\n');

  // Ejemplo 1: Agregar proyecto
  console.log('1️⃣  Agregando nuevo proyecto...');
  // await addProject();

  // Ejemplo 2: Actualizar proyecto existente
  console.log('2️⃣  Actualizando proyecto...');
  // await updateProject('portfolio-web', {
  //   title: 'Portfolio Web (Actualizado)',
  //   tags: ['React', 'TypeScript', 'MongoDB', 'Express']
  // });

  // Ejemplo 3: Agregar certificación
  console.log('3️⃣  Agregando certificación...');
  // await addCertification('data-science', {
  //   name: 'AWS Machine Learning',
  //   issuer: 'Amazon Web Services',
  //   url: 'https://aws.amazon.com/certification/'
  // });

  // Ejemplo 4: Agregar trait
  console.log('4️⃣  Agregando trait...');
  // await addTrait({
  //   icon: '🚀',
  //   label: 'Innovador'
  // });

  // Ejemplo 5: Actualizar social links
  console.log('5️⃣  Actualizando social links...');
  // await updateSocialLinks([
  //   { platform: 'GitHub', url: 'https://github.com/abraham' },
  //   { platform: 'LinkedIn', url: 'https://linkedin.com/in/abraham' },
  //   { platform: 'Twitter', url: 'https://twitter.com/abraham' }
  // ]);

  console.log('\n✅ Ejemplos completados (descomenta las líneas para ejecutar)');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 EJECUTAR
// ═══════════════════════════════════════════════════════════════════════════

if (import.meta.url === `file://${process.argv[1]}`) {
  ejemplos()
    .then(() => {
      console.log('\n🎉 Script completado exitosamente');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Error en el script:', error);
      process.exit(1);
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 📚 REFERENCIA RÁPIDA
// ═══════════════════════════════════════════════════════════════════════════

/**
 * ESTRUCTURA DE PROYECTO:
 * {
 *   id: string,
 *   title: string,
 *   description: string,
 *   tags: string[],
 *   color: string (hex),
 *   github?: string,
 *   demo?: string
 * }
 * 
 * ESTRUCTURA DE CERTIFICACIÓN:
 * {
 *   name: string,
 *   issuer: string,
 *   url?: string
 * }
 * 
 * ESTRUCTURA DE TRAIT:
 * {
 *   icon: string (emoji),
 *   label: string
 * }
 * 
 * ESTRUCTURA DE SOCIAL LINK:
 * {
 *   platform: string,
 *   url: string
 * }
 * 
 * COLORES RECOMENDADOS (hex):
 * - Azul: #3B82F6
 * - Verde: #10B981
 * - Morado: #8B5CF6
 * - Rosa: #EC4899
 * - Naranja: #F59E0B
 * - Rojo: #EF4444
 */

export {
  addProject,
  updateProject,
  addCertification,
  addTrait,
  updateSocialLinks
};
