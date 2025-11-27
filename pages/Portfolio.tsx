import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../services/mockData';
import { Category, Project } from '../types';
import { Filter, PlayCircle, Image as ImageIcon, Layout as LayoutIcon } from 'lucide-react';

const Portfolio: React.FC = () => {
  const { data: projects, isLoading } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });
  const [filter, setFilter] = useState<Category | 'all'>('all');

  const filteredProjects = projects?.filter(
    (p) => filter === 'all' || p.category === filter
  );

  const categories: { id: Category | 'all'; label: string; icon: any }[] = [
    { id: 'all', label: 'Todos', icon: Filter },
    { id: 'video', label: 'Vídeos', icon: PlayCircle },
    { id: 'design', label: 'Design', icon: ImageIcon },
    { id: 'web', label: 'Web', icon: LayoutIcon },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Portfólio</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore meus trabalhos recentes. Use os filtros abaixo para navegar por categoria.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`flex items-center px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === cat.id
                ? 'bg-accent text-slate-900 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <cat.icon className="w-4 h-4 mr-2" />
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {[1,2,3,4,5,6].map(n => (
             <div key={n} className="aspect-video bg-slate-800/50 rounded-xl animate-pulse" />
           ))}
        </div>
      ) : (
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects?.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative"
              >
                <Link to={`/portfolio/${project.id}`} className="block h-full">
                  <div className="relative aspect-video overflow-hidden rounded-xl bg-slate-800 border border-slate-800 shadow-lg">
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center p-4 text-center">
                        <h3 className="text-white font-bold text-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {project.title}
                        </h3>
                        <p className="text-accent text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                          Ver detalhes &rarr;
                        </p>
                    </div>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 filter brightness-90"
                      loading="lazy"
                    />
                     {/* Category Badge */}
                     <div className="absolute top-3 right-3 z-0">
                       <span className="bg-black/50 backdrop-blur-sm text-xs text-white px-2 py-1 rounded border border-white/10 uppercase tracking-wider">
                         {project.category}
                       </span>
                     </div>
                  </div>
                  
                  {/* Mobile Title (visible always on mobile, hidden on hover desktop handled by overlay) */}
                  <div className="mt-3 md:hidden">
                    <h3 className="text-lg font-medium text-white">{project.title}</h3>
                    <p className="text-sm text-slate-500">{project.client}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filteredProjects?.length === 0 && (
         <div className="text-center py-20 text-slate-500">
           Nenhum projeto encontrado nesta categoria.
         </div>
      )}
    </div>
  );
};

export default Portfolio;
