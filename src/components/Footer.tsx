import { Heart, Instagram, Twitter, Linkedin, Github } from "lucide-react";
import { useFooter, usePersonal } from "@/hooks/useContentAPI";

const Footer = () => {
  const { data: footerData } = useFooter();
  const { data: personalData } = usePersonal();

  const iconMap: Record<string, typeof Instagram> = {
    instagram: Instagram,
    twitter: Twitter,
    x: Twitter,
    linkedin: Linkedin,
    github: Github,
  };

  // Social links from DB or default hardcoded links
  const defaultSocialLinks = [
    { platform: "Instagram", url: "https://www.instagram.com/abraham.csv/" },
    { platform: "X", url: "https://x.com/Abrahamhub24" },
    { platform: "Linkedin", url: "https://www.linkedin.com/in/abraham-casta%C3%B1eda-quintero-1295b3203/" },
    { platform: "Github", url: "https://github.com/AbrahamHub" },
  ];

  const socialLinksData = (footerData as any)?.socialLinks && (footerData as any).socialLinks.length > 0
    ? (footerData as any).socialLinks
    : defaultSocialLinks;

  const socialLinks = socialLinksData.map((link: any) => ({
    icon: iconMap[link.platform.toLowerCase()] || Github,
    href: link.url,
    label: link.platform,
  }));
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Made with love */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <span>{(footerData as any)?.madeWith || "Hecho con"}</span>
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            <span>{(footerData as any)?.location || "de LATAM para el mundo 🌎"}</span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {(footerData as any)?.copyright || "Todos los derechos reservados"} - Abraham Castañeda Quintero.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
