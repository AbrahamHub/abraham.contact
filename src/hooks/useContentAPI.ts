import { useState, useEffect } from 'react';

// En producción, usa ruta relativa. En desarrollo, usa localhost
const getAPIUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'http://localhost:3001/api';
  }
  // En producción (Vercel), usa ruta relativa al mismo dominio
  return '/api';
};

const API_BASE_URL = import.meta.env.VITE_API_URL || getAPIUrl();

interface UseContentResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useContentSection<T>(section: string): UseContentResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Usar query parameter para compatibilidad con Vercel
      const url = `${API_BASE_URL}/content?section=${encodeURIComponent(section)}`;
      console.log(`Fetching from: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch ${section}`);
      }
      
      const result = await response.json();
      
      // Si viene con estructura {data: {...}}, extraer el data
      if (result.data && typeof result.data === 'object' && !Array.isArray(result.data)) {
        setData(result.data as T);
      } else {
        setData(result as T);
      }
    } catch (err) {
      setError(err as Error);
      console.error(`Error fetching ${section}:`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Listen for content updates from Dashboard
    const handleContentUpdate = (event: CustomEvent) => {
      if (event.detail.section === section || event.detail.section === 'all') {
        fetchData();
      }
    };

    window.addEventListener('content-updated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('content-updated', handleContentUpdate as EventListener);
    };
  }, [section]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
}

// Hooks específicos para cada sección
export const usePersonal = () => useContentSection('personal');
export const useHero = () => useContentSection('hero');
export const useAbout = () => useContentSection('about');
export const useSkills = () => useContentSection('skills');
export const useTechStack = () => useContentSection('techStack');
export const useDataSecOps = () => useContentSection('dataSecOps');
export const useProjects = () => useContentSection('projects');
export const useContact = () => useContentSection('contact');
export const useFooter = () => useContentSection('footer');

// Hook para obtener todo el contenido
export function useAllContent() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/content`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err as Error);
      console.error('Error fetching all content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();

    // Listen for content updates from Dashboard
    const handleContentUpdate = () => {
      fetchAll();
    };

    window.addEventListener('content-updated', handleContentUpdate as EventListener);
    
    return () => {
      window.removeEventListener('content-updated', handleContentUpdate as EventListener);
    };
  }, []);

  return { data, loading, error, refetch: fetchAll };
}

