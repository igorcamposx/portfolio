
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProjectById } from '../services/mockData';
import { ArrowLeft, Calendar, User, Tag, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GalleryItem } from '../types';

const PortfolioItem: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: project, isLoading } = useQuery({ 
    queryKey: ['project', id], 
    queryFn: () => fetchProjectById(id || '') 
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Normalize gallery data: if no gallery, use the thumbnail as a single item
  const gallery: GalleryItem[] = project?.gallery && project.gallery.length > 0
    ? project.gallery
    : project ? [{ type: 'image', url: project.thumbnail }] : [];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
      scale: 0.95
    })
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    let newIndex = currentIndex + newDirection;
    if (newIndex < 0) newIndex = gallery.length - 1;
    if (newIndex >= gallery.length) newIndex = 0;
    setCurrentIndex(newIndex);
  };

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [id]);

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center text-accent">Carregando detalhes...</div>;
  }

  if (!project) {
    return (
      <div className="h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl text-white mb-4">Projeto não encontrado</h2>
        <Link to="/portfolio" className="text-accent hover:underline">Voltar ao Portfólio</Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/portfolio" className="inline-flex items-center text-slate-400 hover:text-white mb-8 transition-colors group">
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Voltar
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-6">
           <div className="flex items-center gap-3 mb-4">
             <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-bold uppercase rounded-full border border-accent/20">
               {project.category}
             </span>
             {project.date && <span className="text-slate-500 text-sm">{project.date}</span>}
           </div>
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{project.title}</h1>
           <p className="text-slate-400 text-lg">{project.client}</p>
        </div>

        {/* Advanced Gallery Carousel */}
        <div className="mb-12 select-none">
          <div className="relative bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl aspect-video">
             
             {/* Main Viewer */}
             <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                      scale: { duration: 0.2 }
                    }}
                    className="absolute w-full h-full flex items-center justify-center"
                  >
                    {gallery[currentIndex].type === 'video' ? (
                      <video 
                        src={gallery[currentIndex].url} 
                        controls 
                        className="max-h-full max-w-full w-full h-full object-contain bg-black"
                        poster={project.thumbnail} // Fallback poster
                      />
                    ) : (
                      <img 
                        src={gallery[currentIndex].url} 
                        alt={`${project.title} view ${currentIndex + 1}`} 
                        className="max-h-full max-w-full w-full h-full object-contain"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
             </div>

             {/* Navigation Arrows (Only if more than 1 item) */}
             {gallery.length > 1 && (
               <>
                 <button 
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-accent hover:text-black rounded-full text-white backdrop-blur-sm transition-all transform hover:scale-110"
                    onClick={() => paginate(-1)}
                 >
                   <ChevronLeft size={24} />
                 </button>
                 <button 
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/50 hover:bg-accent hover:text-black rounded-full text-white backdrop-blur-sm transition-all transform hover:scale-110"
                    onClick={() => paginate(1)}
                 >
                   <ChevronRight size={24} />
                 </button>

                 {/* Pagination Dots/Counter */}
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                   {gallery.map((_, idx) => (
                     <button
                       key={idx}
                       onClick={() => {
                         setDirection(idx > currentIndex ? 1 : -1);
                         setCurrentIndex(idx);
                       }}
                       className={`w-2 h-2 rounded-full transition-all ${
                         idx === currentIndex ? 'bg-accent w-6' : 'bg-white/50 hover:bg-white'
                       }`}
                     />
                   ))}
                 </div>
               </>
             )}
          </div>

          {/* Thumbnails Strip (Only if more than 1 item) */}
          {gallery.length > 1 && (
            <div className="flex gap-4 mt-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent px-1">
              {gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                     setDirection(idx > currentIndex ? 1 : -1);
                     setCurrentIndex(idx);
                  }}
                  className={`relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    idx === currentIndex ? 'border-accent shadow-lg shadow-accent/20' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.type === 'video' ? (
                     <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                        <Play size={20} className="text-white fill-current" />
                     </div>
                  ) : (
                    <img src={item.url} alt="thumbnail" className="w-full h-full object-cover" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           <div className="md:col-span-2">
             <h3 className="text-2xl font-bold text-white mb-4">Sobre o Projeto</h3>
             <p className="text-slate-300 leading-relaxed text-lg">
               {project.description}
             </p>
             <p className="text-slate-400 mt-4 leading-relaxed">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
               Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
             </p>
           </div>
           
           <div className="bg-slate-800/30 p-6 rounded-xl border border-slate-800 h-fit sticky top-24">
              <h4 className="text-white font-semibold mb-6 border-b border-slate-700 pb-2">Informações</h4>
              <ul className="space-y-4">
                 <li className="flex items-center text-slate-300">
                    <User className="w-5 h-5 text-accent mr-3" />
                    <span className="flex-1">Cliente:</span>
                    <span className="font-medium text-white">{project.client || 'Confidencial'}</span>
                 </li>
                 <li className="flex items-center text-slate-300">
                    <Calendar className="w-5 h-5 text-accent mr-3" />
                    <span className="flex-1">Data:</span>
                    <span className="font-medium text-white">{project.date || '2023'}</span>
                 </li>
                 <li className="flex items-center text-slate-300">
                    <Tag className="w-5 h-5 text-accent mr-3" />
                    <span className="flex-1">Tipo:</span>
                    <span className="font-medium text-white capitalize">{project.category}</span>
                 </li>
              </ul>
              
              <button className="w-full mt-8 py-3 bg-white text-slate-900 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                 Ver Projeto Online
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PortfolioItem;
