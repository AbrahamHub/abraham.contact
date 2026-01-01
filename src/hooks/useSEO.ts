import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Google Analytics tracking (opcional - reemplaza con tu ID)
declare global {
  interface Window {
    gtag?: (command: string, ...args: any[]) => void;
  }
}

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname + location.search,
      });
    }

    // Update page title for SEO
    const titles: Record<string, string> = {
      '/': 'Abraham Castañeda Quintero | Desarrollador Full-Stack & DataSecOps Engineer',
      '/dashboard': 'Dashboard | Abraham Castañeda Portfolio',
      '/login': 'Login | Abraham Castañeda Portfolio',
    };

    document.title = titles[location.pathname] || 'Abraham Castañeda Portfolio';

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);
};

export const useScrollToAnchor = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);
};
