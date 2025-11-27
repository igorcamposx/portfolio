import React from 'react';
import { motion } from 'framer-motion';
import { BIO_TEXT, SOCIAL_LINKS } from '../services/mockData';
import { CheckCircle2 } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    "Sony Vegas", "CapCut", 
    "Photoshop", "WordPress", "Roteirização", 
    "Gestão de Tráfego", "Social Media"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Image/Visual Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/20 border border-slate-800 bg-slate-900 relative group">
             <img 
               src="https://media.discordapp.net/attachments/1435455747428188210/1443318459311325305/Perfil.jpg?ex=6928a290&is=69275110&hm=9de38799c144b367acdf71d5bcee48e839a924ce648a1dd48ca687dd2f42c60f&=&format=webp&width=501&height=671" 
               alt="Igor Campos Profile"
               className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
               onError={(e) => {
                 // Fallback if image is missing
                 (e.target as HTMLImageElement).src = 'https://picsum.photos/800/1000?grayscale';
               }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
          </div>
          {/* Decorative floating card */}
          <div className="absolute -bottom-6 -right-6 bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl hidden md:block">
            <div className="text-4xl font-bold text-accent mb-1">5+</div>
            <div className="text-sm text-slate-400">Anos de<br/>Experiência</div>
          </div>
        </motion.div>

        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-white mb-6">Sobre Mim</h1>
          
          <div className="prose prose-invert prose-lg text-slate-300 mb-8">
            {BIO_TEXT.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>

          <div className="mb-8">
             <h3 className="text-xl font-semibold text-white mb-4">Skills & Ferramentas</h3>
             <div className="grid grid-cols-2 gap-3">
               {skills.map(skill => (
                 <div key={skill} className="flex items-center text-slate-400">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-2" />
                    <span>{skill}</span>
                 </div>
               ))}
             </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Conecte-se</h3>
            <div className="flex flex-wrap gap-4">
               {SOCIAL_LINKS.map(link => (
                 <a 
                   key={link.platform}
                   href={link.url}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm text-white transition-colors"
                 >
                   {link.platform}
                 </a>
               ))}
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;