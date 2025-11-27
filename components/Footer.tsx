import React from 'react';
import { SOCIAL_LINKS } from '../services/mockData';
import { Twitter, Linkedin, Instagram, FolderHeart } from 'lucide-react';

// Icon mapper helper
const IconMap: Record<string, React.FC<any>> = {
  Twitter: Twitter,
  Linkedin: Linkedin,
  Instagram: Instagram,
  Behance: FolderHeart // Using FolderHeart as Behance proxy
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary/30 border-t border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-2">Whyzz Visuals</h3>
            <p className="text-slate-400 text-sm max-w-xs">
              Criando narrativas visuais impactantes para o mundo digital.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {SOCIAL_LINKS.map((link) => {
              const Icon = IconMap[link.icon] || FolderHeart;
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-accent transition-colors duration-300 transform hover:scale-110"
                  aria-label={link.platform}
                >
                  <Icon size={24} />
                </a>
              );
            })}
          </div>

        </div>
        
        <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Igor Campos (Whyzz). Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
