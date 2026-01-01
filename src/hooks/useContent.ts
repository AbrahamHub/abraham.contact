// Re-export de useContentAPI para mantener compatibilidad
export {
  useContentSection,
  usePersonal,
  useHero,
  useAbout,
  useSkills,
  useTechStack,
  useDataSecOps,
  useProjects,
  useContact,
  useFooter,
  useAllContent as useContent
} from './useContentAPI';

export default useContent;
function useContent(): { data: any; loading: boolean; error: Error | null; } {
  throw new Error("Function not implemented.");
}
