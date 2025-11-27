import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Layers } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../services/mockData';

const Home: React.FC = () => {
  const { data: projects, isLoading } = useQuery({ queryKey: ['projects'], queryFn: fetchProjects });

  // Get only first 3 projects for preview
  const featuredProjects = projects?.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-accent font-semibold tracking-wider uppercase text-sm mb-4">
              Igor Campos &bull; Video Editor & Designer
            </h2>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transformando ideias em <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Experiências Visuais
              </span>
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-8 leading-relaxed">
              Especialista em criar narrativas dinâmicas para o mundo digital. 
              De edições para grandes influencers a identidades visuais marcantes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-3 bg-accent hover:bg-cyan-400 text-slate-950 font-semibold rounded-full transition-all hover:scale-105"
              >
                Ver Portfólio <Layers className="ml-2 w-4 h-4" />
              </Link>
              <Link 
                to="/contato"
                className="inline-flex items-center justify-center px-8 py-3 border border-slate-700 hover:border-slate-500 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold rounded-full transition-all"
              >
                Entrar em Contato <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Trabalhos em Destaque</h2>
              <p className="text-slate-400">Uma seleção dos meus projetos recentes favoritos.</p>
            </div>
            <Link to="/portfolio" className="hidden md:flex items-center text-accent hover:underline">
              Ver todos <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {[1,2,3].map(i => (
                 <div key={i} className="h-64 bg-slate-800/50 animate-pulse rounded-xl" />
               ))}
            </div>
          ) : (
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {featuredProjects?.map((project) => (
                <motion.div key={project.id} variants={itemVariants} className="group cursor-pointer">
                   <Link to={`/portfolio/${project.id}`}>
                    <div className="relative overflow-hidden rounded-xl aspect-video mb-4 border border-slate-800">
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all z-10" />
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <span className="inline-block px-2 py-1 bg-accent/90 text-slate-950 text-xs font-bold uppercase rounded mb-2">
                          {project.category}
                        </span>
                      </div>
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                         <div className="bg-white/10 backdrop-blur-md p-4 rounded-full">
                           <Play className="w-6 h-6 text-white fill-current" />
                         </div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-slate-500 text-sm mt-1 truncate">{project.description}</p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

           <div className="mt-8 md:hidden text-center">
             <Link to="/portfolio" className="text-accent font-semibold">Ver todos os projetos &rarr;</Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
