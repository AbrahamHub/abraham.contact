// API para manejar el contenido de forma dinámica
// Conectado exclusivamente a MongoDB - Sin dependencias de JSON locales

import { connectToDatabase } from './mongodb';

// Tipos para las secciones de contenido
export interface PersonalData {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface HeroData {
  developer: {
    passion: string;
    focus: string;
    status: string;
  };
  scrollText: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  description: string;
  stats: Array<{ label: string; value: string }>;
}

export interface SkillsData {
  title: string;
  subtitle: string;
  frontend: {
    title: string;
    description: string;
    technologies: Array<{ name: string; level: number }>;
  };
  backend: {
    title: string;
    description: string;
    technologies: Array<{ name: string; level: number }>;
  };
  university: {
    name: string;
    institution: string;
    url: string;
  };
}

export interface TechStackData {
  title: string;
  subtitle: string;
  technologies: Array<{
    name: string;
    category: string;
    color: string;
  }>;
}

export interface DataSecOpsData {
  title: string;
  subtitle: string;
  badge: string;
  areas: Array<{
    id: string;
    title: string;
    subtitle: string;
    description: string;
    highlights: string[];
    detailedInfo: {
      intro: string;
      expertise: string[];
      certifications: Array<{
        name: string;
        issuer: string;
        url: string;
      }>;
    };
  }>;
}

export interface ProjectsData {
  title: string;
  subtitle: string;
  items: Array<{
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    liveUrl: string;
    githubUrl: string;
  }>;
}

export interface ContactData {
  title: string;
  subtitle: string;
  description: string;
  formLabels: {
    name: string;
    email: string;
    message: string;
    submit: string;
  };
  socialLinks: Array<{
    platform: string;
    url: string;
    icon: string;
  }>;
}

export interface FooterData {
  copyright: string;
  links: Array<{
    label: string;
    href: string;
  }>;
}

export interface ContentData {
  personal: PersonalData;
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  techStack: TechStackData;
  dataSecOps: DataSecOpsData;
  projects: ProjectsData;
  contact: ContactData;
  footer: FooterData;
}

class ContentAPI {
  private cache: Map<string, any> = new Map();
  private cacheTimestamp: Map<string, number> = new Map();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  // Verificar si el cache es válido
  private isCacheValid(section: string): boolean {
    const timestamp = this.cacheTimestamp.get(section);
    if (!timestamp) return false;
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  // Obtener datos desde MongoDB
  private async fetchFromDB<T>(section: string): Promise<T> {
    // Verificar cache
    if (this.cache.has(section) && this.isCacheValid(section)) {
      return this.cache.get(section) as T;
    }

    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      const result = await collection.findOne({ section });
      
      if (!result || !result.data) {
        throw new Error(`Section "${section}" not found in MongoDB`);
      }

      // Actualizar cache
      this.cache.set(section, result.data);
      this.cacheTimestamp.set(section, Date.now());

      return result.data as T;
    } catch (error) {
      console.error(`Error fetching ${section} from MongoDB:`, error);
      throw error;
    }
  }

  // Obtener todo el contenido
  async getAll(): Promise<ContentData> {
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('content');
      const allSections = await collection.find({}).toArray();

      if (allSections.length === 0) {
        throw new Error('No content found in MongoDB');
      }

      const data: any = {};
      allSections.forEach((doc) => {
        data[doc.section] = doc.data;
        this.cache.set(doc.section, doc.data);
        this.cacheTimestamp.set(doc.section, Date.now());
      });

      return data as ContentData;
    } catch (error) {
      console.error('Error fetching all content from MongoDB:', error);
      throw error;
    }
  }

  // Obtener sección específica
  async getSection<K extends keyof ContentData>(section: K): Promise<ContentData[K]> {
    return await this.fetchFromDB<ContentData[K]>(section as string);
  }

  // Obtener información personal
  async getPersonal(): Promise<PersonalData> {
    return await this.fetchFromDB<PersonalData>('personal');
  }

  // Obtener hero
  async getHero(): Promise<HeroData> {
    return await this.fetchFromDB<HeroData>('hero');
  }

  // Obtener about
  async getAbout(): Promise<AboutData> {
    return await this.fetchFromDB<AboutData>('about');
  }

  // Obtener skills
  async getSkills(): Promise<SkillsData> {
    return await this.fetchFromDB<SkillsData>('skills');
  }

  // Obtener tech stack
  async getTechStack(): Promise<TechStackData> {
    return await this.fetchFromDB<TechStackData>('techStack');
  }

  // Obtener DataSecOps
  async getDataSecOps(): Promise<DataSecOpsData> {
    return await this.fetchFromDB<DataSecOpsData>('dataSecOps');
  }

  // Obtener projects
  async getProjects(): Promise<ProjectsData> {
    return await this.fetchFromDB<ProjectsData>('projects');
  }

  // Obtener contact
  async getContact(): Promise<ContactData> {
    return await this.fetchFromDB<ContactData>('contact');
  }

  // Obtener footer
  async getFooter(): Promise<FooterData> {
    return await this.fetchFromDB<FooterData>('footer');
  }

  // Actualizar contenido en MongoDB
  async updateSection<K extends keyof ContentData>(
    section: K,
    newData: Partial<ContentData[K]>
  ): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('content');

      const currentData = await this.getSection(section);
      const updatedData = { ...currentData, ...newData };

      const result = await collection.updateOne(
        { section: section as string },
        {
          $set: {
            data: updatedData,
            updatedAt: new Date()
          }
        },
        { upsert: true }
      );

      // Limpiar cache de la sección
      this.cache.delete(section as string);
      this.cacheTimestamp.delete(section as string);

      return result.acknowledged;
    } catch (error) {
      console.error('Error updating content in MongoDB:', error);
      return false;
    }
  }

  // Limpiar cache
  clearCache(section?: string) {
    if (section) {
      this.cache.delete(section);
      this.cacheTimestamp.delete(section);
    } else {
      this.cache.clear();
      this.cacheTimestamp.clear();
    }
  }
}

export const contentAPI = new ContentAPI();
export default contentAPI;
